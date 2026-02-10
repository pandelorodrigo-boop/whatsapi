import express from 'express';

const app = express();
app.use(express.json());

const VERIFY_TOKEN = process.env.VERIFY_TOKEN || 'vibecode';

/* ======================
   VERIFICACIÓN WEBHOOK
====================== */
app.get('/webhook', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('QUERY:', req.query);

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Webhook verificado');
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
});

/* ======================
   MENSAJES ENTRANTES
====================== */
app.post('/webhook', (req, res) => {
  console.log('INCOMING:', JSON.stringify(req.body, null, 2));
  res.sendStatus(200);
});

/* ======================
   ROOT (opcional)
====================== */
app.get('/', (req, res) => {
  res.send('WhatsApp Webhook OK');
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
