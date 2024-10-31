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

document.addEventListener('DOMContentLoaded', () => {
    console.log('Page d'accueil chargée');
    document.getElementById('startQuizButton').addEventListener('click', () => {
        window.location.href = '/quiz';
    });

    document.getElementById('viewRulesButton').addEventListener('click', () => {
        window.location.href = '/rules';
    });

    const loginForm = document.getElementById('loginForm');
    const loginButton = document.getElementById('loginButton');
    const emailError = document.getElementById('emailError');
    const passwordError = document.getElementById('passwordError');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        loginButton.disabled = true;
        loginButton.classList.add('loading');

        const email = loginForm.email.value;
        const password = loginForm.password.value;

        try {
            const response = await axios.post('/api/auth/login', { email, password });
            if (response.data.success) {
                window.location.href = '/dashboard';
            } else {
                emailError.textContent = response.data.message;
                emailError.classList.add('active');
            }
        } catch (error) {
            emailError.textContent = 'Erreur de connexion';
            emailError.classList.add('active');
        } finally {
            loginButton.disabled = false;
            loginButton.classList.remove('loading');
        }
    });
});