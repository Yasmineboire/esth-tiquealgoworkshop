let neurons = [];
let impulses = [];
let zoomLevel = 1;
let targetZoom = 1;
let targetX, targetY, currentX, currentY;

function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB, 360, 100, 100, 100);
  angleMode(DEGREES);
  
  // Initialisation des positions de caméra
  currentX = width / 2;
  currentY = height / 2;
  targetX = width / 2;
  targetY = height / 2;

  // Création des neurones
  for (let i = 0; i < 15; i++) {
    neurons.push(new Neuron(random(width * 0.1, width * 0.9), random(height * 0.1, height * 0.9)));
  }
}

function draw() {
  background(240, 80, 5); // Fond bleu nuit profond

  // Gestion fluide de la caméra (Zoom et Position)
  zoomLevel = lerp(zoomLevel, targetZoom, 0.08);
  currentX = lerp(currentX, targetX, 0.08);
  currentY = lerp(currentY, targetY, 0.08);

  push();
  // Application de la transformation de zoom centrée
  translate(width / 2, height / 2);
  scale(zoomLevel);
  translate(-currentX, -currentY);

  // 1. Dessiner les filaments (Dendrites)
  for (let n of neurons) {
    n.displayBranches();
  }

  // 2. Créer et animer les impulsions électriques
  if (frameCount % 30 === 0) { // Nouvelle impulsion toutes les 0.5s
    let n1 = random(neurons);
    let n2 = random(neurons);
    if (n1 !== n2) impulses.push(new Impulse(n1, n2));
  }

  for (let i = impulses.length - 1; i >= 0; i--) {
    impulses[i].update();
    impulses[i].show();
    if (impulses[i].isFinished()) impulses.splice(i, 1);
  }

  // 3. Dessiner les corps des neurones (Somas)
  for (let n of neurons) {
    n.showSoma();
  }
  pop();
}

function mousePressed() {
  // Conversion coordonnées souris vers le monde zoomé
  let worldMouseX = (mouseX - width / 2) / zoomLevel + currentX;
  let worldMouseY = (mouseY - height / 2) / zoomLevel + currentY;

  let found = false;
  for (let n of neurons) {
    if (dist(worldMouseX, worldMouseY, n.pos.x, n.pos.y) < 40) {
      targetZoom = 3.5; // Zoom puissant
      targetX = n.pos.x;
      targetY = n.pos.y;
      found = true;
      break;
    }
  }

  // Si clic dans le vide, retour à la vue d'ensemble
  if (!found) {
    targetZoom = 1;
    targetX = width / 2;
    targetY = height / 2;
  }
}

class Neuron {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.hue = random([180, 200, 280, 310]); // Turquoises et Violets
    this.size = random(20, 35);
    this.offset = random(1000); // Pour un mouvement organique individuel
  }

  showSoma() {
    push();
    translate(this.pos.x, this.pos.y);
    
    // Scintillement du noyau
    let flicker = map(sin(frameCount * 5 + this.offset), -1, 1, 0.8, 1.2);
    
    noStroke();
    // Aura lumineuse
    for (let i = 10; i > 0; i--) {
      fill(this.hue, 80, 100, (12 - i) * 1.5);
      ellipse(0, 0, this.size * i * 0.5 * flicker);
    }
    // Cœur blanc/chaud
    fill(this.hue, 20, 100, 90);
    ellipse(0, 0, this.size * flicker);
    fill(50, 50, 100, 100);
    ellipse(0, 0, this.size * 0.4);
    pop();
  }

  displayBranches() {
    // On utilise un seed fixe par neurone pour que les branches ne sautent pas
    // mais on ajoute un petit mouvement sinusoïdal
    randomSeed(this.offset); 
    let branches = 6;
    for (let i = 0; i < branches; i++) {
      let angle = (360 / branches) * i;
      this.drawRecursiveBranch(this.pos.x, this.pos.y, angle, 4, 100);
    }
  }

  drawRecursiveBranch(x, y, angle, thick, len) {
    if (len < 7) return;
    
    // Animation légère des branches
    let wave = sin(frameCount * 2 + len) * 2;
    let x2 = x + cos(angle + wave) * len * 0.3;
    let y2 = y + sin(angle + wave) * len * 0.3;
    
    strokeWeight(thick);
    stroke(this.hue, 70, 80, 30); // Filaments semi-transparents
    line(x, y, x2, y2);
    
    this.drawRecursiveBranch(x2, y2, angle + random(-20, 20), thick * 0.75, len * 0.8);
  }
}

class Impulse {
  constructor(n1, n2) {
    this.start = n1.pos.copy();
    this.end = n2.pos.copy();
    this.pct = 0;
    this.speed = random(0.01, 0.03);
    this.lightHue = random(40, 60); // Jaune/Blanc électrique
  }
  
  update() {
    this.pct += this.speed;
  }
  
  show() {
    let x = lerp(this.start.x, this.end.x, this.pct);
    let y = lerp(this.start.y, this.end.y, this.pct);
    
    noStroke();
    // Effet de traînée lumineuse
    for(let i=0; i<5; i++) {
      fill(this.lightHue, 100, 100, 20 - i*4);
      ellipse(x, y, 5 + i*3);
    }
    fill(this.lightHue, 0, 100, 100);
    ellipse(x, y, 4);
  }
  
  isFinished() {
    return this.pct >= 1;
  }
}

function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
}
