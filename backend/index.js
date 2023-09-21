const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
dotenv.config();
const app = express();
const port = 3001; // Set your desired port
const authToken = process.env.AUTH_TOKEN;// Replace with your actual authorization token

app.use(express.json());
//test

// Define a common route for GET, POST, and PUT requests to api.public.in
app.all('/:endpoint', async (req, res) => {
  const { endpoint } = req.params;
  const apiUrl = `https://api.harmony-ins.com/${endpoint}`;

  try {
    let response;
    if (req.method === 'GET') {
      response = await axios.get(apiUrl, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else if (req.method === 'POST') {
      response = await axios.post(apiUrl, req.body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else if (req.method === 'PUT') {
      response = await axios.put(apiUrl, req.body, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
    } else {
      return res.status(405).send('Method not allowed');
    }

    res.status(response.status).json(response.data);
  } catch (error) {
    if (error.response) {
      res.status(error.response.status).json(error.response.data);
    } else {
      res.status(500).json({ error: 'Internal server error' });
    }
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
