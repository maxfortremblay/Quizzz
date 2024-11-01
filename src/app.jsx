import React, { useState, useEffect } from 'react';
import HomeView from './views/HomeView';
import WaitingView from './views/WaitingView';
import GameView from './views/GameView';
import FinalView from './views/FinalView';
import QuizManager from './components/game/QuizManager';
import WebSocketService from './services/WebSocketService';

const App = () => {
  const [currentView, setCurrentView] = useState('home');
  const [gameState, setGameState] = useState({
    roomCode: null,
    players: [],
    isHost: false,
    scores: []
  });

  const wsService = new WebSocketService();

  useEffect(() => {
    wsService.connect();

    wsService.on('game-created', (data) => {
      setGameState(prev => ({ ...prev, roomCode: data.roomCode }));
      setCurrentView('waiting');
    });

    wsService.on('player-joined', (data) => {
      setGameState(prev => ({ ...prev, players: data.players }));
    });

    wsService.on('game-started', () => {
      setCurrentView('game');
    });

    wsService.on('game-stopped', (data) => {
      setGameState(prev => ({ ...prev, scores: data.scores }));
      setCurrentView('final');
    });

    return () => {
      wsService.disconnect();
    };
  }, []);

  const handleCreateGame = () => {
    wsService.createRoom();
    setGameState(prev => ({ ...prev, isHost: true }));
  };

  const handleJoinGame = ({ playerName, gameCode }) => {
    wsService.joinRoom(gameCode, playerName);
  };

  const handleStopGame = () => {
    wsService.emit('stop-game');
    setCurrentView('final');
  };

  const handleRestartGame = () => {
    setGameState({
      roomCode: null,
      players: [],
      isHost: false,
      scores: []
    });
    setCurrentView('home');
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return (
          <HomeView 
            onCreateGame={handleCreateGame}
            onJoinGame={handleJoinGame}
          />
        );
      case 'waiting':
        return (
          <WaitingView 
            {...gameState}
            onStartGame={() => wsService.emit('start-game')}
            onStopGame={handleStopGame}
          />
        );
      case 'game':
        return <QuizManager webSocket={wsService} />;
      case 'final':
        return (
          <FinalView
            scores={gameState.scores}
            roomCode={gameState.roomCode}
            onPlayAgain={handleRestartGame}
            onBackToHome={handleRestartGame}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="app">
      {renderView()}
    </div>
  );
};

export default App;