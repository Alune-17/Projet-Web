document.addEventListener('DOMContentLoaded', () => {
    
    /* --- 1. LOADING SCREEN --- */
    const loadingScreen = document.getElementById('loading-screen');

    if (loadingScreen) {
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                    
                    // Une fois le loading fini, on peut lancer l'animation des KPI
                    // si on est sur la page d'accueil
                    triggerKpiAnimation(); 
                    
                }, 500); // Temps de la transition CSS (opacity)
            }, 1000); // Temps d'attente minimum (1s suffit)
        });
    } else {
        // Si pas de loading screen (autres pages), on vérifie quand même si on doit animer
        triggerKpiAnimation();
    }


    /* --- 2. KPI ANIMATION --- */
    // Fonction qui lance l'animation des chiffres
    const animateCounters = () => {
        const counters = document.querySelectorAll('.counter');
        const speed = 100; // Plus c'est bas, plus c'est lent (inverse de la logique habituelle ici)

        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Calcul du pas d'incrémentation
                // On divise par 'speed' pour déterminer la vitesse
                const inc = target / speed;

                if (count < target) {
                    // On ajoute l'incrément et on arrondit au supérieur
                    counter.innerText = Math.ceil(count + inc);
                    // On rappelle la fonction très vite (toutes les 20ms)
                    setTimeout(updateCount, 20);
                } else {
                    // On s'assure d'atterrir pile sur le chiffre final
                    counter.innerText = target;
                }
            };
            updateCount();
        });
    };

    // Fonction pour déclencher l'animation au bon moment
    function triggerKpiAnimation() {
        // On cible le NOUVEAU conteneur des KPI dans le Hero
        const kpiContainer = document.querySelector('.kpi-grid-hero');

        // Si le conteneur n'existe pas sur cette page, on arrête
        if (!kpiContainer) return;

        // Comme les KPI sont maintenant tout en haut (dans le Hero),
        // on peut lancer l'animation directement sans attendre de scroll.
        // Mais par sécurité (si l'écran est tout petit), on utilise quand même l'Observer.
        
        const observerOptions = {
            threshold: 0.1 // Dès que 10% du bloc est visible
        };

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounters();
                    observer.unobserve(entry.target); // On arrête d'observer une fois lancé
                }
            });
        }, observerOptions);

        observer.observe(kpiContainer);
    }

});