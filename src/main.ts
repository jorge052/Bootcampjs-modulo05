import "./style.css";

let puntuacion = 0;
let gameOver = false;
let partidaTerminada = false;
let siguienteCarta: number;

const nuevaCarta = document.getElementById("dameCarta");
const plantarseboton = document.getElementById("plantarse");
const saberMasButton = document.getElementById("saberMas");
const mostraPuntuacionElemento = document.getElementById("mostrarPuntuacion");
const nuevaPartidaButton = document.getElementById("nuevaPartida");

document.addEventListener("DOMContentLoaded", function () {
  muestraPuntuacion();
});

//Funcion para mostrar puntuacion

function muestraPuntuacion() {
  if (mostraPuntuacionElemento) {
    mostraPuntuacionElemento.textContent = `Puntuación actual: ${puntuacion}`;
  }
}

// Bloque de codigo para obtener nueva carta y Game over

function dameCarta() {
  const numeroCarta = Math.floor(Math.random() * 10) + 1;
  if (numeroCarta > 7) {
    return numeroCarta + 2;
  }
  return numeroCarta;
}

if (nuevaCarta instanceof HTMLButtonElement) {
  nuevaCarta.addEventListener("click", mostrarCartaNueva);
}

function mostrarCartaNueva() {
  if (!gameOver) {
    const cartaNueva = dameCarta();
    console.log("Carta elegida:", cartaNueva);
    mostrarCarta(cartaNueva);
    sumarPuntuacion(cartaNueva);

    if (puntuacion > 7.5) {
      gameOver = true;
      partidaTerminada = true;
      mostrarMensaje("Game Over");
      determinarFinPartida();
    }
  }
}

function mostrarMensaje(mensaje: string) {
  const fin = document.getElementById("gameOver");
  if (fin) {
    fin.innerHTML = `${mensaje}`;
  }
}

// Bloque de codigo para plantarse

if (plantarseboton instanceof HTMLButtonElement) {
  plantarseboton.addEventListener("click", plantarse);
}

function plantarse() {
  if (!gameOver) {
    gameOver = true;
    let mensaje = "";

    if (puntuacion < 4) {
      mensaje = "Has sido muy conservador";
    } else if (puntuacion >= 4 && puntuacion < 6) {
      mensaje = "Te ha entrado el canguelo eh?";
    } else if (puntuacion >= 6 && puntuacion <= 7) {
      mensaje = "Casi casí...";
    } else if (puntuacion === 7.5) {
      mensaje = "¡Lo has clavado! ¡Enhorabuena!";
    }

    mostrarMensaje(mensaje);
    determinarFinPartida();
    mostrarBotonSabermas();
  }
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

// Bloque de codigo para Nueva partida y terminar partida.

if (nuevaPartidaButton instanceof HTMLButtonElement) {
  nuevaPartidaButton.addEventListener("click", iniciarNuevaPartida);
}

function iniciarNuevaPartida() {
  puntuacion = 0;
  gameOver = false;
  partidaTerminada = false;
  muestraPuntuacion();
  ocultarBotonNuevaPartida();
}

function determinarFinPartida() {
  if (gameOver || partidaTerminada) {
    mostrarBotonNuevaPartida();
  }
}

// Desactivar botones

function ocultarBotonNuevaPartida() {
  if (nuevaPartidaButton) {
    nuevaPartidaButton.style.display = "none";
  }
}

function mostrarBotonNuevaPartida() {
  if (nuevaPartidaButton) {
    nuevaPartidaButton.style.display = "block";
  }
}

// Funcion para sumar puntos

function sumarPuntuacion(cartaValor: number) {
  puntuacion += cartaValor; // Sumar el valor de la carta a la puntuación total
  muestraPuntuacion(); // Actualizar la  puntuación
  if (puntuacion > 7.5) {
    gameOver = true;
  }
}

// Funcion para mostrar cartas

function mostrarCarta(carta: number) {
  const imgCarta = document.getElementById("cartaImagen") as HTMLImageElement;
  switch (carta) {
    case 1:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/1_as-copas.jpg";
      break;
    case 2:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/2_dos-copas.jpg";
      break;
    case 3:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/3_tres-copas.jpg";
      break;
    case 4:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/4_cuatro-copas.jpg";
      break;
    case 5:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/5_cinco-copas.jpg";
      break;
    case 6:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/6_seis-copas.jpg";
      break;
    case 7:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/7_siete-copas.jpg";
      break;
    case 10:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/10_sota-copas.jpg";
      break;
    case 11:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/11_caballo-copas.jpg";
      break;
    case 12:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/copas/12_rey-copas.jpg";
      break;
    default:
      imgCarta.src =
        "https://raw.githubusercontent.com/Lemoncode/fotos-ejemplos/main/cartas/back.jpg";
      break;
  }
}
