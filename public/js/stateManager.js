class StateManager {
  constructor() {
    this.currentState = 'initial';
  }

  async transitionTo(newState) {
    console.log(`Transitioning from ${this.currentState} to ${newState}`);
    this.currentState = newState;
    // Ajoutez ici la logique pour gérer les transitions d'état
  }

  async canTransitionTo(newState) {
    // Ajoutez ici la logique pour vérifier si la transition est possible
    return true;
  }
}

const stateManager = new StateManager();
