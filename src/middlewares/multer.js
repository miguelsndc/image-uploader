const multer = require('multer');
const path = require('path');
const DataURIParser = require('datauri/parser');

const storage = multer.memoryStorage();

const multerUpload = multer({
  storage,
  limits: {
    fileSize: 1024 * 1024 * 2,
  },
}).single('image');

const parser = new DataURIParser();

const requestBufferToDataUrl = req =>
  parser.format(
    path.extname(req.file.originalname).toString(),
    req.file.buffer
  );

module.exports = { multerUpload, requestBufferToDataUrl };
