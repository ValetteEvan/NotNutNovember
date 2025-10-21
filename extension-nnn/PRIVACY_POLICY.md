# 🔒 POLITIQUE DE CONFIDENTIALITÉ

**No Nut November Challenge - Extension Chrome**

*Dernière mise à jour : Octobre 2024*

---

## 📋 Introduction

Cette politique de confidentialité décrit comment l'extension "No Nut November Challenge" collecte, utilise et protège vos données personnelles.

**En résumé :** Nous ne collectons AUCUNE donnée personnelle. Tout reste sur votre appareil.

---

## 🔐 Collecte de données

### Données que nous NE collectons PAS :

- ❌ Aucune donnée personnelle identifiable
- ❌ Aucun historique de navigation
- ❌ Aucune information de compte
- ❌ Aucune adresse email
- ❌ Aucune adresse IP
- ❌ Aucune localisation
- ❌ Aucune donnée analytique
- ❌ Aucune donnée de télémétrie
- ❌ Aucun cookie
- ❌ Aucune information financière

### Données stockées LOCALEMENT sur votre appareil :

L'extension stocke les informations suivantes **uniquement sur votre ordinateur** via l'API `chrome.storage.local` :

1. **Progression du challenge**
   - Dates marquées comme "succès" ou "échec"
   - Nombre de jours consécutifs
   - Badges débloqués

2. **Préférences utilisateur**
   - Activation/désactivation du blocage de sites
   - Activation/désactivation des notifications
   - Mode sombre (fonctionnalité future)

3. **Sites web personnalisés**
   - Liste des sites web que vous avez choisi de bloquer
   - **Note :** Cette liste reste privée et locale

4. **Horodatage**
   - Date de début du challenge

**Important :** Ces données ne quittent JAMAIS votre appareil. Elles ne sont pas envoyées à des serveurs externes, ni partagées avec des tiers.

---

## 🌐 Transmission de données

### Aucune transmission externe

- ✅ **Aucune connexion** à des serveurs externes
- ✅ **Aucun tracking** ou analytics
- ✅ **Aucun service tiers** intégré
- ✅ **Aucune API externe** utilisée (sauf Chrome APIs locales)

### Communication réseau

L'extension **ne fait AUCUNE requête réseau** vers des serveurs externes.

Les seules opérations réseau sont :
- **Blocage local** de sites web (géré par Chrome localement)
- **Redirection** vers une page HTML locale de l'extension

**Aucune donnée n'est transmise** lors de ces opérations.

---

## 🔒 Stockage des données

### Stockage local uniquement

Toutes les données sont stockées dans le stockage local de Chrome (`chrome.storage.local`), qui :

- ✅ Reste sur votre ordinateur
- ✅ N'est accessible que par l'extension
- ✅ N'est pas synchronisée avec d'autres appareils
- ✅ Peut être supprimée à tout moment par vous

### Emplacement du stockage

