class GameManager {
  constructor() {
    this.currentView = null;
    this.quizData = [];
    this.webSocketService = new WebSocketService();
    this.init();
  }

  init() {
    this.showView('home-view');
    this.bindEvents();
  }

  showView(viewId) {
    const views = document.querySelectorAll('.view');
    views.forEach(view => view.classList.remove('active'));
    const activeView = document.getElementById(viewId);
    if (activeView) {
      activeView.classList.add('active');
    }
  }

  bindEvents() {
    document.getElementById('createGameBtn').addEventListener('click', () => {
      this.webSocketService.emit('create-game');
    });

    document.getElementById('joinGameBtn').addEventListener('click', () => {
      const gameCode = document.getElementById('gameCodeInput').value;
      const playerName = document.getElementById('playerNameInput').value;
      this.webSocketService.emit('join-game', { code: gameCode, playerName });
    });

    this.webSocketService.on('game-created', (data) => {
      document.getElementById('roomCode').textContent = `Code de la partie : ${data.roomCode}`;
      this.showView('waiting-view');
    });

    this.webSocketService.on('player-joined', (data) => {
      const playersList = document.getElementById('playersList');
      playersList.innerHTML = '';
      data.players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.textContent = player.name;
        playersList.appendChild(playerItem);
      });
    });

    this.webSocketService.on('game-started', () => {
      this.showView('question-view');
    });

    this.webSocketService.on('answer-submitted', (data) => {
      // Logique pour gérer la réponse soumise
    });

    this.webSocketService.on('game-ended', (data) => {
      this.showView('final-view');
      const podium = document.getElementById('podium');
      podium.innerHTML = '';
      data.players.forEach(player => {
        const playerItem = document.createElement('div');
        playerItem.textContent = `${player.name} : ${player.score} points`;
        podium.appendChild(playerItem);
      });
    });
  }
}

document.addEventListener('DOMContentLoaded', () => {
  new GameManager();
});