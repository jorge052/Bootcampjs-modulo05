import "./style.css";

let puntosTotales = 0;
/*let gameOver = false;
let partidaTerminada = false;*/
let siguienteCarta: number;

// meter todos los botones en una sola funcion *tambien cualquier interaccion con html

const nuevaCarta = document.getElementById("dameCarta");
const plantarseboton = document.getElementById("plantarse");
const saberMasButton = document.getElementById("saberMas");
const nuevaPartidaButton = document.getElementById("nuevaPartida");

document.addEventListener("DOMContentLoaded", function () {
  eventosBotones();
});

// generar numero aleatorio funcion

const generarNumeroAleatorio = (): number => {
  return Math.floor(Math.random() * 10) + 1;
};
// Bloque de codigo para obtener nueva carta y Game over

// funcion principal
const dameCarta = () => {
  const numeroAletorio = generarNumeroAleatorio();
  const carta = generarCarta(numeroAletorio);
  mostrarCarta(carta);
  const puntos = devolverPuntos(carta);
  sumarPuntuacion(puntos);
  mostrarMensaje(`${puntosTotales}`);
  revisarMano();
};

const generarCarta = (numeroAletorio: number): number => {
  if (numeroAletorio > 7) {
    return numeroAletorio + 2;
  }
  return numeroAletorio;
};

const devolverPuntos = (carta: number): number => {
  if (carta > 7) {
    return carta;
  } else {
    return 0.5;
  }
};

function sumarPuntuacion(puntos: number) {
  puntosTotales += puntos; // Sumar el valor de la carta a la puntuación total
}

const mostrarMensaje = (mensaje: string) => {
  const elementoCabecera = document.getElementById("mostrarPuntuacion");
  if (
    elementoCabecera !== null &&
    elementoCabecera !== undefined &&
    elementoCabecera instanceof HTMLHeadingElement
  ) {
    elementoCabecera.textContent = mensaje;
  }
};

const revisarMano = () => {
  if (puntosTotales === 7.5) {
    mostrarMensaje(`partida ganada ${puntosTotales}`);
    deshabilitarBotonNuevaCarta();
    mostrarBotonNuevaPartida();
    deshabilitarBotonPlantarse();
  }

  if (puntosTotales > 7.5) {
    mostrarMensaje(`partida perdida ${puntosTotales}`);
    deshabilitarBotonNuevaCarta();
    mostrarBotonNuevaPartida();
    deshabilitarBotonPlantarse();
  }
};

function iniciarNuevaPartida() {
  puntosTotales = 0;
  habilitarBotonNuevaCarta();
  habilitarBotonPlantarse();
}

const eventosBotones = () => {
  if (
    nuevaCarta !== null &&
    nuevaCarta !== undefined &&
    nuevaCarta instanceof HTMLButtonElement
  ) {
    nuevaCarta.addEventListener("click", dameCarta);
  }

  if (
    plantarseboton !== null &&
    plantarseboton !== undefined &&
    plantarseboton instanceof HTMLButtonElement
  ) {
    plantarseboton.addEventListener("click", plantarse);
  }

  if (
    nuevaPartidaButton !== null &&
    nuevaPartidaButton !== undefined &&
    nuevaPartidaButton instanceof HTMLButtonElement
  ) {
    nuevaPartidaButton.addEventListener("click", iniciarNuevaPartida);
  }
};

// Bloque de codigo para plantarse

function plantarse() {
  let mensaje = "";

  if (puntosTotales < 4) {
    mensaje = "Has sido muy conservador";
    habilitarBotonNuevaPartida();
  } else if (puntosTotales >= 4 && puntosTotales < 6) {
    mensaje = "Te ha entrado el canguelo eh?";
    habilitarBotonNuevaPartida();
  } else if (puntosTotales >= 6 && puntosTotales <= 7) {
    mensaje = "Casi casí...";
    habilitarBotonNuevaPartida();
  } else if (puntosTotales === 7.5) {
    mensaje = "¡Lo has clavado! ¡Enhorabuena!";
    habilitarBotonNuevaPartida();
  }

  mostrarMensaje(mensaje);
  mostrarBotonSabermas();
  deshabilitarBotonPlantarse();
  deshabilitarBotonNuevaCarta();
}

// Saber mas

function mostrarSiguienteCarta() {
  if (siguienteCarta !== null) {
    mostrarCarta(siguienteCarta);
  }
}

function mostrarBotonSabermas() {
  if (saberMasButton instanceof HTMLButtonElement) {
    saberMasButton.addEventListener("click", mostrarSiguienteCarta);
    saberMasButton.style.display = "block";
  }
}

// Habilitar y deshabilitar botones
const deshabilitarBotonNuevaCarta = () => {
  const botonPedirCarta = document.getElementById("dameCarta");
  if (
    botonPedirCarta !== null &&
    botonPedirCarta !== undefined &&
    botonPedirCarta instanceof HTMLButtonElement
  ) {
    botonPedirCarta.disabled = true;
  }
};

const habilitarBotonNuevaCarta = () => {
  const botonPedirCarta = document.getElementById("dameCarta");
  if (
    botonPedirCarta !== null &&
    botonPedirCarta !== undefined &&
    botonPedirCarta instanceof HTMLButtonElement
  ) {
    botonPedirCarta.disabled = false;
  }
};

const deshabilitarBotonPlantarse = () => {
  const plantarseboton = document.getElementById("plantarse");
  if (
    plantarseboton !== null &&
    plantarseboton !== undefined &&
    plantarseboton instanceof HTMLButtonElement
  ) {
    plantarseboton.disabled = true;
  }
};

const habilitarBotonPlantarse = () => {
  const plantarseboton = document.getElementById("plantarse");
  if (
    plantarseboton !== null &&
    plantarseboton !== undefined &&
    plantarseboton instanceof HTMLButtonElement
  ) {
    plantarseboton.disabled = false;
  }
};

const habilitarBotonNuevaPartida = () => {
  const nuevaPartidaButton = document.getElementById("plantarse");
  if (
    nuevaPartidaButton !== null &&
    nuevaPartidaButton !== undefined &&
    nuevaPartidaButton instanceof HTMLButtonElement
  ) {
    nuevaPartidaButton.disabled = false;
  }
};
function mostrarBotonNuevaPartida() {
  if (nuevaPartidaButton) {
    nuevaPartidaButton.style.display = "block";
  }
}

// Funcion para mostrar cartas

const mostrarCarta = (carta: number) => {
  const elementoImg = document.getElementById("cartaImagen");
  if (
    elementoImg !== null &&
    elementoImg !== undefined &&
    elementoImg instanceof HTMLImageElement
  ) {
    const urlImagen = devolverUrlCarta(carta);
    elementoImg.src = urlImagen;
  }
};

function devolverUrlCarta(carta: number) {
  switch (carta) {
    case 1:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";

    case 2:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";

    case 3:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";

    case 4:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";

    case 5:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";

    case 6:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";

    case 7:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";

    case 10:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";

    case 11:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";

    case 12:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";

    default:
      return "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
  }
}
