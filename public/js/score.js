```javascript
document.addEventListener('DOMContentLoaded', () => {
    loadScores();
});

async function loadScores() {
    try {
        const response = await fetch('/api/scores');
        const scores = await response.json();
        displayScores(scores);
    } catch (error) {
        console.error('Erreur lors du chargement des scores', error);
    }
}

function displayScores(scores) {
    const scoreContainer = document.getElementById('score-container');
    scoreContainer.innerHTML = '';
    scores.forEach(score => {
        const scoreElement = document.createElement('div');
        scoreElement.innerText = `Joueur: ${score.username}, Score: ${score.points}`;
        scoreContainer.appendChild(scoreElement);
    });
}
```