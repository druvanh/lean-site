document.addEventListener('DOMContentLoaded', () => {

    // ── MOOD TRACKING ──
    const moodMap = {
        sad:      { bar: 'sad',     emoji: '🌧️', color: '#c47a7a' },
        tired:    { bar: 'tired',   emoji: '🌙', color: '#5c2d8c' },
        anxious:  { bar: 'anxious', emoji: '🌀', color: '#7b82c4' },
        stressed: { bar: 'stressed',emoji: '🔥', color: '#9B2415' },
        lonely:   { bar: 'sad',     emoji: '🌫️', color: '#c47a7a' },
        grief:    { bar: 'sad',     emoji: '🌧️', color: '#c47a7a' },
        happy:    { bar: 'calm',    emoji: '🌤️', color: '#00c8e0' },
        calm:     { bar: 'calm',    emoji: '🌊', color: '#00c8e0' },
        breathe:  { bar: 'calm',    emoji: '🌬️', color: '#00c8e0' },
        angry:    { bar: 'stressed',emoji: '🔥', color: '#9B2415' },
        scared:   { bar: 'anxious', emoji: '🌀', color: '#7b82c4' },
        overwhelmed: { bar: 'stressed', emoji: '🔥', color: '#9B2415' }
    };

    const counts = { calm: 0, sad: 0, anxious: 0, tired: 0, stressed: 0 };
    let totalMessages = 0;
    let currentEmoji = '🌫️';
    const sessionStart = Date.now();

    // ── UPDATE MOOD RING ──
    function updateMoodRing(emoji, color) {
        const ring = document.getElementById('moodRing');
        const emojiEl = document.getElementById('moodEmoji');
        if (!ring || !emojiEl) return;
        currentEmoji = emoji;
        emojiEl.textContent = emoji;
        ring.style.background = `radial-gradient(circle, ${color}33 0%, ${color}99 60%, ${color} 100%)`;
    }

    // ── UPDATE BARS ──
    function updateBars() {
        const total = Object.values(counts).reduce((a, b) => a + b, 0) || 1;
        for (const key in counts) {
            const fill  = document.getElementById(`bar-${key}`);
            const count = document.getElementById(`count-${key}`);
            if (fill)  fill.style.width  = `${(counts[key] / total) * 100}%`;
            if (count) count.textContent = counts[key];
        }
    }

    // ── UPDATE SESSION STATS ──
    function updateStats(mode) {
        totalMessages++;
        const msgEl = document.getElementById('statMessages');
        const minEl = document.getElementById('statMinutes');
        const modeEl = document.getElementById('statMode');
        if (msgEl)  msgEl.textContent  = totalMessages;
        if (minEl)  minEl.textContent  = Math.floor((Date.now() - sessionStart) / 60000);
        if (modeEl) modeEl.textContent = mode.charAt(0).toUpperCase() + mode.slice(1);
    }

    // ── DETECT MOOD FROM TEXT ──
    function detectMood(text) {
        const lower = text.toLowerCase();
        for (const keyword in moodMap) {
            if (lower.includes(keyword)) {
                return moodMap[keyword];
            }
        }
        return null;
    }

    // ── TYPING INDICATOR ──
    function showTyping() {
        const t = document.getElementById('typingIndicator');
        if (t) {
            const chatBox = document.getElementById('chatBox');
            t.classList.add('visible');
            chatBox.appendChild(t);
            chatBox.scrollTop = chatBox.scrollHeight;
        }
    }

    function hideTyping() {
        const t = document.getElementById('typingIndicator');
        if (t) t.classList.remove('visible');
    }

    // ── MINUTE TICKER ──
    setInterval(() => {
        const minEl = document.getElementById('statMinutes');
        if (minEl) minEl.textContent = Math.floor((Date.now() - sessionStart) / 60000);
    }, 30000);

    // ── EXPOSE TO chat.js ──
    window.analyticsTrack = function(userText, botMode) {
        const mood = detectMood(userText);
        if (mood) {
            counts[mood.bar]++;
            updateMoodRing(mood.emoji, mood.color);
            updateBars();
        }
        updateStats(botMode);
    };

    window.showTypingIndicator  = showTyping;
    window.hideTypingIndicator  = hideTyping;

});