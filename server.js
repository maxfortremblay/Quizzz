const express = require('express');
const app = express();
const path = require('path');

// Définir le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

// Routes pour les fichiers HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/index.html'));
});

app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/quiz.html'));
});

app.get('/score', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/views/score.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
