const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const app = express();
const port = 3000;

app.use(cors()); // This line is necessary to accept requests from your front-end
app.use(express.json()); // This line is necessary to parse JSON bodies from incoming requests

const users = []; // This array will store our users for now

app.post('/register', async (req, res) => {
  const { email, password, userType } = req.body;

  // Check if the user already exists
  const existingUser = users.find(user => user.email === email);
  if (existingUser) {
    return res.status(400).send('User already exists');
  }

  // Hash the password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create the user
  const user = { email, password: hashedPassword, userType };
  users.push(user);

  // Create a JWT
  const token = jwt.sign({ email }, 'secret');

  res.send({ message: 'User registered successfully', token });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});
