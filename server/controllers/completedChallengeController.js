const { CompletedChallenge } = require('../models/CompletedChallenge');
const { User } = require('../models/User'); // Add this - you're using User model
const { 
    S3Client, 
    GetObjectCommand, 
    PutObjectCommand 
} = require("@aws-sdk/client-s3");
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner"); // Add this - missing import
const sharp = require("sharp");
const dotenv = require('dotenv');

dotenv.config();

const bucketName = process.env.BUCKET_NAME;
const bucketRegion = process.env.AWS_REGION;
const accessKey = process.env.AMAZON_ACCESS_KEY;
const secretAccessKey = process.env.AMAZON_SECRET_KEY;

const s3 = new S3Client({
    credentials: {
        accessKeyId: accessKey,
        secretAccessKey: secretAccessKey
    },
    region: bucketRegion
});

function randomImageName(imageName) {
    // Remove spaces and special characters from original name
    const sanitizedName = imageName.replace(/[^a-zA-Z0-9]/g, '');
    return `${sanitizedName}-${Date.now()}`;
}

class completedChallengeAPI {  // Changed to PascalCase
    static async getChallengesForUser(req, res) {
        try {
            const user = req.session.user;
            if (!user) {
                return res.status(401).json({ message: "No user found in session" });
            }

            // Note: Changed CompletedChallenges to completedChallenges to match your schema
            const ids = user?.completedChallenges || [];
            
            if (!ids.length) {
                return res.status(200).json([]);
            }
            
            const completedChallenges = await CompletedChallenge.find({
                _id: { $in: ids }
            });

            // Use Promise.all to handle all async operations
            await Promise.all(completedChallenges.map(async (challenge) => {
                if (challenge.picture) {  // Changed from image to picture to match your schema
                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: challenge.picture
                    };
                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    challenge.picture = url;
                }
            }));

            res.status(200).json(completedChallenges);
        } catch (error) {
            console.error("Error fetching challenges for user:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }
    
    static async getChallengeById(req, res) {
        try {
            const user = req.session.user;
            if (!user) {
                return res.status(401).json({ message: "No user found in session" });
            }

            const ids = user.completedChallenges || [];

            if (!ids.includes(req.params.id)) {
                return res.status(404).json({ 
                    message: `Challenge with id ${req.params.id} doesn't exist` 
                });
            }

            const challenge = await CompletedChallenge.findById(req.params.id);
            if (challenge) {
                if (challenge.picture) {
                    const getObjectParams = {
                        Bucket: bucketName,
                        Key: challenge.picture
                    };
                    const command = new GetObjectCommand(getObjectParams);
                    const url = await getSignedUrl(s3, command, { expiresIn: 3600 });
                    challenge.picture = url;
                }
                res.json(challenge);
            } else {
                res.status(404).json({ 
                    message: `Challenge with id ${req.params.id} doesn't exist` 
                });
            }
        } catch (error) {
            console.error("Error fetching challenge by ID:", error);
            res.status(500).json({ message: "Internal Server Error", error: error.message });
        }
    }

    static async createCompletedChallenge(req, res) {
        try {
            const user = await User.findById(req.session.user._id);
            if (!user) {
                return res.status(401).json({ message: "No user found in session" });
            }
    
            // Initialize completedChallenges array if it doesn't exist
            if (!user.completedChallenges) {
                user.completedChallenges = [];
            }
    
            // Check for duplicate challenge
            if (user.completedChallenges.includes(req.body.id)) {
                return res.status(409).json({ 
                    message: `Challenge with id ${req.body.id} already exists` 
                });
            }
    
            // Check if file exists
            if (!req.file) {
                return res.status(400).json({ message: "No image file provided" });
            }
    
            // Process image
            const buffer = await sharp(req.file.buffer)
                .resize({ 
                    width: 1920, 
                    height: 1080, 
                    fit: 'fill' 
                })
                .toBuffer();
    
            const imageName = randomImageName(req.file.originalname);
    
            // Upload to S3
            const params = {
                Bucket: bucketName,
                Key: imageName,
                Body: buffer,
                ContentType: req.file.mimetype
            };
    
            const command = new PutObjectCommand(params);
            await s3.send(command);
    
            // Create challenge
            const challengeData = {
                challenge: req.params.id,
                picture: imageName,
                note: req.body.note,
                rating: req.body.rating,
                actualPrice: req.body.actualPrice
            };
            
            const challenge = await CompletedChallenge.create(challengeData);

            // Update user and partner
            user.completedChallenges.push(challenge._id);
            
            if (user.partner) {
                const partner = await User.findById(user.partner);
                if (partner) {
                    if (!partner.completedChallenges) {
                        partner.completedChallenges = [];
                    }
                    partner.completedChallenges.push(challenge._id);
                    await partner.save();
                }
            }
    
            await user.save();
            
            res.status(201).json(challenge);
    
        } catch (error) {
            console.error("Error creating challenge:", error);
            res.status(500).json({ 
                message: "Error creating completed challenge",
                error: error.message 
            });
        }
    }

    static async markChallengeIncomplete(req, res) {
        try {
            const user = await User.findById(req.session.user._id);
            let ids = user.completedChallenges;

            if (!ids.includes(req.params.id)) {
                return res.status(404).send("Challenge with id ${req.params.id} doesn't exist");
            }

            let challenge = await CompletedChallenge.findById(req.params.id);
            if (challenge) {
                user.completedChallenges.splice(user.completedChallenges.indexOf(challenge._id), 1);
                await user.save();
                return res.status(204)
            } else {
                return res.status(404).send("Challenge with id ${req.params.id} doesn't exist");
            }
        } catch (error) {
            console.error("Error fetching challenge by ID:", error);
            res.status(500); // Internal Server Error
        }
    }


}

module.exports = completedChallengeAPI;