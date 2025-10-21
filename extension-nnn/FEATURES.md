# 🌟 Fonctionnalités Détaillées

## 📅 Calendrier Interactif

### Affichage
- Grille de 30 jours représentant tout le mois de novembre
- Jour actuel marqué avec une bordure spéciale
- Code couleur visuel :
  - ✅ **Vert** : Jour validé (succès)
  - ❌ **Rouge** : Jour échoué
  - ⚪ **Gris** : Jour non marqué
  - 🔒 **Gris clair** : Jours futurs (non cliquables)

### Interactions
- **Clic sur un jour** : Cycle entre non marqué → succès → échoué → non marqué
- **Hover** : Effet de zoom léger pour indiquer la cliquabilité
- **Jour actuel** : Bordure bleue animée pour attirer l'attention

### Validation Rapide
Plusieurs méthodes pour valider le jour :
1. Bouton "Valider aujourd'hui" dans le popup
2. Raccourci clavier (Ctrl/Cmd + Shift + V)
3. Clic direct sur le jour dans le calendrier

## 📊 Statistiques en Temps Réel

### Métriques Affichées
1. **Jours Consécutifs (Streak)**
   - Compte le nombre de jours validés consécutivement
   - Se réinitialise si un jour est marqué comme échoué ou non validé
   - Visible dans le popup principal et la page de blocage

2. **Total Réussi**
   - Format : X/30 jours
   - Compte tous les jours validés, même non consécutifs
   - Affiche le pourcentage de réussite

3. **Taux de Réussite**
   - Pourcentage calculé : (jours réussis / 30) × 100
   - Mis à jour en temps réel

### Statistiques Avancées (Paramètres)
- **Plus long streak** : Record de jours consécutifs
- **Badges débloqués** : X/4 badges obtenus
- **Jours validés** : Nombre total de validations

## 🏆 Système de Badges

### Badges Disponibles

1. **🥉 Bronze - 3 jours**
   - Premier badge
   - Débloqué avec 3 jours consécutifs
   - Encourage à continuer

2. **🥈 Argent - 7 jours**
   - Badge d'une semaine
   - Prouve ta détermination
   - Marque le premier grand palier

3. **🥇 Or - 15 jours**
   - À mi-chemin du challenge
   - Badge de persévérance
   - Montre que tu es sérieux

4. **🏆 Platine - 30 jours**
   - Badge ultime
   - Challenge complet réussi
   - Fierté maximale !

### Mécanique des Badges
- **Déblocage automatique** dès que le critère est atteint
- **Notification** affichée lors du déblocage (si activé)
- **Animation** de déblocage dans l'interface
- **Persistance** : Les badges restent débloqués même en cas d'échec ultérieur
- **Affichage** : Badges grisés si non débloqués, en couleur si débloqués

## 🚫 Système de Blocage

### Sites Bloqués par Défaut
L'extension bloque automatiquement **37 sites pour adultes** populaires listés dans `data/blocked-sites.json`.

### Sites Personnalisés
Tu peux ajouter tes propres domaines à bloquer :
- Va dans Paramètres → Sites bloqués personnalisés
- Entre le domaine (ex: `example.com`)
- Pas besoin de `www.` ou `https://`
- Le système gère automatiquement toutes les variantes

### Page de Redirection

Quand tu tentes d'accéder à un site bloqué, tu es redirigé vers une page qui affiche :

1. **Message de blocage** clair
2. **Tes statistiques actuelles** (jours réussis et streak)
3. **Citation inspirante** aléatoire
4. **Message de motivation** personnalisé
5. **Activités alternatives** suggérées :
   - 🏃 Exercice physique
   - 📚 Lecture ou apprentissage
   - 🎨 Projet créatif
   - 🧘 Méditation
   - 👥 Temps social
   - 💼 Travail sur objectifs personnels

6. **Actions possibles** :
   - Retourner en sécurité (redirection vers site neutre)
   - Voir ta progression (ouvre le popup)
   - Désactiver le blocage (avec double confirmation)

### Mécanisme de Blocage
- Utilise **declarativeNetRequest API** (Manifest V3)
- Règles dynamiques mises à jour en temps réel
- Blocage au niveau réseau (avant le chargement de la page)
- Très performant, pas de ralentissement

## 💬 Messages de Motivation

### Types de Messages

1. **Messages d'Encouragement** (20 variantes)
   - Affichés dans le popup principal
   - Changent aléatoirement
   - Incluent le nombre de jours réussis
   - Exemples :
     - "Reste fort ! Tu es à X jours !"
     - "Chaque jour compte, tu es sur la bonne voie !"
     - "Tu es plus fort que tes impulsions !"

2. **Citations Inspirantes** (15 variantes)
   - Affichées sur la page de blocage
   - Citations de personnes célèbres
   - Focus sur discipline et maîtrise de soi
   - Exemples :
     - "La discipline est le pont entre les objectifs et l'accomplissement." - Jim Rohn
     - "La maîtrise de soi est la forme la plus pure de la sagesse."

### Personnalisation
Tu peux ajouter tes propres messages en éditant `data/blocked-sites.json` :
- `motivationalMessages` : Messages du popup
- `blockedPageQuotes` : Citations de la page de blocage

## 🔔 Notifications

### Types de Notifications

