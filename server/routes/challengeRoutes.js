const express = require('express');
const router = express.Router();
const challengeAPI = require('../controllers/challengeController');

router.get('/challenges', challengeAPI.getChallenges);
router.get('/challenges/:id', challengeAPI.getChallengeById);

router.get('/miniChallenges', challengeAPI.getMiniChallenges);


module.exports = router; 