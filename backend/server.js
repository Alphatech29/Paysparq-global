const express = require('express');
const dotenv = require('dotenv');
const path = require('path'); 
const cors = require('cors');


dotenv.config();

const app = express();

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173/', 
  credentials: true,
};

// Apply middleware
app.use(cors(corsOptions));
app.use(express.json()); 

// Serve static files for production
if (process.env.NODE_ENV === 'production') {
  const rootDir = path.resolve(__dirname, 'client', 'dist'); 
  app.use(express.static(rootDir));

  app.get('*', (req, res) => {
    res.sendFile(path.join(rootDir, 'index.html'));
  });
}

// Define routes
app.get('/api', (req, res) => {
  res.json({ message: 'API is working!' });
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server connected on port ${PORT}`);
});
