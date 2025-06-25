const express = require('express');
const multer = require('multer'); // For handling file uploads

const app = express();
const port = 5173; // Choose the port for your backend server

// Set up multer storage configuration
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads'); // Directory where uploaded files will be stored
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname); // Rename uploaded file with a unique name
  }
});

const upload = multer({ storage: storage });

// Endpoint to handle regular picture upload
app.post('/api/upload-picture', upload.single('picture'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }

  // You can perform additional logic here if needed

  res.status(200).send('Picture uploaded successfully.');
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost: ${port}`);
});