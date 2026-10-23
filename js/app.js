// ============================================================================
// PRIMARYLEARNING MALAYSIA (MATEMATIK & SAINS KSSR DARJAH 1–6 + TAHUKAH ANDA)
// ============================================================================

const STORAGE_KEY = 'MATH_SAGA_KSSR_STATE_V1';
const AVATARS = ['🦁', '🐯', '🐼', '🦊', '🚀', '🦄', '🦖', '⚡', '👑', '🌟'];

let appState = {
  soundEnabled: true,
  activeProfileId: null,
  activeSubject: 'math', // 'math' | 'science'
  selectedAvatar: '🦁',
  selectedDarjahView: 1,
  currentFactIndex: 0,
  selectedFactCategory: 'SEMUA',
  profiles: []
};

let gameSession = {
  subject: 'math',
  nodeId: null,
  world: null,
  node: null,
  questions: [],
  currentIndex: 0,
  hearts: 3,
  maxHearts: 3,
  correctCount: 0,
  streak: 0,
  shieldActive: false,
  numpadValue: '',
  wrongTopics: []
};

// ================= AUDIO SYNTH =================
let audioCtx = null;
function playTone(type) {
  if (!appState.soundEnabled) return;
  try {
    if (!audioCtx) audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const now = audioCtx.currentTime;
    if (type === 'correct') {
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + idx * 0.06);
        gain.gain.setValueAtTime(0.16, now + idx * 0.06);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.06 + 0.22);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.06);
        osc.stop(now + idx * 0.06 + 0.24);
      });
    } else if (type === 'wrong') {
      [220, 175].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(freq, now + idx * 0.14);
        gain.gain.setValueAtTime(0.14, now + idx * 0.14);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.14 + 0.25);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.14);
        osc.stop(now + idx * 0.14 + 0.26);
      });
    } else if (type === 'win') {
      [523.25, 659.25, 783.99, 1046.5, 1318.5].forEach((freq, idx) => {
        const osc = audioCtx.createOscillator();
        const gain = audioCtx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + idx * 0.09);
        gain.gain.setValueAtTime(0.2, now + idx * 0.09);
        gain.gain.exponentialRampToValueAtTime(0.001, now + idx * 0.09 + 0.35);
        osc.connect(gain);
        gain.connect(audioCtx.destination);
        osc.start(now + idx * 0.09);
        osc.stop(now + idx * 0.09 + 0.36);
      });
    }
  } catch (e) {}
}

// ================= SIMPAN & MUAT DATA (LOCALSTORAGE) =================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      appState = { ...appState, ...parsed };
      // Pastikan setiap profil menyokong kedua-dua subjek (migrasi automatik)
      (appState.profiles || []).forEach((p) => {
        if (!p.progress) p.progress = {};
        if (!p.stats) p.stats = { totalAnswered: 0, totalCorrect: 0, topicStats: {} };
        if (!p.boosters) p.boosters = { hint: 3, bomb: 3, shield: 2 };
        if (!p.claimedFacts) p.claimedFacts = [];
      });
    }
    if (!appState.activeProfileId && appState.profiles.length > 0) {
      appState.activeProfileId = appState.profiles[0].id;
    }
  } catch (e) {
    console.error('Gagal memuatkan simpanan:', e);
  }
}

function saveState() {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(appState));
  } catch (e) {
    console.error('Gagal menyimpan progres:', e);
  }
  updateTopHud();
}

function getActiveProfile() {
  return appState.profiles.find((p) => p.id === appState.activeProfileId) || appState.profiles[0] || null;
}

function getWorldsForSubject(subject) {
  return subject === 'science' ? window.SCIENCE_WORLDS : window.KSSR_WORLDS;
}

function getAllNodesForSubject(subject) {
  const worlds = getWorldsForSubject(subject);
  const list = [];
  worlds.forEach((w) => {
    w.nodes.forEach((n) => {
      list.push({ ...n, darjah: w.darjah });
    });
  });
  return list;
}

function isNodeUnlocked(profile, nodeId, subject = appState.activeSubject) {
  if (!profile) return false;
  const all = getAllNodesForSubject(subject);
  const idx = all.findIndex((n) => n.id === nodeId);
  if (idx <= 0) return true; // Stesen 1.1 sentiasa dibuka
  const prevNode = all[idx - 1];
  const prevRec = profile.progress[prevNode.id];
  return Boolean(prevRec && prevRec.passed);
}

function getHighestUnlockedDarjah(profile, subject = appState.activeSubject) {
  if (!profile) return 1;
  const worlds = getWorldsForSubject(subject);
  let highest = 1;
  for (const w of worlds) {
    const firstNode = w.nodes[0];
    if (isNodeUnlocked(profile, firstNode.id, subject)) {
      highest = w.darjah;
    }
  }
  return highest;
}

function getSubjectStars(profile, subject) {
  if (!profile || !profile.progress) return 0;
  const prefix = subject === 'science' ? 's' : 'd';
  return Object.entries(profile.progress)
    .filter(([k]) => k.startsWith(prefix))
    .reduce((sum, [, r]) => sum + (r.stars || 0), 0);
}

function getTotalStars(profile) {
  if (!profile || !profile.progress) return 0;
  return Object.values(profile.progress).reduce((sum, r) => sum + (r.stars || 0), 0);
}

// ================= PAPARAN HUD ATAS =================
function updateTopHud() {
  const p = getActiveProfile();
  const profileBadge = document.getElementById('hudProfileName');
  const starsBadge = document.getElementById('hudStars');
  const soundBtn = document.getElementById('hudSound');

  if (soundBtn) {
    soundBtn.textContent = appState.soundEnabled ? '🔊' : '🔇';
  }

  if (p) {
    profileBadge.innerHTML = `${p.avatar} <span>${escapeHtml(p.nickname)}</span>`;
    starsBadge.textContent = `⭐ ${getTotalStars(p)} / 180`;
  } else {
    profileBadge.innerHTML = `👤 Daftar Pelajar`;
    starsBadge.textContent = `⭐ 0`;
  }
}

function escapeHtml(str) {
  return String(str || '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');
}

function formatPromptHtml(text) {
  return escapeHtml(text).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
}

