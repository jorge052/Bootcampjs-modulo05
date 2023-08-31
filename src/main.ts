import "./style.css";

let puntosTotales = 0;
let siguienteCarta: number;
let urlCarta: string =
  "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas";

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

// Eventlisteners

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

const generarCarta = (numeroAletorio: number): number => {
  if (numeroAletorio > 7) {
    return numeroAletorio + 2;
  }
  return numeroAletorio;
};

const devolverPuntos = (carta: number): number => {
  if (carta <= 7) {
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
    partidaGanada();
  } else if (puntosTotales > 7.5) {
    partidaPerdida();
  }
};

const partidaGanada = () => {
  if (puntosTotales === 7.5) {
    mostrarMensaje(`partida ganada ${puntosTotales}`);
    deshabilitarBotonNuevaCarta(true);
    mostrarBotonNuevaPartida();
    deshabilitarBotonPlantarse(true);
  }
};

const partidaPerdida = () => {
  if (puntosTotales > 7.5) {
    mostrarMensaje(`partida perdida ${puntosTotales}`);
    deshabilitarBotonNuevaCarta(true);
    mostrarBotonNuevaPartida();
    deshabilitarBotonPlantarse(true);
  }
};

function iniciarNuevaPartida() {
  puntosTotales = 0;
  deshabilitarBotonNuevaCarta(false);
  deshabilitarBotonPlantarse(false);
  mostrarCarta(0);
  mostrarMensaje(`${"0"}`);

  const elementoImagen = document.getElementById("cartaImagen");
  if (
    elementoImagen !== null &&
    elementoImagen !== undefined &&
    elementoImagen instanceof HTMLImageElement
  ) {
    const urlImagen =
      "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
    elementoImagen.src = urlImagen;
  }
}

// Bloque de codigo para plantarse

function plantarse() {
  mensajesPlantarse();
  mostrarBotonSabermas();
  deshabilitarBotonPlantarse(true);
  deshabilitarBotonNuevaCarta(true);
  habilitarBotonNuevaPartida(false);
  mostrarBotonNuevaPartida();
  deshabilitarBotonSabermas(false);
}

const mensajesPlantarse = () => {
  if (puntosTotales < 4) {
    mostrarMensaje("Has sido muy conservador");
  } else if (puntosTotales >= 4 && puntosTotales < 6) {
    mostrarMensaje("Te ha entrado el canguelo eh?");
  } else if (puntosTotales >= 6 && puntosTotales <= 7) {
    mostrarMensaje("Casi casí...");
  } else if (puntosTotales === 7.5) {
    mostrarMensaje("¡Lo has clavado! ¡Enhorabuena!");
  } else {
    console.log("error");
  }
};

// Saber mas

function mostrarSiguienteCarta() {
  siguienteCarta = generarNumeroAleatorio();
  mostrarCarta(siguienteCarta);
  const numeroAletorio = generarNumeroAleatorio();
  const carta = generarCarta(numeroAletorio);
  mostrarCarta(carta);
  const puntos = devolverPuntos(carta);
  sumarPuntuacion(puntos);
  mostrarMensaje(`${puntosTotales}`);
  revisarMano();
  deshabilitarBotonSabermas(true);
}

function mostrarBotonSabermas() {
  if (
    saberMasButton !== null &&
    saberMasButton !== undefined &&
    saberMasButton instanceof HTMLButtonElement
  ) {
    saberMasButton.addEventListener("click", mostrarSiguienteCarta);
    saberMasButton.style.display = "block";
  }
}

// Habilitar y deshabilitar botones

const deshabilitarBotonNuevaCarta = (estaDeshabilitado: boolean) => {
  const botonPedirCarta = document.getElementById("dameCarta");
  if (
    botonPedirCarta !== null &&
    botonPedirCarta !== undefined &&
    botonPedirCarta instanceof HTMLButtonElement
  ) {
    botonPedirCarta.disabled = estaDeshabilitado;
  }
};

const deshabilitarBotonPlantarse = (estaDeshabilitado: boolean) => {
  const plantarseboton = document.getElementById("plantarse");
  if (
    plantarseboton !== null &&
    plantarseboton !== undefined &&
    plantarseboton instanceof HTMLButtonElement
  ) {
    plantarseboton.disabled = estaDeshabilitado;
  }
};

const deshabilitarBotonSabermas = (estaDeshabilitado: boolean) => {
  const saberMasButton = document.getElementById("saberMas");
  if (
    saberMasButton !== null &&
    saberMasButton !== undefined &&
    saberMasButton instanceof HTMLButtonElement
  ) {
    saberMasButton.disabled = estaDeshabilitado;
  }
};

const habilitarBotonNuevaPartida = (estaDeshabilitado: boolean) => {
  const nuevaPartidaButton = document.getElementById("plantarse");
  if (
    nuevaPartidaButton !== null &&
    nuevaPartidaButton !== undefined &&
    nuevaPartidaButton instanceof HTMLButtonElement
  ) {
    nuevaPartidaButton.disabled = estaDeshabilitado;
  }
};

function mostrarBotonNuevaPartida() {
  if (
    nuevaPartidaButton !== null &&
    nuevaPartidaButton !== undefined &&
    nuevaPartidaButton instanceof HTMLButtonElement
  ) {
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
      return urlCarta + "/copas/1_as-copas.jpg";

    case 2:
      return urlCarta + "/copas/2_dos-copas.jpg";

    case 3:
      return urlCarta + "/copas/3_tres-copas.jpg";

    case 4:
      return urlCarta + "/copas/4_cuatro-copas.jpg";

    case 5:
      return urlCarta + "/copas/5_cinco-copas.jpg";

    case 6:
      return urlCarta + "/copas/6_seis-copas.jpg";

    case 7:
      return urlCarta + "/copas/7_siete-copas.jpg";

    case 10:
      return urlCarta + "/copas/10_sota-copas.jpg";

    case 11:
      return urlCarta + "/copas/11_caballo-copas.jpg";

    case 12:
      return urlCarta + "/copas/12_rey-copas.jpg";

    default:
      return urlCarta + "/back.jpg";
  }
}
