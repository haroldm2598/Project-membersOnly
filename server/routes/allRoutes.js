const express = require('express');
const user = require('../controllers/controller.user');
const admin = require('../controllers/controller.admin');
const message = require('../controllers/controller.message');

const router = express.Router();

// ==== USER ROUTER ====

router.post('/login', user.login);
router.post('/register', user.register);
router.get('/user', user.showUser);
router.post('/logout', user.logout);

// ==== ADMIN ROUTER ====
router.get('/admin', admin.showAll);

// ==== MESSAGE ROUTER ====
router.get('/message', message.showMessageList);
router.post('/addMessage', message.createMessage);

module.exports = router;
