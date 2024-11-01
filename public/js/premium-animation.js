// Premium Animation Manager
class PremiumAnimationManager {
    constructor() {
        this.init();
        this.setupParticles();
        this.setupMouseTracking();
        this.setupGlowEffects();
        this.setupScoreAnimations();
    }

    init() {
        // Création du background animé
        this.createAnimatedBackground();
        
        // Initialisation des observateurs
        this.setupIntersectionObserver();
        
        // Setup des événements
        this.setupEventListeners();
    }

    createAnimatedBackground() {
        const background = document.createElement('div');
        background.className = 'animated-background';
        
        const gradient = document.createElement('div');
        gradient.className = 'bg-gradient';
        
        background.appendChild(gradient);
        document.body.insertBefore(background, document.body.firstChild);
    }

    setupParticles() {
        const particlesContainer = document.createElement('div');
        particlesContainer.className = 'particles';
        document.body.appendChild(particlesContainer);

        // Création des particules
        for (let i = 0; i < 50; i++) {
            this.createParticle(particlesContainer);
        }
    }

    createParticle(container) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 5 + 2}px;
            height: ${Math.random() * 5 + 2}px;
            background: rgba(255, 255, 255, 0.5);
            border-radius: 50%;
            pointer-events: none;
            transition: transform 0.3s ease;
        `;

        this.setParticlePosition(particle);
        container.appendChild(particle);

        // Animation continue
        setInterval(() => {
            this.setParticlePosition(particle);
        }, Math.random() * 3000 + 2000);
    }

    setParticlePosition(particle) {
        const x = Math.random() * window.innerWidth;
        const y = Math.random() * window.innerHeight;
        particle.style.transform = `translate(${x}px, ${y}px)`;
    }

    setupMouseTracking() {
        document.addEventListener('mousemove', (e) => {
            requestAnimationFrame(() => {
                this.handleMouseMove(e);
            });
        });
    }

    handleMouseMove(e) {
        const { clientX, clientY } = e;
        
        // Effet de parallaxe sur les cartes
        document.querySelectorAll('.question-card, .player-card').forEach(card => {
            const rect = card.getBoundingClientRect();
            const centerX = rect.left + rect.width / 2;
            const centerY = rect.top + rect.height / 2;
            
            const deltaX = (clientX - centerX) / 30;
            const deltaY = (clientY - centerY) / 30;
            
            card.style.transform = `perspective(1000px) rotateY(${deltaX}deg) rotateX(${-deltaY}deg) translateZ(10px)`;
        });

        // Effet sur les particules
        document.querySelectorAll('.particle').forEach(particle => {
            const dx = clientX - particle.offsetLeft;
            const dy = clientY - particle.offsetTop;
            const distance = Math.sqrt(dx * dx + dy * dy);
            
            if (distance < 100) {
                const angle = Math.atan2(dy, dx);
                const force = (100 - distance) / 10;
                particle.style.transform = `translate(
                    ${Math.cos(angle) * force}px,
                    ${Math.sin(angle) * force}px
                )`;
            }
        });
    }

    setupIntersectionObserver() {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('animate-in');
                }
            });
        }, {
            threshold: 0.1
        });

        document.querySelectorAll('.view, .question-card, .player-card').forEach(el => {
            observer.observe(el);
        });
    }

    async switchView(fromId, toId) {
        const fromView = document.getElementById(fromId);
        const toView = document.getElementById(toId);

        await this.animateViewTransition(fromView, toView);
    }

    async animateViewTransition(fromView, toView) {
        // Animation de sortie
        await this.animate(fromView, [
            { opacity: 1, transform: 'translateY(0) rotateX(0)' },
            { opacity: 0, transform: 'translateY(-30px) rotateX(-10deg)' }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });

        fromView.classList.remove('active');
        toView.classList.add('active');

        // Animation d'entrée
        await this.animate(toView, [
            { opacity: 0, transform: 'translateY(30px) rotateX(10deg)' },
            { opacity: 1, transform: 'translateY(0) rotateX(0)' }
        ], {
            duration: 600,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });
    }

    setupGlowEffects() {
        // Effet de lueur dynamique sur les éléments importants
        const glowElements = document.querySelectorAll('.button, .question-card, .player-card');
        glowElements.forEach(element => {
            element.addEventListener('mousemove', (e) => {
                const rect = element.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;

                element.style.setProperty('--glow-x', `${x}px`);
                element.style.setProperty('--glow-y', `${y}px`);
                element.classList.add('glowing');
            });

            element.addEventListener('mouseleave', () => {
                element.classList.remove('glowing');
            });
        });
    }

    setupScoreAnimations() {
        // Animation des scores avec effet de compteur
        this.scoreCounters = new Map();
    }

    async animateScore(playerId, newScore, oldScore = 0) {
        const scoreElement = document.querySelector(`[data-score-id="${playerId}"]`);
        if (!scoreElement) return;

        const duration = 1000;
        const frames = 60;
        const increment = (newScore - oldScore) / frames;
        
        for (let i = 1; i <= frames; i++) {
            const currentValue = oldScore + (increment * i);
            scoreElement.textContent = Math.round(currentValue);
            await new Promise(resolve => setTimeout(resolve, duration / frames));
        }

        // Animation de célébration pour les grands scores
        if (newScore - oldScore > 100) {
            this.createScoreCelebration(scoreElement);
        }
    }

    createScoreCelebration(element) {
        const colors = ['#FFD700', '#FF61D8', '#00FF9D', '#00B8FF'];
        
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.className = 'celebration-particle';
            const color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.style.cssText = `
                position: absolute;
                width: 8px;
                height: 8px;
                background: ${color};
                border-radius: 50%;
                pointer-events: none;
            `;
            
            element.appendChild(particle);
            
            const angle = (Math.random() * Math.PI * 2);
            const velocity = 1 + Math.random() * 5;
            const tx = Math.cos(angle) * 100 * velocity;
            const ty = Math.sin(angle) * 100 * velocity;
            
            particle.animate([
                { transform: 'translate(0, 0) scale(1)', opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) scale(0)`, opacity: 0 }
            ], {
                duration: 1000 + Math.random() * 500,
                easing: 'cubic-bezier(0.4, 0, 0.2, 1)',
                fill: 'forwards'
            }).onfinish = () => particle.remove();
        }
    }

    async animateQuestionTransition() {
        const questionCard = document.querySelector('.question-card');
        const answers = document.querySelectorAll('.answer-option');
        
        // Animation de la carte question
        await this.animate(questionCard, [
            { transform: 'translateX(-100%) rotateY(-90deg)', opacity: 0 },
            { transform: 'translateX(0) rotateY(0)', opacity: 1 }
        ], {
            duration: 800,
            easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
        });

        // Animation séquentielle des réponses
        for (let i = 0; i < answers.length; i++) {
            await this.animate(answers[i], [
                { transform: 'translateY(20px)', opacity: 0 },
                { transform: 'translateY(0)', opacity: 1 }
            ], {
                duration: 300,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)',
                delay: i * 100
            });
        }
    }

    async showCorrectAnswer(correctIndex) {
        const answers = document.querySelectorAll('.answer-option');
        
        // Animation pour toutes les réponses
        await Promise.all(Array.from(answers).map((answer, index) => {
            const isCorrect = index === correctIndex;
            const keyframes = isCorrect ? [
                { transform: 'scale(1)', background: 'var(--surface-2)' },
                { transform: 'scale(1.05)', background: 'var(--success)' },
                { transform: 'scale(1)', background: 'var(--success)' }
            ] : [
                { transform: 'scale(1)', opacity: 1 },
                { transform: 'scale(0.95)', opacity: 0.5 }
            ];
            
            return this.animate(answer, keyframes, {
                duration: 500,
                easing: 'cubic-bezier(0.34, 1.56, 0.64, 1)'
            });
        }));
    }

    createWaveEffect(element) {
        const wave = document.createElement('div');
        wave.className = 'wave-effect';
        element.appendChild(wave);

        wave.animate([
            { transform: 'scale(0)', opacity: 0.5 },
            { transform: 'scale(2)', opacity: 0 }
        ], {
            duration: 1000,
            easing: 'cubic-bezier(0.4, 0, 0.2, 1)'
        }).onfinish = () => wave.remove();
    }

    setupGameEndCelebration() {
        const confetti = {
            maxCount: 150,
            speed: 2,
            gravity: 0.5,
            particle_size: 5,
            particles: []
        };

        // Création du canvas pour les confettis
        const canvas = document.createElement('canvas');
        canvas.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            z-index: 1000;
        `;
        document.body.appendChild(canvas);
        const ctx = canvas.getContext('2d');

        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
        }
        window.addEventListener('resize', resizeCanvas);
        resizeCanvas();

        // Animation des confettis
        function animate() {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            
            if (confetti.particles.length < confetti.maxCount) {
                confetti.particles.push({
                    x: Math.random() * canvas.width,
                    y: -10,
                    size: Math.random() * confetti.particle_size + 2,
                    color: `hsl(${Math.random() * 360}, 70%, 60%)`,
                    speed: Math.random() * confetti.speed + 1,
                    angle: Math.random() * Math.PI * 2
                });
            }

            confetti.particles.forEach((p, index) => {
                p.y += p.speed;
                p.x += Math.sin(p.angle) * 2;
                p.angle += 0.05;

                ctx.fillStyle = p.color;
                ctx.fillRect(p.x, p.y, p.size, p.size);

                if (p.y > canvas.height) {
                    confetti.particles.splice(index, 1);
                }
            });

            requestAnimationFrame(animate);
        }

        animate();
    }
}

// Initialisation avec GSAP pour des animations plus fluides
document.addEventListener('DOMContentLoaded', () => {
    const animationManager = new PremiumAnimationManager();
    window.animationManager = animationManager;
});