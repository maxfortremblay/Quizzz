const express = require('express');
const app = express();
const path = require('path');

// Définir le dossier public pour les fichiers statiques
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});

import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'; // Ensure you have an App component

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') // Ensure you have an element with id 'root' in your HTML
);

document.addEventListener('DOMContentLoaded', () => {
    console.log('Page d\'accueil chargée');
    document.getElementById('startQuizButton').addEventListener('click', () => {
        window.location.href = '/quiz';
    });

    document.getElementById('viewRulesButton').addEventListener('click', () => {
        window.location.href = '/rules';
    });
});