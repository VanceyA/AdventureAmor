const express = require('express');
const router = express.Router();
const completedChallengeAPI = require('../controllers/completedChallengeController');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage(), // Store files in memory for easy access
    limits: { fileSize: 5 * 1024 * 1024 }, // Limit file size to 5MB
});

function authorizeRequest(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).send("Not authenticated!");
    }
}

router.get('/completedChallenges', authorizeRequest, completedChallengeAPI.getChallengesForUser);
router.get('/completedChallenges/:id', authorizeRequest, completedChallengeAPI.getChallengeById);

router.post('/completedChallenges/:id', upload.single('image'), authorizeRequest, completedChallengeAPI.createCompletedChallenge);
router.delete('/completedChallenges/:id', authorizeRequest, completedChallengeAPI.markChallengeIncomplete);


module.exports = router; 