Les données sont stockées dans le profil Chrome de votre ordinateur :
- **Windows :** `%LOCALAPPDATA%\Google\Chrome\User Data\Default\`
- **macOS :** `~/Library/Application Support/Google/Chrome/Default/`
- **Linux :** `~/.config/google-chrome/Default/`

### Durée de conservation

Les données sont conservées **tant que vous gardez l'extension installée**.

Vous pouvez :
- Supprimer toutes les données via les Paramètres de l'extension
- Désinstaller l'extension (toutes les données seront supprimées automatiquement)

---

## 🛡️ Sécurité des données

### Protection

Vos données sont protégées par :

1. **Stockage local uniquement** - Pas de serveur = pas de risque de piratage externe
2. **Isolation du navigateur** - Chrome protège les données des extensions
3. **Permissions limitées** - L'extension demande uniquement les permissions nécessaires
4. **Code open source** - Vous pouvez vérifier le code sur GitHub

### Aucune transmission chiffrée nécessaire

Puisque **aucune donnée n'est transmise**, il n'y a pas besoin de chiffrement réseau.

Les données stockées localement bénéficient de la protection du système d'exploitation et du navigateur.

---

## 🔑 Permissions utilisées

L'extension demande les permissions suivantes et voici pourquoi :

### 1. `storage`
- **Pourquoi :** Sauvegarder votre progression, paramètres et sites bloqués **localement**
- **Données concernées :** Jours validés, badges, préférences
- **Où :** Uniquement sur votre appareil

### 2. `declarativeNetRequest`
- **Pourquoi :** Bloquer l'accès aux sites pour adultes
- **Données concernées :** Liste des domaines à bloquer
- **Où :** Traitement local par Chrome

### 3. `declarativeNetRequestWithHostAccess`
- **Pourquoi :** Rediriger vers une page de motivation quand un site est bloqué
- **Données concernées :** Aucune donnée personnelle
- **Où :** Redirection locale

### 4. `notifications`
- **Pourquoi :** Afficher des rappels quotidiens (optionnels)
- **Données concernées :** Messages de motivation prédéfinis
- **Où :** Notifications système locales

### 5. `alarms`
- **Pourquoi :** Programmer les rappels quotidiens à 21h
- **Données concernées :** Horodatage uniquement
- **Où :** Système d'alarmes local de Chrome

### 6. `<all_urls>` (permissions d'hôte)
- **Pourquoi :** Nécessaire pour bloquer des sites web sur tous les domaines
- **Données concernées :** Aucune collecte, seulement blocage
- **Où :** Traitement local

**Important :** Malgré la permission `<all_urls>`, l'extension **ne lit PAS** le contenu des pages web et **ne collecte PAS** votre historique de navigation.

---

## 👤 Vos droits

### Accès aux données

Vous pouvez à tout moment :

1. **Consulter vos données**
   - Ouvrir la console du navigateur (F12)
   - Exécuter : `chrome.storage.local.get(null, console.log)`

2. **Exporter vos données**
   - Paramètres → "Exporter les données (JSON)"
   - Fichier téléchargé sur votre ordinateur

3. **Supprimer vos données**
   - Paramètres → "Réinitialiser le challenge"
   - Ou : Paramètres → "Supprimer toutes les données"
   - Ou : Désinstaller l'extension

### Aucune demande nécessaire

Puisque toutes les données sont sur **votre appareil**, vous avez un contrôle total. Aucune demande à un tiers n'est nécessaire.

---

## 🔄 Code de partage anonyme

### Fonctionnalité "Accountability"

L'extension permet de générer un "code de partage" pour prouver votre progression de manière anonyme.

**Comment ça fonctionne :**

1. Vous cliquez sur "Générer un code de partage"
2. Un code est créé **localement** basé sur vos statistiques
3. Format : `NNN-2024-ABC12-15D12S`
   - `NNN-2024` : Identifiant du challenge
   - `ABC12` : Hash non-réversible
   - `15D` : 15 jours validés
   - `12S` : 12 jours de streak

**Ce qui est partagé :**
- ✅ Statistiques publiques (jours validés, streak)
- ✅ Hash anonyme (impossible de vous identifier)

**Ce qui N'est PAS partagé :**
- ❌ Votre identité
- ❌ Sites que vous avez bloqués
- ❌ Dates spécifiques
- ❌ Toute information personnelle

Le code est généré **localement** et aucune donnée n'est envoyée en ligne. C'est simplement un texte que vous pouvez copier et partager manuellement.

---

## 🌍 Sites web bloqués

### Liste par défaut

L'extension inclut une liste de 37+ sites pour adultes bloqués par défaut.

**Cette liste est :**
- ✅ Stockée dans le code de l'extension
- ✅ Publique et consultable dans le code source
- ✅ Identique pour tous les utilisateurs

### Sites personnalisés

Vous pouvez ajouter vos propres sites à bloquer.

**Ces sites personnalisés :**
- ✅ Restent sur votre appareil
- ✅ Ne sont jamais partagés
- ✅ Ne sont pas visibles par le développeur
- ✅ Peuvent être supprimés à tout moment

**Important :** Nous n'avons aucun moyen de savoir quels sites vous bloquez personnellement.

---

## 🔗 Services tiers

### Aucun service tiers utilisé

L'extension **n'utilise AUCUN** service externe :

- ❌ Pas de Google Analytics
- ❌ Pas de tracking publicitaire
- ❌ Pas de base de données cloud
- ❌ Pas de service de crash reporting
- ❌ Pas de CDN externe
- ❌ Pas d'API tierce

**100% autonome et local.**

---

## 🆔 Données anonymes et télémétrie

### Aucune télémétrie

L'extension **ne collecte AUCUNE donnée anonyme** ou télémétrie.

Nous ne savons pas :
- Combien de personnes utilisent l'extension
- Comment l'extension est utilisée
- Si des erreurs se produisent
- Quelles fonctionnalités sont populaires

**Tout se passe sur votre ordinateur, point.**

---

## 👶 Mineurs

L'extension est conçue pour aider à la maîtrise de soi et peut être utilisée par des personnes de tous âges.

**Aucune donnée d'enfant n'est collectée** car aucune donnée n'est collectée du tout.

Les parents peuvent superviser l'utilisation en consultant les données stockées localement si nécessaire.

---

## 🔄 Modifications de cette politique

### Notifications de changements

Si cette politique de confidentialité change :

1. La date "Dernière mise à jour" sera modifiée
2. Les changements seront documentés dans les notes de version
3. La nouvelle politique sera incluse dans les mises à jour de l'extension

### Engagement

Nous nous engageons à **toujours garder l'extension 100% locale** et sans collecte de données.

Si cela devait changer (ce qui n'est pas prévu), nous :
- Vous en informerions clairement
- Demanderions votre consentement explicite
- Vous permettrions de refuser facilement

---

## 📞 Contact

### Questions sur la confidentialité

Si vous avez des questions sur cette politique de confidentialité :

- **GitHub Issues :** [URL de ton repo GitHub]
- **Email :** [ton email]

### Demandes RGPD

Bien que l'extension ne collecte aucune donnée personnelle, vous pouvez :

- Demander une copie de vos données (elles sont sur votre appareil)
- Demander la suppression (désinstallez l'extension)
- Demander des clarifications (contactez-nous)

---

## ⚖️ Base légale (RGPD)

### Conformité RGPD

L'extension est conforme au **Règlement Général sur la Protection des Données (RGPD)** car :

1. **Pas de collecte de données** - Pas de traitement de données personnelles
2. **Transparence totale** - Code open source
3. **Contrôle utilisateur** - Vous gérez toutes vos données localement
4. **Minimisation des données** - Seules les données nécessaires sont stockées localement
5. **Sécurité** - Stockage local protégé

### Pas de consentement requis

Aucun consentement n'est nécessaire pour l'utilisation de cookies ou le tracking car **l'extension n'utilise ni cookies ni tracking**.

---

## 📜 Résumé en langage simple

**En une phrase :**
Tout reste sur ton ordinateur, rien n'est envoyé nulle part, jamais.

**Ce que fait l'extension :**
- ✅ Sauvegarde ta progression localement
- ✅ Bloque des sites localement
- ✅ T'envoie des notifications locales

**Ce que l'extension NE fait PAS :**
- ❌ Espionner ton activité
- ❌ Collecter des données
- ❌ Te tracker
- ❌ Partager quoi que ce soit avec qui que ce soit

**Tu gardes le contrôle total.**

---

## 🏷️ Licence

Cette extension est distribuée sous **licence MIT** - voir le fichier LICENSE pour plus de détails.

Le code source est disponible publiquement sur GitHub et peut être audité par quiconque.

---

## ✅ Vérification

Pour vérifier que l'extension respecte cette politique :

1. **Consultez le code source** sur GitHub
2. **Inspectez les requêtes réseau** (DevTools → Network) : aucune requête externe
3. **Vérifiez les permissions** dans chrome://extensions/
4. **Lisez le code** - tout est open source

---

**Cette politique de confidentialité est effective depuis octobre 2024.**

*Si vous avez des préoccupations concernant la confidentialité, n'hésitez pas à nous contacter.*

---

🔒 **Votre vie privée est notre priorité.**

---

## 🌐 Versions linguistiques

Cette politique de confidentialité est disponible en :
- 🇫🇷 Français (cette version)
- 🇬🇧 English (voir PRIVACY_POLICY_EN.md)

---

*Développé avec respect pour votre vie privée* 💜
