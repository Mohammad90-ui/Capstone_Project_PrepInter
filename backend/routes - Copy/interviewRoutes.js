const express = require('express');
const router = express.Router();

const {
  createInterview,
  getInterviews,
  getInterviewById,
  updateInterview,
  deleteInterview,
  startInterview,
} = require('../controllers/interviewController');

const { protect } = require('../middleware/authMiddleware');

router.post('/', protect, createInterview);
router.post('/start', protect, startInterview);
router.get('/', protect, getInterviews);
router.route('/:id')
  .get(protect, getInterviewById)
  .put(protect, updateInterview)
  .delete(protect, deleteInterview);

module.exports = router;
