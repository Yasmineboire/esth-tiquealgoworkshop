let neurons = [];       // tableau contenant tous les neurones
let impulses = [];     // tableau contenant les impulsions électriques
let zoomLevel = 1;     // niveau de zoom actuel
let targetZoom = 1;    // niveau de zoom visé (pour animation fluide)
let targetX, targetY, currentX, currentY; // position de la caméra

function setup() {
  createCanvas(windowWidth, windowHeight); // canvas plein écran
  colorMode(HSB, 360, 100, 100, 100); // mode couleur HSB
  angleMode(DEGREES); // angles en degrés
  
  // position initiale de la caméra
  currentX = width / 2;
  currentY = height / 2;
  targetX = width / 2;
  targetY = height / 2;

  // création de 15 neurones à des positions aléatoires
  for (let i = 0; i < 15; i++) {
    neurons.push(
      new Neuron(
        random(width * 0.1, width * 0.9),
        random(height * 0.1, height * 0.9)
      )
    );
  }
}

function draw() {
  background(240, 80, 5); // fond sombre bleu nuit

  // animation fluide du zoom et du déplacement de la caméra
  zoomLevel = lerp(zoomLevel, targetZoom, 0.08);
  currentX = lerp(currentX, targetX, 0.08);
  currentY = lerp(currentY, targetY, 0.08);

  push();
  // application du zoom centré sur la caméra
  translate(width / 2, height / 2);
  scale(zoomLevel);
  translate(-currentX, -currentY);

  // affichage des branches (dendrites)
  for (let n of neurons) {
    n.displayBranches();
  }

  // création régulière des impulsions électriques
  if (frameCount % 30 === 0) { // toutes les 0,5 secondes
    let n1 = random(neurons);
    let n2 = random(neurons);
    if (n1 !== n2) impulses.push(new Impulse(n1, n2));
  }

  // animation et affichage des impulsions
  for (let i = impulses.length - 1; i >= 0; i--) {
    impulses[i].update();
    impulses[i].show();
    if (impulses[i].isFinished()) impulses.splice(i, 1);
  }

  // affichage du corps des neurones
  for (let n of neurons) {
    n.showSoma();
  }
  pop();
}

function mousePressed() {
  // conversion de la position de la souris dans le monde zoomé
  let worldMouseX = (mouseX - width / 2) / zoomLevel + currentX;
  let worldMouseY = (mouseY - height / 2) / zoomLevel + currentY;

  let found = false;
  for (let n of neurons) {
    // si on clique sur un neurone
    if (dist(worldMouseX, worldMouseY, n.pos.x, n.pos.y) < 40) {
      targetZoom = 3.5; // zoom sur le neurone
      targetX = n.pos.x;
      targetY = n.pos.y;
      found = true;
      break;
    }
  }

  // si clic dans le vide, retour à la vue générale
  if (!found) {
    targetZoom = 1;
    targetX = width / 2;
    targetY = height / 2;
  }
}

class Neuron {
  constructor(x, y) {
    this.pos = createVector(x, y); // position du neurone
    this.hue = random([180, 200, 280, 310]); // couleurs froides
    this.size = random(20, 35); // taille du neurone
    this.offset = random(1000); // décalage pour animation organique
  }

  showSoma() {
    push();
    translate(this.pos.x, this.pos.y);
    
    // scintillement du noyau
    let flicker = map(
      sin(frameCount * 5 + this.offset),
      -1, 1, 0.8, 1.2
    );
    
    noStroke();
    // aura lumineuse autour du neurone
    for (let i = 10; i > 0; i--) {
      fill(this.hue, 80, 100, (12 - i) * 1.5);
      ellipse(0, 0, this.size * i * 0.5 * flicker);
    }

    // cœur lumineux du neurone
    fill(this.hue, 20, 100, 90);
    ellipse(0, 0, this.size * flicker);
    fill(50, 50, 100, 100);
    ellipse(0, 0, this.size * 0.4);
    pop();
  }

  displayBranches() {
    // seed fixe pour garder la même structure de branches
    randomSeed(this.offset); 
    let branches = 6;

    // création des branches autour du neurone
    for (let i = 0; i < branches; i++) {
      let angle = (360 / branches) * i;
      this.drawRecursiveBranch(this.pos.x, this.pos.y, angle, 4, 100);
    }
  }

  drawRecursiveBranch(x, y, angle, thick, len) {
    // condition d’arrêt de la récursion
    if (len < 7) return;
    
    // légère animation ondulante des branches
    let wave = sin(frameCount * 2 + len) * 2;
    let x2 = x + cos(angle + wave) * len * 0.3;
    let y2 = y + sin(angle + wave) * len * 0.3;
    
    strokeWeight(thick);
    stroke(this.hue, 70, 80, 30); // branches semi-transparentes
    line(x, y, x2, y2);
    
    // rappel récursif pour créer une fractale
    this.drawRecursiveBranch(
      x2, y2,
      angle + random(-20, 20),
      thick * 0.75,
      len * 0.8
    );
  }
}

class Impulse {
  constructor(n1, n2) {
    this.start = n1.pos.copy(); // point de départ
    this.end = n2.pos.copy();   // point d’arrivée
    this.pct = 0;               // progression
    this.speed = random(0.01, 0.03); // vitesse
    this.lightHue = random(40, 60); // couleur électrique
  }
  
  update() {
    // avance de l’impulsion
    this.pct += this.speed;
  }
  
  show() {
    // position interpolée entre deux neurones
    let x = lerp(this.start.x, this.end.x, this.pct);
    let y = lerp(this.start.y, this.end.y, this.pct);
    
    noStroke();
    // effet de traînée lumineuse
    for (let i = 0; i < 5; i++) {
      fill(this.lightHue, 100, 100, 20 - i * 4);
      ellipse(x, y, 5 + i * 3);
    }
    fill(this.lightHue, 0, 100, 100);
    ellipse(x, y, 4);
  }
  
  isFinished() {
    // fin de l’impulsion
    return this.pct >= 1;
  }
}

function windowResized() {
  // adaptation du canvas au redimensionnement
  resizeCanvas(windowWidth, windowHeight);
}
