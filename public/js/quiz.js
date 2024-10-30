```javascript
document.addEventListener('DOMContentLoaded', () => {
    loadQuestion();
});

async function loadQuestion() {
    try {
        const response = await fetch('/api/questions');
        const questions = await response.json();
        // Logique pour afficher la première question
        displayQuestion(questions[0]);
    } catch (error) {
        console.error('Erreur lors du chargement des questions', error);
    }
}

function displayQuestion(question) {
    const questionElement = document.getElementById('question');
    questionElement.innerText = question.question;

    const answerButtons = document.getElementById('answer-buttons');
    answerButtons.innerHTML = '';
    question.choices.forEach(choice => {
        const button = document.createElement('button');
        button.innerText = choice;
        button.classList.add('btn');
        button.addEventListener('click', () => selectAnswer(choice));
        answerButtons.appendChild(button);
    });
}

function selectAnswer(choice) {
    console.log(`Réponse sélectionnée : ${choice}`);
}

function nextQuestion() {
    // Logique pour passer à la question suivante
}
```