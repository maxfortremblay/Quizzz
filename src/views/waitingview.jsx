import React from 'react';
import { Users } from 'lucide-react';

const PlayerCard = ({ player, isHost }) => (
  <div className="p-4 bg-white rounded-lg shadow-md flex items-center justify-between">
    <div className="flex items-center space-x-3">
      <div className="w-2 h-2 bg-green-500 rounded-full" />
      <span className="font-medium text-gray-800">{player.name}</span>
    </div>
    {isHost && (
      <span className="px-2 py-1 text-sm bg-purple-100 text-purple-600 rounded-full">
        Hôte
      </span>
    )}
  </div>
);

const WaitingView = ({ roomCode, players, onStartGame, onStopGame, isHost }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-pink-100 p-6">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-lg p-6 space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-800">
              Code de la partie : {roomCode}
            </h2>
            <p className="text-gray-600 mt-2">
              Partagez ce code avec vos amis pour qu'ils puissent rejoindre la partie
            </p>
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-gray-700 flex items-center space-x-2">
                <Users className="w-5 h-5 text-purple-500" />
                <span>Joueurs connectés ({players.length})</span>
              </h3>
            </div>
            <div className="space-y-2">
              {players.map((player, index) => (
                <div
                  key={player.id}
                  className="p-3 bg-gray-50 rounded-lg flex items-center space-x-3"
                >
                  <div className="w-2 h-2 bg-green-500 rounded-full" />
                  <span className="flex-1">{player.name}</span>
                  {player.isHost && (
                    <span className="text-sm text-purple-600 font-medium">Hôte</span>
                  )}
                </div>
              ))}
            </div>
          </div>

          {isHost && (
            <>
              <button
                onClick={onStartGame}
                disabled={players.length < 2}
                className="w-full bg-purple-600 text-white py-4 rounded-xl font-semibold
                  hover:bg-purple-700 transition-colors disabled:bg-gray-400 
                  disabled:cursor-not-allowed"
              >
                Démarrer la partie
              </button>
              <button
                onClick={onStopGame}
                className="w-full bg-red-600 text-white py-4 rounded-xl font-semibold
                  hover:bg-red-700 transition-colors mt-4"
              >
                Arrêter la partie
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default WaitingView;