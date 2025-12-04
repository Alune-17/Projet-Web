document.addEventListener('DOMContentLoaded', () => {
    // Loading Screen Logic
    const loadingScreen = document.getElementById('loading-screen');

    // Only show loading screen on index.html or if it's the first visit (could use sessionStorage)
    if (loadingScreen) {
        // Simulate loading time or wait for window load
        window.addEventListener('load', () => {
            setTimeout(() => {
                loadingScreen.classList.add('hidden');
                // Remove from DOM after transition to free up resources
                setTimeout(() => {
                    loadingScreen.style.display = 'none';
                }, 500);
            }, 1500); // 1.5s minimum display time for the animation
        });
    }

    // Mobile Menu Toggle (to be implemented if needed)

    // KPI Animation (for index.html)
    const counters = document.querySelectorAll('.counter');
    const speed = 200; // The lower the slower

    const animateCounters = () => {
        counters.forEach(counter => {
            const updateCount = () => {
                const target = +counter.getAttribute('data-target');
                const count = +counter.innerText;

                // Lower inc to slow and higher to slow
                const inc = target / speed;

                if (count < target) {
                    // Add inc to count and output in counter
                    counter.innerText = Math.ceil(count + inc);
                    // Call function every ms
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            };

            updateCount();
        });
    }

    // Intersection Observer for triggering animations
    const observerOptions = {
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                if (entry.target.classList.contains('kpi-section')) {
                    animateCounters();
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    const kpiSection = document.querySelector('.kpi-section');
    if (kpiSection) {
        observer.observe(kpiSection);
    }
});