1. **Rappel Quotidien**
   - Heure : 21h00 (configurable dans le code)
   - Fréquence : Une fois par jour
   - Contenu : "N'oublie pas de valider ta journée !"
   - Condition : Seulement si le jour n'est pas déjà validé
   - Mois : Seulement en novembre

2. **Badge Débloqué**
   - Déclencheur : Dès qu'un badge est obtenu
   - Contenu : "Félicitations ! Tu as débloqué le badge X jours !"
   - Priorité haute avec icône

3. **Validation par Raccourci**
   - Déclencheur : Utilisation du raccourci clavier
   - Contenu : "Jour validé ! Bravo ! Continue comme ça !"
   - Confirmation visuelle

### Gestion
- Active/désactive dans Paramètres → Notifications quotidiennes
- Permissions gérées automatiquement par Chrome
- Fonctionne même si le navigateur est en arrière-plan

## ⚙️ Paramètres Complets

### Général

1. **Activer le blocage de sites**
   - Toggle on/off
   - Effet immédiat
   - Met à jour les règles de blocage dynamiquement

2. **Notifications quotidiennes**
   - Toggle on/off
   - Contrôle tous les types de notifications

3. **Mode sombre**
   - Prochainement disponible
   - Actuellement désactivé

### Sites Bloqués Personnalisés

- **Affichage** de la liste des sites ajoutés
- **Ajout** : Champ texte + bouton ou touche Enter
- **Suppression** : Bouton "Supprimer" avec confirmation
- **Validation** : Nettoyage automatique du domaine entré
- **Persistance** : Sauvegarde instantanée

### Statistiques & Données

- **Vue d'ensemble** : 3 métriques principales
- **Export JSON** : Télécharge toutes tes données
- **Export Image** : Prochainement (partage sur réseaux sociaux)

### Accountability

- **Code de partage** généré à partir de tes stats
- Format : `NNN-YEAR-HASH-XDxS`
- Exemple : `NNN-2024-AB12C-15D12S` (15 jours, 12 de streak)
- Bouton copier pour partage facile
- Anonyme : Ne contient pas d'infos personnelles

### Zone de Danger

1. **Réinitialiser le challenge**
   - Supprime jours validés et badges
   - Conserve sites personnalisés et paramètres
   - Double confirmation requise

2. **Supprimer toutes les données**
   - Efface TOUT
   - Triple confirmation requise
   - Irréversible

## 🔐 Confidentialité et Sécurité

### Stockage Local
- **Tout reste sur ton appareil**
- Utilise `chrome.storage.local`
- Aucune connexion serveur
- Aucune télémétrie

### Permissions Requises
- `storage` : Sauvegarder tes données localement
- `declarativeNetRequest` : Bloquer les sites
- `notifications` : Afficher les notifications
- `alarms` : Rappels quotidiens
- `host_permissions` : Nécessaire pour le blocage

### Pas de Collecte de Données
- Aucun tracking
- Aucune analytics
- Aucune donnée envoyée à l'extérieur
- Code open source vérifiable

## 🎨 Interface Utilisateur

### Design
- **Moderne et épuré**
- **Couleurs** :
  - Violet (#667eea) : Principal
  - Vert (#4caf50) : Succès
  - Rouge (#f44336) : Échec
  - Gris : Neutre
- **Animations fluides**
- **Responsive** : Fonctionne sur toutes tailles d'écran

### Popup (400x600px)
- En-tête avec gradient
- 3 statistiques principales
- Message de motivation
- Calendrier 7×5
- Bouton de validation proéminent
- 4 badges
- 2 boutons de navigation

### Page de Blocage
- Plein écran
- Icône d'avertissement animée
- Stats en surbrillance
- Citation inspirante
- Alternatives constructives
- 2 actions principales

### Page de Paramètres
- Sections organisées
- Toggles intuitifs
- Formulaires simples
- Zone de danger visuellement distincte
- Navigation claire

## 🎯 Cas d'Usage

### Scénario 1 : Utilisateur Motivé
1. Installe l'extension le 1er novembre
2. Valide chaque jour religieusement
3. Débloque tous les badges
4. Utilise le code de partage pour prouver sa réussite
5. Exporte ses stats fin novembre

### Scénario 2 : Utilisateur avec Rechutes
1. Commence fort, valide 5 jours
2. Échoue le jour 6
3. L'extension conserve son historique
4. Reprend le jour 7 avec motivation
5. Continue jusqu'à la fin avec quelques échecs
6. Fier d'avoir persévéré malgré les difficultés

### Scénario 3 : Utilisateur Paranoïaque
1. Ajoute 50+ sites personnalisés
2. Active toutes les notifications
3. Vérifie ses stats plusieurs fois par jour
4. Utilise le raccourci clavier systématiquement
5. Réussit le challenge grâce au système strict

## 🚀 Performances

- **Poids total** : ~50KB (sans icônes)
- **Temps de chargement** : <100ms
- **Impact mémoire** : Minimal (~5MB)
- **Blocage** : Instantané (niveau réseau)
- **Pas de ralentissement** du navigateur

## 🔄 Mises à Jour Futures

Fonctionnalités prévues :
- [ ] Mode sombre complet
- [ ] Export stats en image
- [ ] Sons de célébration
- [ ] Graphiques de progression
- [ ] Multi-langues
- [ ] Thèmes personnalisables
- [ ] Synchronisation cross-device (optionnel)
- [ ] Challenges personnalisés
