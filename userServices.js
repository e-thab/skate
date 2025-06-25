// Import modules
import express from 'express';
import db from './src/assets/database.js';

// Create Express application
const app = express();
// Parse JSON request bodies
app.use(express.json());

// Handle POST request to create-account endpoint
app.post('/api/create-account', (req, res) => {
  // log tje request body
  console.log('Request body: ' , req.body);

  const { email, password } = req.body;

  // Example: Insert new user into users table
  const insertUserQuery = `
    INSERT INTO users (email, password) VALUES (?, ?)
  `;
  try {
    // Execute the query
    db.prepare(insertUserQuery).run(email, password);
    // Respond with success message
    res.status(200).json({ message: 'Account created successfully' });
  } catch (error) {
    // If an error occurs, respond with error message
    console.error('Error creating account:', error);
    res.status(500).json({ message: 'Error creating account. Please try again.' });
  }
});

// Handle POST request to login endpoint
app.post('/api/login', (req, res) => {
  // log the request body
  console.log('Login Request:', req.body);

  const { email, password } = req.body;

  // Query the database to check if user exist
  const userQuery = ' SELECT * FROM users WHERE email = ? AND password = ? ';
  const user = db.prepare(userQuery).get(email, password);

  if (user) {
    // User exists and password is correct
    res.status(200).json({ message: 'Login successful', user });
  }else {
    // User does not exist or password is incorrect
    res.status(401).json({ message: 'Invalid email or password'})
  }
});

export default app;
