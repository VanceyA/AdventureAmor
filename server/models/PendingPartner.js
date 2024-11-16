const { app } = require('firebase-admin');
const mongoose = require('mongoose');
const { Schema } = mongoose;

const pendingPartnerSchema = Schema({
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    reciever: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
});

const PendingPartner = mongoose.model('PendingPartner', pendingPartnerSchema);

module.exports = {
    PendingPartner: PendingPartner
}