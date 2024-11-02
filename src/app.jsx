import React, { useState, useEffect, useRef } from "react";
import HomeView from "./views/HomeView";
import WaitingView from "./views/Waitingview";
import GameView from "./views/GameView";
import FinalView from "./views/FinalView";
import QuizManager from "./components/game/QuizManager";
import WebSocketService from "./services/WebSocketService";
import NotificationManager from "./services/notificationManager";
import ScoreManager from "./services/score";
import StateManager from "./services/stateManager";

const App = () => {
  const [view, setView] = useState("home");
  const [gameState, setGameState] = useState({
    scores: [],
    roomCode: "",
    error: null,
    loading: true
  });

  const [wsService] = useState(() => new WebSocketService());
  const notificationManager = useRef(new NotificationManager());
  const apiService = useRef(new ApiService());
  const scoreManager = useRef(new ScoreManager());
  const stateManager = useRef(new StateManager());

  useEffect(() => {
    const handleConnection = () => {
      console.log("Connecté au serveur");
      setGameState((prev) => ({ ...prev, loading: false, error: null }));
    };

    const handleError = (error) => {
      console.error("Erreur WebSocket:", error);
      setGameState((prev) => ({
        ...prev,
        loading: false,
        error: error.message
      }));
    };

    wsService.on("connect", handleConnection);
    wsService.on("error", handleError);

    wsService.connect().catch(handleError);

    return () => {
      wsService.off("connect", handleConnection);
      wsService.off("error", handleError);
      wsService.disconnect();
    };
  }, [wsService]);

  const handleRestartGame = () => {
    setView("home");
    setGameState({
      scores: [],
      roomCode: "",
      error: null,
      loading: false
    });
  };

  const renderView = () => {
    if (gameState.loading) {
      return <div>Chargement...</div>;
    }

    if (gameState.error) {
      return <div>Erreur : {gameState.error}</div>;
    }

    switch (view) {
      case "home":
        return <HomeView onStartGame={() => setView("game")} />;
      case "waiting":
        return <WaitingView />;
      case "game":
        return <QuizManager webSocket={wsService} />;
      case "final":
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

  return <div className="app">{renderView()}</div>;
};

export default App;
