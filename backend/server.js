const express = require('express');
const dotenv = require('dotenv');
const path = require('path');
const cors = require('cors');
const bodyParser = require("body-parser");
const apiRoutes = require('./routes/router'); 


dotenv.config();

const app = express();

// CORS configuration
app.use(cors());


// Apply middleware
app.use(express.json());
app.use(bodyParser.json());

// Define routes
app.use('/api', apiRoutes);

// Serve frontend files
const rootDir = path.resolve(__dirname, 'clients', 'dist');
app.use(express.static(rootDir));

app.get('*', (req, res) => {
  if (!req.url.startsWith('/api')) {
    res.sendFile(path.join(rootDir, 'index.html'));
  }
});

// Error handling
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send({ message: 'Something went wrong!' });
});
// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
