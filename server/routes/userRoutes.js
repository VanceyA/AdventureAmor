const express = require('express');
const router = express.Router();
const userAPI = require('../controllers/userController');
const partnerAPI = require('../controllers/partnerController');

function authorizeRequest(req, res, next) {
    if (req.session && req.session.user) {
        next();
    } else {
        res.status(401).send("Not authenticated!");
    }
}

router.get('/users', authorizeRequest, userAPI.getUser);
router.get('/users/:id', userAPI.getUserById);
router.post('/users', userAPI.createUser);
router.delete('/users', authorizeRequest, userAPI.deleteUser);

router.get('/session', authorizeRequest, userAPI.getSession);
router.delete('/session', authorizeRequest, userAPI.logoutUser);
router.post('/session', userAPI.loginUser);

router.get('/pendingPartners', authorizeRequest, partnerAPI.getPendingPartners);
router.post('/acceptPartner/:id', authorizeRequest, partnerAPI.acceptPartner);
router.delete('/rejectPartner/:id', authorizeRequest, partnerAPI.rejectPartner);
router.delete('/partner/:id', authorizeRequest, partnerAPI.leavePartner);


module.exports = router;