// ================= NAVIGASI ANTARA SKRIN =================
window.showView = function (viewId) {
  document.querySelectorAll('.view-section').forEach((el) => {
    el.classList.remove('active');
  });
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');

  // Kemas kini butang tab aktif di bar atas
  document.querySelectorAll('.nav-tab-btn').forEach((btn) => btn.classList.remove('active'));
  if (viewId === 'viewProfiles') {
    document.getElementById('navHome')?.classList.add('active');
    renderProfilesView();
  } else if (viewId === 'viewMap') {
    if (appState.activeSubject === 'science') {
      document.getElementById('navScience')?.classList.add('active');
    } else {
      document.getElementById('navMath')?.classList.add('active');
    }
  } else if (viewId === 'viewFacts') {
    document.getElementById('navFacts')?.classList.add('active');
    renderFactsView();
  } else if (viewId === 'viewParent') {
    document.getElementById('navParent')?.classList.add('active');
  }

  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateTopHud();
};

window.openSubjectFromNav = function (subject) {
  const p = getActiveProfile();
  if (!p) {
    alert('Sila daftar atau pilih profil pelajar di Muka Depan terlebih dahulu!');
    showView('viewProfiles');
    return;
  }
  appState.activeSubject = subject;
  appState.selectedDarjahView = getHighestUnlockedDarjah(p, subject);
  saveState();
  renderSagaMap();
  showView('viewMap');
};

// ================= SKRIN 1: MUKA DEPAN (PILIH SUBJEK & DAFTAR PELAJAR) =================
function renderAvatarPicker() {
  const container = document.getElementById('avatarPicker');
  if (!container) return;
  container.innerHTML = AVATARS.map(
    (av) =>
      `<div class="avatar-opt ${appState.selectedAvatar === av ? 'selected' : ''}" onclick="selectAvatar('${av}')">${av}</div>`
  ).join('');
}

window.selectAvatar = function (av) {
  appState.selectedAvatar = av;
  renderAvatarPicker();
};

window.setActiveStudent = function (profileId) {
  appState.activeProfileId = profileId;
  saveState();
  renderProfilesView();
};

window.launchSubjectForStudent = function (profileId, subject) {
  if (profileId) appState.activeProfileId = profileId;
  const p = getActiveProfile();
  if (!p) {
    alert('Sila daftarkan profil anak di bahagian bawah terlebih dahulu!');
    document.getElementById('inpFullName')?.focus();
    return;
  }
  appState.activeSubject = subject;
  appState.selectedDarjahView = getHighestUnlockedDarjah(p, subject);
  saveState();
  renderSagaMap();
  showView('viewMap');
};

window.spinFrontFact = function () {
  const list = window.DID_YOU_KNOW_FACTS || [];
  if (!list.length) return;
  appState.currentFactIndex = (appState.currentFactIndex + 1) % list.length;
  renderFrontFactSpotlight();
};

function renderFrontFactSpotlight() {
  const mount = document.getElementById('frontFactSpotlight');
  if (!mount || !window.DID_YOU_KNOW_FACTS) return;
  const fact = window.DID_YOU_KNOW_FACTS[appState.currentFactIndex % window.DID_YOU_KNOW_FACTS.length];
  mount.innerHTML = `
    <div style="flex:1; min-width:250px;">
      <div style="display:flex; align-items:center; gap:8px; margin-bottom:4px;">
        <span class="badge-chip" style="background:rgba(250,204,21,0.25); color:#fde047;">💡 TAHUKAH ANDA? • ${escapeHtml(fact.category)}</span>
      </div>
      <div style="font-weight:900; font-size:1.12rem; color:#fff; margin-bottom:4px;">
        ${fact.icon} ${escapeHtml(fact.title)}
      </div>
      <div style="font-size:0.92rem; color:#e2e8f0; line-height:1.45;">
        ${formatPromptHtml(fact.body)}
      </div>
    </div>
    <div style="display:flex; flex-direction:column; gap:8px;">
      <button class="btn-3d gold" onclick="spinFrontFact()">🎲 Fakta Lain</button>
      <button class="btn-3d pink" onclick="showView('viewFacts')">📖 Buka Tab Tahukah Anda</button>
    </div>
  `;
}

