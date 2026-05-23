document.addEventListener('DOMContentLoaded', () => {

    const panel     = document.getElementById('authPanel');
    const overlay   = document.getElementById('authOverlay');
    const openBtn   = document.getElementById('openAuth');
    const closeBtn  = document.getElementById('authClose');
    const tabs      = document.querySelectorAll('.auth-tab');
    const sections  = document.querySelectorAll('.auth-section');

    // ── OPEN / CLOSE ──
    function openPanel(tab = 'login') {
        panel.classList.add('open');
        overlay.classList.add('active');
        document.body.style.overflow = 'hidden';
        switchTab(tab);
    }

    function closePanel() {
        panel.classList.remove('open');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    }

    openBtn.addEventListener('click', () => openPanel('login'));
    closeBtn.addEventListener('click', closePanel);
    overlay.addEventListener('click', closePanel);

    // ── TABS ──
    function switchTab(name) {
        tabs.forEach(t => t.classList.toggle('active', t.dataset.tab === name));
        sections.forEach(s => s.classList.toggle('active', s.id === `tab-${name}`));
    }

    tabs.forEach(tab => {
        tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    // ── INTERNAL LINKS ──
    document.querySelectorAll('[data-goto]').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            switchTab(link.dataset.goto);
        });
    });

    // ── PHOTO PREVIEW ──
    const photoInput   = document.getElementById('photoInput');
    const photoPreview = document.getElementById('photoPreview');

    if (photoInput) {
        photoInput.addEventListener('change', () => {
            const file = photoInput.files[0];
            if (!file) return;
            const reader = new FileReader();
            reader.onload = (e) => {
                photoPreview.innerHTML = `<img src="${e.target.result}" alt="Profile">`;
            };
            reader.readAsDataURL(file);
        });
    }

    // ── LOGIN ──
    document.getElementById('loginBtn').addEventListener('click', () => {
        const email    = document.getElementById('loginEmail').value.trim();
        const password = document.getElementById('loginPassword').value.trim();
        if (!email || !password) {
            alert('Please fill in all fields.');
            return;
        }
        // 🔌 Connect your backend / Firebase / Supabase here
        console.log('Login:', email);
        closePanel();
        document.getElementById('openAuth').textContent = email.split('@')[0];
    });

    // ── SIGNUP ──
    document.getElementById('signupBtn').addEventListener('click', () => {
        const name     = document.getElementById('signupName').value.trim();
        const email    = document.getElementById('signupEmail').value.trim();
        const password = document.getElementById('signupPassword').value.trim();
        if (!name || !email || !password) {
            alert('Please fill in all fields.');
            return;
        }
        // 🔌 Connect your backend / Firebase / Supabase here
        console.log('Signup:', name, email);
        closePanel();
        document.getElementById('openAuth').textContent = name.split(' ')[0];
    });

    // ── GOOGLE ──
    document.getElementById('googleLoginBtn').addEventListener('click', () => {
        // 🔌 Connect Google OAuth here
        console.log('Google login');
    });
    document.getElementById('googleSignupBtn').addEventListener('click', () => {
        // 🔌 Connect Google OAuth here
        console.log('Google signup');
    });

    // ── PLANS ──
    document.getElementById('freePlanBtn').addEventListener('click', () => {
        openPanel('signup');
    });
    document.getElementById('premiumPlanBtn').addEventListener('click', () => {
        openPanel('signup');
    });

    // ── ESC KEY ──
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') closePanel();
    });

});