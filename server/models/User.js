const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = Schema({
    displayName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    },
    partner: {
        type: Number
    },
    completedChallenges: {
        type: [Schema.Types.ObjectId],
        ref: 'Challenge'
    },
});

const User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};