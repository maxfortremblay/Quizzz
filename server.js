const express = require('express');
const path = require('path');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

// Middleware
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Une seule route principale pour la SPA
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/index.html'));
});

// Gestion des parties
const gameRooms = new Map();

// Fonction utilitaire pour générer un code de salle unique
function generateRoomCode() {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
}

// WebSocket
io.on('connection', (socket) => {
    console.log('Nouvelle connexion:', socket.id);

    // Créer une partie
    socket.on('create-game', () => {
        const roomCode = generateRoomCode();
        gameRooms.set(roomCode, {
            host: socket.id,
            players: new Map(),
            status: 'waiting',
            currentQuestion: -1,
            scores: new Map()
        });
        
        socket.join(roomCode);
        socket.emit('game-created', { roomCode });
    });

    // Rejoindre une partie
    socket.on('join-game', ({ code, playerName }) => {
        const room = gameRooms.get(code);
        if (room && room.status === 'waiting') {
            room.players.set(socket.id, {
                id: socket.id,
                name: playerName,
                score: 0
            });
            socket.join(code);
            io.to(code).emit('player-joined', {
                players: Array.from(room.players.values())
            });
        } else {
            socket.emit('error', { message: 'Impossible de rejoindre la partie' });
        }
    });

    // Démarrer la partie
    socket.on('start-game', (code) => {
        const room = gameRooms.get(code);
        if (room && room.host === socket.id) {
            room.status = 'playing';
            room.currentQuestion = 0;
            io.to(code).emit('game-started');
        } else {
            socket.emit('error', { message: 'Vous n\'êtes pas autorisé à démarrer cette partie' });
        }
    });

    // Soumettre une réponse
    socket.on('submit-answer', ({ code, answer }) => {
        const room = gameRooms.get(code);
        if (room && room.status === 'playing') {
            const player = room.players.get(socket.id);
            if (player) {
                // Logique pour vérifier la réponse et mettre à jour le score
                const isCorrect = checkAnswer(room.currentQuestion, answer);
                if (isCorrect) {
                    player.score += 100;
                }
                io.to(code).emit('answer-submitted', {
                    playerId: socket.id,
                    correct: isCorrect,
                    players: Array.from(room.players.values())
                });
            }
        }
    });

    // Déconnexion
    socket.on('disconnect', () => {
        console.log('Client déconnecté:', socket.id);
        gameRooms.forEach((room, code) => {
            if (room.host === socket.id) {
                io.to(code).emit('game-ended', { reason: 'hôte déconnecté' });
                gameRooms.delete(code);
            } else if (room.players.has(socket.id)) {
                room.players.delete(socket.id);
                io.to(code).emit('player-left', {
                    playerId: socket.id,
                    players: Array.from(room.players.values())
                });
            }
        });
    });
});

// Fonction utilitaire pour vérifier la réponse (à implémenter)
function checkAnswer(questionIndex, answer) {
    // Logique pour vérifier la réponse
    return true; // Exemple : toujours correct
}

// Démarrer le serveur
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Serveur démarré sur le port ${PORT}`);
});