// ============================================================================
// MATH SAGA KSSR — LOGIK PERMAINAN, PROFIL ANAK, PETA CANDY CRUSH & AUDIO
// ============================================================================

const STORAGE_KEY = 'MATH_SAGA_KSSR_STATE_V1';

const AVATARS = ['🦁', '🐯', '🐼', '🦊', '🚀', '🦄', '🦖', '⚡', '👑', '🌟'];

let appState = {
  soundEnabled: true,
  activeProfileId: null,
  selectedAvatar: '🦁',
  selectedDarjahView: 1,
  profiles: []
};

// Sesi permainan semasa
let gameSession = {
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

// ================= AUDIO SYNTH (TANPA FAIL LUARAN) =================
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
  } catch (e) {
    // Abaikan jika browser menyekat audio sebelum interaksi
  }
}

// ================= SIMPAN & MUAT DATA (LOCALSTORAGE) =================
function loadState() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      appState = { ...appState, ...parsed };
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
  return appState.profiles.find((p) => p.id === appState.activeProfileId) || null;
}

// Senarai semua stesen mengikut urutan
function getAllNodesOrdered() {
  const list = [];
  window.KSSR_WORLDS.forEach((w) => {
    w.nodes.forEach((n) => {
      list.push({ ...n, darjah: w.darjah });
    });
  });
  return list;
}

function isNodeUnlocked(profile, nodeId) {
  if (!profile) return false;
  const all = getAllNodesOrdered();
  const idx = all.findIndex((n) => n.id === nodeId);
  if (idx <= 0) return true; // Stesen 1.1 sentiasa dibuka pada permulaan
  const prevNode = all[idx - 1];
  const prevRec = profile.progress[prevNode.id];
  return Boolean(prevRec && prevRec.passed);
}

