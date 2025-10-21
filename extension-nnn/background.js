// background.js - Service Worker pour gérer le blocage et les notifications

// Charger les sites bloqués par défaut et initialiser les règles
async function initializeBlockingRules() {
    try {
        // Charger les données de configuration
        const response = await fetch(chrome.runtime.getURL('data/blocked-sites.json'));
        const data = await response.json();

        // Récupérer les sites personnalisés de l'utilisateur
        const result = await chrome.storage.local.get(['challengeData']);
        const customSites = result.challengeData?.customBlockedSites || [];

        // Combiner les sites par défaut et personnalisés
        const allBlockedDomains = [...data.defaultBlockedDomains, ...customSites];

        // Vérifier si le blocage est activé
        const blockingEnabled = result.challengeData?.settings?.blockingEnabled !== false;

        if (blockingEnabled) {
            await updateBlockingRules(allBlockedDomains);
        } else {
            // Désactiver toutes les règles
            await updateBlockingRules([]);
        }

        console.log(`Blocage initialisé: ${allBlockedDomains.length} domaines`);
    } catch (error) {
        console.error('Erreur d\'initialisation du blocage:', error);
    }
}

// Mettre à jour les règles de blocage
async function updateBlockingRules(domains) {
    try {
        // D'abord, supprimer TOUTES les règles existantes pour éviter les conflits d'ID
        const existingRules = await chrome.declarativeNetRequest.getDynamicRules();
        const ruleIdsToRemove = existingRules.map(rule => rule.id);

        // Toujours supprimer d'abord, même s'il n'y a pas de nouvelles règles
        if (ruleIdsToRemove.length > 0) {
            await chrome.declarativeNetRequest.updateDynamicRules({
                removeRuleIds: ruleIdsToRemove
            });
            console.log(`${ruleIdsToRemove.length} règles supprimées`);
        }

        // Créer de nouvelles règles si des domaines sont fournis
        if (domains.length > 0) {
            // Filtrer les domaines vides et dédupliquer
            const uniqueDomains = [...new Set(domains.filter(d => d && d.trim()))];

            const rules = uniqueDomains.map((domain, index) => {
                // Nettoyer le domaine (enlever protocole, www, etc.)
                const cleanDomain = domain.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0].trim();

                return {
                    id: index + 1, // ID unique basé sur l'index
                    priority: 1,
                    action: {
                        type: 'redirect',
                        redirect: {
                            extensionPath: '/blocked.html'
                        }
                    },
                    condition: {
                        urlFilter: `||${cleanDomain}`,
                        resourceTypes: ['main_frame']
                    }
                };
            });

            // Chrome limite à 5000 règles dynamiques, mais on va rester raisonnable
            const rulesToAdd = rules.slice(0, 1000);

            // Ajouter les nouvelles règles APRÈS avoir supprimé les anciennes
            await chrome.declarativeNetRequest.updateDynamicRules({
                addRules: rulesToAdd
            });

            console.log(`✅ ${rulesToAdd.length} règles de blocage ajoutées avec succès`);
        } else {
            console.log('ℹ️ Aucune règle de blocage active (blocage désactivé ou liste vide)');
        }
    } catch (error) {
        console.error('❌ Erreur de mise à jour des règles:', error);
        console.error('Détails:', error.message);

        // Log plus détaillé pour le debug
        if (domains && domains.length > 0) {
            console.log('🔍 Debug - Tentative de blocage pour:', domains.length, 'domaines');
            console.log('🔍 Debug - Premiers domaines:', domains.slice(0, 3));
        }

        // Si l'erreur contient "unique ID", suggérer une solution
        if (error.message && error.message.includes('unique ID')) {
            console.warn('⚠️ Conflit d\'ID détecté. Essaye de recharger l\'extension.');
            console.log('💡 Solution: chrome://extensions/ → bouton ⟳ Recharger');
        }
    }
}

