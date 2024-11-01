import React from 'react';

const FinalView = ({ scores, roomCode, onPlayAgain, onBackToHome }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6 space-y-6">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Partie terminée</h2>
          <p className="text-gray-600 mt-2">Code de la partie : {roomCode}</p>
        </div>

        <div className="space-y-4">
          <h3 className="font-medium text-gray-700">Scores finaux</h3>
          <div className="space-y-2">
            {scores.map((score, index) => (
              <div
                key={index}
                className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3"
              >
                <span className="flex-1">{score.playerName}</span>
                <span className="font-medium text-gray-800">{score.points} points</span>
              </div>
            ))}
          </div>
        </div>

        <button
          onClick={onPlayAgain}
          className="w-full bg-green-600 text-white py-4 rounded-xl font-semibold
            hover:bg-green-700 transition-colors mt-4"
        >
          Rejouer
        </button>
        <button
          onClick={onBackToHome}
          className="w-full bg-blue-600 text-white py-4 rounded-xl font-semibold
            hover:bg-blue-700 transition-colors mt-4"
        >
          Retour à l'accueil
        </button>
      </div>
    </div>
  );
};

export default FinalView;