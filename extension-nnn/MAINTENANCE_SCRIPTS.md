# 🔧 SCRIPTS DE MAINTENANCE

Scripts utiles à exécuter dans la console du Service Worker pour déboguer ou maintenir l'extension.

---

## 📍 ACCÈS À LA CONSOLE DU SERVICE WORKER

1. Va sur `chrome://extensions/`
2. Trouve "No Nut November Challenge"
3. Clique sur **"Service Worker"** (lien bleu)
4. Une console s'ouvre → Colle les scripts ci-dessous

---

## 🔄 NETTOYER LES RÈGLES DE BLOCAGE

### Supprimer toutes les règles

Si tu as l'erreur "Rule with id X does not have a unique ID" :

```javascript
// Supprimer toutes les règles dynamiques
chrome.declarativeNetRequest.getDynamicRules().then(rules => {
  const ids = rules.map(r => r.id);
  if (ids.length > 0) {
    chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: ids
    }).then(() => {
      console.log(`✅ ${ids.length} règles supprimées`);
      console.log('💡 Maintenant, recharge l\'extension pour réinitialiser');
    });
  } else {
    console.log('ℹ️ Aucune règle à supprimer');
  }
});
```

### Voir toutes les règles actives

```javascript
// Afficher toutes les règles en tableau
chrome.declarativeNetRequest.getDynamicRules().then(rules => {
  console.log(`📊 ${rules.length} règles actives`);
  console.table(rules.map(r => ({
    ID: r.id,
    Domaine: r.condition.urlFilter,
    Type: r.action.type
  })));
});
```

### Forcer la réinitialisation des règles

```javascript
// Force la mise à jour depuis background.js
chrome.runtime.sendMessage({ action: 'updateBlockingRules' }, (response) => {
  console.log('✅ Règles réinitialisées:', response);
});
```

---

## 💾 GESTION DES DONNÉES

### Voir toutes les données stockées

```javascript
// Afficher toutes les données de l'extension
chrome.storage.local.get(null, (data) => {
  console.log('📦 Données complètes:', data);

  if (data.challengeData) {
    console.log('📅 Jours validés:', Object.keys(data.challengeData.days || {}).length);
    console.log('🏆 Badges débloqués:', data.challengeData.unlockedBadges?.length || 0);
    console.log('🚫 Sites personnalisés:', data.challengeData.customBlockedSites?.length || 0);
    console.log('⚙️ Paramètres:', data.challengeData.settings);
  }
});
```

### Exporter les données

```javascript
// Exporter toutes les données en JSON
chrome.storage.local.get(['challengeData'], (result) => {
  const json = JSON.stringify(result.challengeData, null, 2);
  console.log('📥 Copie ce JSON pour sauvegarder tes données:');
  console.log(json);

  // Copier automatiquement dans le presse-papier
  navigator.clipboard.writeText(json).then(() => {
    console.log('✅ JSON copié dans le presse-papier !');
  });
});
```

### Importer des données

```javascript
// Colle tes données exportées ici
const importedData = {
  "startDate": "2024-11-01T00:00:00.000Z",
  "days": {
    "2024-11-01": "success",
    "2024-11-02": "success"
  },
  "unlockedBadges": ["badge3"],
  "customBlockedSites": [],
  "settings": {
    "blockingEnabled": true,
    "notificationsEnabled": true,
    "darkMode": false
  }
};

// Importer
chrome.storage.local.set({ challengeData: importedData }, () => {
  console.log('✅ Données importées avec succès !');
  console.log('💡 Recharge le popup pour voir les changements');
});
```

### Réinitialiser toutes les données

```javascript
// ⚠️ ATTENTION : Supprime TOUTES les données !
const confirmed = confirm('⚠️ Supprimer TOUTES les données ? Cette action est IRRÉVERSIBLE !');

if (confirmed) {
  chrome.storage.local.clear(() => {
    console.log('✅ Toutes les données supprimées');
    console.log('💡 Recharge l\'extension pour réinitialiser');
  });
}
```

### Créer des données de test

