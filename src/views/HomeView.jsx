import React, { useState } from 'react';
import { Sparkles, Users } from 'lucide-react';

const HomeView = ({ onCreateGame, onJoinGame }) => {
  const [playerName, setPlayerName] = useState('');
  const [gameCode, setGameCode] = useState('');

  const handleJoinGame = () => {
    if (playerName && gameCode) {
      onJoinGame({ playerName, gameCode });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto space-y-8">
        <h1 className="text-center text-6xl font-bold mb-12">
          <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">Quizz</span>
          <span className="bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">Party</span>
        </h1>

        <div className="bg-white rounded-xl shadow-lg p-6 transition-all hover:shadow-xl">
          <button
            onClick={onCreateGame}
            className="w-full flex items-center justify-center space-x-3"
          >
            <Sparkles className="w-6 h-6 text-purple-500" />
            <span className="text-xl font-semibold text-gray-800">Créer une partie</span>
          </button>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 space-y-4">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Votre nom
            </label>
            <input
              type="text"
              value={playerName}
              onChange={(e) => setPlayerName(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Entrez votre nom"
            />
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Code de la partie
            </label>
            <input
              type="text"
              value={gameCode}
              onChange={(e) => setGameCode(e.target.value)}
              className="w-full p-2 border rounded-lg focus:ring-2 focus:ring-purple-500"
              placeholder="Ex: ABC123"
            />
          </div>
          <button
            onClick={handleJoinGame}
            className="w-full px-6 py-3 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition-colors flex items-center justify-center space-x-2"
          >
            <Users className="w-5 h-5" />
            <span>Rejoindre la partie</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomeView;