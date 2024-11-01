import { io } from 'socket.io-client';

class WebSocketService {
  constructor() {
    this.socket = null;
    this.clientId = process.env.QUIZZ_PARTY_CLIENT_ID;
    this.eventHandlers = new Map();
  }

  async connect() {
    try {
      this.socket = io({
        auth: {
          clientId: this.clientId
        }
      });

      this.socket.on('connect', () => {
        console.log('Connected to QuizzParty server');
      });

      this.socket.on('error', (error) => {
        console.error('WebSocket error:', error);
      });

      this.initializeGameEvents();
    } catch (error) {
      console.error('Connection error:', error);
    }
  }

  initializeGameEvents() {
    this.socket.on('room:created', (data) => {
      this.emit('room:status', { status: 'created', roomCode: data.roomCode });
    });

    this.socket.on('room:joined', (data) => {
      this.emit('room:status', { status: 'joined', players: data.players });
    });

    this.socket.on('game:question', (data) => {
      this.emit('game:status', { type: 'question', question: data.question, timeLeft: data.timeLimit });
    });

    this.socket.on('game:result', (data) => {
      this.emit('game:status', { type: 'result', correctAnswer: data.correctAnswer, scores: data.scores });
    });
  }

  async createRoom() {
    if (this.socket) {
      this.socket.emit('room:create', { clientId: this.clientId, timestamp: Date.now() });
    }
  }

  async joinRoom(roomCode, playerName) {
    if (this.socket) {
      this.socket.emit('room:join', { roomCode, playerName, clientId: this.clientId, timestamp: Date.now() });
    }
  }

  on(event, callback) {
    if (!this.eventHandlers.has(event)) {
      this.eventHandlers.set(event, []);
    }
    this.eventHandlers.get(event).push(callback);
    this.socket?.on(event, callback);
  }

  off(event, callback) {
    const handlers = this.eventHandlers.get(event);
    if (handlers) {
      const index = handlers.indexOf(callback);
      if (index !== -1) {
        handlers.splice(index, 1);
        this.socket?.off(event, callback);
      }
    }
  }

  emit(event, data) {
    if (this.socket) {
      this.socket.emit(event, { ...data, clientId: this.clientId, timestamp: Date.now() });
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
  }
}

export default WebSocketService;