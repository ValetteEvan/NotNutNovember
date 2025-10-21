// popup.js - Gestion du popup principal

// État global
let challengeData = {
    startDate: null,
    days: {}, // { "2024-11-01": "success" | "failed" }
    unlockedBadges: [],
    customBlockedSites: [],
    settings: {
        blockingEnabled: true,
        notificationsEnabled: true,
        darkMode: false
    }
};

let motivationalMessages = [];

// Initialisation au chargement
document.addEventListener('DOMContentLoaded', async () => {
    await loadData();
    await loadMotivationalMessages();
    initializeUI();
    setupEventListeners();
});

// Charger les données depuis le storage
async function loadData() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['challengeData'], (result) => {
            if (result.challengeData) {
                challengeData = result.challengeData;
            } else {
                // Initialiser avec les valeurs par défaut
                challengeData.startDate = new Date().toISOString();
                saveData();
            }
            resolve();
        });
    });
}

// Sauvegarder les données
async function saveData() {
    return new Promise((resolve) => {
        chrome.storage.local.set({ challengeData }, resolve);
    });
}

// Charger les messages de motivation
async function loadMotivationalMessages() {
    try {
        const response = await fetch('data/blocked-sites.json');
        const data = await response.json();
        motivationalMessages = data.motivationalMessages;
    } catch (error) {
        console.error('Erreur de chargement des messages:', error);
        motivationalMessages = ['Reste fort ! Continue le challenge !'];
    }
}

// Initialiser l'interface
function initializeUI() {
    generateCalendar();
    updateStats();
    updateMotivationMessage();
    updateBadges();
    updateTodayStatus();
}

