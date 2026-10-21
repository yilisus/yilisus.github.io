document.addEventListener('DOMContentLoaded', () => {

    // 1. MÚSICA DE FONDO
    const musicBtn = document.getElementById('musicToggle');
    const bgMusic = document.getElementById('bgMusic');
    const musicText = document.getElementById('musicText');

    if (musicBtn && bgMusic) {
        musicBtn.addEventListener('click', () => {
            if (bgMusic.paused) {
                bgMusic.play().then(() => {
                    musicText.innerText = 'Música: ON 🎶';
                    musicBtn.classList.add('playing');
                }).catch(err => {
                    console.log("El navegador bloqueó la reproducción automática: " + err);
                });
            } else {
                bgMusic.pause();
                musicText.innerText = 'Música: OFF';
                musicBtn.classList.remove('playing');
            }
        });
    }

    // 2. MODO NOCHE
    const themeBtn = document.getElementById('themeToggle');
    if (themeBtn) {
        themeBtn.addEventListener('click', () => {
            document.body.classList.toggle('dark-mode');
            const isDark = document.body.classList.contains('dark-mode');
            themeBtn.innerText = isDark ? '☀️ Modo Día' : '🌙 Modo Noche';
        });
    }

    // 3. CONTADOR EN TIEMPO REAL VIVO (Días, Horas, Minutos y Segundos)
    // Cambia la fecha de inicio por la de ustedes si lo deseas (Formato: AAAA-MM-DDTHH:MM:SS)
    const fechaInicio = new Date('2026-04-01T00:00:00').getTime();

    function actualizarContador() {
        const ahora = new Date().getTime();
        const diferencia = ahora - fechaInicio;

        const elementoContador = document.getElementById('counter');
        if (!elementoContador) return;

        if (diferencia > 0) {
            const dias = Math.floor(diferencia / (1000 * 60 * 60 * 24));
            const horas = Math.floor((diferencia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            const minutos = Math.floor((diferencia % (1000 * 60 * 60)) / (1000 * 60));
            const segundos = Math.floor((diferencia % (1000 * 60)) / 1000);

            // Rellenar con cero a la izquierda para mantener un formato estético (ej. 05s)
            const hrsStr = horas < 10 ? '0' + horas : horas;
            const minStr = minutos < 10 ? '0' + minutos : minutos;
            const segStr = segundos < 10 ? '0' + segundos : segundos;

            elementoContador.innerHTML = `${dias} días, ${hrsStr}h : ${minStr}m : ${segStr}s ❤️`;
        } else {
            elementoContador.innerHTML = "¡Muy pronto comenzará nuestra historia! ❤️";
        }
    }

    // Iniciar inmediatamente y actualizar cada 1 segundo (1000 ms)
    actualizarContador();
    setInterval(actualizarContador, 1000);

    // 4. CARTA SECRETA DESPLEGABLE
    const sobreBtn = document.getElementById('sobreBtn');
    const carta = document.getElementById('carta');
    if (sobreBtn && carta) {
        sobreBtn.addEventListener('click', () => {
            carta.style.display = (carta.style.display === 'block') ? 'none' : 'block';
        });
    }

    // 5. LLUVIA DE CORAZONES ANIMADA
    const btnCorazones = document.getElementById('btnCorazones');
    if (btnCorazones) {
        btnCorazones.addEventListener('click', () => {
            for (let i = 0; i < 25; i++) {
                const corazon = document.createElement('div');
                corazon.innerHTML = '❤️';
                corazon.className = 'corazon-animado';
                corazon.style.left = Math.random() * 100 + 'vw';
                corazon.style.animationDuration = (Math.random() * 2 + 2) + 's';
                document.body.appendChild(corazon);
                setTimeout(() => corazon.remove(), 4000);
            }
        });
    }

    // 6. FILTROS POR FECHA
    const filtroBtns = document.querySelectorAll('.filtro-btn');
    filtroBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            filtroBtns.forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            const categoria = e.target.getAttribute('data-categoria');
            const bloques = document.querySelectorAll('.fecha-block');

            bloques.forEach(bloque => {
                if (categoria === 'todas' || bloque.getAttribute('data-fecha') === categoria) {
                    bloque.style.display = 'block';
                } else {
                    bloque.style.display = 'none';
                }
            });
        });
    });

    // 7. VISOR LIGHTBOX DE IMÁGENES CON NAVEGACIÓN
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeLightbox = document.getElementById('closeLightbox');
    const prevImg = document.getElementById('prevImg');
    const nextImg = document.getElementById('nextImg');

    let fotosVisibles = [];
    let indiceActual = 0;

    document.querySelectorAll('.foto-card').forEach(card => {
        card.addEventListener('click', () => {
            const fotosImgs = Array.from(document.querySelectorAll('.fecha-block:not([style*="display: none"]) .foto-card img'));
            fotosVisibles = fotosImgs.map(img => img.src);
            const srcClickeada = card.querySelector('img').src;
            indiceActual = fotosVisibles.indexOf(srcClickeada);

            if (lightboxImg && lightbox) {
                lightboxImg.src = fotosVisibles[indiceActual];
                lightbox.style.display = 'flex';
            }
        });
    });

    if (prevImg) {
        prevImg.addEventListener('click', (e) => {
            e.stopPropagation();
            if (fotosVisibles.length > 0) {
                indiceActual = (indiceActual - 1 + fotosVisibles.length) % fotosVisibles.length;
                lightboxImg.src = fotosVisibles[indiceActual];
            }
        });
    }

    if (nextImg) {
        nextImg.addEventListener('click', (e) => {
            e.stopPropagation();
            if (fotosVisibles.length > 0) {
                indiceActual = (indiceActual + 1) % fotosVisibles.length;
                lightboxImg.src = fotosVisibles[indiceActual];
            }
        });
    }

    if (closeLightbox) {
        closeLightbox.addEventListener('click', () => {
            lightbox.style.display = 'none';
        });
    }

    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox) {
                lightbox.style.display = 'none';
            }
        });
    }

});
