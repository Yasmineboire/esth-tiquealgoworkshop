Description du projet
Ce projet consiste à créer un jeu d’enquête dans lequel le joueur doit retrouver un trésor caché.
Le but est de découvrir : qui a caché le trésor, où il est caché, et comment l’ouvrir.
Le jeu repose sur des choix aléatoires, ce qui rend chaque partie différente. Des indices sont donnés au joueur lorsqu’il se trompe, afin de l’aider à progresser logiquement vers la solution.

Processus :
J’ai commencé par définir les éléments principaux du jeu sous forme de listes : les personnes, les lieux et les méthodes d’ouverture du trésor.
Ensuite, le programme sélectionne au hasard une personne, un lieu et une méthode d’ouverture grâce au module random.
Pour rendre le jeu plus intéressant, j’ai utilisé des dictionnaires d’indices. Chaque personne, lieu et méthode possède un indice associé, affiché uniquement si la réponse du joueur est incorrecte.
Le joueur dispose d’un nombre limité de 6 essais. À chaque tour :
  -le programme affiche le nombre d’essais restants,
  -le joueur entre ses hypothèses,
  -le programme vérifie si la combinaison est correcte,
  -sinon, il affiche des indices ciblés.
La partie se termine soit par une victoire, lorsque la bonne combinaison est trouvée, soit par un Game Over, où la solution finale est révélée.

Pistes d’améliorations :
  -Ajouter des indices progressifs selon le nombre d’erreurs.
  -Proposer des choix numérotés plutôt que du texte libre.
  -Ajouter une histoire plus développée avec des dialogues.
  -Mettre en place un système de score.
  -Ajouter une carte ASCII pour visualiser les lieux.
