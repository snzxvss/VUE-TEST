const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const cors = require('cors');

const app = express();
const port = 3000;

const videoDir = 'D:/VIDEOS';

// Habilitar CORS
app.use(cors());

// Crear el directorio si no existe
if (!fs.existsSync(videoDir)) {
  fs.mkdirSync(videoDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, videoDir);
  },
  filename: (req, file, cb) => {
    const randomValue = Math.floor(Math.random() * 10000);
    const newFilename = `VIDEO_${randomValue}${path.extname(file.originalname)}`; // Crear el nuevo nombre de archivo
    cb(null, newFilename);
  },
});

const upload = multer({ storage });

app.post('/upload', upload.single('video'), (req, res) => {
  res.json({ message: 'Video uploaded successfully!' });
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});