Tous les codes sont écrits en JavaScript et peuvent être ouverts et exécutés directement sur p5.js en ligne.

Réecriture figure 1 couleur :
1) Ce projet crée une série de rectangles imbriqués avec des contours de plus en plus épais. Le fond est vert foncé et les rectangles sont tracés en vert clair, sans remplissage.
2) Procesus :
J'ai crée une zone de dessin qui fait 640×480 pixels. Chaque rectangle est tracé à l’intérieur du précédent, avec une épaisseur de contour croissante. La boucle s’arrête lorsque les rectangles deviennent trop petits pour être dessinés.

Réecriture figure 5
1) Description :
Ce projet crée une animation de carrés imbriqués avec un effet spirale.
Chaque carré est légèrement réduit et tourné pour donner l’impression d’une spirale qui se resserre vers le centre.
2) Procesus :
La zone de dessin fait 600×600 pixels.
J'ai commencer par tracer des carrés au centre de la zone, avec une rotation initiale de 45°.
À chaque itération :
-Le carré est dessiné avec ses 4 côtés.
-Sa taille diminue progressivement.
-L’angle de rotation diminue légèrement (angle -= 0.05) pour créer la spirale.

Projet Chou Romanesco
1) Description du projet :
Ce projet consiste à créer une animation du chou Romanesco. L’objectif était de reproduire la structure fractale du chou et de lui donner un mouvement vivant.
Des spirales sont assemblées pour créer un effet de fractale. J’aime particulièrement ces spirales, qui nous font penser à la suite de Fibonacci, car il existe aussi un rapport constant (0,45) dans leur arrangement. La suite de Fibonacci fonctionne bien avec ces rapports constants, ce qui donne un rendu naturellement harmonieux.
2) Processus :
J’ai d’abord dessiné une spirale, puis j’ai créé des boucles pour en générer plusieurs, chacune devenant le parent de petites spirales, etc.
J’ai commencé avec 6 pousses de départ.
Pour l’animation, j’ai utilisé l’intelligence artificielle pour m’aider à trouver la technique basée sur la fonction sinus, permettant de faire varier le centre des pousses. Cela donne un mouvement fluide et harmonieux.
Le projet combine donc l’algorithme et le dessin, et s’inscrit dans le thème du algorithmic drawing, ou plus largement dans l’esthétique générée par les algorithmes.
3) Pistes d’amélioration:
-Passer à la 3D pour créer des choux ultra-réalistes.
-Utiliser des fonctions plus complexes de Fibonacci pour générer les spirales plutôt que de simples spirales 2D.
