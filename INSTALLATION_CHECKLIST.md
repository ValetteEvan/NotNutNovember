# ✅ CHECKLIST D'INSTALLATION - EXTENSION NNN

## 📋 AVANT DE COMMENCER

### Prérequis
- [ ] Google Chrome installé (version 88+)
- [ ] Accès au dossier `extension-nnn/`
- [ ] 5 minutes de temps disponible

---

## 🎨 ÉTAPE 1 : CRÉER LES ICÔNES (2 minutes)

### Option A : Générateur HTML (Recommandé)

- [ ] Ouvrir le fichier `extension-nnn/generate-icons.html` dans Chrome
- [ ] Tu vois 3 canvas avec des icônes ?
- [ ] **Pour chaque canvas** :
  - [ ] Clic droit sur le premier canvas (16x16)
  - [ ] "Enregistrer l'image sous..."
  - [ ] Nom : `icon16.png`
  - [ ] Destination : `extension-nnn/assets/`
  - [ ] Sauvegarder
  - [ ] Répéter pour le deuxième canvas → `icon48.png`
  - [ ] Répéter pour le troisième canvas → `icon128.png`

### Vérification

- [ ] Le fichier `extension-nnn/assets/icon16.png` existe
- [ ] Le fichier `extension-nnn/assets/icon48.png` existe
- [ ] Le fichier `extension-nnn/assets/icon128.png` existe

---

## 🔧 ÉTAPE 2 : CHARGER L'EXTENSION (2 minutes)

### Dans Chrome

- [ ] Ouvrir un nouvel onglet Chrome
- [ ] Taper dans la barre d'adresse : `chrome://extensions/`
- [ ] Appuyer sur Entrée

### Activer le Mode Développeur

- [ ] Trouver le toggle "Mode développeur" (coin supérieur droit)
- [ ] Cliquer dessus pour l'activer (devient bleu)
- [ ] Des nouveaux boutons apparaissent

### Charger l'Extension

- [ ] Cliquer sur "Charger l'extension non empaquetée"
- [ ] Une fenêtre de sélection de dossier s'ouvre
- [ ] Naviguer jusqu'à `NotNutNovember/extension-nnn/`
- [ ] Sélectionner le dossier `extension-nnn`
- [ ] Cliquer sur "Sélectionner" ou "Ouvrir"

### Vérification

- [ ] L'extension "No Nut November Challenge" apparaît dans la liste
- [ ] Aucune erreur rouge n'est affichée
- [ ] Le statut est "Activé"
- [ ] L'icône apparaît dans la barre d'outils Chrome

---

## 📌 ÉTAPE 3 : ÉPINGLER L'EXTENSION (30 secondes)

- [ ] Cliquer sur l'icône de puzzle 🧩 à côté de la barre d'adresse
- [ ] Trouver "No Nut November Challenge" dans la liste
- [ ] Cliquer sur l'icône d'épingle 📌 à côté
- [ ] L'icône de l'extension est maintenant visible en permanence

---

## 🚀 ÉTAPE 4 : PREMIER LANCEMENT (1 minute)

### Ouvrir le Popup

- [ ] Cliquer sur l'icône de l'extension dans la barre d'outils
- [ ] Le popup s'ouvre (400x600px)
- [ ] Tu vois le calendrier de 30 jours
- [ ] Les statistiques s'affichent (0/30)

### Premier Test

- [ ] Cliquer sur le bouton "Valider aujourd'hui"
- [ ] Le jour actuel devient vert ✓
- [ ] Le compteur passe à 1/30
- [ ] Le streak affiche 1

### Tester le Blocage

- [ ] Va dans Paramètres (bouton ⚙️)
- [ ] Vérifie que "Activer le blocage de sites" est ON
- [ ] Retourne au popup
- [ ] (Optionnel) Teste en visitant un site bloqué

---

## ⚙️ ÉTAPE 5 : CONFIGURATION (Optionnel)

### Paramètres de Base

- [ ] Ouvrir le popup → Cliquer sur "⚙️ Paramètres"
- [ ] **Notifications** : Activer/désactiver selon préférence
- [ ] **Blocage** : S'assurer qu'il est activé

### Sites Personnalisés (Optionnel)

- [ ] Dans Paramètres → Section "Sites bloqués personnalisés"
- [ ] Ajouter tes propres sites si nécessaire
- [ ] Format : `example.com` (sans www ou https)

### Raccourci Clavier

- [ ] Tester le raccourci : `Ctrl + Shift + V` (Win/Linux) ou `Cmd + Shift + V` (Mac)
- [ ] Vérifier que le jour se valide

---

## ✅ VÉRIFICATION FINALE

### Fonctionnalités de Base

- [ ] Le popup s'ouvre correctement
- [ ] Le calendrier affiche 30 jours
- [ ] Les jours sont cliquables
- [ ] Les statistiques se mettent à jour
- [ ] Le bouton "Valider aujourd'hui" fonctionne
- [ ] Les badges sont visibles (grisés)

### Paramètres

- [ ] La page de paramètres s'ouvre
- [ ] Les toggles fonctionnent
- [ ] Les sites personnalisés peuvent être ajoutés
- [ ] L'export JSON fonctionne

### Blocage

- [ ] Le blocage est activé par défaut
- [ ] (Test optionnel) Un site bloqué redirige vers la page de blocage

---

## 🎯 C'EST PRÊT !

### Prochaines Étapes

- [ ] Épingler l'extension pour un accès facile
- [ ] Valider ton premier jour
- [ ] Configurer les paramètres selon tes préférences
- [ ] (Optionnel) Ajouter des sites personnalisés

### Utilisation Quotidienne

1. Clique sur l'icône chaque jour
2. Clique sur "Valider aujourd'hui"
3. Consulte tes statistiques
4. Débloques des badges !

---

## 🆘 EN CAS DE PROBLÈME

### Erreur : "Could not load icon"

**Cause** : Les icônes PNG n'ont pas été créées

**Solution** :
- [ ] Retourner à l'Étape 1
- [ ] Créer les 3 fichiers PNG dans `assets/`
- [ ] Recharger l'extension (bouton 🔄 sur chrome://extensions/)

### Erreur : "Manifest file is missing"

**Cause** : Mauvais dossier sélectionné

**Solution** :
- [ ] Supprimer l'extension de Chrome
- [ ] Recharger en sélectionnant bien le dossier `extension-nnn`
- [ ] Pas le dossier parent `NotNutNovember`

### Le blocage ne fonctionne pas

**Solution** :
- [ ] Ouvrir Paramètres
- [ ] Vérifier que "Activer le blocage" est ON
- [ ] Recharger l'extension
- [ ] Redémarrer Chrome

### Les notifications ne s'affichent pas

**Solution** :
- [ ] Vérifier dans Paramètres que les notifications sont activées
- [ ] Vérifier les permissions Chrome pour les notifications
- [ ] Paramètres système → Notifications → Autoriser Chrome

---

## 📚 RESSOURCES

- 📖 [README.md](extension-nnn/README.md) - Documentation complète
- ⚡ [QUICK_START.md](extension-nnn/QUICK_START.md) - Démarrage rapide
- 🌟 [FEATURES.md](extension-nnn/FEATURES.md) - Liste des fonctionnalités

---

## 🏆 FÉLICITATIONS !

L'extension No Nut November Challenge est maintenant installée et prête à t'accompagner dans ton challenge !

**Bonne chance !** 💪

---

*Dernière mise à jour : Octobre 2024*
