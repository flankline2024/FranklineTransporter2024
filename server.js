const express = require('express');
const path = require('path');

// Create an Express app
const app = express();

// Set up the server to serve static files (like CSS, images, and JavaScript)
app.use(express.static(path.join(__dirname, 'public')));

// Set the view engine (if you're using dynamic views, such as EJS)
app.set('view engine', 'ejs');

// Serve the main page when the user visits the root URL
app.get('/', (req, res) => {
  res.render('index');  // renders index.ejs
});

// Optionally, you can create more routes for different pages like About, Pricing, etc.
app.get('/about', (req, res) => {
  res.render('about');  // renders about.ejs
});

// Set up the server to listen on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
