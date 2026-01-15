class Segment {
  constructor(a, b, origin) {
    // Positions initiales du segment
    this.startA = a;
    this.startB = b;

    // Positions actuelles du segment
    this.a = a.copy();
    this.b = b.copy();
    
    this.completed = false;
    
    // Angle de rotation
    this.angle = 0;

    // Point autour duquel le segment va tourner
    //copie
    this.origin = origin.copy();
  }

  // Affiche le segment en ligne sur le canvas
  show() {
    stroke(0); // Couleur noire
    // Ajuste l’épaisseur du trait en fonction du zoom
    strokeWeight(2 / zoom);
    // Dessine la ligne entre les deux extrémités actuelles
    line(this.a.x, this.a.y, this.b.x, this.b.y);
  }

  // Crée une copie du segment avec un nouveau point de rotation (pivot)
  duplicate(origin) {
    // Les points a et b sont copiés pour éviter les références partagées
    return new Segment(this.a.copy(), this.b.copy(), origin);
  }

  // Met à jour la position du segment pendant l’animation
  update() {
    // amt varie de 0 à 1 dans draw()
    this.angle = lerp(0, PI / 2, amt);
    
    // Calcule les vecteurs allant du pivot vers les points initiaux
    let va = p5.Vector.sub(this.startA, this.origin);
    let vb = p5.Vector.sub(this.startB, this.origin);
    
    // Fait tourner ces vecteurs autour du pivot
    va.rotate(-this.angle);
    vb.rotate(-this.angle);
    
    // Recalcule les nouvelles positions du segment après rotation
    this.a = p5.Vector.add(this.origin, va);
    this.b = p5.Vector.add(this.origin, vb);
  }
}
