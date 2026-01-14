Projet Dragon Curve

1) Concept :
Ce projet utilise p5.js pour générer et animer la fractale. J'ai utilisé un processus de duplication et de rotation des figures.
2) Description :
Le code simule le pliage successif d'un segment pour créer ce qu'on appelle la Courbe du Dragon. Le canvas est de 640 par 360 pixels. Il crée un premier segment vertical positionné au centre. Ce segment initial sert de pilier pour toutes les structures futures. On initialise aussi des variables de contrôle pour le zoom et l'animation pour que la figure reste toujours visible malgré sa forte croissance
3) Générations :
La fonction nextGeneration est la base de l'algorithme. À chaque nouvelle étape le programme prend l'intégralité des segments déjà existants et en crée une copie exacte. Cette copie subit une rotation de 90 degrés autour d'un point pivot (l'extrémité de la figure actuelle).
4) Zooms :
Contrairement à un dessin statique, ce code utilise une variable amt pour animer le canvas. La boucle draw sert a ce que les segments ne change pas en leur nouvelle position. Ca permet à l'utilisateur de bien visualiser comment la fractale se replie sur elle-même.Comme le nombre de segments double à chaque génération, la taille physique de la figure augmente rapidement. Pour compenser cela, le code intègre un système de zoom automatique. À chaque fois qu'une génération est terminée, le programme réduit l'échelle globale du dessin d'un facteur . Ce calcul mathématique permet de maintenir la fractale à une taille constante par rapport aux bordures de l'écran.
5) Quelques explications de fonctionnalitée :
Update : Calcule la position des segments pendant leur rotation.
Show : Gère l'affichage graphique sur le canvas.
Lerp : Assure des transitions fluides pour le zoom et les mouvements.
6) Problèmes rencontrés :
Le zoom automatique n'était pas a la bonne vitesse ce que faisait que la figure sortait du champs de vision.
