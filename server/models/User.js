const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');


const userSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true
    },
    encryptedPassword: {
        type: String,
        required: true
    },
    partner: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        default: null
    },
    completedChallenges: {
        type: [Schema.Types.ObjectId],
        ref: 'CompletedChallenge',
        default: []
    },
}, {
    toJSON: {
    versionKey: false,
    transform(doc, ret) {
        delete ret.encryptedPassword;
    }
    }
});

userSchema.methods.setEncryptedPassword = function(password) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.hash(password, 12).then((hash) => {
            this.encryptedPassword = hash;
            resolve();
        })
        .catch((err) => {
            reject(err);
        });
    });

    return promise;
};

userSchema.methods.verifyPassword = function(password) {
    var promise = new Promise((resolve, reject) => {
        bcrypt.compare(password, this.encryptedPassword).then((isVerified) => {
            resolve(isVerified);
        })
        .catch((err) => {
            reject(err);
        });
    });

    return promise;
};

const User = mongoose.model('User', userSchema);

module.exports = {
    User: User
};