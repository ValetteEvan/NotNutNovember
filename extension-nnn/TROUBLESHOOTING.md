# 🔧 GUIDE DE DÉPANNAGE

Solutions aux problèmes courants de l'extension No Nut November.

---

## 🚨 ERREURS COURANTES

### ❌ Erreur : "Erreur de mise à jour des règles"

**Symptôme** : Dans la console du Service Worker, tu vois :
```
Erreur de mise à jour des règles: [error details]
```

**Causes possibles** :

1. **Permission manquante**
   - Solution : Vérifie que `manifest.json` contient :
   ```json
   "permissions": [
     "declarativeNetRequest",
     "declarativeNetRequestWithHostAccess"
   ]
   ```

2. **Format de règle invalide**
   - Les règles doivent utiliser `extensionPath` et non `url` pour les redirections
   - Solution : Déjà corrigé dans la version à jour

3. **Trop de règles**
   - Chrome limite à 5000 règles dynamiques
   - Notre code limite à 1000
   - Solution : Réduis le nombre de sites personnalisés si tu en as beaucoup

**Comment résoudre** :

```bash
# 1. Recharger l'extension
chrome://extensions/ → Bouton de rechargement ⟳

# 2. Vérifier la console du Service Worker
chrome://extensions/ → Cliquer "Service Worker"
→ Regarder s'il y a encore des erreurs

# 3. Si l'erreur persiste, réinitialiser les données
Ouvrir la console du Service Worker et exécuter:
chrome.storage.local.clear(() => console.log('Données effacées'));

# 4. Recharger l'extension à nouveau
```

---

### ❌ Erreur : "Rule with id X does not have a unique ID"

**Symptôme** : Dans la console du Service Worker :
```
Détails: Rule with id 1 does not have a unique ID.
```

**Cause** : Des règles avec des IDs en doublon existent (généralement après plusieurs rechargements).

**Solution rapide** :

**Méthode 1 - Automatique** (recommandé) :
```javascript
// Dans la console du Service Worker :
chrome.declarativeNetRequest.getDynamicRules().then(rules => {
  const ids = rules.map(r => r.id);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids
  }).then(() => {
    console.log('✅ Toutes les règles supprimées');
    console.log('💡 Recharge l\'extension maintenant');
  });
});
```

**Méthode 2 - Manuelle** :
1. Va sur `chrome://extensions/`
2. Clique sur le bouton **⟳ Recharger** de l'extension
3. Attends 2 secondes
4. Vérifie la console : tu devrais voir "✅ X règles de blocage ajoutées avec succès"

**Méthode 3 - Reset complet** (si les autres ne marchent pas) :
```javascript
// Console du Service Worker - Nettoie TOUT
chrome.declarativeNetRequest.getDynamicRules().then(r =>
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: r.map(x => x.id)
  })
).then(() => location.reload());
```

**Prévention** :
- Ne recharge pas l'extension trop rapidement plusieurs fois de suite
- Attends que les logs "✅ règles ajoutées" apparaissent avant de recharger

**Plus de détails** : Voir [MAINTENANCE_SCRIPTS.md](MAINTENANCE_SCRIPTS.md) pour d'autres scripts de nettoyage.

---

### ❌ Erreur : "Could not load icon"

**Symptôme** :
```
Could not load icon 'assets/icon16.png'
```

**Cause** : Les fichiers PNG d'icônes n'existent pas.

**Solution** :

1. Ouvre `generate-icons.html` dans Chrome
2. Fais un clic droit sur chaque canvas
3. "Enregistrer l'image sous..."
4. Sauvegarde dans `assets/` :
   - `icon16.png`
   - `icon48.png`
   - `icon128.png`
5. Recharge l'extension

---

### ❌ Le blocage ne fonctionne pas

**Symptôme** : Les sites ne sont pas bloqués, pas de redirection vers `blocked.html`.

**Diagnostic** :

