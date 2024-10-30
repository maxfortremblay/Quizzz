```javascript
const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Définir le dossier des fichiers statiques
app.use(express.static(path.join(__dirname, '../public')));

// Route pour la page d'accueil
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Route pour la page du quiz
app.get('/quiz', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/quiz.html'));
});

// Route pour la page des scores
app.get('/score', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/score.html'));
});

app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});
```