// settings.js - Gestion de la page de paramètres

let challengeData = null;

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    await loadSettings();
    updateUI();
    setupEventListeners();
});

// Charger les paramètres
async function loadSettings() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['challengeData'], (result) => {
            challengeData = result.challengeData || {
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
            resolve();
        });
    });
}

// Sauvegarder les paramètres
async function saveSettings() {
    return new Promise((resolve) => {
        chrome.storage.local.set({ challengeData }, () => {
            resolve();
            // Notifier le background script
            chrome.runtime.sendMessage({ action: 'updateBlockingRules' });
        });
    });
}

// Mettre à jour l'interface
function updateUI() {
    // Paramètres généraux
    document.getElementById('blockingEnabled').checked = challengeData.settings?.blockingEnabled !== false;
    document.getElementById('notificationsEnabled').checked = challengeData.settings?.notificationsEnabled !== false;
    document.getElementById('darkMode').checked = challengeData.settings?.darkMode || false;

    // Sites personnalisés
    updateCustomSitesList();

    // Statistiques
    updateStatistics();
}

// Mettre à jour la liste des sites personnalisés
function updateCustomSitesList() {
    const listElement = document.getElementById('customSitesList');
    const customSites = challengeData.customBlockedSites || [];

    if (customSites.length === 0) {
        listElement.innerHTML = '<p style="color: #999; font-size: 14px; padding: 10px;">Aucun site personnalisé ajouté</p>';
        return;
    }

    listElement.innerHTML = customSites.map(site => `
        <div class="site-item">
            <span class="site-domain">${site}</span>
            <button class="btn-remove" data-site="${site}">Supprimer</button>
        </div>
    `).join('');

    // Ajouter les événements de suppression
    listElement.querySelectorAll('.btn-remove').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const site = e.target.getAttribute('data-site');
            removeSite(site);
        });
    });
}

// Ajouter un site
async function addSite(domain) {
    // Nettoyer le domaine
    domain = domain.toLowerCase().trim();
    domain = domain.replace(/^(https?:\/\/)?(www\.)?/, '');
    domain = domain.replace(/\/.*$/, '');

    // Valider le domaine
    if (!domain || domain.length < 3) {
        alert('Veuillez entrer un domaine valide');
        return;
    }

    // Vérifier si déjà dans la liste
    if (challengeData.customBlockedSites.includes(domain)) {
        alert('Ce site est déjà dans la liste');
        return;
    }

    // Ajouter
    challengeData.customBlockedSites.push(domain);
    await saveSettings();
    updateCustomSitesList();

    // Vider l'input
    document.getElementById('newSiteInput').value = '';
}

// Supprimer un site
async function removeSite(domain) {
    if (confirm(`Supprimer "${domain}" de la liste ?`)) {
        challengeData.customBlockedSites = challengeData.customBlockedSites.filter(site => site !== domain);
        await saveSettings();
        updateCustomSitesList();
    }
}

// Mettre à jour les statistiques
function updateStatistics() {
    const days = challengeData.days || {};
    const successDays = Object.values(days).filter(status => status === 'success').length;
    const longestStreak = calculateLongestStreak(days);
    const unlockedBadges = calculateUnlockedBadges(days);

    document.getElementById('totalDaysValidated').textContent = successDays;
    document.getElementById('longestStreak').textContent = longestStreak;
    document.getElementById('totalBadges').textContent = `${unlockedBadges}/4`;
}

// Calculer le plus long streak
function calculateLongestStreak(days) {
    let maxStreak = 0;
    let currentStreak = 0;

    for (let day = 1; day <= 30; day++) {
        const dateStr = `${new Date().getFullYear()}-11-${String(day).padStart(2, '0')}`;
        if (days[dateStr] === 'success') {
            currentStreak++;
            maxStreak = Math.max(maxStreak, currentStreak);
        } else {
            currentStreak = 0;
        }
    }

    return maxStreak;
}

// Calculer les badges débloqués
function calculateUnlockedBadges(days) {
    const successDays = Object.values(days).filter(status => status === 'success').length;
    const streak = calculateCurrentStreak(days);

    let count = 0;
    if (streak >= 3) count++;
    if (streak >= 7) count++;
    if (streak >= 15) count++;
    if (successDays >= 30) count++;

    return count;
}

