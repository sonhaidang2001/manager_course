const express = require('express');
const router = express.Router();

const courseController = require('../controllers/course.controller');

router.delete('/:id/force', courseController.force);
router.patch('/:id/restore', courseController.restore);
router.get('/trash', courseController.trashCourses);
router.delete('/:id', courseController.delete);
router.put('/:id', courseController.update);
router.get('/:id/edit', courseController.edit);
router.get('/storedCourse', courseController.storedCourse);
router.post('/store', courseController.store);
router.get('/create', courseController.create);
router.get('/:slug', courseController.show);

module.exports = router;