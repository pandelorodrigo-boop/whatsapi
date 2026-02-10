const express = require('express');

// Create Express app
const app = express();

// Parse JSON bodies
app.use(express.json());

// Port and verify token
const port = process.env.PORT || 3000;
const verifyToken = process.env.VERIFY_TOKEN;

// Webhook verification (GET)
app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('MODE:', mode);
  console.log('TOKEN:', token);
  console.log('ENV TOKEN:', verifyToken);

  if (mode === 'subscribe' && token === verifyToken) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  }

  return res.status(403).send('Forbidden');
});

// Webhook events (POST)
app.post('/', (req, res) => {
  const timestamp = new Date().toISOString().replace('T', ' ').slice(0, 19);
  console.log(`\nWebhook received ${timestamp}\n`);
  console.log(JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

// Start server
app.li
