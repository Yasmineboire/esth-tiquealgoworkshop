let Xrsl = 600;//initialisation abscisses
let Yrsl = 600;//initialisation ordonées

function setup() {
  createCanvas(Xrsl, Yrsl);//création de zone de dessin
  background(255);//fond blanc
  stroke(0);//lignes noirs
  noFill();//pas de remplissage
  strokeWeight(1);//épaisseur des lignes

  let A = Xrsl / 2; // centre X
  let B = Yrsl / 2; // centre Y
  let nblignes = 200;  // nombre de lignes
  let R = Xrsl / 2; // taille initiale
  let angle = PI / 4; // rotation initiale de 45 degrés

  for (let i = 0; i < nblignes; i++) {
    // calcul des coins du carré avec rotation
    let x1 = A + R * cos(angle);
    let y1 = B + R * sin(angle);

    let x2 = A + R * cos(angle+ HALF_PI);
    let y2 = B + R * sin(angle + HALF_PI);

    let x3 = A + R * cos(angle + PI);
    let y3 = B + R * sin(angle + PI);

    let x4 = A + R * cos(angle + 3 * HALF_PI);
    let y4 = B + R * sin(angle + 3 * HALF_PI);

    // lignes du carré entre les coins
    line(x1, y1, x2, y2);
    line(x2, y2, x3, y3);
    line(x3, y3, x4, y4);
    line(x4, y4, x1, y1);

    // réduction progressive du carré pour un effet spirale
    R *= 0.95;

    // rotation progressive
    angle -= 0.05;
  }
}





