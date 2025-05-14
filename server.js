const express = require('express');
const fs = require('fs');
const path = require('path');
const basicAuth = require('express-basic-auth'); // Protection admin

const app = express();
app.use(express.json());

// 🔐 Protection par mot de passe sur le dashboard admin
app.use('/admin', basicAuth({
  users: { 'admin': 'carte' }, // 🔑 identifiant = admin | mot de passe = carte
  challenge: true,
  unauthorizedResponse: '⛔ Accès refusé. Mot de passe incorrect.'
}));

// 🧱 Fichiers statiques
app.use(express.static(__dirname));

// 🏠 Page principale
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// 🛠 Page dashboard admin (protégée)
app.get('/admin/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'dashboard.html'));
});

// 🔗 API : Récupère les liens
app.get('/api/links', (req, res) => {
  const links = JSON.parse(fs.readFileSync(path.join(__dirname, 'links.json')));
  res.json(links);
});

// ✅ API : Met à jour les liens
app.post('/api/update', (req, res) => {
  fs.writeFileSync(path.join(__dirname, 'links.json'), JSON.stringify(req.body));
  res.sendStatus(200);
});

// 🚀 Lancement du serveur
app.listen(3000, () => console.log("✅ Serveur lancé sur http://localhost:3000"));
