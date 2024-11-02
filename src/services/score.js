document.addEventListener("DOMContentLoaded", () => {
  loadScores();
});

async function loadScores() {
  try {
    const response = await fetch("/api/scores");
    const scores = await response.json();
    displayScores(scores);
  } catch (error) {
    console.error("Erreur lors du chargement des scores", error);
  }
}

function displayScores(scores) {
  const scoreContainer = document.getElementById("score-container");
  scoreContainer.innerHTML = "";
  scores.forEach((score) => {
    const scoreElement = document.createElement("div");
    scoreElement.innerText = `Joueur: ${score.username}, Score: ${score.points}`;
    scoreContainer.appendChild(scoreElement);
  });
}

export default class Score {
  constructor(username, points) {
    this.username = username;
    this.points = points;
  }

  static async fetchScores() {
    try {
      const response = await fetch("/api/scores");
      const scores = await response.json();
      return scores.map((score) => new Score(score.username, score.points));
    } catch (error) {
      console.error("Erreur lors du chargement des scores", error);
      return [];
    }
  }

  static displayScores(scores) {
    const scoreContainer = document.getElementById("score-container");
    scoreContainer.innerHTML = "";
    scores.forEach((score) => {
      const scoreElement = document.createElement("div");
      scoreElement.innerText = `Joueur: ${score.username}, Score: ${score.points}`;
      scoreContainer.appendChild(scoreElement);
    });
  }
}
