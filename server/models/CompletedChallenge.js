const mongoose = require('mongoose');
const { Schema } = mongoose;

const completedChallengeSchema = Schema({
    challenge: {
        type: Schema.Types.ObjectId,
        ref: 'Challenge',
        required: true
    },
    picture: {
        type: String
    },
    note: {
        type: String
    },
    rating: {
        type: Number,
        min: 1,
        max: 5
    },
    actualPrice: {
        type: Number,
        min: 0,
        max: 200
    }
});

const CompletedChallenge = mongoose.model('CompletedChallenge', completedChallengeSchema);

module.exports = {
    CompletedChallenge: CompletedChallenge
};