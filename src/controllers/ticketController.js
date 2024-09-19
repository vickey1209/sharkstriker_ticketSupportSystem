const Ticket = require('../models/ticketModel');


//create ticket
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



//updatre ticket
exports.updateTicket = async (req, res) => {
    const { id } = req.params;
    const { title, description, priority, status, department } = req.body;

    try {
        const ticket = await Ticket.findById(id);

        // Check if the ticket exists and belongs to the user
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        if (ticket.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized to update this ticket' });
        }

        // Update the ticket fields
        ticket.title = title || ticket.title;
        ticket.description = description || ticket.description;
        ticket.priority = priority || ticket.priority;
        ticket.status = status || ticket.status;
        ticket.department = department || ticket.department;

        await ticket.save();

        res.status(200).json({ msg: 'Ticket updated successfully', ticket });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

//deleteTicket
exports.deleteTicket = async (req, res) => {
    const { id } = req.params;

    try {
        const ticket = await Ticket.findById(id);

        // Checks if the ticket exists and belongs to the user
        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        if (ticket.user.toString() !== req.user.id) {
            return res.status(403).json({ msg: 'Unauthorized to delete this ticket' });
        }

        await ticket.remove();

        res.status(200).json({ msg: 'Ticket deleted successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


// add Ticket
exports.addTicket = async (req, res) => {
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


//getTicket by id
exports.getTicketById = async (req, res) => {
    try {
        const ticket = await Ticket.findById(req.params.id).populate('department', 'name');

        if (!ticket || ticket.user.toString() !== req.user.id) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        res.status(200).json(ticket);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

//assignTicket
exports.assignTicket = async (req, res) => {
    const { id } = req.params;
    const { assignedTo } = req.body; 

    try {
        const ticket = await Ticket.findById(id);

        if (!ticket) {
            return res.status(404).json({ msg: 'Ticket not found' });
        }

        ticket.assignedTo = assignedTo;
        await ticket.save();

        res.status(200).json({ msg: 'Ticket assigned successfully', ticket });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


//mergeTicket
exports.mergeTickets = async (req, res) => {
    const { ticketIds, targetTicketId } = req.body; 

    try {
        const targetTicket = await Ticket.findById(targetTicketId);

        if (!targetTicket) {
            return res.status(404).json({ msg: 'Target ticket not found' });
        }

        // Merging tickets into the target ticket
        await Ticket.updateMany(
            { _id: { $in: ticketIds } },
            { $set: { mergedInto: targetTicketId, status: 'Merged' } }
        );

        res.status(200).json({ msg: 'Tickets merged successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};

//filterTicket
exports.filterTickets = async (req, res) => {
    const { priority, status } = req.query;

    try {
        const filters = {};
        if (priority) filters.priority = priority;
        if (status) filters.status = status;

        const tickets = await Ticket.find({ user: req.user.id, ...filters }).sort({ dueDate: 1 });

        res.status(200).json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};


//getTicket
exports.getTickets = async (req, res) => {
    try {
        const tickets = await Ticket.find({ user: req.user.id }).populate('department', 'name');
        res.status(200).json(tickets);
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
};



