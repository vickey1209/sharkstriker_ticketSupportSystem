const Ticket = require('../models/ticket');

exports.createTicket = async (req, res) => {
  const { title, description, priority, department } = req.body;
  try {
    const newTicket = new Ticket({
      title,
      description,
      priority,
      department,
      user: req.user.id,
    });
    await newTicket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Other ticket functions: getTickets, updateTicket, deleteTicket
