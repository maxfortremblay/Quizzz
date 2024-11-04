QUIZZZ-1/
├── **tests**/ # Répertoire pour les tests unitaires
├── .vscode/ # Configuration spécifique à Visual Studio Code
├── data/ # Données statiques (par ex., questions JSON)
├── node_modules/ # Dépendances Node.js
├── public/ # Fichiers statiques
│ ├── css/ # Feuilles de style
│ │ ├── style.css # Styles de base de l'application
│ │ └── premium-style.css # Styles premium pour des éléments spécifiques
│ ├── js/ # Scripts JavaScript côté client
│ │ ├── index.js # Point d'entrée JavaScript principal
│ │ ├── client.js # Gestion des événements et interactions client
│ │ ├── script.js # Communication avec le serveur et manipulation DOM
│ │ └── premium-animation.js # Scripts pour les animations premium
│ ├── dist/ # Dossier contenant les fichiers compilés
│ │ └── bundle.js # Bundle JavaScript généré par Webpack
│ ├── media/ # Médias (images, sons, etc.)
│ └── index.html # Point d'entrée HTML
├── src/ # Code source principal
│ ├── components/ # Composants React
│ │ ├── game/
│ │ │ ├── QuizManager.jsx # Gestionnaire de quiz
│ │ │ └── QuizQuestion.jsx # Composant pour afficher une question de quiz
│ │ └── home/
│ │ └── GameManager.jsx # Gestionnaire de jeu
│ ├── services/ # Services (par ex., API, WebSockets)
│ │ ├── quiz.js # Logique pour charger et afficher les questions du quiz
│ │ ├── score.js # Logique pour gérer les scores
│ │ ├── stateManager.js # Logique pour gérer l'état de l'application
│ │ ├── NotificationManager.js # Logique pour gérer les notifications
│ │ └── WebSocketService.js # Logique pour gérer les WebSockets
│ ├── views/ # Vues principales de l'application
│ │ ├── HomeView.jsx # Vue principale de l'accueil
│ │ ├── WaitingView.jsx # Vue affichée en attendant le début du quiz
│ │ ├── GameView.jsx # Vue principale du jeu
│ │ └── FinalView.jsx # Vue affichée à la fin du quiz
│ └── app.jsx # Composant principal de l'application
├── .env # Variables d'environnement
├── webpack.config.js # Configuration de Webpack pour le build
├── package.json # Dépendances et scripts du projet
├── package-lock.json # Versions exactes des dépendances
├── server.js # Point d'entrée du serveur
└── tailwind.config.js # Configuration Tailwind CSS