```javascript
// Créer un challenge avec quelques jours déjà validés
const testData = {
  startDate: new Date().toISOString(),
  days: {
    "2024-11-01": "success",
    "2024-11-02": "success",
    "2024-11-03": "success",
    "2024-11-04": "failed",
    "2024-11-05": "success",
    "2024-11-06": "success",
    "2024-11-07": "success"
  },
  unlockedBadges: ["badge3", "badge7"],
  customBlockedSites: ["example.com", "test.com"],
  settings: {
    blockingEnabled: true,
    notificationsEnabled: true,
    darkMode: false
  }
};

chrome.storage.local.set({ challengeData: testData }, () => {
  console.log('✅ Données de test créées !');
  console.log('📊 7 jours (6 succès, 1 échec)');
  console.log('🏆 2 badges débloqués');
});
```

---

## 🔔 NOTIFICATIONS

### Tester une notification

```javascript
// Envoyer une notification de test
chrome.notifications.create({
  type: 'basic',
  iconUrl: 'assets/icon128.png',
  title: '🧪 Test de notification',
  message: 'Si tu vois ça, les notifications fonctionnent ! 🎉',
  priority: 2
});
```

### Voir les alarmes programmées

```javascript
// Lister toutes les alarmes
chrome.alarms.getAll((alarms) => {
  console.log(`⏰ ${alarms.length} alarmes programmées:`);
  alarms.forEach(alarm => {
    const date = new Date(alarm.scheduledTime);
    console.log(`- ${alarm.name}: ${date.toLocaleString()}`);
  });
});
```

### Créer une alarme de test (dans 10 secondes)

```javascript
// Test d'alarme immédiat
chrome.alarms.create('test-alarm', {
  when: Date.now() + 10000 // Dans 10 secondes
});

console.log('⏰ Alarme de test programmée dans 10 secondes');
console.log('💡 Regarde la console pour voir le déclenchement');
```

### Annuler toutes les alarmes

```javascript
// Supprimer toutes les alarmes
chrome.alarms.clearAll(() => {
  console.log('✅ Toutes les alarmes supprimées');
});
```

---

## 🐛 DEBUG

### Vérifier l'état complet de l'extension

```javascript
// Script de diagnostic complet
async function diagnosticComplet() {
  console.log('🔍 === DIAGNOSTIC COMPLET ===\n');

  // 1. Données stockées
  const storage = await chrome.storage.local.get(null);
  console.log('📦 Données stockées:', storage.challengeData ? '✅ Présentes' : '❌ Absentes');

  // 2. Règles de blocage
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  console.log(`🚫 Règles de blocage: ${rules.length} actives`);

  // 3. Alarmes
  const alarms = await chrome.alarms.getAll();
  console.log(`⏰ Alarmes: ${alarms.length} programmées`);

  // 4. Permissions
  const hasStorage = await chrome.permissions.contains({permissions: ['storage']});
  const hasNotifications = await chrome.permissions.contains({permissions: ['notifications']});
  console.log(`🔐 Permissions:`);
  console.log(`   - Storage: ${hasStorage ? '✅' : '❌'}`);
  console.log(`   - Notifications: ${hasNotifications ? '✅' : '❌'}`);

  // 5. Stats
  if (storage.challengeData) {
    const days = storage.challengeData.days || {};
    const successCount = Object.values(days).filter(s => s === 'success').length;
    const failedCount = Object.values(days).filter(s => s === 'failed').length;

    console.log(`📊 Statistiques:`);
    console.log(`   - Jours validés: ${successCount}`);
    console.log(`   - Jours échoués: ${failedCount}`);
    console.log(`   - Badges: ${storage.challengeData.unlockedBadges?.length || 0}`);
    console.log(`   - Sites personnalisés: ${storage.challengeData.customBlockedSites?.length || 0}`);
  }

  console.log('\n🔍 === FIN DU DIAGNOSTIC ===');
}

// Exécuter
diagnosticComplet();
```

### Vérifier les erreurs courantes

