
const tessy = {
  texto1: document.getElementById("texto1"),
  texto2: document.getElementById("texto2") };


// Strings
const strings = [
"",
"Como",
"me",
"gustas",
"preciosa",
"hermosa",
"cachetona",
"TESSY",
"me pones",
"sonso...",
"te quiero",
"mucho <3"
];


// Controla la velocidad de transformación.
const timpoDeTransform = 1;
const tiempoDeCooldown = 0.65;

let textIndex = strings.length - 1;
let time = new Date();
let cambio = 0;
let cooldown = tiempoDeCooldown;

tessy.texto1.textContent = strings[textIndex % strings.length];
tessy.texto2.textContent = strings[(textIndex + 1) % strings.length];

function doCambio() {
  cambio -= cooldown;
  cooldown = 0;

  let fraccion = cambio / timpoDeTransform;

  if (fraccion > 1) {
    cooldown = tiempoDeCooldown;
    fraccion = 1;
  }

  setCambio(fraccion);
}

// aplica el filtro de desenfoque al texto mi king!!
function setCambio(fraccion) {
  // fraccion = Math.cos(fraccion * Math.PI) / -2 + .5;

  tessy.texto2.style.filter = `blur(${Math.min(8 / fraccion - 8, 100)}px)`;
  tessy.texto2.style.opacity = `${Math.pow(fraccion, 0.4) * 100}%`;

  fraccion = 1 - fraccion;
  tessy.texto1.style.filter = `blur(${Math.min(8 / fraccion - 8, 100)}px)`;
  tessy.texto1.style.opacity = `${Math.pow(fraccion, 0.4) * 100}%`;

  tessy.texto1.textContent = strings[textIndex % strings.length];
  tessy.texto2.textContent = strings[(textIndex + 1) % strings.length];
}

function doCooldown() {
  cambio = 0;

  tessy.texto2.style.filter = "";
  tessy.texto2.style.opacity = "100%";

  tessy.texto1.style.filter = "";
  tessy.texto1.style.opacity = "0%";
}

// Bucle de animación, que se llama cada fotograma.
function animate() {
  requestAnimationFrame(animate);

  let newTime = new Date();
  let debeIncrementar = cooldown > 0;
  let dt = (newTime - time) / 1000;
  time = newTime;

  cooldown -= dt;

  if (cooldown <= 0) {
    if (debeIncrementar) {
      textIndex++;
    }

    doCambio();
  } else {
    doCooldown();
  }
}

// Iniciar la funcion de animacion!!!!.
animate();