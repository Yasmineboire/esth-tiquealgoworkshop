Simulation de réseau neuronal interactif
I. Le concept
Cette simulation propose une visualisation artistique et interactive d’un réseau neuronal. Elle s’inspire du fonctionnement du cerveau en représentant des neurones reliés entre eux par des filaments (dendrites) et parcourus par des impulsions électriques. L’objectif n’est pas de reproduire un modèle scientifique exact, mais d’offrir une interprétation visuelle de l’activité neuronale. J'ai eu l'idée de travailler sur ca pour aller avec le proget sur les automates cellulaires.

II. Le fonctionnement
Plusieurs neurones sont générés à des positions aléatoires sur l’écran.
Chaque neurone possède : un corps (soma), des branches récursives représentant les dendrites, une animation lumineuse simulant une activité interne.
À intervalles réguliers, des impulsions électriques sont créées entre deux neurones choisis aléatoirement. Ces impulsions se déplacent d’un neurone à l’autre, symbolisant la transmission de l’information.
La caméra est animée :
un clic sur un neurone déclenche un zoom centré sur celui-ci,
un clic dans le vide permet de revenir à la vue d’ensemble.
L’utilisation de fonctions d’interpolation (lerp) assure des transitions douces pour le zoom et les déplacements.

III. L'ésthetique
La visualisation repose sur des couleurs et des effets lumineux pour renforcer l’aspect organique :
les neurones utilisent des teintes froides (turquoise et violet),
les dendrites sont dessinées sous forme de filaments transparents,
les impulsions électriques sont représentées par des points lumineux jaunes/blancs avec un effet de traînée.
Le fond sombre permet de mettre en valeur les éléments lumineux et d’accentuer la profondeur visuelle de la scène.

IV. Les problèmes rencontrés
la gestion du zoom et du déplacement de la caméra a nécessité un calcul précis pour conserver une interaction fluide,
l’animation des branches récursives devait rester fluide sans provoquer de clignotements visuels,
le nombre de neurones et d’impulsions a dû être limité afin de préserver de bonnes performances, notamment sur des écrans de grande taille.

