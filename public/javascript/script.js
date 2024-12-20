document.addEventListener('DOMContentLoaded', () => {
    const backgroundMusic = document.getElementById('backgroundMusic');
    
    // Intentamos reproducir la música automáticamente
    backgroundMusic.currentTime = 3; // Opcional, para saltar unos segundos al inicio
    backgroundMusic.play().then(() => {
        console.log('Música reproducida automáticamente');
    }).catch((error) => {
        console.log('Error al intentar reproducir la música:', error);
    });
    
    document.addEventListener('click', () => {
        playMusic();
        document.removeEventListener('click', playMusic);
    });

    const carouselItems = document.querySelectorAll('.carousel-item');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    let currentPosition = 0;

    function updateCarouselPosition() {
        carouselItems.forEach((item, index) => {
            item.classList.remove('flip', 'flip-reverse', 'active');
            if (index === currentPosition) {
                item.classList.add('active');
            }
        });

        const carouselInner = document.querySelector('.carousel-inner');
        carouselInner.style.transform = `translateX(-${currentPosition * 100}%)`;
    }

    prevBtn.addEventListener('click', () => {
        currentPosition = (currentPosition > 0) ? currentPosition - 1 : carouselItems.length - 1;
        updateCarouselPosition();
    });

    nextBtn.addEventListener('click', () => {
        currentPosition = (currentPosition < carouselItems.length - 1) ? currentPosition + 1 : 0;
        updateCarouselPosition();
    });

    updateCarouselPosition(); // Inicializar la posición del carrusel

    let autoSlideInterval;

    function startAutoSlide() {
        autoSlideInterval = setInterval(() => {
            nextBtn.click(); // Simula un clic en el botón de "Siguiente"
        }, 3000); // Cambia de imagen cada 3 segundos
    }

    function stopAutoSlide() {
        clearInterval(autoSlideInterval);
    }

    // Iniciar la transición automática al cargar la página
    startAutoSlide();

    // Detener la transición automática al interactuar con los botones y reanudar después de un tiempo
    prevBtn.addEventListener('click', () => {
        stopAutoSlide();
        startAutoSlide();
    });

    nextBtn.addEventListener('click', () => {
        stopAutoSlide();
        startAutoSlide();
    });

    const rsvpForm = document.getElementById('rsvpForm');
    rsvpForm.addEventListener('submit', (event) => {
        event.preventDefault();

        const name = document.getElementById('nameInput').value;
        const diet = document.getElementById('dietInput').value;

        fetch('/confirmar-asistencia', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ name, diet })
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    });

    const countdownElement = document.getElementById('countdown');
    const eventDate = new Date('April 13, 2025 21:00:00').getTime();

    function updateCountdown() {
        const now = new Date().getTime();
        const distance = eventDate - now;

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        document.getElementById('days').textContent = days;
        document.getElementById('hours').textContent = hours;
        document.getElementById('minutes').textContent = minutes;
        document.getElementById('seconds').textContent = seconds;

        if (distance < 0) {
            clearInterval(countdownInterval);
            countdownElement.innerHTML = "¡El evento ha comenzado!";
        }
    }

    const countdownInterval = setInterval(updateCountdown, 1000);
    updateCountdown();

    const playlistForm = document.getElementById('playlistForm');
    playlistForm.addEventListener('submit', (event) => {
        event.preventDefault();
        const song = document.getElementById('songInput').value;

        fetch('/enviar-cancion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ song })
        })
        .then(response => response.text())
        .then(data => alert(data))
        .catch(error => console.error('Error:', error));
    });
});
document.addEventListener('DOMContentLoaded', () => {
    const sparklesCount = 100; // Número de brillitos
    for (let i = 0; i < sparklesCount; i++) {
        const sparkle = document.createElement('div');
        sparkle.className = 'sparkle';
        sparkle.style.left = Math.random() * 100 + 'vw';
        sparkle.style.animationDelay = Math.random() * 5 + 's';
        sparkle.style.animationDuration = Math.random() * 3 + 2 + 's'; // Duración aleatoria de caída
        document.body.appendChild(sparkle);
    }
});

