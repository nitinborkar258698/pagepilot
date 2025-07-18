const express = require('express');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const generatePage = require('./generate');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json({ limit: '10mb' }));
app.use(express.static(path.join(__dirname, '../public')));
app.use(express.static(path.join(__dirname, '../pages')));

app.post('/generate-page', (req, res) => {
  const data = req.body;
  const slug = data.headline.toLowerCase().replace(/[^a-z0-9]/g, '-');
  const pagePath = generatePage(data, slug);
  res.json({ success: true, url: `/pages/${slug}.html` });
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});