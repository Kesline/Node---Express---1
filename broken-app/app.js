const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Route for handling POST requests to /
app.post('/', async (req, res) => {
  try {
    const developers = req.body.developers;

    if (!developers || !Array.isArray(developers)) {
      return res.status(400).json({ error: 'Invalid input. Please provide an array of developers.' });
    }

    const result = await Promise.all(developers.map(async (username) => {
      const user = await getUserInfo(username);
      return { name: user.name, bio: user.bio };
    }));

    res.json(result);
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).json({ error: 'Internal server error.' });
  }
});

// Function to get user information from GitHub API
async function getUserInfo(username) {
  const response = await axios.get(`https://api.github.com/users/${username}`);
  return { name: response.data.name, bio: response.data.bio };
}

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
