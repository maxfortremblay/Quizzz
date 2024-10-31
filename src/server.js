const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Définir le dossier des fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

// Route pour la page d'attente
app.get('/waiting', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/waiting.html'));
});

// Route pour la page des questions
app.get('/question', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/question.html'));
});

// Route pour la page du classement
app.get('/ranking', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/ranking.html'));
});

// Route pour la page des résultats finaux
app.get('/final-results', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/final-results.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});