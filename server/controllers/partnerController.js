const { PendingPartner } = require('../models/PendingPartner');
const { User } = require('../models/User');

class PartnerController {
    static async getPendingPartners(req, res) {
        const pendingPartners = await PendingPartner.find({ reciever: req.session.user._id });
        res.status(200).json(pendingPartners);
    }

    static async getPendingRequests(req, res) {
        const pendingRequests = await PendingPartner.find({ sender: req.session.user._id });
        res.status(200).json(pendingRequests);
    }

    static async requestPartner(req, res) {
        const partnerUsername = req.body.partnerUsername;
        const partner = await User.findOne({ username: partnerUsername });
        if (!partner) {
            return res.status(404).json({ message: 'User not found' });
        }
        const user = await User.findById(req.session.user._id);
        if (user.partner) {
            return res.status(400).json({ message: 'You already have a partner' });
        }

        const reciever = partner._id.toString();
        const sender = user._id.toString();

        if (reciever === sender) {
            return res.status(400).json({ message: 'You cannot be your own partner' });
        }

        const existingPendingPartner = await PendingPartner.findOne({ sender });
        if (existingPendingPartner) {
            return res.status(400).json({ message: 'You have already have a pending partner' });
        }

        const pendingPartner = new PendingPartner({ reciever, sender });
        await pendingPartner.save();
        res.status(200).json({ message: 'Partner request sent' });
    }

    static async cancelRequest(req, res) {
        const requestId = req.params.id;
        const pendingPartner = await PendingPartner.findOne({ _id: requestId });
        if (!pendingPartner) {
            return res.status(404).json({ message: 'Pending partner not found' });
        }
        await PendingPartner.findByIdAndDelete(pendingPartner._id);
        res.status(200).json({ message: 'Request canceled' });
    }

    static async acceptPartner(req, res) {
        const partnerId = req.params.id;
        const pendingPartner = await PendingPartner.findOne({ reciever: req.session.user._id, sender: partnerId });
        if (!pendingPartner) {
            return res.status(404).json({ message: 'Pending partner not found' });
        }

        const user = await User.findById(req.session.user._id);
        user.partner = partnerId;

        const partner = await User.findById(partnerId);
        partner.partner = req.session.user._id;
        await partner.save();
        await user.save();
        await PendingPartner.findByIdAndDelete(pendingPartner._id);
        res.status(200).json({ message: 'Partner accepted' });
    }

    static async rejectPartner(req, res) {
        const partnerId = req.params.id;
        const pendingPartner = await PendingPartner.findOne({ reciever: req.session.user._id, sender: partnerId });
        if (!pendingPartner) {
            return res.status(404).json({ message: 'Pending partner not found' });
        }
        await PendingPartner.findByIdAndDelete(pendingPartner._id);
        res.status(200).json({ message: 'Partner rejected' });
    }

    static async leavePartner(req, res) {
        const user = await User.findById(req.session.user._id);
        const partner = await User.findById(user.partner);
        user.partner = null;
        partner.partner = null;
        await partner.save();
        await user.save();
        res.status(200).json({ message: 'Partner left' });
    }
}

module.exports = PartnerController;