const fs = require('fs').promises;
const path = require('path');

const dataFilePath = path.join(__dirname, '../data/certificates.data.js');

const getCertificates = async () => {
  try {

    const fileData = await fs.readFile(dataFilePath, 'utf-8');

    return JSON.parse(fileData);
  } catch (error) {

    console.error('Error reading certificates data:', error);
    throw new Error('Could not fetch certificates data from database.');
  }
};

module.exports = {
  getCertificates,
};