const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const ticketController = require('../controllers/ticketController');

router.post('/', auth, ticketController.createTicket);

router.get('/tickets', auth, ticketController.getTickets);

router.put('/tickets/:id', auth, ticketController.updateTicket);

router.delete('/tickets/:id', auth, ticketController.deleteTicket);

router.get('/tickets/:id', auth, ticketController.getTicketById);

router.post('/tickets', auth, ticketController.addTicket);

router.put('/tickets/:id/assign', auth, ticketController.assignTicket);

router.post('/tickets/merge', auth, ticketController.mergeTickets);

router.get('/tickets/filter', auth, ticketController.filterTickets);



module.exports = router;



