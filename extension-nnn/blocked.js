// blocked.js - Script pour la page de blocage

let quotes = [];
let motivationalMessages = [];

// Initialisation
document.addEventListener('DOMContentLoaded', async () => {
    await loadQuotes();
    await loadStats();
    displayRandomQuote();
    displayRandomEncouragement();
    setupEventListeners();
});

// Charger les citations
async function loadQuotes() {
    try {
        const response = await fetch(chrome.runtime.getURL('data/blocked-sites.json'));
        const data = await response.json();
        quotes = data.blockedPageQuotes || [];
        motivationalMessages = data.motivationalMessages || [];
    } catch (error) {
        console.error('Erreur de chargement des citations:', error);
        quotes = ['La discipline est le pont entre les objectifs et l\'accomplissement.'];
        motivationalMessages = ['Reste fort ! Continue le challenge !'];
    }
}

// Charger et afficher les statistiques
async function loadStats() {
    try {
        const result = await chrome.storage.local.get(['challengeData']);
        const challengeData = result.challengeData || {};

        const successDays = Object.values(challengeData.days || {}).filter(status => status === 'success').length;
        const currentStreak = calculateCurrentStreak(challengeData.days || {});

        document.getElementById('successDays').textContent = successDays;
        document.getElementById('currentStreak').textContent = currentStreak;
    } catch (error) {
        console.error('Erreur de chargement des stats:', error);
    }
}

// Calculer le streak actuel
function calculateCurrentStreak(days) {
    const today = new Date();
    const year = today.getFullYear();
    const currentDate = today.getDate();

    let streak = 0;

    // Commencer à partir d'aujourd'hui et remonter
    for (let i = currentDate; i >= 1; i--) {
        const dateStr = `${year}-11-${String(i).padStart(2, '0')}`;
        if (days[dateStr] === 'success') {
            streak++;
        } else {
            break;
        }
    }

    return streak;
}

// Afficher une citation aléatoire
function displayRandomQuote() {
    if (quotes.length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        const quote = quotes[randomIndex];

        // Séparer la citation de l'auteur si présent
        const parts = quote.split(' - ');
        if (parts.length === 2) {
            document.getElementById('quoteText').textContent = parts[0];
            document.querySelector('.quote-author').textContent = `- ${parts[1]}`;
        } else {
            document.getElementById('quoteText').textContent = quote;
            document.querySelector('.quote-author').textContent = '';
        }
    }
}

// Afficher un message d'encouragement aléatoire
function displayRandomEncouragement() {
    if (motivationalMessages.length > 0) {
        const randomIndex = Math.floor(Math.random() * motivationalMessages.length);
        let message = motivationalMessages[randomIndex];

        // Remplacer {days} par les stats réelles
        chrome.storage.local.get(['challengeData'], (result) => {
            const challengeData = result.challengeData || {};
            const successDays = Object.values(challengeData.days || {}).filter(status => status === 'success').length;
            message = message.replace('{days}', successDays);
            document.getElementById('encouragementText').textContent = message;
        });
    }
}

// Configuration des événements
function setupEventListeners() {
    // Bouton retour
    document.getElementById('goBackBtn').addEventListener('click', () => {
        // Rediriger vers une page sûre
        const safePages = [
            'https://www.google.com',
            'https://www.wikipedia.org',
            'https://www.youtube.com',
            'https://www.github.com'
        ];
        const randomPage = safePages[Math.floor(Math.random() * safePages.length)];
        window.location.href = randomPage;
    });

    // Bouton ouvrir popup
    document.getElementById('openPopupBtn').addEventListener('click', () => {
        chrome.runtime.sendMessage({ action: 'openPopup' });
        // Alternative : rediriger vers une page neutre
        window.location.href = 'https://www.google.com';
    });

    // Bouton désactiver le blocage
    document.getElementById('disableBlockingBtn').addEventListener('click', async () => {
        const confirmed = confirm(
            '⚠️ ATTENTION ⚠️\n\n' +
            'Es-tu vraiment sûr de vouloir désactiver le blocage ?\n\n' +
            'Cela pourrait compromettre ton challenge.\n\n' +
            'Pense à ton objectif et à ton engagement envers toi-même.\n\n' +
            'Es-tu certain de vouloir continuer ?'
        );

        if (confirmed) {
            // Deuxième confirmation
            const reallyConfirmed = confirm(
                'Dernière chance de réfléchir !\n\n' +
                'Le regret dure plus longtemps que la discipline.\n\n' +
                'Veux-tu vraiment désactiver le blocage ?'
            );

            if (reallyConfirmed) {
                try {
                    const result = await chrome.storage.local.get(['challengeData']);
                    const challengeData = result.challengeData || {};

                    challengeData.settings = challengeData.settings || {};
                    challengeData.settings.blockingEnabled = false;

                    await chrome.storage.local.set({ challengeData });

                    // Informer le background script
                    chrome.runtime.sendMessage({ action: 'updateBlockingRules' });

                    alert('Le blocage a été désactivé. Tu peux le réactiver dans les paramètres.');

                    // Rediriger
                    window.location.href = 'https://www.google.com';
                } catch (error) {
                    console.error('Erreur de désactivation:', error);
                    alert('Une erreur s\'est produite. Essaie via les paramètres.');
                }
            }
        }
    });
}

// Rafraîchir les stats toutes les secondes (au cas où)
setInterval(loadStats, 5000);
