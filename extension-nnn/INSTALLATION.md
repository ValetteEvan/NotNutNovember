# 📥 Guide d'Installation Rapide

## Étape 1 : Créer les Icônes

**IMPORTANT** : L'extension ne fonctionnera pas sans les icônes !

### Option A : Utiliser le générateur HTML (Recommandé)

1. Ouvre le fichier `generate-icons.html` dans ton navigateur
2. Tu verras 3 canvas avec des icônes
3. Pour chaque canvas :
   - Fais un **clic droit** dessus
   - Choisis "Enregistrer l'image sous..."
   - Sauvegarde dans le dossier `assets/` avec les noms suivants :
     - Premier canvas → `icon16.png`
     - Deuxième canvas → `icon48.png`
     - Troisième canvas → `icon128.png`

### Option B : Créer tes propres icônes

Tu peux utiliser n'importe quel logiciel de design (Photoshop, Figma, Canva, etc.) :

**Spécifications** :
- 3 fichiers PNG : 16x16, 48x48, 128x128 pixels
- Noms : `icon16.png`, `icon48.png`, `icon128.png`
- Emplacement : dossier `assets/`

**Design suggéré** :
- Fond : Bleu foncé (#1a237e)
- Cercle au centre : Vert (#4caf50)
- Lettre "N" blanche au centre

### Option C : Utiliser des icônes de remplacement temporaires

Si tu veux juste tester rapidement, tu peux utiliser n'importe quelle image PNG :

```bash
cd assets
# Copie 3 fois la même image (ou 3 images différentes)
# Assure-toi qu'elles s'appellent icon16.png, icon48.png, icon128.png
```

## Étape 2 : Charger l'Extension dans Chrome

1. **Ouvre Chrome** et va à l'adresse : `chrome://extensions/`

2. **Active le Mode Développeur**
   - Trouve le toggle "Mode développeur" en haut à droite
   - Active-le (il devient bleu)

3. **Charge l'extension**
   - Clique sur le bouton "Charger l'extension non empaquetée"
   - Navigue jusqu'au dossier `extension-nnn`
   - Sélectionne le dossier et clique sur "Sélectionner"

4. **Vérifie l'installation**
   - L'extension "No Nut November Challenge" apparaît dans la liste
   - Aucune erreur ne doit s'afficher
   - L'icône apparaît dans ta barre d'outils Chrome

## Étape 3 : Premier Lancement

1. **Clique sur l'icône** de l'extension dans ta barre d'outils

2. **Épingle l'extension** (optionnel mais recommandé)
   - Clique sur l'icône de puzzle 🧩 à côté de la barre d'adresse
   - Trouve "No Nut November Challenge"
   - Clique sur l'épingle 📌 pour la garder visible

3. **Configure tes préférences**
   - Clique sur "⚙️ Paramètres"
   - Active/désactive les notifications selon tes préférences
   - Ajoute des sites personnalisés à bloquer si nécessaire

4. **Commence le challenge !**
   - Retourne au popup principal
   - Clique sur "Valider aujourd'hui" pour commencer

## Résolution de Problèmes

### ❌ Erreur : "Manifest file is missing or unreadable"
→ Vérifie que tu sélectionnes bien le dossier `extension-nnn` (pas le dossier parent)

### ❌ Erreur : "Could not load icon 'assets/icon16.png'"
→ Tu n'as pas créé les icônes. Retourne à l'**Étape 1**

### ❌ L'icône n'apparaît pas dans la barre d'outils
→ Clique sur l'icône de puzzle 🧩 et épingle l'extension

### ❌ Les sites ne sont pas bloqués
→ Va dans Paramètres et vérifie que "Activer le blocage de sites" est bien activé

### ❌ Les notifications ne fonctionnent pas
→ Vérifie les permissions de Chrome pour les notifications système

## 🎉 C'est Tout !

Ton extension est maintenant installée et prête à t'aider dans ton challenge !

**Raccourci clavier utile** :
- Windows/Linux : `Ctrl + Shift + V` pour valider le jour
- Mac : `Cmd + Shift + V` pour valider le jour

Bonne chance ! 💪
