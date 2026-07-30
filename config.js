/**
 * Configuración de la invitación digital XV años
 * Todos los campos editables están aquí para fácil personalización
 */

const config = {
  // ============================================
  // DATOS PRINCIPALES
  // ============================================
  festejante: {
    nombre: "Ayde",  // ← CAMBIA ESTO
    fotoHero: "123.jpeg",
    fotoGaleria: [
      "123.jpeg",
      "123.jpeg",
      "123.jpeg",
      "123.jpeg"
    ]
  },

  // ============================================
  // FECHA Y HORA
  // ============================================
  evento: {
    fecha: "2026-11-28T17:00:00",
    fechaFormateada: "Sabado 28 de Noviembre de 2026",
    hora: "17:00",
    horaFormateada: "17:00 hs",
    duracion: "8 horas"
  },

  // ============================================
  // UBICACIÓN
  // ============================================
  direccion: {
    texto: "Av.Juan De la Barrera 5",
    salon: "Salón San Lorenzo",
    googleMapsUrl: "https://maps.app.goo.gl/NVoXWSKpbkJmjHVm6"  // ← COMPLETA ESTO
  },

   direccion2: {
    texto: "Av.Central 5, San Lorenzo",
    salon: "Parroquia de San Lorenzo",
    googleMapsUrl: "https://maps.app.goo.gl/QKc11EPARztqD1cs7"  // ← COMPLETA ESTO
  },

  // ============================================
  // MENSAJE DE INVITACIÓN
  // ============================================
  mensaje: {
    principal: "Quiero que seas parte de una noche inolvidable",
    secundario: "Será un honor celebrar contigo esta noche mágica"
  },

  // ============================================
  // DRESS CODE
  // ============================================
  dressCode: {
    principal: "Formal",
    descripcion: "Traje de gala - No jeans ni sandalias"
  },

  // ============================================
  // INFORMACIÓN DE PRECIOS (Opcional)
  // ============================================
  precios: {
    adulto: 15000,
    nino: 5000,
    menorEdadGratis: 5,
    incluir: true
  },

  // ============================================
  // MESA DE REGALOS
  // ============================================
  mesaRegalos: {
    tienda: "SEARS",
    url: "https://www.sears.com.mx/Mesa-de-Regalos/",  // ← COMPLETA ESTO
    // banco: "Banco Nación",
    // CBU: "1234567890123456789012",
    // alias: "valeria.xv",
    // titular: "Valeria García"
  },

  // ============================================
  // ITINERARIO
  // ============================================
  itinerario: [
    { hora: "20:00", actividad: "Recepción", ubicacion: "Entrada principal" },
    { hora: "21:00", actividad: "Cena", ubicacion: "Salón principal" },
    { hora: "22:30", actividad: "Pastel", ubicacion: "Salón principal" },
    { hora: "23:00", actividad: "Baile", ubicacion: "Salón principal" }
  ],

  // ============================================
  // REDES SOCIALES
  // ============================================
  redes: {
    hashtag: "#XVAYDE",  // ← CAMBIA ESTO
    playlistUrl: "https://open.spotify.com/playlist/...",  // ← COMPLETA ESTO
    instagram: "https://instagram.com/valeria"
  },

  // ============================================
  // FORMULARIO DE CONFIRMACIÓN
  // ============================================
  confirmacion: {
    linkFormulario: "https://forms.google.com/...",  // ← COMPLETA ESTO
    fechaLimite: "2026-06-01",
    mostrarFechaLimite: true
  },

  // ============================================
  // MULTIMEDIA
  // ============================================
  multimedia: {
    cancion: "musi.mp3",  // ← RUTA RELATIVA (sin ./)
    imagenShare: "download.jpg"
  },

  // ============================================
  // APARIENCIA
  // ============================================
  //apariencia: {
    //paleta: "romantic-blush",  // classic-gold, modern-minimal, romantic-blush, navy-night
  //}
};

// Exportar para uso en otros archivos
if (typeof module !== 'undefined' && module.exports) {
  module.exports = config;
}