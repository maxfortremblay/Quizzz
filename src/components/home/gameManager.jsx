import React, { useState, useEffect } from 'react';
import WebSocketService from '../../services/WebSocketService';

const GameManager = () => {
  const [currentView, setCurrentView] = useState('home');
  const [gameState, setGameState] = useState({
    roomCode: null,
    players: [],
    isHost: false
  });

  const webSocket = new WebSocketService();

  useEffect(() => {
    webSocket.connect();

    webSocket.on('game-created', (data) => {
      setGameState(prev => ({ ...prev, roomCode: data.roomCode }));
      setCurrentView('waiting');
    });

    webSocket.on('player-joined', (data) => {
      setGameState(prev => ({ ...prev, players: data.players }));
    });

    webSocket.on('game-started', () => {
      setCurrentView('game');
    });

    return () => {
      webSocket.disconnect();
    };
  }, []);

  const handleCreateGame = () => {
    webSocket.createRoom();
    setGameState(prev => ({ ...prev, isHost: true }));
  };

  const handleJoinGame = ({ playerName, gameCode }) => {
    webSocket.joinRoom(gameCode, playerName);
  };

  const handleStopGame = () => {
    webSocket.emit('stop-game');
    setCurrentView('final');
  };

  const handleRestartGame = () => {
    setGameState({
      roomCode: null,
      players: [],
      isHost: false
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
            onStartGame={() => webSocket.emit('start-game')}
            onStopGame={handleStopGame}
          />
        );
      case 'game':
        return <QuizManager webSocket={webSocket} />;
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

export default GameManager;