// Générer le calendrier de novembre
function generateCalendar() {
    const calendarGrid = document.getElementById('calendarGrid');
    calendarGrid.innerHTML = '';

    const year = new Date().getFullYear();
    const month = 10; // Novembre (0-indexed)
    const daysInNovember = 30;

    const today = new Date();
    const currentDate = today.getDate();
    const currentMonth = today.getMonth();
    const currentYear = today.getFullYear();

    for (let day = 1; day <= daysInNovember; day++) {
        const dateStr = `${year}-11-${String(day).padStart(2, '0')}`;
        const dayElement = document.createElement('div');
        dayElement.className = 'calendar-day';

        // Vérifier le statut du jour
        const status = challengeData.days[dateStr];

        // Déterminer si c'est aujourd'hui
        const isToday = (currentYear === year && currentMonth === month && currentDate === day);

        // Déterminer si c'est dans le futur
        const isFuture = (currentYear === year && currentMonth === month && day > currentDate) ||
                        (currentYear === year && currentMonth < month) ||
                        (currentYear < year);

        if (status === 'success') {
            dayElement.classList.add('success');
        } else if (status === 'failed') {
            dayElement.classList.add('failed');
        } else if (isFuture) {
            dayElement.classList.add('future');
        }

        if (isToday) {
            dayElement.classList.add('today');
        }

        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-status">${status === 'success' ? '✓' : status === 'failed' ? '✗' : ''}</div>
        `;

        // Ajouter un événement de clic pour les jours passés et aujourd'hui
        if (!isFuture) {
            dayElement.addEventListener('click', () => toggleDayStatus(dateStr));
        }

        calendarGrid.appendChild(dayElement);
    }
}

// Basculer le statut d'un jour
async function toggleDayStatus(dateStr) {
    const currentStatus = challengeData.days[dateStr];

    // Cycle: undefined -> success -> failed -> undefined
    if (!currentStatus) {
        challengeData.days[dateStr] = 'success';
    } else if (currentStatus === 'success') {
        challengeData.days[dateStr] = 'failed';
    } else {
        delete challengeData.days[dateStr];
    }

    await saveData();
    generateCalendar();
    updateStats();
    updateBadges();
    updateTodayStatus();
}

// Mettre à jour les statistiques
function updateStats() {
    const successDays = Object.values(challengeData.days).filter(status => status === 'success').length;
    const totalDays = 30;
    const successRate = Math.round((successDays / totalDays) * 100);

    // Calculer le streak actuel
    const currentStreak = calculateCurrentStreak();

    document.getElementById('currentStreak').textContent = currentStreak;
    document.getElementById('totalSuccess').textContent = `${successDays}/30`;
    document.getElementById('successRate').textContent = `${successRate}%`;
}

// Calculer le streak de jours consécutifs
function calculateCurrentStreak() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const currentDate = today.getDate();

    let streak = 0;

    // Commencer à partir d'aujourd'hui et remonter
    for (let i = currentDate; i >= 1; i--) {
        const dateStr = `${year}-11-${String(i).padStart(2, '0')}`;
        if (challengeData.days[dateStr] === 'success') {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

// Mettre à jour le message de motivation
function updateMotivationMessage() {
    const successDays = Object.values(challengeData.days).filter(status => status === 'success').length;
    const messageElement = document.getElementById('motivationMessage');

    if (motivationalMessages.length > 0) {
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        let message = motivationalMessages[randomIndex];
        message = message.replace('{days}', successDays);
        messageElement.textContent = message;
    }
}

// Mettre à jour les badges
function updateBadges() {
    const successDays = Object.values(challengeData.days).filter(status => status === 'success').length;
    const streak = calculateCurrentStreak();

    const badges = [
        { id: 'badge3', days: 3, unlocked: streak >= 3 },
        { id: 'badge7', days: 7, unlocked: streak >= 7 },
        { id: 'badge15', days: 15, unlocked: streak >= 15 },
        { id: 'badge30', days: 30, unlocked: successDays >= 30 }
    ];

    badges.forEach(badge => {
        const element = document.getElementById(badge.id);
        const wasLocked = element.classList.contains('locked');

        if (badge.unlocked) {
            element.classList.remove('locked');
            element.classList.add('unlocked');

            // Si le badge vient d'être débloqué, jouer une animation
            if (wasLocked && !challengeData.unlockedBadges.includes(badge.id)) {
                challengeData.unlockedBadges.push(badge.id);
                saveData();
                showBadgeNotification(badge);
            }
        } else {
            element.classList.add('locked');
            element.classList.remove('unlocked');
        }
    });
}

// Afficher une notification de badge débloqué
function showBadgeNotification(badge) {
    if (challengeData.settings.notificationsEnabled) {
        chrome.notifications.create({
            type: 'basic',
            iconUrl: 'assets/icon128.png',
            title: 'Badge débloqué ! 🎉',
            message: `Félicitations ! Tu as débloqué le badge ${badge.days} jours !`,
            priority: 2
        });
    }
}

// Mettre à jour le statut d'aujourd'hui
function updateTodayStatus() {
    const today = new Date();
    const year = today.getFullYear();
    const month = today.getMonth();
    const day = today.getDate();

    // Vérifier si c'est novembre
    if (month !== 10) {
        document.getElementById('todayStatus').textContent = 'Le challenge est pour le mois de novembre';
        document.getElementById('validateDayBtn').disabled = true;
        return;
    }

    const todayStr = `${year}-11-${String(day).padStart(2, '0')}`;
    const status = challengeData.days[todayStr];
    const statusElement = document.getElementById('todayStatus');
    const validateBtn = document.getElementById('validateDayBtn');

    if (status === 'success') {
        statusElement.textContent = '✓ Aujourd\'hui validé !';
        statusElement.className = 'today-status validated';
        validateBtn.disabled = true;
        validateBtn.querySelector('.btn-text').textContent = 'Jour validé';
    } else if (status === 'failed') {
        statusElement.textContent = '✗ Aujourd\'hui marqué comme échoué';
        statusElement.className = 'today-status failed';
        validateBtn.disabled = false;
        validateBtn.querySelector('.btn-text').textContent = 'Modifier le statut';
    } else {
        statusElement.textContent = '';
        validateBtn.disabled = false;
        validateBtn.querySelector('.btn-text').textContent = 'Valider aujourd\'hui';
    }
}

// Configuration des écouteurs d'événements
function setupEventListeners() {
    // Bouton de validation
    document.getElementById('validateDayBtn').addEventListener('click', async () => {
        const today = new Date();
        const year = today.getFullYear();
        const month = today.getMonth();
        const day = today.getDate();

        if (month !== 10) return; // Pas novembre

        const todayStr = `${year}-11-${String(day).padStart(2, '0')}`;

        if (challengeData.days[todayStr] === 'success') {
            // Déjà validé, on peut permettre de basculer
            await toggleDayStatus(todayStr);
        } else {
            // Valider comme succès
            challengeData.days[todayStr] = 'success';
            await saveData();
            generateCalendar();
            updateStats();
            updateBadges();
            updateTodayStatus();
            updateMotivationMessage();
        }
    });

    // Bouton paramètres
    document.getElementById('settingsBtn').addEventListener('click', () => {
        chrome.runtime.openOptionsPage();
    });

    // Bouton réinitialiser
    document.getElementById('resetBtn').addEventListener('click', async () => {
        if (confirm('Es-tu sûr de vouloir réinitialiser tout le challenge ? Cette action est irréversible.')) {
            challengeData = {
                startDate: new Date().toISOString(),
                days: {},
                unlockedBadges: [],
                customBlockedSites: challengeData.customBlockedSites || [],
                settings: challengeData.settings || {
                    blockingEnabled: true,
                    notificationsEnabled: true,
                    darkMode: false
                }
            };
            await saveData();
            initializeUI();
        }
    });
}

// Écouter les commandes clavier
chrome.commands.onCommand.addListener((command) => {
    if (command === 'validate-day') {
        document.getElementById('validateDayBtn').click();
    }
});