function renderProfilesView() {
  renderAvatarPicker();
  renderFrontFactSpotlight();

  const p = getActiveProfile();
  const subjectMount = document.getElementById('frontSubjectCards');
  if (subjectMount) {
    const mathDarjah = p ? getHighestUnlockedDarjah(p, 'math') : 1;
    const sciDarjah = p ? getHighestUnlockedDarjah(p, 'science') : 1;
    const mathStars = p ? getSubjectStars(p, 'math') : 0;
    const sciStars = p ? getSubjectStars(p, 'science') : 0;

    subjectMount.innerHTML = `
      <div class="subject-card math-theme" onclick="launchSubjectForStudent('${p ? p.id : ''}', 'math')">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="subject-icon-big">🔢</span>
            <span class="badge-chip" style="background:rgba(255,255,255,0.2); color:#fff;">Darjah 1 – Darjah 6</span>
          </div>
          <h3>Matematik KSSR</h3>
          <p>Nombor Bulat, Sifir, Pecahan, Perpuluhan, Peratus, Wang, Masa, Ruang & UASA.</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:8px;">
          <span style="font-weight:800; color:#fde047; font-size:0.9rem;">
            ${p ? `🔓 Tahap ${escapeHtml(p.nickname)}: Darjah ${mathDarjah} • ⭐ ${mathStars}/90` : '6 Pulau • 30 Stesen Cabaran'}
          </span>
          <button class="btn-3d gold" style="padding:9px 16px;">▶️ Main Matematik</button>
        </div>
      </div>

      <div class="subject-card science-theme" onclick="launchSubjectForStudent('${p ? p.id : ''}', 'science')">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="subject-icon-big">🔬</span>
            <span class="badge-chip" style="background:rgba(255,255,255,0.2); color:#fff;">Darjah 1 – Darjah 6</span>
          </div>
          <h3>Sains KSSR</h3>
          <p>Manusia, Haiwan, Tumbuhan, Cahaya, Elektrik, Daya, Kelajuan, Angkasa & UASA.</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:8px;">
          <span style="font-weight:800; color:#a7f3d0; font-size:0.9rem;">
            ${p ? `🔓 Tahap ${escapeHtml(p.nickname)}: Darjah ${sciDarjah} • ⭐ ${sciStars}/90` : '6 Pulau • 30 Stesen Cabaran'}
          </span>
          <button class="btn-3d gold" style="padding:9px 16px;">▶️ Main Sains</button>
        </div>
      </div>

      <div class="subject-card facts-theme" onclick="showView('viewFacts')">
        <div>
          <div style="display:flex; justify-content:space-between; align-items:center;">
            <span class="subject-icon-big">💡</span>
            <span class="badge-chip" style="background:rgba(255,255,255,0.2); color:#fff;">Bonus Kuiz & Fakta</span>
          </div>
          <h3>Sudut "Tahukah Anda?"</h3>
          <p>Terokai fakta menakjubkan dunia Sains, Alam Malaysia, Angkasa & Rahsia Matematik!</p>
        </div>
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-top:8px;">
          <span style="font-weight:800; color:#fef08a; font-size:0.9rem;">
            🎁 Jawab Kuiz Fakta Dapat Booster!
          </span>
          <button class="btn-3d gold" style="padding:9px 16px;">📖 Terokai Fakta</button>
        </div>
      </div>
    `;
  }

  const grid = document.getElementById('profilesGrid');
  if (!grid) return;

  if (appState.profiles.length === 0) {
    grid.innerHTML = `
      <div class="profile-card" style="grid-column: 1 / -1; text-align:center; padding: 26px;">
        <div style="font-size: 2.6rem;">👦👧</div>
        <h3>Belum Ada Pelajar Didaftarkan</h3>
        <p style="color:#cbd5e1; margin:4px 0 0;">
          Sila daftarkan Nama Penuh & Nama Panggilan anak anda (contoh: Anak 10 Tahun - Darjah 4 & Anak 12 Tahun - Darjah 6) di borang bawah untuk mula memilih subjek <strong>Matematik</strong> atau <strong>Sains</strong>!
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = appState.profiles
    .map((prof) => {
      const isSelected = p && p.id === prof.id;
      const mathDarjah = getHighestUnlockedDarjah(prof, 'math');
      const sciDarjah = getHighestUnlockedDarjah(prof, 'science');
      const mathStars = getSubjectStars(prof, 'math');
      const sciStars = getSubjectStars(prof, 'science');

      return `
        <div class="profile-card ${isSelected ? 'active-student' : ''}" onclick="setActiveStudent('${prof.id}')">
          <div class="profile-header">
            <div class="avatar-circle">${prof.avatar}</div>
            <div class="profile-meta" style="flex:1;">
              <div style="display:flex; align-items:center; justify-content:space-between; gap:6px;">
                <h3>${escapeHtml(prof.nickname)}</h3>
                ${isSelected ? `<span class="badge-chip" style="background:#facc15; color:#1e1b4b;">PELAJAR AKTIF</span>` : ''}
              </div>
              <div class="fullname">${escapeHtml(prof.fullName)}</div>
            </div>
          </div>

          <div class="profile-badges">
            <span class="badge-chip">🎂 ${prof.age} Tahun (Darjah ${prof.actualDarjah})</span>
            <span class="badge-chip" style="background:rgba(99,102,241,0.25);color:#c7d2fe;">🔢 Math: Darjah ${mathDarjah} (⭐${mathStars})</span>
            <span class="badge-chip" style="background:rgba(16,185,129,0.25);color:#6ee7b7;">🔬 Sains: Darjah ${sciDarjah} (⭐${sciStars})</span>
          </div>

          <div style="display:flex; gap:8px; margin-top:auto; flex-wrap:wrap;">
            <button class="btn-3d" style="flex:1; padding:10px 12px; font-size:0.9rem;" onclick="event.stopPropagation(); launchSubjectForStudent('${prof.id}', 'math')">
              🔢 Matematik
            </button>
            <button class="btn-3d green" style="flex:1; padding:10px 12px; font-size:0.9rem;" onclick="event.stopPropagation(); launchSubjectForStudent('${prof.id}', 'science')">
              🔬 Sains
            </button>
            <button class="btn-3d slate" style="padding:10px 12px;" onclick="event.stopPropagation(); openParentReport('${prof.id}')" title="Rekod Prestasi">
              📊
            </button>
          </div>
        </div>
      `;
    })
    .join('');
}

window.handleRegisterChild = function (event) {
  event.preventDefault();
  const fullName = document.getElementById('inpFullName').value.trim();
  const nickname = document.getElementById('inpNickname').value.trim();
  const age = parseInt(document.getElementById('inpAge').value, 10) || 10;
  const actualDarjah = parseInt(document.getElementById('inpActualDarjah').value, 10) || 4;

  if (!fullName || !nickname) {
    alert('Sila masukkan Nama Penuh dan Nama Panggilan pelajar.');
    return;
  }

  const newProfile = {
    id: 'kid_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    fullName,
    nickname,
    age,
    actualDarjah,
    avatar: appState.selectedAvatar || '🦁',
    createdAt: new Date().toISOString(),
    boosters: {
      hint: 3,
      bomb: 3,
      shield: 2
    },
    claimedFacts: [],
    stats: {
      totalAnswered: 0,
      totalCorrect: 0,
      topicStats: {}
    },
    progress: {}
  };

  appState.profiles.push(newProfile);
  appState.activeProfileId = newProfile.id;
  appState.selectedDarjahView = 1;
  saveState();

  document.getElementById('inpFullName').value = '';
  document.getElementById('inpNickname').value = '';

  renderProfilesView();
  playTone('win');
};

// ================= SKRIN 2: PETA SAGA (MATEMATIK ATAU SAINS) =================
window.selectDarjahTab = function (darjahNum) {
  appState.selectedDarjahView = darjahNum;
  renderSagaMap();
};

window.switchSubjectInMap = function (subject) {
  const p = getActiveProfile();
  appState.activeSubject = subject;
  appState.selectedDarjahView = getHighestUnlockedDarjah(p, subject);
  saveState();
  renderSagaMap();
  showView('viewMap');
};

function renderSagaMap() {
  const p = getActiveProfile();
  if (!p) {
    showView('viewProfiles');
    return;
  }

  const subj = appState.activeSubject;
  const subjTitle = subj === 'science' ? '🔬 SAINS KSSR' : '🔢 MATEMATIK KSSR';
  const worlds = getWorldsForSubject(subj);
  const highestDarjah = getHighestUnlockedDarjah(p, subj);

  document.getElementById('mapPlayerSummary').innerHTML = `
    <div style="display:flex; align-items:center; gap:12px;">
      <div style="font-size:2.3rem;">${p.avatar}</div>
      <div>
        <div style="font-weight:900; font-size:1.15rem;">
          ${escapeHtml(p.nickname)} — <span style="color:#fde047;">${subjTitle}</span>
          <span style="color:#94a3b8; font-weight:600; font-size:0.86rem;">(${escapeHtml(p.fullName)} • ${p.age} Tahun)</span>
        </div>
        <div style="font-size:0.86rem; color:#cbd5e1;">
          Mula dari Darjah 1 • Lulus Ujian Boss (≥80%) untuk naik ke Darjah seterusnya! (Tahap Terbuka: <strong>Darjah ${highestDarjah}</strong>)
        </div>
      </div>
    </div>
  `;

  // Tab pulau Darjah 1 - Darjah 6
  const tabsEl = document.getElementById('darjahTabs');
  tabsEl.innerHTML = worlds
    .map((w) => {
      const firstNodeUnlocked = isNodeUnlocked(p, w.nodes[0].id, subj);
      const bossRec = p.progress[w.nodes[w.nodes.length - 1].id];
      const isCompleted = Boolean(bossRec && bossRec.passed);
      const isActive = appState.selectedDarjahView === w.darjah;
      return `
        <button class="darjah-tab ${isActive ? 'active' : ''} ${!firstNodeUnlocked ? 'locked' : ''}"
                onclick="selectDarjahTab(${w.darjah})">
          <span>${firstNodeUnlocked ? w.badge : '🔒'}</span>
          <span>Darjah ${w.darjah}</span>
          ${isCompleted ? '<span>✅</span>' : ''}
        </button>
      `;
    })
    .join('');

  const world = worlds.find((w) => w.darjah === appState.selectedDarjahView) || worlds[0];
  const allNodes = getAllNodesForSubject(subj);
  const currentTargetNode = allNodes.find(
    (n) => isNodeUnlocked(p, n.id, subj) && !(p.progress[n.id] && p.progress[n.id].passed)
  );

  const worldHtml = `
    <div class="world-container" style="background: ${world.bgGradient};">
      <div class="world-header">
        <div style="font-size:2.6rem; margin-bottom:4px;">${world.badge}</div>
        <h2>${world.title}</h2>
        <p>${world.subtitle}</p>
      </div>

      <div class="saga-path">
        ${world.nodes
          .map((node) => {
            const unlocked = isNodeUnlocked(p, node.id, subj);
            const rec = p.progress[node.id] || { passed: false, stars: 0, bestScore: 0, attempts: 0 };
            const isTarget = currentTargetNode && currentTargetNode.id === node.id;
            const starsStr = rec.passed
              ? '⭐'.repeat(rec.stars) + '☆'.repeat(3 - rec.stars)
              : unlocked
              ? '☆☆☆'
              : '🔒';

            return `
              <div class="saga-step ${unlocked ? 'unlocked' : 'locked'} ${rec.passed ? 'completed' : ''} ${node.isBoss ? 'boss' : ''} ${isTarget ? 'current-target' : ''}"
                   onclick="${unlocked ? `startLevel('${node.id}')` : `lockedNotice()`}">
                <div class="node-orb">
                  <span>${node.isBoss ? '👑' : node.code}</span>
                  <div class="node-stars">${starsStr}</div>
                </div>
                <div class="node-info">
                  <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
                    <h3>${node.title}</h3>
                    ${
                      rec.passed
                        ? `<span class="badge-chip" style="background:rgba(16,185,129,0.28);color:#a7f3d0;">LULUS (${rec.bestScore}%)</span>`
                        : unlocked
                        ? `<span class="badge-chip" style="background:rgba(250,204,21,0.25);color:#fde047;">SEDIA DIMAIN</span>`
                        : `<span class="badge-chip">TERKUNCI</span>`
                    }
                  </div>
                  <p>${node.desc}</p>
                  ${
                    rec.attempts > 0
                      ? `<div style="font-size:0.78rem; color:#e2e8f0; margin-top:5px;">Percubaan: ${rec.attempts} kali • Rekod Terbaik: ${rec.bestScore}%</div>`
                      : ''
                  }
                </div>
                <div>
                  <button class="btn-3d ${node.isBoss ? 'pink' : rec.passed ? 'green' : 'gold'}" ${!unlocked ? 'disabled' : ''}>
                    ${rec.passed ? 'Ulang' : node.isBoss ? 'Ujian Boss!' : 'Main'}
                  </button>
                </div>
              </div>
            `;
          })
          .join('')}
      </div>
    </div>
  `;

  document.getElementById('worldMapMount').innerHTML = worldHtml;
}

window.lockedNotice = function () {
  playTone('wrong');
  alert('Stesen ini masih terkunci! Sila lulus stesen sebelumnya (dan Ujian Boss Darjah) dahulu.');
};

// ================= SKRIN 3: ARENA PERMAINAN =================
window.startLevel = function (nodeId) {
  const p = getActiveProfile();
  if (!p) return;

  const isSci = nodeId.startsWith('s');
  const subj = isSci ? 'science' : 'math';
  appState.activeSubject = subj;

  const worlds = getWorldsForSubject(subj);
  const world = worlds.find((w) => w.nodes.some((n) => n.id === nodeId));
  const node = world.nodes.find((n) => n.id === nodeId);

  const questions = isSci
    ? window.generateScienceQuestionsForNode(nodeId)
    : window.generateQuestionsForNode(nodeId);

  gameSession = {
    subject: subj,
    nodeId,
    world,
    node,
    questions,
    currentIndex: 0,
    hearts: 3,
    maxHearts: 3,
    correctCount: 0,
    streak: 0,
    shieldActive: false,
    numpadValue: '',
    wrongTopics: []
  };

  showView('viewArena');
  initScratchpad();
  renderCurrentQuestion();
};

function renderCurrentQuestion() {
  const p = getActiveProfile();
  const q = gameSession.questions[gameSession.currentIndex];
  const totalQ = gameSession.questions.length;

  document.getElementById('arenaTitle').textContent = `${gameSession.node.code} — ${gameSession.node.title}`;
  document.getElementById('arenaStepText').textContent = `Soalan ${gameSession.currentIndex + 1} / ${totalQ}`;

  const pct = Math.round((gameSession.currentIndex / totalQ) * 100);
  document.getElementById('arenaProgressFill').style.width = `${pct}%`;

  let heartsHtml = '';
  for (let i = 1; i <= gameSession.maxHearts; i++) {
    const alive = i <= gameSession.hearts;
    heartsHtml += `<span class="heart-icon ${alive ? '' : 'lost'}">❤️</span>`;
  }
  if (gameSession.shieldActive) {
    heartsHtml += `<span title="Perisai Aktif">🛡️</span>`;
  }
  document.getElementById('arenaHearts').innerHTML = heartsHtml;

  const comboEl = document.getElementById('arenaCombo');
  if (gameSession.streak >= 2) {
    comboEl.style.display = 'inline-block';
    comboEl.textContent = `🔥 Combo x${gameSession.streak}`;
  } else {
    comboEl.style.display = 'none';
  }

  document.getElementById('countHint').textContent = p.boosters.hint;
  document.getElementById('countBomb').textContent = p.boosters.bomb;
  document.getElementById('countShield').textContent = p.boosters.shield;
  document.getElementById('btnBoosterShield').disabled = p.boosters.shield <= 0 || gameSession.shieldActive;

  document.getElementById('qTopicPill').textContent = q.topic;
  document.getElementById('qPromptText').innerHTML = formatPromptHtml(q.prompt);

  const hintBox = document.getElementById('qHintBox');
  hintBox.style.display = 'none';
  hintBox.textContent = `💡 Petunjuk Cikgu: ${q.hint}`;

  const mcqArea = document.getElementById('mcqMount');
  const numpadArea = document.getElementById('numpadMount');

  if (q.inputMode === 'numpad') {
    mcqArea.style.display = 'none';
    numpadArea.style.display = 'flex';
    gameSession.numpadValue = '';
    updateNumpadDisplay();
  } else {
    numpadArea.style.display = 'none';
    mcqArea.style.display = 'grid';
    mcqArea.innerHTML = q.options
      .map(
        (opt, idx) => `
        <button class="mcq-btn" id="mcqOpt_${idx}" onclick="submitAnswer(${idx}, true)">
          ${escapeHtml(opt)}
        </button>
      `
      )
      .join('');
  }
}

function updateNumpadDisplay() {
  const disp = document.getElementById('numpadValueText');
  disp.textContent = gameSession.numpadValue || 'Taip jawapan...';
  disp.style.color = gameSession.numpadValue ? '#fde047' : '#64748b';
}

window.pressNumpad = function (key) {
  if (key === 'C') {
    gameSession.numpadValue = '';
  } else if (key === 'DEL') {
    gameSession.numpadValue = gameSession.numpadValue.slice(0, -1);
  } else if (key === '.') {
    if (!gameSession.numpadValue.includes('.')) {
      gameSession.numpadValue += gameSession.numpadValue ? '.' : '0.';
    }
  } else {
    if (gameSession.numpadValue.length < 9) {
      gameSession.numpadValue += String(key);
    }
  }
  updateNumpadDisplay();
};

window.submitNumpadAnswer = function () {
  if (!gameSession.numpadValue) return;
  submitAnswer(gameSession.numpadValue, false);
};

// ================= BOOSTERS =================
window.useBoosterHint = function () {
  const p = getActiveProfile();
  const hintBox = document.getElementById('qHintBox');
  if (hintBox.style.display === 'block') return;
  if (p.boosters.hint > 0) {
    p.boosters.hint--;
    saveState();
  }
  hintBox.style.display = 'block';
  document.getElementById('countHint').textContent = p.boosters.hint;
};

window.useBoosterBomb = function () {
  const p = getActiveProfile();
  const q = gameSession.questions[gameSession.currentIndex];
  if (p.boosters.bomb <= 0) {
    alert('Bom 50/50 sudah habis! Dapatkan 3 Bintang atau jawab Kuiz di tab "Tahukah Anda?" untuk dapatkan Booster baharu.');
    return;
  }
  p.boosters.bomb--;
  saveState();
  document.getElementById('countBomb').textContent = p.boosters.bomb;

  if (q.inputMode === 'numpad') {
    q.inputMode = 'mcq';
    const wrongOpt = q.options.find((o) => String(o) !== String(q.answer)) || '0';
    q.options = [String(q.answer), String(wrongOpt)].sort(() => Math.random() - 0.5);
    renderCurrentQuestion();
  } else {
    let removed = 0;
    q.options.forEach((opt, idx) => {
      if (String(opt) !== String(q.answer) && removed < 2) {
        const btn = document.getElementById(`mcqOpt_${idx}`);
        if (btn && !btn.classList.contains('eliminated')) {
          btn.classList.add('eliminated');
          removed++;
        }
      }
    });
  }
};

window.useBoosterShield = function () {
  const p = getActiveProfile();
  if (p.boosters.shield <= 0 || gameSession.shieldActive) return;
  p.boosters.shield--;
  gameSession.shieldActive = true;
  saveState();
  renderCurrentQuestion();
};

// ================= SEMAK JAWAPAN =================
window.submitAnswer = function (valOrIdx, isIndex = false) {
  const p = getActiveProfile();
  const q = gameSession.questions[gameSession.currentIndex];
  const givenRaw = isIndex ? q.options[valOrIdx] : valOrIdx;

  const cleanGiven = String(givenRaw).replace(/,/g, '').trim().toLowerCase();
  const cleanAns = String(q.answer).replace(/,/g, '').trim().toLowerCase();

  const isCorrect =
    cleanGiven === cleanAns ||
    (!isNaN(Number(cleanGiven)) && !isNaN(Number(cleanAns)) && Math.abs(Number(cleanGiven) - Number(cleanAns)) < 0.0001);

  p.stats.totalAnswered = (p.stats.totalAnswered || 0) + 1;
  if (!p.stats.topicStats[q.topic]) {
    p.stats.topicStats[q.topic] = { asked: 0, correct: 0 };
  }
  p.stats.topicStats[q.topic].asked++;

  const modal = document.getElementById('feedbackModal');
  const box = document.getElementById('feedbackBox');
  const title = document.getElementById('feedbackTitle');
  const exp = document.getElementById('feedbackExplanation');

  if (isCorrect) {
    playTone('correct');
    gameSession.correctCount++;
    gameSession.streak++;
    p.stats.totalCorrect = (p.stats.totalCorrect || 0) + 1;
    p.stats.topicStats[q.topic].correct++;

    let bonusMsg = '';
    if (gameSession.streak > 0 && gameSession.streak % 4 === 0) {
      p.boosters.hint++;
      bonusMsg = `\n\n🎁 BONUS COMBO x${gameSession.streak}: Anda dapat +1 Petunjuk Cikgu (💡)!`;
    }

    box.className = 'modal-box correct';
    title.innerHTML = `✅ Tahniah, Tepat Sekali!`;
    exp.innerHTML = `<strong>Jawapan: ${escapeHtml(q.answer)}</strong>\n\n${formatPromptHtml(q.explanation)}${escapeHtml(bonusMsg)}`;
  } else {
    playTone('wrong');
    gameSession.streak = 0;
    gameSession.wrongTopics.push(q.topic);

    if (gameSession.shieldActive) {
      gameSession.shieldActive = false;
      box.className = 'modal-box wrong';
      title.innerHTML = `🛡️ Perisai Menyelamatkan Nyawa Anda!`;
    } else {
      gameSession.hearts--;
      box.className = 'modal-box wrong';
      title.innerHTML = `❌ Kurang Tepat! (-1 Hati ❤️)`;
    }

    exp.innerHTML = `Jawapan anda: <strong>${escapeHtml(givenRaw)}</strong>\nJawapan sebenar: <strong>${escapeHtml(q.answer)}</strong>\n\n<strong>📚 Penerangan Cikgu:</strong>\n${formatPromptHtml(q.explanation)}`;
  }

  saveState();
  modal.classList.add('show');
};

window.nextQuestionOrFinish = function () {
  document.getElementById('feedbackModal').classList.remove('show');

  if (gameSession.hearts <= 0) {
    finishLevel(false, 'Habis 3 Nyawa (Hati ❤️)');
    return;
  }

  gameSession.currentIndex++;
  if (gameSession.currentIndex >= gameSession.questions.length) {
    const scorePct = Math.round((gameSession.correctCount / gameSession.questions.length) * 100);
    const passed = scorePct >= gameSession.node.passPercent;
    finishLevel(
      passed,
      passed
        ? 'Berjaya Melepasi Markah Lulus!'
        : `Markah ${scorePct}% belum mencapai syarat lulus (${gameSession.node.passPercent}%).`
    );
  } else {
    clearScratchpad();
    renderCurrentQuestion();
  }
};

function finishLevel(passed, reasonText) {
  const p = getActiveProfile();
  const totalQ = gameSession.questions.length;
  const scorePct = Math.round((gameSession.correctCount / totalQ) * 100);

  let stars = 0;
  if (passed) {
    if (scorePct === 100) stars = 3;
    else if (scorePct >= 85) stars = 2;
    else stars = 1;
  }

  const prev = p.progress[gameSession.nodeId] || { passed: false, stars: 0, bestScore: 0, attempts: 0 };
  p.progress[gameSession.nodeId] = {
    passed: prev.passed || passed,
    stars: Math.max(prev.stars || 0, stars),
    bestScore: Math.max(prev.bestScore || 0, scorePct),
    attempts: (prev.attempts || 0) + 1
  };

  let rewardText = '';
  if (stars === 3 && prev.stars < 3) {
    p.boosters.bomb++;
    p.boosters.shield++;
    rewardText = `🎁 Ganjaran 3 Bintang: +1 Bom 50/50 & +1 Perisai Nyawa!`;
  }

  saveState();

  const resModal = document.getElementById('resultModal');
  const resBox = document.getElementById('resultBox');

  if (passed) {
    playTone('win');
    resBox.className = 'modal-box correct';
    const starsVisual = '⭐'.repeat(stars) + '☆'.repeat(3 - stars);
    const unlockedNextDarjah = gameSession.node.isBoss && gameSession.world.darjah < 6;

    document.getElementById('resultHeader').innerHTML = `
      <div style="font-size:3rem; margin-bottom:6px;">${starsVisual}</div>
      <h2 style="margin:0; color:#6ee7b7;">
        ${gameSession.node.isBoss ? `🏆 LULUS UJIAN BOSS DARJAH ${gameSession.world.darjah}!` : `🎉 TAHNIAH, STESEN LULUS!`}
      </h2>
    `;

    document.getElementById('resultBody').innerHTML = `
      <p style="font-size:1.15rem; font-weight:800; margin:10px 0;">
        Markah: ${gameSession.correctCount} / ${totalQ} (${scorePct}%)
      </p>
      <p style="color:#cbd5e1;">${escapeHtml(reasonText)}</p>
      ${
        unlockedNextDarjah
          ? `<div style="background:rgba(16,185,129,0.2); border:2px solid #10b981; padding:12px; border-radius:14px; margin-top:12px; font-weight:800; color:#a7f3d0;">
              🔓 KUNCI PULAU DARJAH ${gameSession.world.darjah + 1} TELAH DIBUKA!
             </div>`
          : ''
      }
      ${rewardText ? `<p style="color:#fde047; font-weight:800;">${rewardText}</p>` : ''}
    `;

    if (unlockedNextDarjah) {
      appState.selectedDarjahView = gameSession.world.darjah + 1;
      saveState();
    }
  } else {
    playTone('wrong');
    resBox.className = 'modal-box wrong';
    const uniqueWeak = [...new Set(gameSession.wrongTopics)];

    document.getElementById('resultHeader').innerHTML = `
      <div style="font-size:3rem; margin-bottom:6px;">💔</div>
      <h2 style="margin:0; color:#fca5a5;">BELUM LEPAS! KENA BUAT SEMULA</h2>
    `;

    document.getElementById('resultBody').innerHTML = `
      <p style="font-size:1.1rem; font-weight:800; margin:10px 0;">
        Markah Semasa: ${gameSession.correctCount} / ${totalQ} (${scorePct}%) • Syarat Lulus: ${gameSession.node.passPercent}%
      </p>
      <p style="color:#cbd5e1;">${escapeHtml(reasonText)}</p>
      ${
        uniqueWeak.length > 0
          ? `<div class="explanation-box" style="margin-top:12px;">
              <strong>📌 Topik yang perlu diperkukuhkan sebelum cuba semula:</strong>\n• ${uniqueWeak.map(escapeHtml).join('\n• ')}
             </div>`
          : ''
      }
      <p style="font-size:0.9rem; color:#fde047;">
        Jangan putus asa! Tekan <strong>"Cuba Semula"</strong> untuk berlatih dengan set soalan baharu.
      </p>
    `;
  }

  resModal.classList.add('show');
}

window.retryCurrentLevel = function () {
  document.getElementById('resultModal').classList.remove('show');
  startLevel(gameSession.nodeId);
};

window.returnToMapFromModal = function () {
  document.getElementById('resultModal').classList.remove('show');
  renderSagaMap();
  showView('viewMap');
};

// ================= SKRIN 4: SUDUT "TAHUKAH ANDA?" (FAKTA RAWAK & KUIZ BONUS) =================
function getFilteredFacts() {
  const all = window.DID_YOU_KNOW_FACTS || [];
  if (appState.selectedFactCategory === 'SEMUA') return all;
  return all.filter((f) => f.category === appState.selectedFactCategory);
}

window.selectFactCategory = function (cat) {
  appState.selectedFactCategory = cat;
  appState.currentFactIndex = 0;
  renderFactsView();
};

window.nextRandomFact = function () {
  const list = getFilteredFacts();
  if (list.length <= 1) return;
  let nextIdx = Math.floor(Math.random() * list.length);
  if (nextIdx === appState.currentFactIndex % list.length) {
    nextIdx = (nextIdx + 1) % list.length;
  }
  appState.currentFactIndex = nextIdx;
  playTone('correct');
  renderFactsView();
};

window.answerFactMiniQuiz = function (factId, chosenIdx) {
  const fact = (window.DID_YOU_KNOW_FACTS || []).find((f) => f.id === factId);
  if (!fact) return;
  const chosen = fact.options[chosenIdx];
  const msgEl = document.getElementById('factQuizFeedback');
  const p = getActiveProfile();

  if (chosen === fact.answer) {
    playTone('win');
    let rewardNotice = '✅ Tepat sekali! Hebat ingatan anda!';
    if (p) {
      if (!p.claimedFacts) p.claimedFacts = [];
      if (!p.claimedFacts.includes(factId)) {
        p.claimedFacts.push(factId);
        p.boosters.hint = (p.boosters.hint || 0) + 1;
        saveState();
        rewardNotice = `🎉 Betul! ${escapeHtml(p.nickname)} menerima hadiah +1 💡 Petunjuk Cikgu untuk digunakan dalam permainan!`;
      }
    }
    msgEl.style.display = 'block';
    msgEl.style.color = '#6ee7b7';
    msgEl.textContent = rewardNotice;
  } else {
    playTone('wrong');
    msgEl.style.display = 'block';
    msgEl.style.color = '#fca5a5';
    msgEl.textContent = '❌ Cuba baca semula petikan fakta di atas dan pilih sekali lagi!';
  }
};

function renderFactsView() {
  const all = window.DID_YOU_KNOW_FACTS || [];
  const categories = ['SEMUA', ...new Set(all.map((f) => f.category))];
  const catMount = document.getElementById('factCategoriesBar');
  if (catMount) {
    catMount.innerHTML = categories
      .map(
        (c) => `
        <button class="darjah-tab ${appState.selectedFactCategory === c ? 'active' : ''}"
                onclick="selectFactCategory('${escapeHtml(c).replace(/'/g, "\\'")}')">
          ${escapeHtml(c)}
        </button>
      `
      )
      .join('');
  }

  const list = getFilteredFacts();
  const fact = list[appState.currentFactIndex % list.length] || all[0];
  const p = getActiveProfile();
  const alreadyClaimed = p && p.claimedFacts && p.claimedFacts.includes(fact.id);

  const mount = document.getElementById('factMainMount');
  if (!mount || !fact) return;

  mount.innerHTML = `
    <div class="fact-hero-card">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:10px;">
        <span class="badge-chip" style="background:rgba(250,204,21,0.22); color:#fde047; font-size:0.9rem; padding:6px 14px;">
          ${escapeHtml(fact.category)}
        </span>
        <button class="btn-3d gold" onclick="nextRandomFact()">
          🎲 Fakta Rawak Seterusnya!
        </button>
      </div>

      <div style="display:flex; align-items:center; gap:16px; margin-top:18px;">
        <div style="font-size:3.5rem;">${fact.icon}</div>
        <h2 style="margin:0; font-size:1.55rem; color:#fde047;">${escapeHtml(fact.title)}</h2>
      </div>

      <div class="fact-body-text">${formatPromptHtml(fact.body)}</div>

      <div class="fact-quiz-box">
        <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:8px; margin-bottom:10px;">
          <strong style="color:#a5b4fc;">🧠 Uji Minda Fakta Ini:</strong>
          <span class="badge-chip" style="background:rgba(16,185,129,0.2); color:#6ee7b7;">
            ${alreadyClaimed ? '✅ Bonus Telah Ditebus' : '🎁 Ganjaran: +1 💡 Petunjuk Cikgu'}
          </span>
        </div>
        <div style="font-weight:700; font-size:1.05rem; margin-bottom:12px;">
          ${escapeHtml(fact.funQuestion)}
        </div>
        <div class="mcq-grid">
          ${fact.options
            .map(
              (opt, idx) => `
              <button class="mcq-btn" onclick="answerFactMiniQuiz('${fact.id}', ${idx})">
                ${escapeHtml(opt)}
              </button>
            `
            )
            .join('')}
        </div>
        <div id="factQuizFeedback" style="display:none; margin-top:12px; font-weight:800; font-size:1rem;"></div>
      </div>
    </div>
  `;
}

// ================= KERTAS CONTENG (SCRATCHPAD CANVAS) =================
let scratchCtx = null;
let isDrawing = false;
let penColor = '#fde047';

function initScratchpad() {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas) return;
  const rect = canvas.parentElement.getBoundingClientRect();
  canvas.width = Math.max(280, rect.width);
  canvas.height = Math.max(250, rect.height);
  scratchCtx = canvas.getContext('2d');
  scratchCtx.lineCap = 'round';
  scratchCtx.lineJoin = 'round';
  scratchCtx.lineWidth = 3.5;
  scratchCtx.strokeStyle = penColor;

  const getPos = (e) => {
    const r = canvas.getBoundingClientRect();
    const clientX = e.touches ? e.touches[0].clientX : e.clientX;
    const clientY = e.touches ? e.touches[0].clientY : e.clientY;
    return { x: clientX - r.left, y: clientY - r.top };
  };

  canvas.onpointerdown = (e) => {
    isDrawing = true;
    const pos = getPos(e);
    scratchCtx.beginPath();
    scratchCtx.moveTo(pos.x, pos.y);
  };

  canvas.onpointermove = (e) => {
    if (!isDrawing) return;
    const pos = getPos(e);
    scratchCtx.strokeStyle = penColor;
    scratchCtx.lineTo(pos.x, pos.y);
    scratchCtx.stroke();
  };

  window.addEventListener('pointerup', () => {
    isDrawing = false;
  });
}

window.setPenColor = function (color) {
  penColor = color;
};

window.clearScratchpad = function () {
  const canvas = document.getElementById('scratchCanvas');
  if (!canvas || !scratchCtx) return;
  scratchCtx.clearRect(0, 0, canvas.width, canvas.height);
};

// ================= SKRIN 5: LAPORAN IBU BAPA =================
window.openParentReport = function (profileId) {
  if (profileId) appState.activeProfileId = profileId;
  const p = getActiveProfile() || appState.profiles[0];
  if (!p) {
    alert('Tiada profil pelajar lagi. Sila daftar profil pelajar di Muka Depan terlebih dahulu.');
    return;
  }

  const totalAns = p.stats.totalAnswered || 0;
  const totalCor = p.stats.totalCorrect || 0;
  const acc = totalAns > 0 ? Math.round((totalCor / totalAns) * 100) : 0;

  const mathDarjah = getHighestUnlockedDarjah(p, 'math');
  const sciDarjah = getHighestUnlockedDarjah(p, 'science');
  const mathStars = getSubjectStars(p, 'math');
  const sciStars = getSubjectStars(p, 'science');

  const topics = Object.entries(p.stats.topicStats || {});
  const topicRows =
    topics.length > 0
      ? topics
          .map(([tName, s]) => {
            const pct = Math.round((s.correct / s.asked) * 100);
            const status = pct >= 80 ? '🟢 Kukuh' : pct >= 60 ? '🟡 Sederhana' : '🔴 Perlu Latihan';
            return `
              <tr>
                <td>${escapeHtml(tName)}</td>
                <td>${s.correct} / ${s.asked}</td>
                <td><strong>${pct}%</strong></td>
                <td>${status}</td>
              </tr>
            `;
          })
          .join('')
      : `<tr><td colspan="4" style="text-align:center; color:#94a3b8;">Belum ada soalan dijawab lagi.</td></tr>`;

  document.getElementById('parentReportMount').innerHTML = `
    <div class="profile-card" style="margin-bottom:20px;">
      <div style="display:flex; justify-content:space-between; align-items:center; flex-wrap:wrap; gap:12px;">
        <div class="profile-header">
          <div class="avatar-circle">${p.avatar}</div>
          <div>
            <h2 style="margin:0;">Laporan Prestasi: ${escapeHtml(p.fullName)} (${escapeHtml(p.nickname)})</h2>
            <div style="color:#94a3b8;">Umur: ${p.age} Tahun • Darjah Sebenar di Sekolah: Darjah ${p.actualDarjah}</div>
          </div>
        </div>
        <div style="display:flex; gap:8px; flex-wrap:wrap;">
          <span class="badge-chip" style="font-size:0.9rem; padding:8px 14px;">
            🔢 Matematik: Darjah ${mathDarjah} (⭐ ${mathStars}/90)
          </span>
          <span class="badge-chip" style="font-size:0.9rem; padding:8px 14px; background:rgba(16,185,129,0.2); color:#6ee7b7;">
            🔬 Sains: Darjah ${sciDarjah} (⭐ ${sciStars}/90)
          </span>
        </div>
      </div>

      <div class="form-grid" style="margin-top:16px;">
        <div style="background:#0f172a; padding:14px; border-radius:14px;">
          <div style="color:#94a3b8; font-size:0.82rem;">Jumlah Soalan Dijawab</div>
          <div style="font-size:1.5rem; font-weight:900;">${totalAns}</div>
        </div>
        <div style="background:#0f172a; padding:14px; border-radius:14px;">
          <div style="color:#94a3b8; font-size:0.82rem;">Ketepatan Keseluruhan</div>
          <div style="font-size:1.5rem; font-weight:900; color:#fde047;">${acc}%</div>
        </div>
        <div style="background:#0f172a; padding:14px; border-radius:14px;">
          <div style="color:#94a3b8; font-size:0.82rem;">Jumlah Stesen Lulus (Math + Sains)</div>
          <div style="font-size:1.5rem; font-weight:900; color:#34d399;">
            ${Object.values(p.progress || {}).filter((x) => x.passed).length} / 60
          </div>
        </div>
      </div>

      <h3 style="margin:18px 0 6px;">Analisis Mengikut Topik KSSR (Matematik & Sains)</h3>
      <div style="overflow-x:auto;">
        <table class="report-table">
          <thead>
            <tr>
              <th>Topik KSSR</th>
              <th>Betul / Jumlah</th>
              <th>Peratus</th>
              <th>Tahap Penguasaan</th>
            </tr>
          </thead>
          <tbody>
            ${topicRows}
          </tbody>
        </table>
      </div>
    </div>
  `;

  showView('viewParent');
};

window.exportProgressJson = function () {
  const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(appState, null, 2));
  const a = document.createElement('a');
  a.setAttribute('href', dataStr);
  a.setAttribute('download', `primary-learning-kssr-backup-${new Date().toISOString().slice(0, 10)}.json`);
  document.body.appendChild(a);
  a.click();
  a.remove();
};

window.importProgressJson = function (event) {
  const file = event.target.files[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (parsed && Array.isArray(parsed.profiles)) {
        appState = { ...appState, ...parsed };
        saveState();
        renderProfilesView();
        alert('Rekod progres anak berjaya dimuat naik!');
      } else {
        alert('Fail JSON tidak sah.');
      }
    } catch (err) {
      alert('Gagal membaca fail sandaran.');
    }
  };
  reader.readAsText(file);
};

window.toggleSound = function () {
  appState.soundEnabled = !appState.soundEnabled;
  saveState();
};

window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderProfilesView();
  updateTopHud();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