// Initialisation au démarrage
chrome.runtime.onInstalled.addListener(async (details) => {
    if (details.reason === 'install') {
        // Première installation
        console.log('Extension NNN installée !');

        // Initialiser les données par défaut
        const defaultData = {
            startDate: new Date().toISOString(),
            days: {},
            unlockedBadges: [],
            customBlockedSites: [],
            settings: {
                blockingEnabled: true,
                notificationsEnabled: true,
                darkMode: false
            }
        };

        await chrome.storage.local.set({ challengeData: defaultData });

        // Créer une alarme pour les rappels quotidiens
        chrome.alarms.create('dailyReminder', {
            when: getNextReminderTime(),
            periodInMinutes: 24 * 60 // Tous les jours
        });
    }

    // Initialiser les règles de blocage
    await initializeBlockingRules();
});

// Au démarrage du navigateur
chrome.runtime.onStartup.addListener(async () => {
    await initializeBlockingRules();
});

// Calculer l'heure du prochain rappel (21h00)
function getNextReminderTime() {
    const now = new Date();
    const reminderTime = new Date();
    reminderTime.setHours(21, 0, 0, 0);

    if (now >= reminderTime) {
        // Si on est déjà passé 21h, programmer pour demain
        reminderTime.setDate(reminderTime.getDate() + 1);
    }

    return reminderTime.getTime();
}

// Gérer les alarmes
chrome.alarms.onAlarm.addListener(async (alarm) => {
    if (alarm.name === 'dailyReminder') {
        const result = await chrome.storage.local.get(['challengeData']);
        const challengeData = result.challengeData || {};

        // Vérifier si les notifications sont activées
        if (challengeData.settings?.notificationsEnabled) {
            const today = new Date();
            const month = today.getMonth();

            // Seulement en novembre
            if (month === 10) {
                const year = today.getFullYear();
                const day = today.getDate();
                const todayStr = `${year}-11-${String(day).padStart(2, '0')}`;

                // Vérifier si le jour n'est pas déjà validé
                if (!challengeData.days[todayStr]) {
                    // Envoyer une notification de rappel
                    chrome.notifications.create({
                        type: 'basic',
                        iconUrl: 'assets/icon128.png',
                        title: 'No Nut November - Rappel',
                        message: 'N\'oublie pas de valider ta journée si tu as tenu le challenge aujourd\'hui !',
                        priority: 1
                    });
                }
            }
        }
    }
});

// Écouter les changements de storage pour mettre à jour les règles
chrome.storage.onChanged.addListener(async (changes, areaName) => {
    if (areaName === 'local' && changes.challengeData) {
        const newData = changes.challengeData.newValue;

        // Vérifier si les sites bloqués ou les paramètres ont changé
        if (newData) {
            await initializeBlockingRules();
        }
    }
});

// Gérer les commandes clavier
chrome.commands.onCommand.addListener(async (command) => {
    if (command === 'validate-day') {
        // Valider la journée actuelle
        const result = await chrome.storage.local.get(['challengeData']);
        const challengeData = result.challengeData || {
            startDate: new Date().toISOString(),
            days: {},
            unlockedBadges: [],
            customBlockedSites: [],
            settings: {
                blockingEnabled: true,
                notificationsEnabled: true,
                darkMode: false
            }
        };

        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        if (month === 10) { // Novembre
            const todayStr = `${year}-11-${String(day).padStart(2, '0')}`;

            if (!challengeData.days[todayStr]) {
                challengeData.days[todayStr] = 'success';
                await chrome.storage.local.set({ challengeData });

                // Notification de confirmation
                chrome.notifications.create({
                    type: 'basic',
                    iconUrl: 'assets/icon128.png',
                    title: 'Jour validé ! ✓',
                    message: 'Bravo ! Continue comme ça !',
                    priority: 1
                });
            }
        }
    }
});

// Écouter les messages des autres parties de l'extension
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'updateBlockingRules') {
        initializeBlockingRules().then(() => {
            sendResponse({ success: true });
        });
        return true; // Indique qu'on va répondre de manière asynchrone
    }

    if (request.action === 'getStats') {
        chrome.storage.local.get(['challengeData'], (result) => {
            const challengeData = result.challengeData || {};
            const successDays = Object.values(challengeData.days || {}).filter(status => status === 'success').length;
            sendResponse({ successDays, totalDays: 30 });
        });
        return true;
    }
});

// Initialiser au chargement du service worker
initializeBlockingRules();

console.log('Background service worker démarré');
