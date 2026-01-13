I. Le concept

Cette simulation reproduit de manière simplifiée le processus de neurogenèse, où de nouveaux neurones sont générés dans le cerveau. Le programme utilise une grille 90x90 sur laquelle évoluent quatre types de cellules : les cases vides, les cellules progénitrices, les cellules migrantes et les neurones, chacune avec un comportement inspiré du fonctionnement d'un cerveau animal.

II. Le fonctionnement

Les cellules progénitrices se divisent lorsqu’elles ont suffisamment d’énergie et peuvent se transformer en cellules migrantes, qui se déplacent à travers la grille avant de devenir des neurones. Ces neurones interagissent avec leurs voisins : leur activité dépend de celle des neurones proches, et ils peuvent se reproduire ou mourir si leur environnement n’est pas favorable. Les cases vides permettent l’apparition aléatoire de nouvelles cellules, complétant ainsi le cycle de la neurogenèse. En modifiant certains paramètres aléatoires (random) et l'énergie des cellules, on peut corriger la vitesse de prolifération des neurones.

III. La visualisation

Les couleurs aident à visualiser l’état des cellules : vert pour les progénitrices, orange pour les migrantes, bleu pour les neurones peu actifs et violet pour les neurones actifs.

IV. Les problèmes recontrés

Lors du développement, j’ai rencontré deux défis principaux : ralentir la génération trop rapide de cellules pour rendre la simulation lisible, et trouver un équilibre d’échelle entre le nombre de cases et la performance de l’affichage. Ces ajustements ont permis de créer une simulation plus réaliste, tout en restant visuellement dynamique.
