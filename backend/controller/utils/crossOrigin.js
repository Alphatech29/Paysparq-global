// corsConfig.js
const os = require('os');

// Function to get the server's IP address dynamically
function getServerIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; // Return the first external IPv4 address
      }
    }
  }
  return '127.0.0.1'; // Fallback for localhost
}

// CORS options
const corsOptions = {
  origin: (origin, callback) => {
    // Get the server IP dynamically
    const serverIP = getServerIP();

    // Allowed origins (includes dynamic host)
    const allowedOrigins = [
      `http://${serverIP}`,              // Server IP for HTTP
      `https://${serverIP}`,             // Server IP for HTTPS
      'http://localhost:5173',           // Local development
    ];

    // Allow current request origin if matches the live domain or server IP
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); // Request allowed
    } else {
      callback(new Error(`CORS Error: Origin ${origin} not allowed`)); // Block
    }
  },
  credentials: true, // Allow cookies and auth headers
};

module.exports = corsOptions;
