# 🥜 No Nut November Challenge - Extension Chrome

Une extension Chrome complète pour t'aider à suivre et réussir le challenge No Nut November avec discipline, motivation et accountability.

## ✨ Fonctionnalités

### 📅 Calendrier de Progression
- Interface popup avec calendrier interactif de 30 jours
- Chaque jour peut être marqué comme "réussi" (vert) ou "échoué" (rouge)
- Compteur de jours consécutifs réussis (streak)
- Compteur de jours total réussis / 30
- Détection automatique de la date actuelle
- Système de validation rapide : un clic pour valider ta journée

### 🚫 Système de Blocage Intelligent
- Blocage automatique de 37+ sites pour adultes
- Possibilité d'ajouter des sites personnalisés à bloquer
- Page de redirection motivante quand un site est bloqué avec :
  - Message de motivation personnalisé
  - Rappel de ta progression actuelle
  - Citations inspirantes aléatoires
  - Suggestions d'activités alternatives productives
  - Bouton pour retourner en sécurité

### 🏆 Système de Badges
Débloques des badges selon ta progression :
- 🥉 **Bronze** : 3 jours consécutifs
- 🥈 **Argent** : 7 jours consécutifs
- 🥇 **Or** : 15 jours consécutifs
- 🏆 **Platine** : 30 jours réussis

### 💬 Messages de Motivation
- 20+ messages de motivation différents
- 15+ citations inspirantes
- Affichage aléatoire pour maintenir la fraîcheur

### 🔔 Notifications
- Rappels quotidiens optionnels à 21h
- Notifications de badges débloqués
- Encouragements personnalisés

### ⚙️ Paramètres Complets
- Activer/désactiver le blocage
- Gérer les notifications
- Ajouter/supprimer des sites personnalisés
- Exporter tes données (JSON)
- Code de partage anonyme pour accountability
- Réinitialiser le challenge

### 🔒 Privacy-First
- **Toutes les données restent locales** sur ton appareil
- Aucune collecte de données externe
- Aucune connexion à Internet requise (sauf pour les blocages)
- Open source et transparent

## 📦 Installation

### Méthode 1 : Installation manuelle (développement)

1. **Télécharge ou clone ce repository**
   ```bash
   git clone https://github.com/yourusername/nnn-extension.git
   cd nnn-extension
   ```

