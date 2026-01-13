// Définition des constantes de la grille
const COLONNES = 90; // nombre de colonnes de la grille
const LIGNES = 90; // nombre de lignes de la grille
const TAILLE_CASE = 7; // taille d’un carré affiché à l’écran en pixels

// Définition des types de cellules
const VIDE = 0; // case vide
const PROGENITRICE = 1; // cellule progénitrice
const MIGRANTE = 2; // cellule migrante
const NEURONE = 3; // neurone

// Création des buffers pour stocker l'état actuel et futur de la grille
let grille = []; // grille actuelle
let prochaineGrille = []; // grille de l’état suivant

// Fonction setup() exécutée au démarrage
function setup() {
  createCanvas(COLONNES * TAILLE_CASE + 175, LIGNES * TAILLE_CASE); // création du canvas avec un espace pour la légende
  pixelDensity(1); // ajuste la densité des pixels pour les écrans haute résolution
  noStroke(); // supprime le contour des carrés pour un rendu visuel plus propre

  // Initialisation des grilles
  for (let y = 0; y < LIGNES; y++) { // parcourt toutes les lignes
    grille[y] = []; // crée un tableau vide pour la ligne y dans la grille actuelle
    prochaineGrille[y] = []; // crée un tableau vide pour la ligne y dans la grille suivante
    for (let x = 0; x < COLONNES; x++) { // parcourt toutes les colonnes
      // 40% de chances de créer une cellule progénitrice, sinon case vide
      grille[y][x] = random() < 0.4 ? creerCellule(PROGENITRICE) : creerCellule(VIDE);
      prochaineGrille[y][x] = creerCellule(VIDE); // initialise la grille suivante à vide
    }
  }
}

// Fonction pour créer une cellule avec ses propriétés
function creerCellule(type) {
  return {
    type: type, // type de cellule (VIDE, PROGENITRICE, MIGRANTE, NEURONE)
    energie: random(0.4, 1), // énergie initiale aléatoire entre 0.4 et 1
    activite: 0, // activité neuronale initiale
    age: 0 // âge de la cellule
  };
}

// Fonction qui retourne la liste des voisins d’une cellule
function voisins(x, y) {
  let liste = []; // tableau pour stocker les voisins
  for (let dy = -1; dy <= 1; dy++) { // parcours des lignes voisines
    for (let dx = -1; dx <= 1; dx++) { // parcours des colonnes voisines
      if (dx === 0 && dy === 0) continue; // ignore la cellule elle-même
      let nx = constrain(x + dx, 0, COLONNES - 1); // limite la position x à la grille
      let ny = constrain(y + dy, 0, LIGNES - 1); // limite la position y à la grille
      liste.push({ x: nx, y: ny, cellule: grille[ny][nx] }); // ajoute le voisin et sa position à la liste
    }
  }
  return liste; // retourne la liste des voisins
}