function getHighestUnlockedDarjah(profile) {
  if (!profile) return 1;
  let highest = 1;
  for (const w of window.KSSR_WORLDS) {
    const firstNode = w.nodes[0];
    if (isNodeUnlocked(profile, firstNode.id)) {
      highest = w.darjah;
    }
  }
  return highest;
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
  const darjahBadge = document.getElementById('hudDarjah');
  const soundBtn = document.getElementById('hudSound');

  if (soundBtn) {
    soundBtn.textContent = appState.soundEnabled ? '🔊 Bunyi: ON' : '🔇 Bunyi: OFF';
  }

  if (p) {
    profileBadge.innerHTML = `${p.avatar} <span>${escapeHtml(p.nickname)}</span>`;
    starsBadge.textContent = `⭐ ${getTotalStars(p)} / 90`;
    darjahBadge.textContent = `🔓 Tahap Semasa: Darjah ${getHighestUnlockedDarjah(p)}`;
  } else {
    profileBadge.innerHTML = `👤 Pilih Pemain`;
    starsBadge.textContent = `⭐ 0`;
    darjahBadge.textContent = `Darjah 1 - 6`;
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
function showView(viewId) {
  document.querySelectorAll('.view-section').forEach((el) => {
    el.classList.remove('active');
  });
  const target = document.getElementById(viewId);
  if (target) target.classList.add('active');
  window.scrollTo({ top: 0, behavior: 'smooth' });
  updateTopHud();
}

// ================= SKRIN 1: PENDAFTARAN & PROFIL ANAK =================
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

function renderProfilesView() {
  renderAvatarPicker();
  const grid = document.getElementById('profilesGrid');
  if (!grid) return;

  if (appState.profiles.length === 0) {
    grid.innerHTML = `
      <div class="profile-card" style="grid-column: 1 / -1; text-align:center; padding: 28px;">
        <div style="font-size: 2.6rem;">🎮</div>
        <h3>Belum Ada Profil Anak Didaftarkan</h3>
        <p style="color:#cbd5e1; margin:4px 0 0;">
          Sila daftarkan Nama Penuh & Nama Panggilan anak anda (contoh: Anak 10 Tahun - Darjah 4 & Anak 12 Tahun - Darjah 6) di borang bawah untuk memulakan pengembaraan dari <strong>Darjah 1</strong>!
        </p>
      </div>
    `;
    return;
  }

  grid.innerHTML = appState.profiles
    .map((p) => {
      const unlockedDarjah = getHighestUnlockedDarjah(p);
      const stars = getTotalStars(p);
      const completedNodes = Object.values(p.progress || {}).filter((x) => x.passed).length;
      return `
        <div class="profile-card">
          <div class="profile-header">
            <div class="avatar-circle">${p.avatar}</div>
            <div class="profile-meta">
              <h3>${escapeHtml(p.nickname)}</h3>
              <div class="fullname">${escapeHtml(p.fullName)}</div>
            </div>
          </div>
          <div class="profile-badges">
            <span class="badge-chip">🎂 ${p.age} Tahun (Sekolah: Darjah ${p.actualDarjah})</span>
            <span class="badge-chip" style="background:rgba(16,185,129,0.2);color:#6ee7b7;">🔓 Peta: Darjah ${unlockedDarjah}</span>
            <span class="badge-chip" style="background:rgba(250,204,21,0.2);color:#fde047;">⭐ ${stars} Bintang (${completedNodes}/30 Stesen)</span>
          </div>
          <div style="display:flex; gap:10px; margin-top:auto;">
            <button class="btn-3d gold" style="flex:1;" onclick="selectProfileAndPlay('${p.id}')">
              ▶️ Mula / Sambung Main
            </button>
            <button class="btn-3d slate" onclick="openParentReport('${p.id}')" title="Rekod Prestasi">
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
    alert('Sila masukkan Nama Penuh dan Nama Panggilan anak.');
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
  selectProfileAndPlay(newProfile.id);
};

window.selectProfileAndPlay = function (profileId) {
  appState.activeProfileId = profileId;
  const p = getActiveProfile();
  appState.selectedDarjahView = getHighestUnlockedDarjah(p);
  saveState();
  renderSagaMap();
  showView('viewMap');
};

// ================= SKRIN 2: PETA SAGA (CANDY CRUSH STYLE) =================
window.selectDarjahTab = function (darjahNum) {
  appState.selectedDarjahView = darjahNum;
  renderSagaMap();
};

function renderSagaMap() {
  const p = getActiveProfile();
  if (!p) {
    showView('viewProfiles');
    return;
  }

  // Banner info pemain
  const highestDarjah = getHighestUnlockedDarjah(p);
  document.getElementById('mapPlayerSummary').innerHTML = `
    <div style="display:flex; align-items:center; gap:12px;">
      <div style="font-size:2.2rem;">${p.avatar}</div>
      <div>
        <div style="font-weight:900; font-size:1.15rem;">
          ${escapeHtml(p.nickname)} <span style="color:#94a3b8; font-weight:600; font-size:0.9rem;">(${escapeHtml(p.fullName)} • ${p.age} Tahun / Sasaran Darjah ${p.actualDarjah})</span>
        </div>
        <div style="font-size:0.86rem; color:#fde047;">
          Misi: Lulus semua stesen & Ujian Boss dari Darjah 1 hingga Darjah 6! (Tahap terbuka: Darjah ${highestDarjah})
        </div>
      </div>
    </div>
  `;

  // Tab pulau Darjah 1 - Darjah 6
  const tabsEl = document.getElementById('darjahTabs');
  tabsEl.innerHTML = window.KSSR_WORLDS.map((w) => {
    const firstNodeUnlocked = isNodeUnlocked(p, w.nodes[0].id);
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
  }).join('');

  // Render Pulau Darjah yang dipilih
  const world = window.KSSR_WORLDS.find((w) => w.darjah === appState.selectedDarjahView) || window.KSSR_WORLDS[0];
  const allNodes = getAllNodesOrdered();
  // Cari stesen pertama yang sudah dibuka tetapi belum lulus (sasaran semasa)
  const currentTargetNode = allNodes.find((n) => isNodeUnlocked(p, n.id) && !(p.progress[n.id] && p.progress[n.id].passed));

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
            const unlocked = isNodeUnlocked(p, node.id);
            const rec = p.progress[node.id] || { passed: false, stars: 0, bestScore: 0, attempts: 0 };
            const isTarget = currentTargetNode && currentTargetNode.id === node.id;
            const starsStr = rec.passed
              ? '⭐'.repeat(rec.stars) + '☆'.repeat(3 - rec.stars)
              : unlocked
              ? '☆☆☆'
              : '🔒';

            return `
              <div class="saga-step ${unlocked ? 'unlocked' : 'locked'} ${rec.passed ? 'completed' : ''} ${node.isBoss ? 'boss' : ''} ${isTarget ? 'current-target' : ''}"
                   onclick="${unlocked ? `startLevel('${node.id}')` : `lockedNotice(${world.darjah})`}">
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

window.lockedNotice = function (darjah) {
  playTone('wrong');
  alert(`Stesen ini masih terkunci! Anak perlu lulus stesen sebelumnya (dan Ujian Boss Darjah) dengan markah sekurang-kurangnya 75%-80% dahulu.`);
};

// ================= SKRIN 3: ARENA PERMAINAN & KERTAS CONTENG =================
window.startLevel = function (nodeId) {
  const p = getActiveProfile();
  if (!p) return;

  const world = window.KSSR_WORLDS.find((w) => w.nodes.some((n) => n.id === nodeId));
  const node = world.nodes.find((n) => n.id === nodeId);

  gameSession = {
    nodeId,
    world,
    node,
    questions: window.generateQuestionsForNode(nodeId),
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

  // Kemas kini bar atas Arena
  document.getElementById('arenaTitle').textContent = `${gameSession.node.code} — ${gameSession.node.title}`;
  document.getElementById('arenaStepText').textContent = `Soalan ${gameSession.currentIndex + 1} / ${totalQ}`;

  const pct = Math.round((gameSession.currentIndex / totalQ) * 100);
  document.getElementById('arenaProgressFill').style.width = `${pct}%`;

  // Hati / Nyawa
  let heartsHtml = '';
  for (let i = 1; i <= gameSession.maxHearts; i++) {
    const alive = i <= gameSession.hearts;
    heartsHtml += `<span class="heart-icon ${alive ? '' : 'lost'}">❤️</span>`;
  }
  if (gameSession.shieldActive) {
    heartsHtml += `<span title="Perisai Aktif">🛡️</span>`;
  }
  document.getElementById('arenaHearts').innerHTML = heartsHtml;

  // Combo Streak
  const comboEl = document.getElementById('arenaCombo');
  if (gameSession.streak >= 2) {
    comboEl.style.display = 'inline-block';
    comboEl.textContent = `🔥 Combo x${gameSession.streak}`;
  } else {
    comboEl.style.display = 'none';
  }

  // Kemas kini butang Booster
  document.getElementById('countHint').textContent = p.boosters.hint;
  document.getElementById('countBomb').textContent = p.boosters.bomb;
  document.getElementById('countShield').textContent = p.boosters.shield;
  document.getElementById('btnBoosterShield').disabled = p.boosters.shield <= 0 || gameSession.shieldActive;

  // Kandungan Soalan
  document.getElementById('qTopicPill').textContent = q.topic;
  document.getElementById('qPromptText').innerHTML = formatPromptHtml(q.prompt);

  const hintBox = document.getElementById('qHintBox');
  hintBox.style.display = 'none';
  hintBox.textContent = `💡 Petunjuk Cikgu: ${q.hint}`;

  // Mod Input (MCQ atau Numpad Skrin Sentuh)
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
        <button class="mcq-btn" id="mcqOpt_${idx}" onclick="submitAnswer('${escapeHtml(opt).replace(/'/g, "\\'")}')">
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
  submitAnswer(gameSession.numpadValue);
};

// ================= BOOSTERS (KUASA CANDY CRUSH) =================
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
    alert('Bom 50/50 sudah habis! Dapatkan 3 Bintang pada mana-mana stesen untuk menerima hadiah Booster baharu.');
    return;
  }
  p.boosters.bomb--;
  saveState();
  document.getElementById('countBomb').textContent = p.boosters.bomb;

  if (q.inputMode === 'numpad') {
    // Tukarkan terus soalan numpad kepada pilihan objektif 2 pilihan!
    q.inputMode = 'mcq';
    const wrongOpt = q.options.find((o) => String(o) !== String(q.answer)) || '0';
    q.options = [String(q.answer), String(wrongOpt)].sort(() => Math.random() - 0.5);
    renderCurrentQuestion();
  } else {
    // Buang 2 pilihan salah
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

// ================= SEMAK JAWAPAN & LANGKAH PENYELESAIAN =================
window.submitAnswer = function (givenRaw) {
  const p = getActiveProfile();
  const q = gameSession.questions[gameSession.currentIndex];

  const cleanGiven = String(givenRaw).replace(/,/g, '').trim().toLowerCase();
  const cleanAns = String(q.answer).replace(/,/g, '').trim().toLowerCase();

  const isCorrect =
    cleanGiven === cleanAns ||
    (!isNaN(Number(cleanGiven)) && !isNaN(Number(cleanAns)) && Math.abs(Number(cleanGiven) - Number(cleanAns)) < 0.0001);

  // Kemas kini statistik topik anak
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

    // Ganjaran booster bila streak 4 berturut-turut
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

    exp.innerHTML = `Jawapan anda: <strong>${escapeHtml(givenRaw)}</strong>\nJawapan sebenar: <strong>${escapeHtml(q.answer)}</strong>\n\n<strong>📚 Langkah Kira Cikgu:</strong>\n${formatPromptHtml(q.explanation)}`;
  }

  saveState();
  modal.classList.add('show');
};

window.nextQuestionOrFinish = function () {
  document.getElementById('feedbackModal').classList.remove('show');

  // Semak jika nyawa (hati) habis
  if (gameSession.hearts <= 0) {
    finishLevel(false, 'Habis 3 Nyawa (Hati ❤️)');
    return;
  }

  gameSession.currentIndex++;
  if (gameSession.currentIndex >= gameSession.questions.length) {
    const scorePct = Math.round((gameSession.correctCount / gameSession.questions.length) * 100);
    const passed = scorePct >= gameSession.node.passPercent;
    finishLevel(passed, passed ? 'Berjaya Melepasi Markah Lulus!' : `Markah ${scorePct}% belum mencapai syarat lulus (${gameSession.node.passPercent}%).`);
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

  // Jika dapat 3 bintang buat kali pertama, beri hadiah booster
  let rewardText = '';
  if (stars === 3 && prev.stars < 3) {
    p.boosters.bomb++;
    p.boosters.shield++;
    rewardText = `🎁 Ganjaran 3 Bintang: +1 Bom 50/50 & +1 Perisai Hati!`;
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

// ================= KERTAS CONTENG (SCRATCHPAD CANVAS TABLET) =================
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

// ================= SKRIN 4: REKOD PRESTASI IBU BAPA =================
window.openParentReport = function (profileId) {
  if (profileId) appState.activeProfileId = profileId;
  const p = getActiveProfile() || appState.profiles[0];
  if (!p) {
    alert('Tiada profil anak lagi. Sila daftar profil anak terlebih dahulu.');
    return;
  }

  const totalAns = p.stats.totalAnswered || 0;
  const totalCor = p.stats.totalCorrect || 0;
  const acc = totalAns > 0 ? Math.round((totalCor / totalAns) * 100) : 0;

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
        <div>
          <span class="badge-chip" style="font-size:0.95rem; padding:8px 14px;">
            Tahap Semasa: Darjah ${getHighestUnlockedDarjah(p)} • ⭐ ${getTotalStars(p)} Bintang
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
          <div style="color:#94a3b8; font-size:0.82rem;">Stesen Lulus</div>
          <div style="font-size:1.5rem; font-weight:900; color:#34d399;">
            ${Object.values(p.progress || {}).filter((x) => x.passed).length} / 30
          </div>
        </div>
      </div>

      <h3 style="margin:18px 0 6px;">Analisis Mengikut Topik KSSR</h3>
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
  a.setAttribute('download', `math-saga-kssr-backup-${new Date().toISOString().slice(0, 10)}.json`);
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
        appState = parsed;
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

// ================= INISIALISASI APLIKASI =================
window.addEventListener('DOMContentLoaded', () => {
  loadState();
  renderProfilesView();
  updateTopHud();

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('./sw.js').catch(() => {});
  }
});
