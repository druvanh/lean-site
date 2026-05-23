document.addEventListener('DOMContentLoaded', () => {

    let currentMode = 'lean';

    const leanBot = {
        "/help": "I'm Lean — your companion for feeling better, inside and out.<br><b>/mood</b> - Tell me how you're feeling<br><b>/checkin</b> - A quick wellness check<br><b>/breathe</b> - Reset together for a moment<br><b>/energy</b> - Talk about your energy levels<br><b>/clear</b> - Start fresh",
        "/mood": "You don't have to explain everything perfectly. Just tell me what today feels like for you — mentally, emotionally, or physically. I'm listening.",
        "/checkin": "Quick check-in: Have you eaten well today? Had water? Rested enough? Sometimes the smallest things affect how we feel more than we realize.",
        "/breathe": "Take one slow breath with me. In... hold for a second... and out. No pressure to feel better instantly — this is just a moment for you.",
        "/morning": "Good morning. Before the world asks anything from you today, let's check in with you first. How's your mind? Your body? Your energy?",
        "/sad": "I can feel that something feels heavy right now. You don't have to carry it silently. Want to talk about what's sitting on your mind?",
        "/tired": "You've been carrying a lot. Physical tiredness and emotional tiredness can feel different — which one feels closer today?",
        "/stressed": "You don't have to solve everything at once. Tell me what feels loudest right now, and we'll untangle it one step at a time.",
        "/anxious": "When your thoughts feel too fast, we can slow things down together. What's making your mind race right now?",
        "/sleep": "Sleep affects more than energy — it changes how we think and feel. How has your rest been lately?",
        "/health": "Your well-being is more than numbers. Tell me what feels off — your body, mood, energy, or routine.",
        "/energy": "Energy is everything. Tell me — are you running low, or just trying to find your rhythm today?",
        "/mode mother": null,
        "/mode father": null,
        "default": "I hear you. Even if you're not sure how to explain what you're feeling, we can figure it out together. Type <b>/help</b> to see what I can support you with."
    };

    const motherBot = {
        "/help": "I'm here for you, always.<br><b>/mood</b> - Tell me how you're feeling<br><b>/breathe</b> - Let's breathe together<br><b>/mode father</b> - Switch to father<br><b>/mode lean</b> - Back to Lean<br><b>/clear</b> - Clear our conversation",
        "/mood": "Oh sweetheart, whatever you're carrying right now — you don't have to carry it alone. Tell me everything. I'm not going anywhere.",
        "/breathe": "Come here. Close your eyes. Breathe in slowly... feel your chest rise... now let it all out. You are so loved. Do it again with me.",
        "/morning": "Good morning my love. Before anything else today — have you had water? Have you eaten? The world can wait a moment.",
        "/sad": "I know. I know it hurts. You don't have to explain it or justify it. Just let yourself feel it. I'm right here beside you.",
        "/tired": "Then rest, my darling. You have been so strong for so long. It is okay to put it all down for a little while.",
        "/stressed": "Come, sit with me a moment. Nothing needs solving right this second. Just breathe. I've got you.",
        "/anxious": "Shhh. I know. I know. You are safe right here. Let's slow everything down together, one breath at a time.",
        "default": "I hear you. I may not understand every word, but I feel what you're trying to say. I'm right here."
    };

    const fatherBot = {
        "/help": "Let's figure this out together.<br><b>/mood</b> - Tell me what's going on<br><b>/breathe</b> - Clear your head<br><b>/mode mother</b> - Switch to mother<br><b>/mode lean</b> - Back to Lean<br><b>/clear</b> - Clear our conversation",
        "/mood": "Alright. Talk to me. No judgement here — just tell me what's really going on. We'll look at it together and work it out.",
        "/breathe": "Stop for a second. Breathe in through your nose — four counts. Hold it. Now out through your mouth. Good. A clear head solves more problems than a busy one.",
        "/morning": "Morning. Before the day gets loud — what's the one thing you need to handle today? Focus on that first. Everything else can follow.",
        "/sad": "I hear you. Sometimes life is just hard and that's the truth of it. You're not weak for feeling this. What do you need right now?",
        "/tired": "You've been pushing hard. Rest is not giving up — it's preparation. Take the time you need. You'll come back sharper.",
        "/stressed": "Write it down. All of it. Get it out of your head and onto paper. Then we'll look at it together and sort it out.",
        "/anxious": "One thing at a time. Tell me the single biggest thing on your mind right now. Just one. We'll start there.",
        "default": "I hear you. Talk to me — what's really going on?"
    };

    const modeLabels = {
        lean: "✦ Lean is with you",
        mother: "🤍 Mother is listening...",
        father: "🖤 Father is with you..."
    };

    const chatBox = document.getElementById('chatBox');
    const userInput = document.getElementById('userInput');
    const sendBtn = document.getElementById('sendBtn');
    const modeIndicator = document.getElementById('modeIndicator');

    function updateModeIndicator() {
        if (modeIndicator) modeIndicator.textContent = modeLabels[currentMode];
    }

    function getBot() {
        if (currentMode === 'mother') return motherBot;
        if (currentMode === 'father') return fatherBot;
        return leanBot;
    }

    function handleMessage() {
        const text = userInput.value.trim();
        if (!text) return;

        appendMessage(text, 'user-message');
        userInput.value = '';

        setTimeout(() => {
            const bot = getBot();
            const cmd = text.toLowerCase();
            let response;

            // ── MODE SWITCHING ──
            if (cmd === '/mode mother') {
                currentMode = 'mother';
                updateModeIndicator();
                response = "I'm here now. Whenever you need softness, I'm your person. What's on your heart?";
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

            // ── KNOWLEDGE BASE SEARCH ──
            } else if (bot[cmd]) {
                response = bot[cmd];
            } else {
                const knowledge = searchKnowledge(text);
                response = knowledge || bot["default"];
            }

            appendMessage(response, `bot-message ${currentMode}-message`);
        }, 600);
    }

    // ── KNOWLEDGE BASE SEARCH ──
    function searchKnowledge(text) {
        if (typeof knowledgeBase === 'undefined') return null;
        const lower = text.toLowerCase();
        for (const topic in knowledgeBase) {
            if (lower.includes(topic)) {
                const responses = knowledgeBase[topic];
                return responses[Math.floor(Math.random() * responses.length)];
            }
        }
        return null;
    }

    function appendMessage(text, className) {
        const msgDiv = document.createElement('div');
        msgDiv.className = `message ${className}`;
        msgDiv.innerHTML = text;
        chatBox.appendChild(msgDiv);
        chatBox.scrollTop = chatBox.scrollHeight;
    }

    sendBtn.addEventListener('click', handleMessage);
    userInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') handleMessage();
    });

    // ── OPENING SEQUENCE ──
   updateModeIndicator();

    appendMessage(
        "Hey, I'm Lean. This is your space — no pressure, no judgement.<br><br>" +
        "Tell me, how are you feeling today?<br><br>" +
        "<b>/sad</b> — something feels heavy<br>" +
        "<b>/tired</b> — running on empty<br>" +
        "<b>/stressed</b> — too much at once<br>" +
        "<b>/anxious</b> — mind won't slow down<br>" +
        "<b>/mood</b> — just want to talk<br>" +
        "<b>/breathe</b> — need a moment<br><br>" +
        "Or if you need a warmer presence — type <b>/mode mother</b> or <b>/mode father</b> and I'll bring them in.",
        "bot-message lean-message"
    );

});