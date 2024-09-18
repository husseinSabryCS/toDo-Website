const express = require('express');
const router = express.Router();
const taskController = require('../controllers/taskController');

// تعريف المسارات
router.post('/', taskController.addTask);
router.get('/', taskController.getTasks);
router.delete('/:id', taskController.deleteTask);
router.put('/:id/status', taskController.updateStatus);
router.get('/status/:status', taskController.getTasksByStatus);
module.exports = router;