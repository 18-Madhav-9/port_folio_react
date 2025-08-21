const certificateService = require('../services/certificate.service');

const fetchAllCertificates = async (req, res) => {
  try {

    const certificates = await certificateService.getCertificates();

    res.status(200).json(certificates);
  } catch (error) {

    res.status(500).json({
      success: false,
      message: 'Failed to retrieve certificates.',
      error: error.message
    });
  }
};

module.exports = {
  fetchAllCertificates,
};