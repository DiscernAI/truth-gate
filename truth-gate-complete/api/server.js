const express = require('express');
const cors = require('cors');
const { handleGPTRequest } = require('./routeGPT');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/routeGPT', async (req, res) => {
  try {
    const { input, userId, persona } = req.body;
    const result = await handleGPTRequest(userId, input, persona);
    res.json(result);
  } catch (err) {
    console.error('Error in /api/routeGPT:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚪 Truth Gate listening on port ${PORT}`);
});