1. **Vérifier que le blocage est activé**
   ```
   Popup → Paramètres → "Activer le blocage de sites" doit être ON (vert)
   ```

2. **Vérifier la console**
   ```
   chrome://extensions/ → Service Worker
   → Chercher "règles de blocage ajoutées"
   → Devrait afficher : "X règles de blocage ajoutées"
   ```

3. **Vérifier les règles actives**
   ```javascript
   // Dans la console du Service Worker :
   chrome.declarativeNetRequest.getDynamicRules().then(rules => {
     console.log('Règles actives:', rules.length);
     console.log('Première règle:', rules[0]);
   });
   ```

**Solutions** :

**Si 0 règles actives** :
- Va dans Paramètres
- Toggle "Activer le blocage" → OFF puis ON
- Vérifie la console pour confirmation

**Si le problème persiste** :
- Désinstalle l'extension complètement
- Réinstalle
- Réactive le blocage

---

### ❌ Les données ne persistent pas

**Symptôme** : Après fermeture de Chrome, les jours validés disparaissent.

**Cause** : Problème avec `chrome.storage.local`.

**Solution** :

1. **Vérifier les permissions**
   - `manifest.json` doit avoir `"storage"` dans permissions

2. **Vérifier les données manuellement**
   ```javascript
   // Dans n'importe quelle console de l'extension :
   chrome.storage.local.get(['challengeData'], (result) => {
     console.log('Données stockées:', result.challengeData);
   });
   ```

3. **Si les données sont vides** :
   - Valide un jour
   - Vérifie à nouveau
   - Si toujours vide → Bug, reporte sur GitHub

---

### ❌ Les notifications ne s'affichent pas

**Symptôme** : Aucune notification système.

**Diagnostic** :

1. **Vérifier dans les paramètres de l'extension**
   ```
   Popup → Paramètres → "Notifications quotidiennes" doit être ON
   ```

2. **Vérifier les permissions système**
   ```
   Paramètres Chrome → Confidentialité et sécurité → Notifications
   → Chrome doit être autorisé
   ```

3. **Tester manuellement**
   ```javascript
   // Dans la console du Service Worker :
   chrome.notifications.create({
     type: 'basic',
     iconUrl: 'assets/icon128.png',
     title: 'Test',
     message: 'Si tu vois ça, ça fonctionne !',
     priority: 2
   });
   ```

**Solution** :
- Active les permissions dans les paramètres système
- Réactive dans les paramètres de l'extension

---

### ❌ Le raccourci clavier ne fonctionne pas

**Symptôme** : `Ctrl+Shift+V` / `Cmd+Shift+V` ne valide pas le jour.

**Diagnostic** :

1. **Vérifier la configuration**
   ```
   chrome://extensions/shortcuts
   → Chercher "No Nut November Challenge"
   → Vérifier le raccourci assigné
   ```

2. **Conflit possible**
   - Un autre programme peut utiliser le même raccourci
   - Essaye de changer le raccourci dans chrome://extensions/shortcuts

**Solution** :
- Change le raccourci pour un autre (ex: `Ctrl+Shift+N`)
- Ou utilise simplement le bouton dans le popup

---

### ❌ Le popup ne s'affiche pas

**Symptôme** : Cliquer sur l'icône ne fait rien.

**Diagnostic** :

1. **Vérifier la console**
   ```
   Clic droit sur l'icône → Inspecter le popup
   → Regarder la console pour les erreurs
   ```

2. **Erreur courante** : Fichiers manquants
   - `popup.html`, `popup.css`, `popup.js` doivent exister
   - `data/blocked-sites.json` doit exister

**Solution** :
- Vérifie que tous les fichiers sont présents
- Recharge l'extension
- Si le problème persiste, réinstalle

---

## 🔍 COMMANDES DE DEBUG UTILES

### Vérifier l'état de l'extension

```javascript
// Dans n'importe quelle console de l'extension
chrome.storage.local.get(null, (data) => {
  console.log('Toutes les données:', data);
});
```

### Forcer la mise à jour des règles

