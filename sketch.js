let osc1,
  osc2,
  playing1,
  playing2,
  freq1,
  amp1,
  freq2,
  amp2,
  shapeSize1,
  shapeColor1,
  shapeSize2,
  shapeColor2,
  bgColor;

function setup() {
  let cnv = createCanvas(400, 400);
  // Asigna la función playOscillators() al evento mousePressed del lienzo
  cnv.mousePressed(playOscillators);
  // Inicializa el primer oscilador con una forma de onda circular
  osc1 = new p5.Oscillator("sine");
  // Inicializa el segundo oscilador con una forma de onda cuadrada
  osc2 = new p5.Oscillator("square");
  // Tamaños y colores iniciales para las formas de los osciladores
  shapeSize1 = 50;
  shapeColor1 = color(255, 165, 0); // Color naranja para el oscilador 1
  shapeSize2 = 50;
  shapeColor2 = color(0, 0, 255); // Color azul para el oscilador 2

  bgColor = color(220, 255);
}

function draw() {
  background(bgColor);

  // Oscilador 1
  freq1 = constrain(map(mouseX, 0, width, 100, 500), 100, 500);
  amp1 = constrain(map(mouseY, height, 0, 0, 1), 0, 1);
  // Ajusta el tamaño y el color del círculo según la frecuencia y amplitud del oscilador 1
  shapeSize1 = map(freq1, 100, 500, 20, 100);
  shapeColor1 = color(255, 165, 0);
  shapeColor1.setAlpha(map(amp1, 0, 1, 100, 255)); // Cambia la opacidad
  fill(shapeColor1);
  ellipse(width / 4, height / 2, shapeSize1, shapeSize1);

  // Oscilador 2
  freq2 = constrain(map(mouseY, 0, height, 200, 800), 200, 800);
  amp2 = constrain(map(mouseX, width, 0, 0, 1), 0, 1);
  // Ajusta el tamaño y el color del rectángulo según la frecuencia y amplitud del oscilador 2
  shapeSize2 = map(freq2, 200, 800, 20, 100);
  shapeColor2 = color(0, 0, 255);
  shapeColor2.setAlpha(map(amp2, 0, 1, 100, 255)); // Cambia la opacidad
  fill(shapeColor2);
  rect(
    (3 * width) / 4 - shapeSize2 / 2,
    height / 2 - shapeSize2 / 2,
    shapeSize2,
    shapeSize2
  );

  // Info en la esquina superior izquierda sin opacidad
  fill(0);
  noStroke();
  text("tap to play", 20, 20);
  text("freq1: " + freq1 + ", amp1: " + amp1, 20, 40);
  text("freq2: " + freq2 + ", amp2: " + amp2, 20, 60);

  // Controla los osciladores según su estado de reproducción
  if (playing1) {
    osc1.freq(freq1, 0.1);
    osc1.amp(amp1, 0.1);
  }

  if (playing2) {
    osc2.freq(freq2, 0.1);
    osc2.amp(amp2, 0.1);
  }
}

// Se ejecuta cuando se presiona el lienzo
function playOscillators() {
  // Inicia ambos osciladores al presionar el lienzo
  osc1.start();
  osc2.start();
  playing1 = true;
  playing2 = true;
}

// Se ejecuta cuando se suelta el botón del mouse
function mouseReleased() {
  // Reduce la amplitud de ambos osciladores al soltar el botón del mouse
  osc1.amp(0, 0.5);
  osc2.amp(0, 0.5);
  playing1 = false;
  playing2 = false;
}