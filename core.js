document.addEventListener('DOMContentLoaded', () => {
    // Класс для каждого экрана
    const sections = document.querySelectorAll('.fullpage');
    let currentSection = 0;
    let isScrolling = false;
    let touchStartY = 0;
    let touchEndY = 0;

    function scrollToSection(index) {
        if (index >= 0 && index < sections.length && !isScrolling) {
            isScrolling = true;
            const targetPosition = sections[index].offsetTop;
            const startPosition = window.pageYOffset;
            const distance = targetPosition - startPosition;
            const duration = 1000; // Время анимации прокрутки
            let startTime = null;

            function animationScroll(currentTime) {
                if (startTime === null) startTime = currentTime;
                const timeElapsed = currentTime - startTime;
                const run = ease(timeElapsed, startPosition, distance, duration);
                window.scrollTo(0, run);
                if (timeElapsed < duration) {
                    requestAnimationFrame(animationScroll);
                } else {
                    currentSection = index;
                    isScrolling = false;
                }
            }

            function ease(t, b, c, d) {
                t /= d / 2;
                if (t < 1) return c / 2 * t * t + b;
                t--;
                return -c / 2 * (t * (t - 2) - 1) + b;
            }

            requestAnimationFrame(animationScroll);
        }
    }

    // Обработка колесика мыши
    window.addEventListener('wheel', (event) => {
        if (!isScrolling) {
            if (event.deltaY > 0) {
                scrollToSection(currentSection + 1);
            } else {
                scrollToSection(currentSection - 1);
            }
        }
    });

    // Обработка клавиш стрелок
    window.addEventListener('keydown', (event) => {
        if (!isScrolling) {
            if (event.key === 'ArrowDown') {
                scrollToSection(currentSection + 1);
            } else if (event.key === 'ArrowUp') {
                scrollToSection(currentSection - 1);
            }
        }
    });
});