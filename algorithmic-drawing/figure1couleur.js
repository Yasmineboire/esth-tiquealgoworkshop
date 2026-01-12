let Xrsl = 640;//initialisation abscisses
let Yrsl = 480;//initialisation ordonées

function setup() {
  createCanvas(Xrsl, Yrsl);//initialisation du rectangle
  background(60,120,60);//fond vert foncé
  noFill();//formes non remplies
  stroke(0,80,0);//couleur vert plus clair 

  let N = 0;//position du coin supérieur gauche du rectangle
  let X = Xrsl;//abcisse
  let Y = Yrsl;//ordonée
  let D = 0;//épaisseur

  while (X - N > 0 && Y - N > 0)//empêche de dessiner des rectangles trop petits
  {
    D++;//augmentation de l'épaisseur
    strokeWeight(D);

    N = N + D + 1;
    X = X - D - 10;//réduction de la largeur
    Y = Y - D - 10;//réduction de la haureur 

    rect(N, N, X - N, Y - N);
  }
}
