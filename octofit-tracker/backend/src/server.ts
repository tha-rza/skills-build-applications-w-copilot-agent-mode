import express = require('express');

const app = express();
const port = process.env.PORT || 8000;

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', service: 'octofit-backend' });
});

app.listen(port, () => {
  console.log(`Backend listening on port ${port}`);
});
