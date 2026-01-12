let Xrsl = 600;
let Yrsl = 600;

function setup() {
  createCanvas(Xrsl, Yrsl);
  stroke(0, 80, 0); // vert chou foncé
  noFill(0);//formes non remplies
  strokeWeight(1);//trait d'épaisseur d'1 pixel
}

function draw() {
  background(0);//fond noir

  // animation douce avec le temps
  let t = frameCount * 0.02;

  // lancer la fractale animée depuis le centre, fais varier la taille grâce au sinus et fais varier l'angle en fonction du temps(t)
  chou(Xrsl / 2, Yrsl / 2, 200 + 20 * sin(t), t);
}

// fonction fractale récursive ANIMÉE
function chou(x, y, r, angle) {

  // condition d'arrêt si le rayon par rapport au centre dépasse 6 Px
  if (r < 6) return;

  // spirale locale animée
  beginShape();
  let a = angle;
  for (let i = 0; i < 20; i++) {
    let rr = r * i / 20;//plus i augmente plus on s'éloigne du centre
    let px = x + rr * cos(a);//emplacement d'un point
    let py = y + rr * sin(a);//emplacement d'un point
    vertex(px, py);//dépose du point
    a += 0.4 + 0.1 * sin(frameCount * 0.05);
  }
  endShape();

  let branches = 6;//création de 6 petites pousses

  for (let i = 0; i < branches; i++) {
    let newAngle = angle + i * TWO_PI / branches;
    let nx = x + r * 0.6 * cos(newAngle);
    let ny = y + r * 0.6 * sin(newAngle);

    // je rapelle la fonction pour créer 6 autres petites pousses(fractale)
    chou(nx, ny, r * 0.45, newAngle + sin(frameCount * 0.03));
  }
}

