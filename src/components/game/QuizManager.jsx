import React, { useState, useEffect } from 'react';
import GameView from '../../views/GameView';

const QuizManager = ({ webSocket }) => {
  const [gameState, setGameState] = useState({
    currentQuestion: null,
    timeLeft: 30,
    score: 0,
    isGameOver: false
  });

  useEffect(() => {
    webSocket.on('question', (data) => {
      setGameState(prev => ({
        ...prev,
        currentQuestion: data.question,
        timeLeft: 30
      }));
    });

    webSocket.on('time-update', (data) => {
      setGameState(prev => ({
        ...prev,
        timeLeft: data.timeLeft
      }));
    });

    webSocket.on('game-over', (data) => {
      setGameState(prev => ({
        ...prev,
        isGameOver: true,
        finalScores: data.scores
      }));
    });

    return () => {
      webSocket.off('question');
      webSocket.off('time-update');
      webSocket.off('game-over');
    };
  }, [webSocket]);

  const handleAnswer = (answer) => {
    webSocket.emit('submit-answer', {
      answer,
      timeLeft: gameState.timeLeft
    });
  };

  return <GameView {...gameState} onAnswer={handleAnswer} />;
};

export default QuizManager;