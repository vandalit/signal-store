const express = require('express');
const path = require('path');
const app = express();

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, 'dist/signal-store')));

// Handle Angular routing - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/signal-store/index.html'));
});

// Get port from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Signal Store running on port ${port}`);
  console.log(`📱 Access the app at: http://localhost:${port}`);
});
