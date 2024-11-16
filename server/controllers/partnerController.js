const { PendingPartner } = require('../models/PendingPartner');
const { User } = require('../models/User');

class PartnerController {
    static async getPendingPartners(req, res) {
        const pendingPartners = await PendingPartner.find({ reciever: req.session.user._id });
        res.status(200).json(pendingPartners);
    }

    static async requestPartner(req, res) {
        const partnerId = req.params.id;
        const reciever = req.session.user._id;
        const sender = partnerId;
        const pendingPartner = new PendingPartner({ reciever, sender });
        await pendingPartner.save();
        res.status(200).json({ message: 'Partner request sent' });
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
        await pendingPartner.findByIdAndDelete(partnerId);
        res.status(200).json({ message: 'Partner accepted' });
    }

    static async rejectPartner(req, res) {
        const partnerId = req.params.id;
        const pendingPartner = await PendingPartner.findOne({ reciever: req.session.user._id, sender: partnerId });
        if (!pendingPartner) {
            return res.status(404).json({ message: 'Pending partner not found' });
        }
        await pendingPartner.findByIdAndDelete(partnerId);
        res.status(200).json({ message: 'Partner rejected' });
    }

    static async leavePartner(req, res) {
        const user = await User.findById(req.session.user._id);
        user.partner = null;
        const partner = await User.findById(user.partner);
        partner.partner = null;
        await partner.save();
        await user.save();
        res.status(200).json({ message: 'Partner left' });
    }
}

module.exports = PartnerController;