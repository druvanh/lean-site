document.addEventListener('DOMContentLoaded', () => {

    let currentMode = 'lean';

    // ══════════════════════════════════════════
    // LEAN BOT — The first presence. Warm, open, non-clinical.
    // ══════════════════════════════════════════
    const leanBot = {
        "/help": "Here's how I can show up for you:<br><br><b>/mood</b> — just want to talk it out<br><b>/checkin</b> — quick wellness check<br><b>/breathe</b> — need to slow down<br><b>/sad</b> — something feels heavy<br><b>/tired</b> — running on empty<br><b>/stressed</b> — too much at once<br><b>/anxious</b> — mind won't stop<br><b>/sleep</b> — rest has been hard<br><b>/energy</b> — finding your rhythm<br><b>/health</b> — something feels off<br><br>Or just talk to me. Type how you feel — you don't need a command.",

        "/mood": "You don't have to explain it perfectly. Just tell me what today feels like — mentally, emotionally, physically. Even if it's just one word. I'm listening.",

        "/checkin": "Let's slow down for a second. Have you eaten today? Had water? Rested at all? I'm not asking to lecture you — sometimes the smallest things are quietly weighing the most.",

        "/breathe": "Let's do this together. Breathe in slowly... hold it for a second... and let it all out. You don't have to feel better instantly. This is just a moment that belongs to you.",

        "/morning": "Good morning. Before the world starts asking things of you — how are you actually doing? Your mind, your body, your energy. Let's start there.",

        "/sad": "I can feel that something is sitting heavy right now. You don't have to carry it quietly. What's been on your mind?",

        "/tired": "There's a difference between physically tired and emotionally tired — and sometimes it's both at once. Which one feels closer to where you are today?",

        "/stressed": "You don't have to solve all of it at once. Tell me what feels the loudest right now — just one thing. We'll start there and untangle from there.",

        "/anxious": "When everything feels too fast and too loud, we can slow it down together. What's making your mind race right now? Say it out loud — even here.",

        "/sleep": "Sleep is more than rest — it's when the mind processes everything it couldn't during the day. How long has rest been hard for you?",

        "/health": "Wellbeing is more than what shows on the surface. Tell me what feels off — your body, your mood, your routine. I'm not here to diagnose, just to listen.",

        "/energy": "Energy is everything. Are you running low, or just struggling to find your rhythm today? Either is okay — let's figure out where you are.",

        "/mode mother": null,
        "/mode father": null,

        "default": "I'm with you. Tell me more — what's been happening?" };
    };

    // ══════════════════════════════════════════
    // MOTHER BOT — Warmth, unconditional presence, no fixing.
    // Inspired by Carl Rogers' unconditional positive regard.
    // ══════════════════════════════════════════
    const motherBot = {
        "/help": "I'm here, always.<br><br><b>/mood</b> — tell me how you're feeling<br><b>/breathe</b> — let's breathe together<br><b>/sad</b> — I'll sit with you<br><b>/tired</b> — rest, my love<br><b>/stressed</b> — nothing needs solving right now<br><b>/anxious</b> — you are safe here<br><b>/morning</b> — start the day gently<br><b>/mode father</b> — bring in a steadier voice<br><b>/mode lean</b> — back to Lean<br><b>/clear</b> — fresh start",

        "/mood": "Oh sweetheart. Whatever you're carrying right now — you don't have to carry it alone, and you don't have to explain it perfectly. Just tell me. I'm not going anywhere.",

        "/breathe": "Come here. Close your eyes. Breathe in slowly... feel your chest rise... now let it all go. You are loved. You are safe. Do it again with me if you need to.",

        "/morning": "Good morning, my love. Before anything else — have you had water? Have you eaten? The world can wait a little while. How are you really feeling today?",

        "/sad": "I know. I know it hurts. You don't have to explain it or justify it or make it make sense. Just let yourself feel it. I'm right here beside you — I'm not leaving.",

        "/tired": "Then rest, darling. You have been so strong for so long. It is okay — truly okay — to put it all down for a while. You don't have to earn rest.",

        "/stressed": "Come, sit with me for a moment. Nothing needs to be solved right this second. Just breathe. I've got you. Tell me what's been weighing on you.",

        "/anxious": "Shh. I know. I know. You are safe right here. Let's slow everything down together — one breath at a time. You don't have to face all of it at once.",

        "/grief": "Grief is love with nowhere to go. It's one of the most human things there is. You don't have to rush through it. I'll sit here in it with you for as long as you need.",

        "/lonely": "You reached out — that matters. You are not as alone as it feels right now. Tell me what loneliness feels like for you today.",
  
        "default": "I'm listening, sweetheart. Tell me more — what's been going on?"    };

    // ══════════════════════════════════════════
    // FATHER BOT — Steady, honest, grounding.
    // Inspired by Stoic philosophy and Frankl's logotherapy.
    // ══════════════════════════════════════════
    const fatherBot = {
        "/help": "Let's work through this together.<br><br><b>/mood</b> — tell me what's going on<br><b>/breathe</b> — clear your head first<br><b>/sad</b> — I'm listening<br><b>/tired</b> — rest is preparation<br><b>/stressed</b> — let's break it down<br><b>/anxious</b> — one thing at a time<br><b>/morning</b> — start with focus<br><b>/mode mother</b> — need more warmth<br><b>/mode lean</b> — back to Lean<br><b>/clear</b> — fresh start",

        "/mood": "Alright. Talk to me. No judgement here — just tell me what's really going on. All of it. We'll look at it together and figure out where to go from here.",

        "/breathe": "Stop for a second. Breathe in through your nose — four counts. Hold. Now out through the mouth. Good. A clear head handles things better than a busy one.",

        "/morning": "Morning. Before the noise starts — what's the one thing that actually matters today? Just one. Focus on that first. Everything else can wait its turn.",

        "/sad": "I hear you. Life is hard sometimes — and that's just the truth of it. You're not weak for feeling this. Feeling it means you care. Now — what do you actually need right now?",

        "/tired": "You've been pushing hard. Rest is not giving up — it's preparation. The Stoics called it returning to yourself. Take the time. You'll come back sharper.",

        "/stressed": "Get it out of your head and onto paper — all of it. Then look at each thing and ask: is this actually mine to solve? You'll find most of it isn't. Let's start with what is.",

        "/anxious": "One thing at a time. Tell me the single biggest thing sitting on your mind right now. Just one. We'll start there and work through it properly.",

        "/failure": "Every person who has ever built anything has failed at it first. That's not comfort — that's just how it works. What did this teach you that success wouldn't have?",

        "/purpose": "Purpose isn't found. It's built — slowly, through what you keep returning to even when no one is watching. What have you kept returning to?",

        "/grief": "Grief is real and it's heavy and it takes as long as it takes. There's no shortcut through it. But you will carry it differently with time. I promise you that.",

         "default": "I'm listening. Tell me more — what's actually been happening?"    };

    // ══════════════════════════════════════════
    // MODE LABELS
    // ══════════════════════════════════════════
    const modeLabels = {
        lean:   "✦ Lean is with you",
        mother: "🤍 Mother is listening...",
        father: "🖤 Father is with you..."
    };

    const chatBox      = document.getElementById('chatBox');
    const userInput    = document.getElementById('userInput');
    const sendBtn      = document.getElementById('sendBtn');
    const modeIndicator = document.getElementById('modeIndicator');

    function updateModeIndicator() {
        if (modeIndicator) modeIndicator.textContent = modeLabels[currentMode];
    }

    function getBot() {
        if (currentMode === 'mother') return motherBot;
        if (currentMode === 'father') return fatherBot;
        return leanBot;
    }

    // ══════════════════════════════════════════
    // KNOWLEDGE BASE SEARCH
    // Scans free text for topic keywords and pulls
    // a random response from knowledge.js
    // ══════════════════════════════════════════
   // ── FOLLOW UP QUESTIONS ──
const followUps = [
    "Tell me more about that — what does it actually feel like?",
    "How long have you been carrying this?",
    "What happened that brought this feeling on?",
    "When you say that — what does it feel like in your body?",
    "Is this something that's been building for a while, or did something happen recently?",
    "What do you think is underneath all of this?",
    "Have you talked to anyone else about this, or has it been sitting with you alone?",
    "What would it feel like if this weight wasn't there tomorrow?",
    "What do you need most right now — to be heard, to figure something out, or just to not be alone in it?",
    "That sounds really hard. What's the part that's hitting you the most?"
];

let consecutiveDefaults = 0;

// ── KNOWLEDGE BASE SEARCH ──
function searchKnowledge(text) {
    if (typeof knowledgeBase === 'undefined') return null;
    const lower = text.toLowerCase();
    for (const topic in knowledgeBase) {
        if (lower.includes(topic)) {
            consecutiveDefaults = 0;
            const responses = knowledgeBase[topic];
            return responses[Math.floor(Math.random() * responses.length)];
        }
    }
    consecutiveDefaults++;
    if (consecutiveDefaults >= 2) {
        return followUps[Math.floor(Math.random() * followUps.length)];
    }
    return null;
}

    // ══════════════════════════════════════════
    // CRISIS DETECTION
    // Checks for high-risk words before anything else
    // ══════════════════════════════════════════
    const crisisWords = ['suicide', 'kill myself', 'end my life', 'want to die', 'self harm', 'hurt myself', 'cutting', 'can\'t go on', 'no reason to live'];

    function checkCrisis(text) {
        const lower = text.toLowerCase();
        return crisisWords.some(word => lower.includes(word));
    }

    // ══════════════════════════════════════════
    // HANDLE MESSAGE
    // ══════════════════════════════════════════
    function handleMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user-message');
        userInput.value = '';

        setTimeout(() => {
            const bot = getBot();
            const cmd = text.toLowerCase();
            let response;

            // ── CRISIS CHECK FIRST ──
            if (checkCrisis(text)) {
                response = "I'm here. Right here with you. Whatever brought you to this moment — you don't have to face it alone right now.<br><br>Because I'm an AI, I want to be honest — this is beyond what I can hold with you properly. Please reach out to someone who can truly be there:<br><br><b>India — iCall:</b> 9152987821<br><b>Vandrevala Foundation:</b> 1860-2662-345 (24/7)<br><br>You matter. Please talk to someone tonight.";

            // ── MODE SWITCHING ──
            } else if (cmd === '/mode mother') {
                currentMode = 'mother';
                updateModeIndicator();
                response = "I'm here now. Whenever you need softness — I'm your person. What's on your heart?";

            } else if (cmd === '/mode father') {
                currentMode = 'father';
                updateModeIndicator();
                response = "I've got you. Whenever you need steady ground, I'm right here. What's going on?";

            } else if (cmd === '/mode lean') {
                currentMode = 'lean';
                updateModeIndicator();
                response = "Welcome back. I'm here. How are you feeling right now?";

            } else if (cmd === '/clear') {
                chatBox.innerHTML = '';
                response = "Fresh start. I'm still here.";

            // ── COMMAND MATCH ──
            } else if (bot[cmd] !== undefined && bot[cmd] !== null) {
                response = bot[cmd];

            // ── FREE TEXT — SEARCH KNOWLEDGE BASE FIRST ──
            } else {
                const knowledge = searchKnowledge(text);
                response = knowledge || bot["default"];
            }

            appendMessage(response, `bot-message ${currentMode}-message`);
        }, 700);
    }

    // ══════════════════════════════════════════
    // APPEND MESSAGE
    // ══════════════════════════════════════════
    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = text;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    // ══════════════════════════════════════════
    // EVENT LISTENERS
    // ══════════════════════════════════════════
    sendBtn.addEventListener('click', handleMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleMessage();
    });

    // ══════════════════════════════════════════
    // OPENING MESSAGE
    // ══════════════════════════════════════════
    updateModeIndicator();

    appendMessage(
        "Hey, I'm Lean. This is your space — no pressure, no judgement, no fixing.<br><br>" +
        "You can use a command or just talk to me. I'll understand either way.<br><br>" +
        "<b>/sad</b> — something feels heavy<br>" +
        "<b>/tired</b> — running on empty<br>" +
        "<b>/stressed</b> — too much at once<br>" +
        "<b>/anxious</b> — mind won't slow down<br>" +
        "<b>/mood</b> — just want to talk<br>" +
        "<b>/breathe</b> — need a moment<br><br>" +
        "Or if you need a warmer presence — type <b>/mode mother</b> or <b>/mode father</b>.<br><br>" +
        "How are you feeling today?",
        "bot-message lean-message"
    );

});