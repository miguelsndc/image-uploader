require('dotenv').config();

const express = require('express');
const cors = require('cors');
const {
  multerUpload,
  requestBufferToDataUrl,
} = require('./middlewares/multer');
const { cloudinaryConfig, uploader } = require('./config/cloudinary');
const port = process.env.PORT || 3333;

const app = express();

app.use(express.json());
app.use(cors());

app.get('/', (_, res) =>
  res.json({ message: 'Use /upload endpoint to upload new images!' })
);

app.post('/upload', cloudinaryConfig, multerUpload, async (req, res) => {
  if (!req.file) return res.status(400).json({ message: 'No file was given.' });

  const file = requestBufferToDataUrl(req).content;

  try {
    const result = await uploader.upload(file, {
      allowed_formats: ['jpg', 'png', 'jpeg', 'webp', 'svg'],
      folder: 'devchallenges/image-uploader',
      use_filename: true,
    });

    return res.json({
      url: result.secure_url,
    });
  } catch (error) {
    return res.status(500).json({
      message: 'Something went wrong with your upload, try again.',
      error,
    });
  }
});

app.listen(port, () => {
  console.log(`Server running at port ${port}`);
});
