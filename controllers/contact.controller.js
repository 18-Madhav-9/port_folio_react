const { sendContactEmail } = require('../services/email.service');

const isValidEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

const handleContactSubmit = async (req, res) => {
  try {
    const name = req.body?.name?.trim();
    const email = req.body?.email?.trim();
    const message = req.body?.message?.trim();

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'All fields are required' });
    }

    if (!isValidEmail(email)) {
      return res.status(400).json({ error: 'Please enter a valid email address' });
    }

    await sendContactEmail({ name, email, message });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error('Contact form error:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
};

module.exports = { handleContactSubmit };