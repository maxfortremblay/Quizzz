import React, { useState } from "react";
import { Trophy } from "lucide-react";
import QuizQuestion from "../components/game/QuizQuestion";

// Composant interne PlayerScores
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
            index === 0 ? "bg-yellow-50" : "bg-gray-50"
          }`}
        >
          <span className="font-medium text-gray-800">{player.name}</span>
          <span className="font-semibold text-gray-600">
            {player.score} pts
          </span>
        </div>
      ))}
    </div>
  </div>
);

// Composant principal GameView
const GameView = ({ currentQuestion, onAnswer, score, scores }) => {
  const [hasAnswered, setHasAnswered] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  const handleAnswerSelect = (answer) => {
    if (!hasAnswered) {
      setSelectedAnswer(answer);
      setHasAnswered(true);
      onAnswer(answer);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              {currentQuestion.question}
            </h2>
            <p className="text-gray-600 mt-2">{currentQuestion.description}</p>
          </div>
          <div className="space-y-4">
            {currentQuestion.answers.map((answer, index) => (
              <button
                key={index}
                onClick={() => handleAnswerSelect(answer)}
                disabled={hasAnswered}
                className={`p-4 rounded-lg text-left transition-all ${
                  selectedAnswer === answer
                    ? "bg-purple-100 border-2 border-purple-500"
                    : "bg-gray-50 border-2 border-transparent hover:bg-gray-100"
                } ${hasAnswered ? "cursor-not-allowed" : "cursor-pointer"}`}
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
          <PlayerScores scores={scores} />
        </div>
      </div>
    </div>
  );
};

export default GameView;
