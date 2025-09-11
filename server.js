const express = require('express');
const path = require('path');
const app = express();

// Security headers
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Serve static files from the Angular app build directory
app.use(express.static(path.join(__dirname, 'dist/signal-store/browser'), {
  maxAge: '1d', // Cache static files for 1 day
  etag: true
}));

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'OK',
    timestamp: new Date().toISOString(),
    app: 'Signal Store',
    version: '1.0.0',
    environment: process.env.NODE_ENV || 'production'
  });
});

// Handle Angular routing - send all requests to index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist/signal-store/browser/index.html'));
});

// Get port from environment variable or default to 3000
const port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log(`🚀 Signal Store running on port ${port}`);
  console.log(`📱 Environment: ${process.env.NODE_ENV || 'production'}`);
  console.log(`🌐 App URL: https://safe-badlands-13809-36f482292172.herokuapp.com`);
  console.log(`🔗 Health check: https://safe-badlands-13809-36f482292172.herokuapp.com/health`);
});