2. **Crée les icônes** (requis avant l'installation)

   Les icônes ne sont pas incluses par défaut. Tu dois créer :
   - `assets/icon16.png` (16x16 pixels)
   - `assets/icon48.png` (48x48 pixels)
   - `assets/icon128.png` (128x128 pixels)

   **Option A** : Ouvre `generate-icons.html` dans un navigateur, fais un clic droit sur chaque canvas et sauvegarde les images dans le dossier `assets/`

   **Option B** : Utilise ton propre design (recommandé : fond bleu foncé #1a237e, cercle vert #4caf50, lettre "N" blanche)

3. **Charge l'extension dans Chrome**
   - Ouvre Chrome et va à `chrome://extensions/`
   - Active le **Mode développeur** (coin supérieur droit)
   - Clique sur **Charger l'extension non empaquetée**
   - Sélectionne le dossier `extension-nnn`

4. **C'est prêt !** 🎉
   - L'icône de l'extension apparaît dans ta barre d'outils
   - Clique dessus pour commencer le challenge

### Méthode 2 : Chrome Web Store (prochainement)

L'extension sera bientôt disponible sur le Chrome Web Store pour une installation en un clic.

## 🚀 Utilisation

### Premier lancement

1. **Clique sur l'icône** de l'extension dans ta barre d'outils
2. Le popup s'ouvre avec le calendrier de novembre
3. Le blocage de sites est activé par défaut
4. Valide ta première journée si tu veux commencer aujourd'hui

### Valider une journée

**Méthode 1** : Clique sur le bouton "Valider aujourd'hui" dans le popup

**Méthode 2** : Utilise le raccourci clavier :
- Windows/Linux : `Ctrl + Shift + V`
- Mac : `Cmd + Shift + V`

**Méthode 3** : Clique directement sur le jour dans le calendrier

### Modifier le statut d'un jour

- Clique sur n'importe quel jour du calendrier pour cycler entre :
  - Non marqué (gris)
  - Réussi (vert) ✓
  - Échoué (rouge) ✗

### Ajouter un site à bloquer

1. Clique sur l'icône de l'extension
2. Clique sur "⚙️ Paramètres"
3. Dans la section "Sites bloqués personnalisés", entre le domaine (ex: `example.com`)
4. Clique sur "Ajouter"

### Désactiver temporairement le blocage

**⚠️ Déconseillé** - Cela peut compromettre ton challenge

1. Va dans les Paramètres
2. Désactive "Activer le blocage de sites"
3. Confirme ton choix

### Exporter tes données

1. Va dans les Paramètres
2. Section "Statistiques & Données"
3. Clique sur "📥 Exporter les données (JSON)"
4. Un fichier JSON sera téléchargé avec toutes tes données

### Générer un code de partage

1. Va dans les Paramètres
2. Section "Accountability"
3. Clique sur "Générer un code de partage"
4. Un code anonyme basé sur tes stats sera généré
5. Partage-le avec des amis pour prouver ta progression !

## 🛠️ Structure du Projet

```
extension-nnn/
├── manifest.json              # Configuration de l'extension
├── popup.html                 # Interface principale du popup
├── popup.css                  # Styles du popup
├── popup.js                   # Logique du popup
├── background.js              # Service worker pour le blocage
├── blocked.html               # Page de redirection pour sites bloqués
├── blocked.css                # Styles de la page de blocage
├── blocked.js                 # Logique de la page de blocage
├── settings.html              # Page de paramètres
├── settings.css               # Styles des paramètres
├── settings.js                # Logique des paramètres
├── rules.json                 # Règles de blocage dynamiques
├── assets/
│   ├── icon16.png            # Icône 16x16 (à créer)
│   ├── icon48.png            # Icône 48x48 (à créer)
│   ├── icon128.png           # Icône 128x128 (à créer)
│   └── README.txt            # Instructions pour les icônes
├── data/
│   └── blocked-sites.json    # Liste des sites bloqués et messages
├── generate-icons.html        # Générateur d'icônes
└── README.md                  # Ce fichier
```

## 🔧 Technologies Utilisées

- **Manifest V3** : Dernière version du système d'extensions Chrome
- **HTML/CSS/JavaScript Vanilla** : Pas de frameworks, code pur et performant
- **Chrome APIs** :
  - `chrome.storage` : Stockage local des données
  - `chrome.declarativeNetRequest` : Blocage de sites
  - `chrome.notifications` : Notifications système
  - `chrome.alarms` : Rappels quotidiens
  - `chrome.commands` : Raccourcis clavier

## 📊 Données Stockées

Toutes les données sont stockées localement dans `chrome.storage.local` :

```json
{
  "challengeData": {
    "startDate": "2024-11-01T00:00:00.000Z",
    "days": {
      "2024-11-01": "success",
      "2024-11-02": "success",
      "2024-11-03": "failed"
    },
    "unlockedBadges": ["badge3", "badge7"],
    "customBlockedSites": ["example.com"],
    "settings": {
      "blockingEnabled": true,
      "notificationsEnabled": true,
      "darkMode": false
    }
  }
}
```

## 🎨 Personnalisation

### Modifier les messages de motivation

Édite le fichier `data/blocked-sites.json` et modifie le tableau `motivationalMessages`.

### Ajouter des sites bloqués par défaut

Édite le fichier `data/blocked-sites.json` et ajoute des domaines au tableau `defaultBlockedDomains`.

### Changer les couleurs

Édite les fichiers CSS (`popup.css`, `blocked.css`, `settings.css`) et modifie les valeurs de couleur :
- Violet principal : `#667eea`
- Vert succès : `#4caf50`
- Rouge échec : `#f44336`

## 🐛 Résolution de Problèmes

### L'extension ne se charge pas
- Vérifie que tu as bien créé les 3 icônes PNG dans le dossier `assets/`
- Vérifie que tous les fichiers sont présents
- Recharge l'extension dans `chrome://extensions/`

### Le blocage ne fonctionne pas
- Vérifie que le blocage est activé dans les paramètres
- Va dans `chrome://extensions/` et vérifie que l'extension a les permissions nécessaires
- Réinitialise les règles en désactivant puis réactivant le blocage dans les paramètres

### Les notifications ne s'affichent pas
- Vérifie que les notifications sont activées dans les paramètres de l'extension
- Vérifie que Chrome a la permission d'afficher des notifications système

### Le calendrier n'affiche pas le bon mois
- L'extension est conçue pour novembre. En dehors de novembre, certaines fonctionnalités peuvent être limitées

## 🤝 Contribution

Les contributions sont les bienvenues ! Voici comment tu peux aider :

1. **Fork** le projet
2. Crée une **branche** pour ta fonctionnalité (`git checkout -b feature/AmazingFeature`)
3. **Commit** tes changements (`git commit -m 'Add some AmazingFeature'`)
4. **Push** vers la branche (`git push origin feature/AmazingFeature`)
5. Ouvre une **Pull Request**

### Idées de fonctionnalités futures
- [ ] Mode sombre complet
- [ ] Export des stats en image pour partage sur réseaux sociaux
- [ ] Sons de célébration pour les badges
- [ ] Graphique de progression visuel
- [ ] Support multi-langues
- [ ] Thèmes personnalisables
- [ ] Intégration avec d'autres challenges

## 📄 Licence

Ce projet est sous licence MIT. Voir le fichier `LICENSE` pour plus de détails.

## ⚠️ Avertissement

Cette extension est un outil d'aide à l'autodiscipline. Elle n'est pas infaillible et peut être désactivée. Le vrai challenge réside dans ta volonté personnelle et ton engagement. Utilise cet outil comme un support, pas comme une solution miracle.

## 💪 Message Final

Le No Nut November n'est pas qu'un simple défi, c'est une opportunité de prouver à toi-même que tu as le contrôle. Chaque jour où tu résistes est une victoire. Chaque badge débloqué est une preuve de ta discipline.

**Reste fort. Tu peux le faire.** 🏆

---

Créé avec 💜 pour la communauté NNN

**Remember**: La discipline d'aujourd'hui est la liberté de demain.
