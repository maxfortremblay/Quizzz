import React, { useState, useEffect } from 'react';
import GameView from '../../views/GameView';

const QuizManager = ({ webSocket }) => {
  const [gameState, setGameState] = useState({
    currentQuestion: null,
    timeLeft: 30,
    score: 0,
    isGameOver: false,
    buzzerState: {
      isEnabled: false,
      activePlayer: null,
      timestamp: null
    },
    timer: {
      duration: 30,
      remaining: 30,
      isActive: false
    }
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

    webSocket.on('buzzer:pressed', (data) => {
      setGameState(prev => ({
        ...prev,
        buzzerState: {
          isEnabled: false,
          activePlayer: data.playerId,
          timestamp: data.timestamp
        }
      }));
    });

    webSocket.on('timer:start', (data) => {
      setGameState(prev => ({
        ...prev,
        timer: {
          duration: data.duration,
          remaining: data.duration,
          isActive: true
        }
      }));
      startTimer();
    });

    webSocket.on('timer:complete', () => {
      setGameState(prev => ({
        ...prev,
        timer: {
          ...prev.timer,
          isActive: false
        }
      }));
    });

    return () => {
      webSocket.off('question');
      webSocket.off('time-update');
      webSocket.off('game-over');
      webSocket.off('buzzer:pressed');
      webSocket.off('timer:start');
      webSocket.off('timer:complete');
    };
  }, [webSocket]);

  const handleAnswer = (answer) => {
    webSocket.emit('submit-answer', {
      answer,
      timeLeft: gameState.timeLeft
    });
  };

  const handleBuzzerPress = (playerId) => {
    if (gameState.buzzerState.isEnabled) {
      webSocket.emit('buzzer:press', {
        playerId,
        timestamp: Date.now()
      });
    }
  };

  const startTimer = () => {
    const timerInterval = setInterval(() => {
      setGameState(prev => {
        if (prev.timer.remaining <= 1) {
          clearInterval(timerInterval);
          webSocket.emit('timer:complete');
          return {
            ...prev,
            timer: {
              ...prev.timer,
              remaining: 0,
              isActive: false
            }
          };
        }
        return {
          ...prev,
          timer: {
            ...prev.timer,
            remaining: prev.timer.remaining - 1
          }
        };
      });
    }, 1000);
  };

  const stopTimer = () => {
    setGameState(prev => ({
      ...prev,
      timer: {
        ...prev.timer,
        isActive: false
      }
    }));
  };

  const resetBuzzerState = () => {
    setGameState(prev => ({
      ...prev,
      buzzerState: {
        isEnabled: true,
        activePlayer: null,
        timestamp: null
      }
    }));
  };

  return <GameView {...gameState} onAnswer={handleAnswer} onBuzzerPress={handleBuzzerPress} />;
};

export default QuizManager;