const express = require('express');
const fetch = require('node-fetch');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_ENDPOINT = process.env.ELEVENLABS_ENDPOINT;

app.post('/generate', async (req, res) => {
  const { text } = req.body;
  try {
    const response = await fetch(ELEVENLABS_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY
      },
      body: JSON.stringify({ text })
    });
    const data = await response.json();
    res.json({ audio_url: data.audio_url });
  } catch (err) {
    res.status(500).json({ error: 'Errore nella generazione audio' });
  }
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server in ascolto sulla porta ${port}`));
