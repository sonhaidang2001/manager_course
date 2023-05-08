const express = require('express');
const router = express.Router();

const newController = require('../controllers/new.controller');

router.delete('/:id/force', newController.force);
router.patch('/:id/restore', newController.restore);
router.get('/trash', newController.trashNew);
router.delete('/:id', newController.delete);
router.put('/:id', newController.update);
router.get('/:id/edit', newController.edit);
router.post('/store', newController.store);
router.get('/create', newController.create);
router.get('/storeNew', newController.storeNew);
router.get('/:slug', newController.show);

module.exports = router;