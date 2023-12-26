// index.js
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const kidRoutes = require('./routes/kids');
const path = require('path'); // Import the 'path' module

dotenv.config();
const app = express();

app.use(express.json());
app.use(express.static(path.join(__dirname, 'frontend'))); // Serve static files from the 'frontend' folder

mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.error('Error connecting to MongoDB:', err));

app.use('/kids', kidRoutes);

// Serve the index.html file for the root URL
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
