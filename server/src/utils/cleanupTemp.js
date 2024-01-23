const fs = require('fs');
const path = require('path');

function cleanFolder(folderPath = path.join(__dirname, '../../tmp')) {
  try {
    if (!fs.existsSync(folderPath)) {
      console.log(`Folder does not exist: ${folderPath}`);
      return;
    }
    const files = fs.readdirSync(folderPath);
    for (const file of files) {
      const filePath = path.join(folderPath, file);
      const stats = fs.statSync(filePath);
      if (stats.isFile()) {
        fs.unlinkSync(filePath);
      } else if (stats.isDirectory()) {
        cleanFolder(filePath);
        fs.rmdirSync(filePath);
      }
    }
    console.log(`Folder cleaned: ${folderPath}`);
  } catch (error) {
    console.error(`Error cleaning folder: ${error.message}`);
  }
}

module.exports = cleanFolder;
