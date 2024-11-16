const { Challenge } = require('../models/Challenge')


class challengeAPI {

    // Returns all challenges that dont have a date field
    static async getChallenges(req, res) {
        try {
            let challenges = await Challenge.find({ challengeDate: {$exists: false}});
            res.status(200).json(challenges)
        } catch (error) {
            console.error("Error fetching challenge by ID:", error);
            res.sendStatus(500); // Internal Server Error
        }
    }
    // Returns all challenges that do have a date field
    static async getMiniChallenges(req, res) {
        try {
            let challenges = await Challenge.find({ challengeDate: {$exists: true}});
            res.status(200).json(challenges)
        } catch (error) {
            console.error("Error fetching challenge by ID:", error);
            res.sendStatus(500); // Internal Server Error
        }
    }
    // Returns a specific challenge given id
    static async getChallengeById(req, res) {
        try {
            let challenge = await Challenge.findById(req.params.id);
            if (challenge) {
                res.status(200).json(challenge)
            } else {
                res.status(404).send("Challenge with id ${req.params.id} doesn't exist");
            }
        } catch (error) {
            console.error("Error fetching challenge by ID:", error);
            res.sendStatus(500); // Internal Server Error
        }
    }
}

module.exports = challengeAPI