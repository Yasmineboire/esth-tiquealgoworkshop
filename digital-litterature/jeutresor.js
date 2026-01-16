let etat = "menu"; // menu,jeu,victoire,defaite

let toursMax = 4;
let tour = 0;
let message = "";

let personnages = ["Jack", "Anne", "Barbe", "Morgan"];
let lieux = ["Plage", "Grotte", "Navire", "Jungle"];
let accessoires = ["Clé", "Carte", "Code", "Mot"];

// Secrets
let secretPerso, secretLieu, secretAcc;

// Choix joueur
let choixPerso = null;
let choixLieu = null;
let choixAcc = null;

// indices 3 niveaux
let indicesPersos = {
  Jack: [
    "Il aime l'air libre",
    "Il est souvent près de la mer",
    "Il a caché le trésor sur la plage"
  ],
  Anne: [
    "Elle évite la terre",
    "Elle commande un équipage",
    "Elle se trouve sur le navire"
  ],
  Barbe: [
    "Il fuit la lumière",
    "Il aime l'humidité",
    "Il est dans la grotte"
  ],
  Morgan: [
    "Il explore beaucoup",
    "Il aime la nature",
    "Il est dans la jungle"
  ]
};

let indicesLieux = {
  Plage: [
    "On entend l'eau",
    "Le sol est clair",
    "Le trésor est sur la plage"
  ],
  Grotte: [
    "Il fait sombre",
    "L'air est humide",
    "Le trésor est dans une grotte"
  ],
  Navire: [
    "Le bois craque",
    "Tout bouge légèrement",
    "Le trésor est sur un navire"
  ],
  Jungle: [
    "La végétation est dense",
    "Des animaux font du bruit",
    "Le trésor est dans la jungle"
  ]
};

let indicesAccessoires = {
  Clé: [
    "Un petit objet est nécessaire",
    "Il est métallique",
    "Une clé ouvre le trésor"
  ],
  Carte: [
    "Un objet ancien aide",
    "Il montre des chemins",
    "Une carte magique est requise"
  ],
  Code: [
    "Des chiffres sont importants",
    "Un ordre précis est requis",
    "Un code secret ouvre le trésor"
  ],
  Mot: [
    "La voix est importante",
    "Un langage ancien est requis",
    "Un mot de passe ouvre le trésor"
  ]
};

function setup() {
  createCanvas(1000, 600); // création de la fenêtre du jeu
  textFont("monospace"); // police monospace pour le texte

  // tirage aléatoire de la combinaison secrète
  secretPerso = random(personnages);
  secretLieu = random(lieux);
  secretAcc = random(accessoires);
}

function draw() {
  background(30, 90, 80); // fond vert/bleuté

  // affichage des pages selon l'état du jeu
  if (etat === "menu") pageMenu();
  if (etat === "jeu") pageJeu();
  if (etat === "victoire") pageVictoire();
  if (etat === "defaite") pageDefaite();
}

function pageMenu() {
  fill(255);
  textAlign(CENTER);
  textSize(30);
  text("LE TRÉSOR CACHÉ ", width / 2, 100); // titre du jeu

  textSize(16);
  // texte explicatif des règles
  text(
    "Un trésor légendaire a été caché.\n\n" +
      "Tu as 3 tours pour trouver :\n" +
      "- le personnage\n- le lieu\n- l'accessoire\n\n" +
      "Clique sur START pour commencer.",
    width / 2,
    220
  );

  // bouton pour démarrer le jeu
  drawBouton(width / 2 - 100, 380, 200, 50, "START");
}

function pageJeu() {
  fill(255);
  textAlign(LEFT);
  textSize(16);
  // affichage du numéro du tour
  text("Tour : " + (tour + 1) + " / 3", 20, 30);

  // affichage des éléments du jeu
  afficherSelections();
  afficherPersonnages();
  afficherLieux();
  afficherAccessoires();
  afficherMessage();

  // bouton pour valider la combinaison
  drawBouton(780, 500, 180, 50, "VALIDER");
}

