import random  # Module pour utiliser le hasard

# Données du jeu
personnes = ["pirate jack", "capitaine anne", "barbe noire", "morgan"]  # Liste des personnes possibles
lieux = ["plage", "grotte", "navire", "jungle"]  # Liste des lieux possibles
ouvertures = ["clé", "mot de passe", "carte magique", "code secret"]  # Liste des moyens pour ouvrir le trésor

# Choix secrets du jeu
personne_secret = random.choice(personnes)  # Sélectionne une personne au hasard
lieu_secret = random.choice(lieux)  # Sélectionne un lieu au hasard
ouverture_secrete = random.choice(ouvertures)  # Sélectionne une méthode d'ouverture au hasard

# Dictionnaire des indices pour les personnes
indices_personnes = {
    "pirate jack": "Il adore la mer et passe beaucoup de temps sur le sable.",  # Indice lié à Pirate Jack
    "capitaine anne": "Elle reste presque toujours sur son bateau.",  # Indice lié à Capitaine Anne
    "barbe noire": "Il aime les endroits sombres et cachés.",  # Indice lié à Barbe Noire
    "morgan": "Il explore la nature sauvage."  # Indice lié à Morgan
}

# Dictionnaire des indices pour les lieux
indices_lieux = {
    "plage": "On entend les vagues et il y a du sable.",  # Indice pour la plage
    "grotte": "C'est sombre et humide.",  # Indice pour la grotte
    "navire": "Le bois grince et l'eau est proche.",  # Indice pour le navire
    "jungle": "Des arbres épais et des bruits étranges."  # Indice pour la jungle
}

# Dictionnaire des indices pour l'ouverture
indices_ouvertures = {
    "clé": "Un petit objet métallique est nécessaire.",  # Indice pour la clé
    "mot de passe": "Il faut connaître les bons mots.",  # Indice pour le mot de passe
    "carte magique": "Un objet ancien couvert de symboles.",  # Indice pour la carte magique
    "code secret": "Une suite de chiffres est requise."  # Indice pour le code secret
}

essais = 6  # Nombre total d'essais autorisés pour le joueur

print("‍☠️JEU DU TRÉSOR CACHÉ ☠")  # Affiche le titre du jeu dans le terminal
print("Un trésor légendaire a été dissimulé...")  # Message d'introduction
print("\nPersonnes possibles :", ", ".join(personnes))  # Affiche toutes les personnes possibles
print("Lieux possibles :", ", ".join(lieux))  # Affiche tous les lieux possibles
print("Méthodes d'ouverture :", ", ".join(ouvertures))  # Affiche toutes les méthodes pour ouvrir le trésor

# Boucle principale tant que le joueur a des essais
while essais > 0:
    print(f"\n🔁 Essais restants : {essais}")  # Affiche le nombre d'essais restants

    p = input("Qui a caché le trésor ? ").title()  # Demande le nom de la personne et met la première lettre de chaque mot en majuscule
    l = input("Où est le trésor ? ").title()  # Demande le lieu et met la première lettre de chaque mot en majuscule
    o = input("Comment l'ouvrir ? ").capitalize()  # Demande la méthode d'ouverture et met la première lettre en majuscule

    # Vérifie si toutes les réponses sont correctes
    if p == personne_secret and l == lieu_secret and o == ouverture_secrete:
        print("\n INCROYABLE ! TU AS TROUVÉ LE TRÉSOR !")  # Message de victoire
        break  # Sort de la boucle si le trésor est trouvé
    else:
        print("\nCe n'est pas la bonne combinaison")  # Message d'erreur si la combinaison est incorrecte

        # Donne des indices intelligents si la réponse est incorrecte
        if p != personne_secret:
            print("Indice (personne) :", indices_personnes[personne_secret])  # Indice pour la personne
        if l != lieu_secret:
            print("Indice (lieu) :", indices_lieux[lieu_secret])  # Indice pour le lieu
        if o != ouverture_secrete:
            print("Indice (ouverture) :", indices_ouvertures[ouverture_secrete])  # Indice pour la méthode d'ouverture

    essais -= 1  # Décrémente le nombre d'essais restants

# Si le joueur n'a plus d'essais
if essais == 0:
    print("\n☠️ GAME OVER ☠️")  # Message de fin de partie
    print("Voici la vérité :")  # Message annonçant la solution
    print(f"Personne : {personne_secret}")  # Affiche la bonne personne
    print(f"Lieu : {lieu_secret}")  # Affiche le bon lieu
    print(f"Ouverture : {ouverture_secrete}")  # Affiche la bonne méthode d'ouverture