// Calculer le streak actuel
function calculateCurrentStreak(days) {
    const today = new Date();
    const currentDate = today.getDate();

    let streak = 0;

    for (let i = currentDate; i >= 1; i--) {
        const dateStr = `${today.getFullYear()}-11-${String(i).padStart(2, '0')}`;
        if (days[dateStr] === 'success') {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

// Exporter les données
function exportData() {
    const dataStr = JSON.stringify(challengeData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);

    const link = document.createElement('a');
    link.href = url;
    link.download = `nnn-challenge-${new Date().toISOString().split('T')[0]}.json`;
    link.click();

    URL.revokeObjectURL(url);
}

// Générer un code de partage
function generateShareCode() {
    const successDays = Object.values(challengeData.days || {}).filter(status => status === 'success').length;
    const streak = calculateCurrentStreak(challengeData.days || {});

    // Générer un code basé sur les stats
    const year = new Date().getFullYear();
    const hash = btoa(`${year}-${successDays}-${streak}`).substring(0, 5).toUpperCase();
    const code = `NNN-${year}-${hash}-${successDays}D${streak}S`;

    document.getElementById('shareCode').textContent = code;
    document.getElementById('shareCodeDisplay').classList.remove('hidden');
}

// Copier le code
function copyShareCode() {
    const code = document.getElementById('shareCode').textContent;
    navigator.clipboard.writeText(code).then(() => {
        const btn = document.getElementById('copyCodeBtn');
        const originalText = btn.textContent;
        btn.textContent = '✓ Copié !';
        setTimeout(() => {
            btn.textContent = originalText;
        }, 2000);
    });
}

// Réinitialiser le challenge
async function resetChallenge() {
    const confirmed = confirm(
        '⚠️ ATTENTION ⚠️\n\n' +
        'Veux-tu vraiment réinitialiser tout le challenge ?\n\n' +
        'Cela supprimera :\n' +
        '- Tous tes jours validés\n' +
        '- Tes badges débloqués\n' +
        '- Ton historique\n\n' +
        'Les sites bloqués et paramètres seront conservés.\n\n' +
        'Cette action est IRRÉVERSIBLE !'
    );

    if (confirmed) {
        challengeData.days = {};
        challengeData.unlockedBadges = [];
        challengeData.startDate = new Date().toISOString();

        await saveSettings();
        updateUI();

        alert('Challenge réinitialisé avec succès !');
    }
}

// Supprimer toutes les données
async function clearAllData() {
    const confirmed = confirm(
        '⚠️⚠️⚠️ DANGER ⚠️⚠️⚠️\n\n' +
        'CETTE ACTION SUPPRIMERA TOUTES LES DONNÉES DE L\'EXTENSION !\n\n' +
        'Cela inclut :\n' +
        '- Tous tes jours validés\n' +
        '- Tes badges\n' +
        '- Tes sites personnalisés\n' +
        '- Tous tes paramètres\n\n' +
        'ES-TU ABSOLUMENT SÛR ?'
    );

    if (confirmed) {
        const reallyConfirmed = confirm(
            'DERNIÈRE CHANCE !\n\n' +
            'Toutes tes données seront perdues à jamais.\n\n' +
            'Veux-tu vraiment continuer ?'
        );

        if (reallyConfirmed) {
            await chrome.storage.local.clear();
            alert('Toutes les données ont été supprimées. La page va se recharger.');
            location.reload();
        }
    }
}

// Configuration des événements
function setupEventListeners() {
    // Toggles de paramètres
    document.getElementById('blockingEnabled').addEventListener('change', async (e) => {
        challengeData.settings.blockingEnabled = e.target.checked;
        await saveSettings();
    });

    document.getElementById('notificationsEnabled').addEventListener('change', async (e) => {
        challengeData.settings.notificationsEnabled = e.target.checked;
        await saveSettings();
    });

    document.getElementById('darkMode').addEventListener('change', async (e) => {
        challengeData.settings.darkMode = e.target.checked;
        await saveSettings();
        // TODO: Implémenter le dark mode
    });

    // Ajouter un site
    document.getElementById('addSiteBtn').addEventListener('click', () => {
        const input = document.getElementById('newSiteInput');
        const domain = input.value;
        if (domain) {
            addSite(domain);
        }
    });

    // Permettre d'ajouter avec Enter
    document.getElementById('newSiteInput').addEventListener('keypress', (e) => {
        if (e.key === 'Enter') {
            document.getElementById('addSiteBtn').click();
        }
    });

    // Exporter les données
    document.getElementById('exportDataBtn').addEventListener('click', exportData);

    // Générer le code de partage
    document.getElementById('generateCodeBtn').addEventListener('click', generateShareCode);

    // Copier le code
    document.getElementById('copyCodeBtn').addEventListener('click', copyShareCode);

    // Réinitialiser le challenge
    document.getElementById('resetChallengeBtn').addEventListener('click', resetChallenge);

    // Supprimer toutes les données
    document.getElementById('clearAllDataBtn').addEventListener('click', clearAllData);

    // Retour au popup
    document.getElementById('backToPopupBtn').addEventListener('click', () => {
        window.close();
    });
}
