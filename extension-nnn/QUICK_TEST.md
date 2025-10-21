# ⚡ TEST RAPIDE - 10 MINUTES

Guide condensé pour tester rapidement les fonctionnalités essentielles.

---

## 🎯 PRÉPARATION (2 min)

```bash
# 1. Créer les icônes
Ouvrir generate-icons.html → Sauvegarder 3 PNG dans assets/

# 2. Charger dans Chrome
chrome://extensions/ → Mode dev → Charger extension-nnn
```

✅ **Check** : Pas d'erreur rouge, icône visible dans la barre

---

## 📱 TEST POPUP (3 min)

### Actions rapides
1. **Cliquer sur l'icône** → Popup s'ouvre
2. **Vérifier** : Calendrier 30 jours, stats à 0
3. **Cliquer "Valider aujourd'hui"** → Jour devient vert ✓
4. **Vérifier** : Stats → 1/30, Streak → 1
5. **Cliquer 3 jours consécutifs** → Badge 🥉 débloqué
6. **F12 → Console** → Aucune erreur rouge

✅ **Check** : Calendrier fonctionne, validation OK, badge débloqué

---

## 🚫 TEST BLOCAGE (2 min)

### Actions rapides
1. **Popup → Paramètres**
2. **Ajouter site** : `example.com` → Ajouter
3. **Nouvel onglet** → Aller sur `example.com`
4. **Vérifier** : Redirection vers page blocked
5. **Vérifier** : Stats affichées, citation visible
6. **Cliquer "Retourner"** → Redirection Google/Wikipedia

✅ **Check** : Blocage actif, page blocked s'affiche

---

## ⚙️ TEST PARAMÈTRES (2 min)

### Actions rapides
1. **Toggle blocage** → OFF → ON → Fonctionne
2. **Ajouter site** : `test.com` → Apparaît dans la liste
3. **Supprimer le site** → Confirmation → Retiré
4. **Exporter JSON** → Fichier téléchargé
5. **Générer code** → Code affiché → Copier → Fonctionne
6. **Réinitialiser** → Confirmer → Tout à 0

✅ **Check** : Toggles OK, ajout/suppression OK, export OK

---

## ⌨️ TEST RACCOURCI (30 sec)

### Action rapide
1. **Réinitialiser le challenge**
2. **Sur n'importe quelle page** : `Ctrl+Shift+V` (Win) / `Cmd+Shift+V` (Mac)
3. **Ouvrir popup** → Jour validé

✅ **Check** : Raccourci fonctionne

---

## 💾 TEST PERSISTANCE (30 sec)

### Actions rapides
1. **Valider 2-3 jours**
2. **Fermer Chrome complètement**
3. **Rouvrir Chrome**
4. **Ouvrir popup** → Vérifier données conservées

✅ **Check** : Données persistent

---

## 🐛 TEST CONSOLE (1 min)

### Vérifications rapides

**Popup** : F12 → Aucune erreur rouge
**Blocked** : F12 → Aucune erreur rouge
**Settings** : F12 → Aucune erreur rouge
**Background** : chrome://extensions/ → Service Worker → Aucune erreur

✅ **Check** : Aucune erreur console

---

## ✅ CHECKLIST FINALE (30 sec)

- [ ] Popup s'ouvre ✓
- [ ] Calendrier fonctionne ✓
- [ ] Validation fonctionne ✓
- [ ] Badges se débloquent ✓
- [ ] Blocage actif ✓
- [ ] Page blocked s'affiche ✓
- [ ] Paramètres accessibles ✓
- [ ] Export JSON fonctionne ✓
- [ ] Raccourci fonctionne ✓
- [ ] Données persistent ✓
- [ ] Aucune erreur console ✓

---

## 🎉 RÉSULTAT

**11/11 checks validés** → Extension prête ! ✨

**< 11 checks** → Voir [TESTING_GUIDE.md](TESTING_GUIDE.md) pour tests détaillés

---

## 🚨 SI UN TEST ÉCHOUE

1. **Ouvrir F12 → Console** → Noter l'erreur
2. **Vérifier** :
   - Icônes PNG créées ?
   - Extension bien chargée ?
   - Mode développeur activé ?
3. **Voir** [TESTING_GUIDE.md](TESTING_GUIDE.md) pour dépannage détaillé

---

**Temps total : ~10 minutes** ⚡

*Pour tests exhaustifs → [TESTING_GUIDE.md](TESTING_GUIDE.md) (114 tests)*