```javascript
// Checker automatique de problèmes
async function checkProblems() {
  console.log('🔍 Recherche de problèmes...\n');

  let problems = 0;

  // Check 1: Données
  const data = await chrome.storage.local.get(['challengeData']);
  if (!data.challengeData) {
    console.warn('⚠️ Problème: Aucune donnée trouvée');
    console.log('💡 Solution: Ouvre le popup pour initialiser');
    problems++;
  }

  // Check 2: Règles
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  if (data.challengeData?.settings?.blockingEnabled && rules.length === 0) {
    console.warn('⚠️ Problème: Blocage activé mais aucune règle');
    console.log('💡 Solution: Toggle le blocage OFF puis ON dans les paramètres');
    problems++;
  }

  // Check 3: Doublons de règles
  const ruleIds = rules.map(r => r.id);
  const uniqueIds = new Set(ruleIds);
  if (ruleIds.length !== uniqueIds.size) {
    console.error('❌ Problème: IDs de règles en doublon !');
    console.log('💡 Solution: Exécute cleanAllRules() puis recharge l\'extension');
    problems++;
  }

  // Résultat
  if (problems === 0) {
    console.log('✅ Aucun problème détecté !');
  } else {
    console.log(`\n⚠️ ${problems} problème(s) trouvé(s)`);
  }
}

// Exécuter
checkProblems();
```

### Nettoyer tout et réinitialiser

```javascript
// Reset complet de l'extension
async function resetComplet() {
  const confirmed = confirm(
    '⚠️ RESET COMPLET\n\n' +
    'Cela va :\n' +
    '- Supprimer toutes les données\n' +
    '- Supprimer toutes les règles\n' +
    '- Supprimer toutes les alarmes\n\n' +
    'Continuer ?'
  );

  if (!confirmed) {
    console.log('❌ Annulé');
    return;
  }

  console.log('🔄 Reset en cours...\n');

  // 1. Supprimer les données
  await chrome.storage.local.clear();
  console.log('✅ Données supprimées');

  // 2. Supprimer les règles
  const rules = await chrome.declarativeNetRequest.getDynamicRules();
  if (rules.length > 0) {
    await chrome.declarativeNetRequest.updateDynamicRules({
      removeRuleIds: rules.map(r => r.id)
    });
    console.log('✅ Règles supprimées');
  }

  // 3. Supprimer les alarmes
  await chrome.alarms.clearAll();
  console.log('✅ Alarmes supprimées');

  console.log('\n🎉 Reset complet terminé !');
  console.log('💡 Recharge l\'extension maintenant');
}

// Exécuter
resetComplet();
```

---

## 📋 COMMANDES RAPIDES

### Copie-colle rapide

```javascript
// === NETTOYAGE RAPIDE DES RÈGLES ===
chrome.declarativeNetRequest.getDynamicRules().then(r => chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: r.map(x => x.id)}).then(() => console.log('✅ Règles nettoyées')));

// === VOIR LES DONNÉES ===
chrome.storage.local.get(null, d => console.log(d));

// === RESET COMPLET ===
chrome.storage.local.clear(() => chrome.declarativeNetRequest.getDynamicRules().then(r => chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: r.map(x => x.id)}).then(() => console.log('✅ Reset complet'))));

// === TEST NOTIFICATION ===
chrome.notifications.create({type:'basic',iconUrl:'assets/icon128.png',title:'Test',message:'Ça marche ! 🎉',priority:2});

// === DIAGNOSTIC ===
chrome.declarativeNetRequest.getDynamicRules().then(r => console.log(`Règles: ${r.length}`)); chrome.storage.local.get(null, d => console.log('Données:', d.challengeData ? '✅' : '❌'));
```

---

## 🆘 EN CAS D'URGENCE

Si l'extension est complètement cassée :

```javascript
// 1. Tout supprimer
await chrome.storage.local.clear();
const rules = await chrome.declarativeNetRequest.getDynamicRules();
await chrome.declarativeNetRequest.updateDynamicRules({removeRuleIds: rules.map(r => r.id)});
await chrome.alarms.clearAll();

// 2. Recharger l'extension
console.log('✅ Tout nettoyé. VA SUR chrome://extensions/ ET RECHARGE L\'EXTENSION !');
```

---

## 💡 CONSEILS

- Toujours faire un **backup des données** avant de tester des scripts
- Utilise `console.table()` pour un affichage plus lisible
- Si un script ne fonctionne pas, vérifie que tu es bien dans la console du **Service Worker**
- Après avoir modifié des données, **recharge le popup** pour voir les changements

---

**Ces scripts sont sûrs et ne cassent rien.** N'hésite pas à les utiliser pour déboguer ! 🔧

*Dernière mise à jour : Octobre 2024*
