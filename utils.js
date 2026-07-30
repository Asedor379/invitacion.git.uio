/**
 * Utility Functions - Funciones auxiliares para la invitación digital
 * No tiene dependencias externas
 * VERSIÓN: Sin módulos (para usar con <script>)
 */

// ============================================
// 1. Formatea un número con ceros a la izquierda
// ============================================
function padNumber(num, digits = 2) {
    return String(num).padStart(digits, '0');
}

// ============================================
// 2. Copia texto al portapapeles
// ============================================
async function copyToClipboard(text) {
    try {
        if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(text);
            return true;
        }
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        textArea.style.top = '-999999px';
        document.body.appendChild(textArea);
        textArea.focus();
        textArea.select();
        const success = document.execCommand('copy');
        document.body.removeChild(textArea);
        return success;
    } catch (err) {
        console.error('Error al copiar:', err);
        return false;
    }
}

// ============================================
// 3. Lazy loading de imágenes
// ============================================


// ============================================
// 4. Scroll suave
// ============================================
function smoothScrollTo(target, offset = 0) {
    const element = typeof target === 'string' ? document.querySelector(target) : target;
    if (!element) return;
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;
    window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
}

// ============================================
// 5. Formatea fecha en español
// ============================================
function formatDateSpanish(isoDate) {
    const date = new Date(isoDate);
    const dias = ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'];
    const meses = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    return `${dias[date.getDay()]} ${date.getDate()} de ${meses[date.getMonth()]} de ${date.getFullYear()}`;
}

// ============================================
// 6. Formatea hora a 12h
// ============================================
function formatTime12h(time) {
    const [hours, minutes] = time.split(':').map(Number);
    const period = hours >= 12 ? 'PM' : 'AM';
    const hours12 = hours % 12 || 12;
    return `${hours12}:${padNumber(minutes)} ${period}`;
}

// ============================================
// 7. Formatea moneda (ARS)
// ============================================
function formatCurrency(amount) {
    return new Intl.NumberFormat('es-AR', {
        style: 'currency',
        currency: 'ARS',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ============================================
// 8. Detecta dispositivo táctil
// ============================================
function isTouchDevice() {
    return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

// ============================================
// 9. Muestra un toast (mensaje flotante)
// ============================================
function showToast(message, duration = 2500) {
    const existingToast = document.querySelector('.toast-message');
    if (existingToast) existingToast.remove();
    
    const toast = document.createElement('div');
    toast.className = 'toast-message';
    toast.textContent = message;
    
    Object.assign(toast.style, {
        position: 'fixed',
        bottom: '30px',
        left: '50%',
        transform: 'translateX(-50%)',
        backgroundColor: 'rgba(0,0,0,0.85)',
        color: 'white',
        padding: '14px 28px',
        borderRadius: '50px',
        fontSize: '0.95rem',
        fontFamily: "'Montserrat', sans-serif",
        zIndex: '9999',
        opacity: '0',
        transition: 'opacity 0.3s ease',
        backdropFilter: 'blur(10px)',
        border: '1px solid rgba(255,255,255,0.1)',
        boxShadow: '0 8px 30px rgba(0,0,0,0.3)'
    });
    
    document.body.appendChild(toast);
    requestAnimationFrame(() => toast.style.opacity = '1');
    
    setTimeout(() => {
        toast.style.opacity = '0';
        setTimeout(() => toast.remove(), 300);
    }, duration);
}

// ============================================
// 10. Debounce
// ============================================
function debounce(func, wait = 250) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// ============================================
// 11. Prefiere motion reducido
// ============================================
function prefersReducedMotion() {
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
}