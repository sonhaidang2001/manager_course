const express = require('express');
const router = express.Router();

const siteController = require('../controllers/site.controller');

router.get('/search', siteController.search);
router.get('/home', siteController.index);
router.post('/login-check', siteController.loginCheck);
router.get('/', siteController.login);


module.exports = router;