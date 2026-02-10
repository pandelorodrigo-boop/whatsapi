app.get('/', (req, res) => {
  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  console.log('MODE:', mode);
  console.log('TOKEN:', token);
  console.log('ENV TOKEN:', process.env.VERIFY_TOKEN);

  if (mode === 'subscribe' && token === process.env.VERIFY_TOKEN) {
    console.log('WEBHOOK VERIFIED');
    return res.status(200).send(challenge);
  }

  return res.status(403).send('Forbidden');
});
