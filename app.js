const express = require('express');
const app = express();

app.get('/', (req, res) => {
  console.log('QUERY:', req.query);
  res.status(200).json(req.query);
});

const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Listening on port ${PORT}`);
});
