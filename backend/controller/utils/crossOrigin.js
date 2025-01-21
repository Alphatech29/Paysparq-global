const os = require('os');

// Function to get the server's IP address dynamically
function getServerIP() {
  const interfaces = os.networkInterfaces();
  for (const name of Object.keys(interfaces)) {
    for (const iface of interfaces[name]) {
      if (iface.family === 'IPv4' && !iface.internal) {
        return iface.address; 
      }
    }
  }
  return '127.0.0.1'; 
}

const corsOptions = {
  origin: (origin, callback) => {
    const serverIP = getServerIP();

    const allowedOrigins = [
      `http://${serverIP}`,             
      `https://${serverIP}`,             
      'http://localhost:5173',          
    ];

    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true); 
    } else {
      callback(new Error(`CORS Error: Origin ${origin} not allowed`)); 
    }
  },
  credentials: true, 
};

module.exports = corsOptions;
