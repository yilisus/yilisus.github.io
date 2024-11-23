document.addEventListener('DOMContentLoaded', () => {
    const balloonContainer = document.querySelector('.balloons');
    const colors = ['#FF0000', '#00FF00', '#0000FF', '#FFFF00', '#FF00FF', '#00FFFF'];

    const createBalloon = () => {
        const balloon = document.createElement('div');
        balloon.classList.add('balloon');
        balloon.style.setProperty('--color', colors[Math.floor(Math.random() * colors.length)]);
        balloon.style.left = `${Math.random() * 100}vw`;
        balloon.style.animationDuration = `${Math.random() * 3 + 5}s`;

        balloonContainer.appendChild(balloon);

        balloon.addEventListener('animationend', () => {
            balloon.remove();
        });
    };

    for (let i = 0; i < 50; i++) {
        setTimeout(createBalloon, i * 200);
    }
});
