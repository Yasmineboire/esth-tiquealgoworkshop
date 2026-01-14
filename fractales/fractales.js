let segments = [];// Liste qui contiendra tous les morceaux de la courbe
let endSegment;// Variable qui mémorise le dernier segment ajouté
let zoom = 1;// Valeur de l'agrandissement à l'écran
let targetZoom = 1;// Valeur de zoom pour la prochaine étape
let amt = 0;// Compteur qui va de 0 à 1 pour animer la transition

function setup() {
  createCanvas(640, 360);//Fonction qui crée une zone de dessin de 640x360 px
  
  //Coordonnées de départ du tout premier trait
  let b = createVector(0, 0);// Point B à l'origine
  let a = createVector(0, 180);// Point A 180 pixels plus bas
  
  //Point de fin
  endPoint = b;
  
  //On utilise les points a et b, et b comme points de pivot (tourne autour)
  endSegment = new Segment(a, b, b);
  endSegment.completed = true;
  
  //Ajoute le segment initial dans la première liste de segments
  segments.push(endSegment);
}

let firstTime = true;//Exception lors de la première rotation

function nextGeneration() {
  //liste vide pour stocker les nouveaux segments de cette génération
  let newSegments = [];
  
  //On parcourt chaque segment pour créer son double
  for (let s of segments) {
    
    //On duplique le segment actuel en le faisant tourner autour du point 'a' du dernier segment
    let newS = s.duplicate(endSegment.a);
    
    //lors de la toute première étape, on tourne autour de 'b'
    if (firstTime) {
      newS.origin = endSegment.b; // On change le point d'origine du pivot
      firstTime = false;          // On désactive ce cas spécial
    }

    //On ajoute le nouveau segment dupliqué à notre liste temporaire
    newSegments.push(newS);
  }

  //Le nouveau segment de fin devient le premier de la nouvelle série
  endSegment = newSegments[0];
  
  //On ajoute tous les nouveaux segments à la liste principale
  segments = segments.concat(newSegments);
}

function draw() {
  background(255);//fond blanc
  
  translate(width / 2, height / 2);//centre du dessin au milieu du canvas
  
  // Calcule une valeur de zoom entre l'actuel et le prochain(cible)
  let newZoom = lerp(zoom, targetZoom, amt);
  scale(newZoom);//Applique ce zoom à tout les dessins

  
  amt += 0.01;//progression de l'image
  
  
  for (let s of segments) {
    // Si le segment n'est pas encore fixé on met à jour son animation
    if (!s.completed) {
      s.update();
    }
    s.show();//Dessin du segment sur le canvas
  }

  if (amt >= 1) {
    // On marque tous les segments actuels comme "terminés" (fixes)
    for (let s of segments) {
      s.completed = true;
    }
    
    // On lance la création de la génération suivante en doublant les segments
    nextGeneration();
    
    // On réinitialise l'animation et on met à jour les valeurs de zoom
    amt = 0;// On repart de 0 pour la nouvelle animation
    zoom = newZoom;// Le zoom actuel devient la nouvelle base
    targetZoom = zoom / sqrt(2); // On réduit la cible pour que la figure qui a doublé reste à l'écran
  }
}
