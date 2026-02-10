const express = require('express');
const app = express();

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'vibecode';

app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    return res.status(200).send(challenge); // TEXTO PLANO
  }

  return res.sendStatus(403);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
