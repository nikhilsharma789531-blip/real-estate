const Contact = require('../models/Contact');
const { getIsConnected, memoryStore } = require('../config/db');

// @desc    Submit contact message
// @route   POST /api/contact
// @access  Public
const createContact = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !subject || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide all fields: name, email, subject, and message',
      });
    }

    if (getIsConnected()) {
      const contact = await Contact.create({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
      });

      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. A HOMORA luxury property advisor will contact you within 24 hours.',
        data: contact,
      });
    } else {
      const contact = {
        _id: 'contact_' + Date.now(),
        name: name.trim(),
        email: email.trim().toLowerCase(),
        subject: subject.trim(),
        message: message.trim(),
        createdAt: new Date(),
      };

      memoryStore.contacts.push(contact);

      return res.status(201).json({
        success: true,
        message: 'Your inquiry has been received. A HOMORA luxury property advisor will contact you within 24 hours.',
        data: contact,
      });
    }
  } catch (err) {
    next(err);
  }
};

module.exports = {
  createContact,
};
