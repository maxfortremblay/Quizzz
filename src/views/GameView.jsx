import React, { useState, useEffect } from 'react';
import { Timer, Trophy, AlertCircle, Users } from 'lucide-react';

const QuestionCard = ({ question, onAnswer, timeLeft, hasAnswered }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const timeLeftPercentage = (timeLeft / 30) * 100;

  const handleAnswerSelect = (answer) => {
    if (!hasAnswered) {
      setSelectedAnswer(answer);
      onAnswer(answer);
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      {/* Timer and Question Counter */}
      <div className="flex items-center justify-between mb-6">
        <span className="text-sm text-gray-500">
          Question {question.order}/10
        </span>
        <div className="flex items-center space-x-2">
          <Timer className="w-5 h-5 text-orange-500" />
          <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-500 transition-all duration-1000"
              style={{ width: `${timeLeftPercentage}%` }}
            />
          </div>
          <span className="text-orange-500 font-medium">{timeLeft}s</span>
        </div>
      </div>

      {/* Question */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-800">
          {question.question}
        </h2>

        {/* Media content if any */}
        {question.media && (
          <div className="relative w-full h-64 bg-gray-100 rounded-lg overflow-hidden">
            <img
              src={`/media/images/${question.media}`}
              alt=""
              className="w-full h-full object-cover"
            />
          </div>
        )}

        {/* Answers */}
        <div className="grid grid-cols-1 gap-4">
          {question.answers.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerSelect(answer)}
              disabled={hasAnswered}
              className={`p-4 rounded-lg text-left transition-all ${
                selectedAnswer === answer
                  ? 'bg-purple-100 border-2 border-purple-500'
                  : 'bg-gray-50 border-2 border-transparent hover:bg-gray-100'
              } ${hasAnswered ? 'cursor-not-allowed' : 'cursor-pointer'}`}
            >
              <div className="flex items-center space-x-3">
                <span className="w-8 h-8 flex items-center justify-center rounded-full bg-white border-2 border-gray-200 font-medium text-gray-600">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="flex-1">{answer}</span>
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

import React from 'react';
import { Trophy } from 'lucide-react';
import QuizQuestion from '../components/game/QuizQuestion';

// Ajouter PlayerScores comme composant interne
const PlayerScores = ({ scores }) => (
  <div className="bg-white rounded-lg shadow-md p-4 mt-6">
    <div className="flex items-center space-x-2 mb-4">
      <Trophy className="w-5 h-5 text-yellow-500" />
      <h3 className="font-medium text-gray-700">Classement actuel</h3>
    </div>
    <div className="space-y-2">
      {scores.map((player, index) => (
        <div
          key={player.id}
          className={`p-3 rounded-lg flex items-center justify-between ${
            index === 0 ? 'bg-yellow-50' : 'bg-gray-50'
          }`}
        >
          <span>{player.name}</span>
          <span className="font-medium text-purple-600">{player.score} pts</span>
        </div>
      ))}
    </div>
  </div>
);

import { Score } from '../services/score.js';

const GameView = ({ currentQuestion, onAnswer, timeLeft, score, onBuzzerPress, scores }) => {
  // useEffect pour gérer l'affichage des scores
  useEffect(() => {
    if (scores) {
      Score.displayScores(scores);
    }
  }, [scores]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-4xl mx-auto">
        {/* Score actuel */}
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
          <div className="flex items-center justify-between">
            <h3 className="font-medium text-gray-700">Score</h3>
            <span className="text-2xl font-bold text-purple-600">{score}</span>
          </div>
        </div>

        {/* Question */}
        <QuizQuestion
          question={currentQuestion}
          onAnswer={onAnswer}
          timeLeft={timeLeft}
        />

        {/* Conteneur pour les scores */}
        <div id="score-container" className="mt-6"></div>

        {/* Buzzer conditionnel */}
        {currentQuestion?.type === 'buzzer' && (
          <button 
            onClick={() => onBuzzerPress('playerId')} 
            className="mt-4 w-full bg-purple-600 text-white py-4 rounded-xl font-semibold
              hover:bg-purple-700 transition-colors"
          >
            Buzzer
          </button>
        )}
      </div>
    </div>
  );
};

export default GameView;