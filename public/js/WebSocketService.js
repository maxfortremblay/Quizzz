class WebSocketService {
  constructor() {
    this.connected = false;
    this.handlers = new Map();
    this.connectionIndicator = document.querySelector('.connection-indicator');
    this.init();
  }

  init() {
    // Simulate connection
    setTimeout(() => {
      this.connected = true;
      this.updateConnectionStatus();
      this.emit('connected', { status: 'Connected successfully' });
    }, 1000);
  }

  updateConnectionStatus() {
    this.connectionIndicator?.classList.toggle('error', !this.connected);
    const statusText = document.querySelector('.connection-text');
    if (statusText) {
      statusText.textContent = this.connected ? 'Connecté' : 'Déconnecté';
    }
  }

  on(event, handler) {
    if (!this.handlers.has(event)) {
      this.handlers.set(event, new Set());
    }
    this.handlers.get(event).add(handler);
  }

  emit(event, data) {
    if (this.handlers.has(event)) {
      this.handlers.get(event).forEach(handler => handler(data));
    }
  }
}