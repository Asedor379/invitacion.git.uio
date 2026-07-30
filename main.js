/**
 * Main JavaScript - Lógica principal de la invitación digital XV
 * Depende de: config.js y utils.js
 */

// ============================================
// ESTADO GLOBAL
// ============================================
const state = {
    audioPlaying: false,
    audioInitialized: false,
    currentSlide: 0,
    totalSlides: 0,
    countdownInterval: null
};

// ============================================
// INICIALIZACIÓN PRINCIPAL
// ============================================
document.addEventListener('DOMContentLoaded', function() {
    // Verificar que config existe
    if (typeof config === 'undefined') {
        console.error('❌ Config no está definido. Asegúrate de cargar config.js primero.');
        return;
    }

    console.log('🎉 Inicializando invitación XV...');
    console.log('📋 Datos del evento:', config.evento.fechaFormateada);

    const text2 = document.querySelector('.rsvpp_text_2');
  
    if (text2) {
        // Detectar si es móvil
        const isMobile = window.innerWidth < 768;
        const isSmallMobile = window.innerWidth < 480;
        
        // Calcular tiempo según dispositivo
        let delay = 9500; // Default
        let typingTime = 4000; // Default
        
        if (isSmallMobile) {
        delay = 6500; // 6.5s para móviles pequeños
        typingTime = 2800; // 2.8s
        } else if (isMobile) {
        delay = 7800; // 7.8s para móviles
        typingTime = 3200; // 3.2s
        }
        
        // Activar el neón después del tiempo calculado
        const totalTime = delay + typingTime + 500;
        setTimeout(() => {
        text2.classList.add('typed');
        text2.style.borderRight = 'none';
        }, totalTime);
    }
    
    // Recalcular si cambia el tamaño de la ventana
    window.addEventListener('resize', () => {
        // Reiniciar animaciones si es necesario
    });

    
    // Inicializar todas las funcionalidades
    //initTheme();
    populateContent();
    initCountdown();
    initAudio();
    initCopyActions();
    initScrollButtons();
    
    console.log('✅ Invitación inicializada correctamente');
});

// ============================================
// 1. TEMA (Color palette)
// ============================================
//function initTheme() {
    //const theme = config.apariencia?.paleta || 'romantic-blush';
    //document.body.className = `theme-${theme}`;
    //console.log('🎨 Tema aplicado:', theme);
//}

// ============================================
// 2. CONTENIDO DINÁMICO
// ============================================
function populateContent() {
    // Hero
    updateTextContent('.hero_title', config.festejante?.nombre);
    updateTextContent('.hero_date', config.evento?.fechaFormateada);
    
    // Mensaje
    updateTextContent('.message_text', config.mensaje?.principal);
    updateTextContent('.message_subtext', config.mensaje?.secundario);
    
    // Cuando
    updateTextContent('.when_date', config.evento?.fechaFormateada);
    updateTextContent('.when_time', config.evento?.horaFormateada);
    
    // Donde
    updateTextContent('.where_salon', config.direccion?.salon);
    updateTextContent('.where_address', config.direccion?.texto);
    
    // Mapa
    const mapsLink = document.querySelector('.where_btn');
    if (mapsLink && config.direccion?.googleMapsUrl) {
        mapsLink.href = config.direccion.googleMapsUrl;
    }


     // Mapa
    const mapsLink2 = document.querySelector('.where_btn2');
    if (mapsLink && config.direccion2?.googleMapsUrl) {
        mapsLink.href = config.direccion2.googleMapsUrl;
    }
    
    // Dress code
    updateTextContent('.dresscode_text', config.dressCode?.principal);
    updateTextContent('.dresscode_desc', config.dressCode?.descripcion);
    
    // Itinerario
    populateItinerary();
    
    // Regalos
    updateTextContent('.gifts_store', config.mesaRegalos?.tienda);
    const giftsLink = document.querySelector('.gifts_btn');
    if (giftsLink && config.mesaRegalos?.url) {
        giftsLink.href = config.mesaRegalos.url;
    }
    
    // Hashtag
    updateTextContent('.hashtag_tag', config.redes?.hashtag);
    
    // Playlist
    const playlistBtn = document.querySelector('.playlist_btn');
    if (playlistBtn && config.redes?.playlistUrl) {
        playlistBtn.href = config.redes.playlistUrl;
    }

    
    // RSVP
    const rsvpText = config.confirmacion?.mostrarFechaLimite
        ? `Por favor, confirma tu asistencia antes del ${formatDateSpanish(config.confirmacion.fechaLimite)}`
        : 'Por favor, confirma tu asistencia';
    updateTextContent('.rsvp_text', rsvpText);
    
    const rsvpLink = document.querySelector('.rsvp_btn');
    if (rsvpLink && config.confirmacion?.linkFormulario) {
        rsvpLink.href = config.confirmacion.linkFormulario;
    }
    
    // Footer
    updateTextContent('.footer_text', `${config.festejante?.nombre} - ${config.evento?.fechaFormateada}`);
    
    // Audio
    const audioPlayer = document.getElementById('audio-player');
    if (audioPlayer && config.multimedia?.cancion) {
        audioPlayer.src = config.multimedia.cancion;
    }
}

function updateTextContent(selector, value) {
    const element = document.querySelector(selector);
    if (element && value) {
        element.textContent = value;
    }
}

