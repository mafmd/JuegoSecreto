let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    if (elementoHTML) { // Verifica que el elemento exista
        elementoHTML.innerHTML = texto;
    }
}

function verificarIntento() {
    let numeroDeUsuario = parseInt(document.getElementById("valorUsuario").value);
    
    if (!isNaN(numeroDeUsuario)) { // Verifica que el valor ingresado sea un número
        intentos++; // Incrementa los intentos

        if (numeroDeUsuario === numeroSecreto) {
            asignarTextoElemento("p", `¡Acertaste el número en ${intentos} ${(intentos === 1) ? "vez" : "veces"}!`);
            document.getElementById('reiniciar').removeAttribute('disabled');
        } else {
            if (numeroDeUsuario > numeroSecreto) {
                asignarTextoElemento("p", "El número secreto es menor.");
            } else {
                asignarTextoElemento("p", "El número secreto es mayor.");
            }
            limpiarCaja();
        }
    } else {
        asignarTextoElemento("p", "Por favor, ingresa un número válido.");
    }
}

function limpiarCaja() {
    document.querySelector("#valorUsuario").value = "";
}

function generarNumeroSecreto() {
    if (listaNumerosSorteados.length === numeroMaximo) {
        asignarTextoElemento("p", "Ya se sortearon todos los números posibles.");
        return null; // Evita seguir generando números si ya se han sorteado todos
    }
    
    let numeroGenerado;
    do {
        numeroGenerado = Math.floor(Math.random() * numeroMaximo) + 1;
    } while (listaNumerosSorteados.includes(numeroGenerado));
    
    listaNumerosSorteados.push(numeroGenerado);
    return numeroGenerado;
}

function condicionesIniciales() {
    asignarTextoElemento("h1", "¡Juego del número secreto!");
    asignarTextoElemento("p", `Indica un número del 1 al ${numeroMaximo}`);
    numeroSecreto = generarNumeroSecreto();
    intentos = 0; // Reinicia el contador de intentos
    document.getElementById('reiniciar').setAttribute('disabled', 'true'); // Desactiva el botón de reiniciar al iniciar el juego
}

function reiniciarJuego() {
    listaNumerosSorteados = []; // Reinicia la lista de números sorteados
    limpiarCaja(); // Limpia la caja de entrada
    condicionesIniciales(); // Restablece las condiciones iniciales
}
// Inicia el juego al cargar la página
condicionesIniciales();