```javascript
// Dans la console du Service Worker
chrome.runtime.sendMessage({ action: 'updateBlockingRules' }, (response) => {
  console.log('Règles mises à jour:', response);
});
```

### Réinitialiser complètement

```javascript
// Dans n'importe quelle console
chrome.storage.local.clear(() => {
  console.log('Données effacées');
  location.reload();
});
```

### Voir toutes les règles de blocage

```javascript
// Dans la console du Service Worker
chrome.declarativeNetRequest.getDynamicRules().then(rules => {
  console.table(rules);
});
```

### Supprimer toutes les règles manuellement

```javascript
// Dans la console du Service Worker
chrome.declarativeNetRequest.getDynamicRules().then(rules => {
  const ids = rules.map(r => r.id);
  chrome.declarativeNetRequest.updateDynamicRules({
    removeRuleIds: ids
  }).then(() => console.log('Toutes les règles supprimées'));
});
```

---

## 🐛 SIGNALER UN BUG

Si tu rencontres un bug non listé ici :

1. **Collecte d'informations** :
   - Version de Chrome : `chrome://version/`
   - Système d'exploitation
   - Description du bug
   - Étapes pour reproduire
   - Capture d'écran si possible
   - Erreurs de console

2. **Où signaler** :
   - GitHub Issues : [lien vers ton repo]
   - Email : [ton email]

3. **Template de bug report** :
   ```
   **Système**
   - OS : macOS 14.5 / Windows 11 / Linux Ubuntu 22.04
   - Chrome version : 120.0.6099.109
   - Extension version : 1.0.0

   **Description**
   [Décris le problème]

   **Étapes pour reproduire**
   1. ...
   2. ...
   3. ...

   **Résultat attendu**
   [Ce qui devrait se passer]

   **Résultat réel**
   [Ce qui se passe réellement]

   **Erreurs console**
   ```
   [Colle les erreurs ici]
   ```

   **Screenshots**
   [Si applicable]
   ```

---

## ✅ VÉRIFICATIONS GÉNÉRALES

Avant de chercher plus loin, vérifie toujours :

- [ ] Extension bien chargée dans `chrome://extensions/`
- [ ] "Mode développeur" activé
- [ ] Pas d'erreur rouge dans chrome://extensions/
- [ ] Icônes PNG présentes dans `assets/`
- [ ] Service Worker actif (pas "inactive")
- [ ] Permissions accordées
- [ ] Extension à jour (bouton reload cliqué après modifications)

---

## 🔄 RÉINSTALLATION PROPRE

Si rien ne fonctionne, réinstalle proprement :

1. **Exporter les données** (si tu veux les conserver)
   ```
   Popup → Paramètres → Exporter les données (JSON)
   ```

2. **Désinstaller complètement**
   ```
   chrome://extensions/ → Supprimer l'extension
   ```

3. **Nettoyer le cache Chrome** (optionnel)
   ```
   chrome://settings/clearBrowserData
   → Données en cache uniquement
   ```

4. **Réinstaller**
   ```
   chrome://extensions/ → Charger l'extension non empaquetée
   ```

5. **Réimporter les données** (si exportées)
   ```javascript
   // Dans la console de l'extension
   const data = { /* coller les données JSON ici */ };
   chrome.storage.local.set({ challengeData: data.challengeData }, () => {
     console.log('Données restaurées');
     location.reload();
   });
   ```

---

## 📞 SUPPORT

**Documentation** :
- [README.md](README.md) - Guide complet
- [QUICK_START.md](QUICK_START.md) - Démarrage rapide
- [TESTING_GUIDE.md](TESTING_GUIDE.md) - Tests complets

**Aide supplémentaire** :
- GitHub Issues (bugs et features)
- Documentation Chrome Extensions : https://developer.chrome.com/docs/extensions/

---

**La plupart des problèmes se résolvent avec un rechargement de l'extension !** 🔄

*Dernière mise à jour : Octobre 2024*