// Fonction qui fait évoluer la grille d’un pas de temps
function etape() {

  // Réinitialisation de la grille suivante à vide
  for (let y = 0; y < LIGNES; y++)
    for (let x = 0; x < COLONNES; x++)
      prochaineGrille[y][x] = creerCellule(VIDE);

  // Parcours de chaque cellule de la grille
  for (let y = 0; y < LIGNES; y++) {
    for (let x = 0; x < COLONNES; x++) {

      let cellule = grille[y][x]; // récupère la cellule actuelle
      cellule.age++; // incrémente l’âge de la cellule

      let listeVoisins = voisins(x, y); // récupère les voisins
      let voisinsNeurones = listeVoisins.filter(v => v.cellule.type === NEURONE).length; // compte les neurones voisins

      // Comportement des cellules progénitrices
      if (cellule.type === PROGENITRICE) {
        // reproduction aléatoire si l’énergie est suffisante
        if (cellule.energie > 0.7 && random() < 0.05)
          reproduire(x, y, PROGENITRICE);

        // transformation en cellule migrante après un certain âge
        if (cellule.age > 15 && random() < 0.04)
          cellule.type = MIGRANTE;

        prochaineGrille[y][x] = cellule; // copie la cellule dans la grille suivante
      }

      // Comportement des cellules migrantes
      else if (cellule.type === MIGRANTE) {
        let direction = [1, random([-1, 0, 1])]; // déplacement vers la droite et aléatoire verticalement
        let nx = constrain(x + direction[0], 0, COLONNES - 1); // calcule nouvelle position x
        let ny = constrain(y + direction[1], 0, LIGNES - 1); // calcule nouvelle position y

        if (grille[ny][nx].type === VIDE) // si la case est vide, déplace la cellule
          prochaineGrille[ny][nx] = cellule;
        else // sinon reste sur place
          prochaineGrille[y][x] = cellule;

        // maturation en neurone après un certain âge
        if (cellule.age > 20) {
          cellule.type = NEURONE;
          cellule.activite = random(0.2); // activité initiale faible
        }
      }

      // Comportement des neurones
      else if (cellule.type === NEURONE) {

        // somme des activités des neurones voisins
        let sommeActivite = listeVoisins.reduce(
          (total, v) => v.cellule.type === NEURONE ? total + v.cellule.activite : total,
          0
        );

        // calcul de l’activité de la cellule avec une fonction sigmoïde
        cellule.activite = 1 / (1 + exp(-(sommeActivite - 1.2)));
        // ajustement de l’énergie selon le nombre de neurones voisins
        cellule.energie += voisinsNeurones * 0.015 - 0.02;

        // reproduction possible si 2 ou 3 neurones voisins
        if (voisinsNeurones === 2 || voisinsNeurones === 3)
          reproduire(x, y, NEURONE);

        // mort d'une cellule si trop peu ou trop de voisins ou énergie faible
        if (voisinsNeurones < 2 || voisinsNeurones > 4 || cellule.energie < 0.05)
          cellule = creerCellule(VIDE);

        prochaineGrille[y][x] = cellule; // copie la cellule dans la grille suivante
      }

      // Comportement des cases vides
      else if (cellule.type === VIDE) {
        // création aléatoire d’une nouvelle cellule
        if (random() < 0.001)
          prochaineGrille[y][x] = creerCellule(random() < 0.5 ? PROGENITRICE : NEURONE);
      }
    }
  }

  // Échange des grilles pour passer à l’état suivant
  let temp = grille;
  grille = prochaineGrille;
  prochaineGrille = temp;
}

// Fonction qui fait se reproduire une cellule dans une case voisine vide
function reproduire(x, y, type) {
  let directions = shuffle([[0,1],[0,-1],[1,0],[-1,0]]); // mélange aléatoire des directions possibles
  for (let d of directions) {
    let nx = x + d[0]; // nouvelle position x
    let ny = y + d[1]; // nouvelle position y
    // si la case est valide et vide, crée une cellule du même type
    if (nx >= 0 && nx < COLONNES && ny >= 0 && ny < LIGNES &&
        grille[ny][nx].type === VIDE) {
      prochaineGrille[ny][nx] = creerCellule(type);
      return; // stoppe la recherche après reproduction
    }
  }
}

// Fonction d’affichage à chaque frame
function draw() {
  background(10); // fond noir
  etape(); // mise à jour de la grille

  // affichage des cellules
  for (let y = 0; y < LIGNES; y++) {
    for (let x = 0; x < COLONNES; x++) {
      let c = grille[y][x]; // récupère la cellule
      if (c.type === PROGENITRICE) fill(0, 180, 100); // vert pour progénitrice
      else if (c.type === MIGRANTE) fill(255, 180, 50); // orange pour migrante
      else if (c.type === NEURONE) fill(200 * c.activite, 120, 255); // bleu/violet selon activité
      else continue; // vide = pas de dessin
      rect(x * TAILLE_CASE, y * TAILLE_CASE, TAILLE_CASE, TAILLE_CASE); // dessine le carré
    }
  }

  dessinerLegende(); // affiche la légende des couleurs
}

// Fonction pour dessiner la légende
function dessinerLegende() {
  let x = COLONNES * TAILLE_CASE + 20; // position x de la légende
  let y = 50; // position y de la légende
  let s = 20; // taille des carrés de légende

  fill(255); // couleur blanche pour le texte
  text("LÉGENDE", x, y - 30);

  fill(0,180,100); rect(x,y,s,s); fill(255);
  text("Progénitrice", x+30, y+15);

  fill(255,180,50); rect(x,y+40,s,s); fill(255);
  text("Migrante", x+30, y+55);

  fill(0,120,255); rect(x,y+80,s,s); fill(255);
  text("Neurone peu actif", x+30, y+95);

  fill(200,120,255); rect(x,y+120,s,s); fill(255);
  text("Neurone actif", x+30, y+135);

  fill(10); rect(x,y+160,s,s); fill(255);
  text("Vide", x+30, y+175);
}