// ============================================
// 3. ITINERARIO
// ============================================
function populateItinerary() {
    const timeline = document.querySelector('.itinerary_timeline');
    if (!timeline || !config.itinerario) return;
    
    const items = config.itinerario.map(item => `
        <div class="itinerary_item">
            <span class="itinerary_time">${item.hora}</span>
            <div class="itinerary_dot"></div>
            <div class="itinerary_details">
                <p class="itinerary_activity">${item.actividad}</p>
                ${item.ubicacion ? `<p class="itinerary_location">${item.ubicacion}</p>` : ''}
            </div>
        </div>
    `).join('');
    
    timeline.innerHTML = items;
}

// ============================================
// 4. PRECIOS
// ============================================

// ============================================
// 5. COUNTDOWN
// ============================================
function initCountdown() {
    const eventDate = config.evento?.fecha;
    if (!eventDate) return;
    
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    function updateCountdown() {
        const now = new Date().getTime();
        const eventTime = new Date(eventDate).getTime();
        const distance = eventTime - now;
        
        if (distance < 0) {
            clearInterval(state.countdownInterval);
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            const timerContainer = document.querySelector('.countdown_timer');
            if (timerContainer) {
                timerContainer.innerHTML = '<p class="countdown_message">🎉 ¡La fiesta comenzó!</p>';
            }
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = padNumber(days);
        hoursEl.textContent = padNumber(hours);
        minutesEl.textContent = padNumber(minutes);
        secondsEl.textContent = padNumber(seconds);
    }
    
    updateCountdown();
    state.countdownInterval = setInterval(updateCountdown, 1000);
}

// ============================================
// 6. AUDIO
// ============================================
function initAudio() {
    const audio = document.getElementById('audio-player');
    if (!audio) return;
    
    audio.loop = true;
    audio.volume = 0.6;
    
    const btnMusica = document.getElementById('btnMusica') || document.querySelector('.header_music-toggle');
    const estadoMusica = document.querySelector('.music-status');
    const btnConMusica = document.getElementById('open-with-music');
    const btnSinMusica = document.getElementById('open-without-music');
    
    let isPlaying = false;
    let musicStarted = false;
    
    function playMusic() {
        audio.play()
            .then(() => {
                console.log('🎵 Música iniciada');
                musicStarted = true;
                isPlaying = true;
                updateMusicUI(true);
            })
            .catch(() => {
                showToast('🔊 Haz clic en el botón de música para activar el audio');
            });
    }
    
    function pauseMusic() {
        audio.pause();
        isPlaying = false;
        updateMusicUI(false);
    }
    
    function toggleMusic() {
        if (isPlaying) {
            pauseMusic();
        } else {
            playMusic();
        }
    }
    
    function updateMusicUI(playing) {
        if (btnMusica) {
            btnMusica.classList.toggle('activo', playing);
        }
        if (estadoMusica) {
            estadoMusica.textContent = playing ? '♪ Sonando' : '♪ Música';
            estadoMusica.style.color = playing ? '#d4af37' : '';
        }
        if (btnMusica) {
            btnMusica.style.display = 'flex';
        }
    }
    
    // Eventos
    if (btnMusica) {
        btnMusica.addEventListener('click', toggleMusic);
    }
    
    if (btnConMusica) {
        btnConMusica.addEventListener('click', function(e) {
            e.preventDefault();
            playMusic();
            smoothScrollTo('#countdown', 80);
        });
    }
    
    if (btnSinMusica) {
        btnSinMusica.addEventListener('click', function(e) {
            e.preventDefault();
            pauseMusic();
            smoothScrollTo('#countdown', 80);
        });
    }
    
    audio.addEventListener('play', () => { isPlaying = true; updateMusicUI(true); });
    audio.addEventListener('pause', () => { isPlaying = false; updateMusicUI(false); });
    
    // Auto-inicio por interacción
    document.addEventListener('click', function initOnClick() {
        if (!musicStarted) {
            audio.play().catch(() => {});
            musicStarted = true;
        }
        document.removeEventListener('click', initOnClick);
    }, { once: true });
    
    console.log('🎵 Sistema de audio inicializado');
}

// ============================================
// 7. COPIAR HASHTAG
// ============================================
function initCopyActions() {
    const hashtagElement = document.querySelector('.hashtag_tag');
    if (!hashtagElement) return;
    
    hashtagElement.style.cursor = 'pointer';
    hashtagElement.addEventListener('click', async function() {
        const text = this.textContent;
        const success = await copyToClipboard(text);
        if (success) {
            showToast('📋 ¡Hashtag copiado al portapapeles!');
            this.style.transform = 'scale(0.95)';
            setTimeout(() => { this.style.transform = 'scale(1)'; }, 200);
        }
    });
}

// ============================================
// 8. BOTONES DE SCROLL
// ============================================
function initScrollButtons() {
    document.querySelectorAll('[data-scroll]').forEach(btn => {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const target = this.dataset.scroll;
            const offset = parseInt(this.dataset.offset) || 80;
            smoothScrollTo(target, offset);
        });
    });
}

const isLocalFile = window.location.protocol === 'file:';

if (isLocalFile) {
    console.warn('⚠️ La página se está ejecutando desde file:/// - Algunas características pueden estar limitadas');
    console.warn('💡 Sugerencia: Usa Live Server o un servidor local para mejor experiencia');
}