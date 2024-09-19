const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ticketController = require('../controllers/ticketController');

router.post('/', auth, ticketController.createTicket);
// Other ticket routes

module.exports = router;
