const mongoose = require('mongoose');
const { Schema } = mongoose;

const challengeSchema = Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    length: {
        type: Number,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    isHome: {
        type: Boolean,
        required: true
    },
    challengeDate: {
        type: Date,
    },
});

const Challenge = mongoose.model('Challenge', challengeSchema);

module.exports = {
    Challenge: Challenge
};