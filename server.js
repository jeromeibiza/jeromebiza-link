const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());
app.use(express.static(__dirname));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.get('/admin/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

app.get('/api/links', (req, res) => {
  const links = JSON.parse(fs.readFileSync(path.join(__dirname, 'links.json')));
  res.json(links);
});

app.post('/api/update', (req, res) => {
  fs.writeFileSync(path.join(__dirname, 'links.json'), JSON.stringify(req.body));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("✅ Serveur lancé sur http://localhost:3000"));