function afficherPersonnages() {
  text("Personnages :", 20, 80);
  afficherLigne(personnages, 20, 100, choixPerso);
}

function afficherLieux() {
  text("Lieux :", 45, 220);
  afficherLigne(lieux, 20, 240, choixLieu);
}

function afficherAccessoires() {
  text("Accessoires :", 80, 360);
  afficherLigne(accessoires, 20, 380, choixAcc);
}

function afficherLigne(liste, x, y, selection) {
  // affiche une ligne de boutons cliquables
  for (let i = 0; i < liste.length; i++) {
    let bx = x + i * 180; // position horizontale du bouton
    let bw = 160;
    let bh = 60;

    // bouton clair si sélectionné, sinon grisé
    fill(liste[i] === selection ? 255 : 180);
    rect(bx, y, bw, bh, 10);

    fill(0);
    textAlign(CENTER, CENTER);
    text(liste[i], bx + bw / 2, y + bh / 2);
  }
}

function afficherSelections() {
  fill(255);
  // affiche les choix actuels du joueur
  text(
    "Choix : " +
      (choixPerso || "-") +
      " | " +
      (choixLieu || "-") +
      " | " +
      (choixAcc || "-"),
    600,
    80
  );
}

function afficherMessage() {
  fill(255);
  textAlign(LEFT);
  // message d'aide ou d'indice
  text(message, 20, 500, 750);
}

function mousePressed() {
  // clic sur START dans le menu
  if (etat === "menu" && clic(width / 2 - 100, 380, 200, 50)) {
    etat = "jeu";
  }

  if (etat === "jeu") {
    // détection des clics sur les choix
    detecterClic(personnages, 20, 100, (v) => (choixPerso = v));
    detecterClic(lieux, 20, 240, (v) => (choixLieu = v));
    detecterClic(accessoires, 20, 380, (v) => (choixAcc = v));

    // clic sur le bouton valider
    if (clic(780, 500, 180, 50)) verifier();
  }
}

function verifier() {
  // vérifie si tous les choix ont été faits
  if (!choixPerso || !choixLieu || !choixAcc) {
    message = "Tu dois faire les 3 choix.";
    return;
  }

  // vérifie si la combinaison est correcte
  if (
    choixPerso === secretPerso &&
    choixLieu === secretLieu &&
    choixAcc === secretAcc
  ) {
    etat = "victoire";
    return;
  }

  // affiche les indices si la combinaison est fausse
  message =
    "Mauvaise combinaison\n\n" +
    "Personnage : " + indicesPersos[secretPerso][tour] + "\n" +
    "Lieu : " + indicesLieux[secretLieu][tour] + "\n" +
    "Accessoire : " + indicesAccessoires[secretAcc][tour];

  tour++;

  // fin du jeu si plus de tours
  if (tour >= toursMax) {
    etat = "defaite";
  }
}

function pageVictoire() {
  fill(255);
  textAlign(CENTER);
  textSize(32);
  // écran de victoire
  text("TRÉSOR TROUVÉ !", width / 2, height / 2);
}

function pageDefaite() {
  fill(255);
  textAlign(CENTER);
  textSize(24);
  // écran de défaite avec la solution
  text(
    "GAME OVER \n\nSolution :\n" +
      secretPerso +
      " - " +
      secretLieu +
      " - " +
      secretAcc,
    width / 2,
    height / 2
  );
}

function detecterClic(liste, x, y, action) {
  // détecte quel bouton est cliqué dans une ligne
  for (let i = 0; i < liste.length; i++) {
    let bx = x + i * 180;
    if (clic(bx, y, 160, 60)) action(liste[i]);
  }
}

function drawBouton(x, y, w, h, label) {
  // dessine un bouton avec texte centré
  fill(120);
  rect(x, y, w, h, 10);
  fill(255);
  textAlign(CENTER, CENTER);
  text(label, x + w / 2, y + h / 2);
}

function clic(x, y, w, h) {
  // retourne vrai si la souris est dans la zone
  return mouseX > x && mouseX < x + w && mouseY > y && mouseY < y + h;
}
