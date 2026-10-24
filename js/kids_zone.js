// ============================================================================
// TAMAN SI CILIK (2 HINGGA 6 TAHUN) — AKTIVITI PEMBELAJARAN & PEMBESARAN
// Tanpa Login • Tanpa Kuiz • Bertukar Tema & Aktiviti Setiap Hari!
// ============================================================================

const DAILY_THEMES = [
  {
    dayIndex: 0,
    dayName: 'Ahad',
    title: '🏡 Tema Hari Ini: Keluarga, Rumah & Taman Bunga',
    color: '#ec4899',
    coloringTemplate: 'house',
    items: [
      { emoji: '🏡', bm: 'Rumah Saya', en: 'My House', soundText: 'Ini Rumah. My House!' },
      { emoji: '🌻', bm: 'Bunga Matahari', en: 'Sunflower', soundText: 'Bunga Matahari warna kuning!' },
      { emoji: '🦋', bm: 'Rama-Rama Cantik', en: 'Butterfly', soundText: 'Rama-rama terbang tinggi!' },
      { emoji: '🐝', bm: 'Lebah Madu', en: 'Honey Bee', soundText: 'Bzzzz! Lebah buat madu manis!' },
      { emoji: '🌈', bm: 'Pelangi Tujuh Warna', en: 'Rainbow', soundText: 'Pelangi cantik selepas hujan!' },
      { emoji: '🌳', bm: 'Pokok Hijau', en: 'Green Tree', soundText: 'Pokok hijau yang rendang!' }
    ],
    traceItems: ['A', 'B', 'C', '1', '2', '3', 'ا', 'ب', '○']
  },
  {
    dayIndex: 1,
    dayName: 'Isnin',
    title: '🦁 Tema Hari Ini: Safari Haiwan Comel',
    color: '#f59e0b',
    coloringTemplate: 'cat',
    items: [
      { emoji: '🐱', bm: 'Kucing Comel', en: 'Cat', soundText: 'Meow! Meow! Ini Kucing comel!' },
      { emoji: '🐮', bm: 'Lembu Tenusu', en: 'Cow', soundText: 'Moooo! Ini Lembu!' },
      { emoji: '🦁', bm: 'Singa Raja Hutan', en: 'Lion', soundText: 'Roooaaar! Singa yang gagah!' },
      { emoji: '🐘', bm: 'Gajah Belalai Panjang', en: 'Elephant', soundText: 'Tuut! Gajah mempunyai belalai panjang!' },
      { emoji: '🦆', bm: 'Itik Kuning', en: 'Duck', soundText: 'Kwek! Kwek! Itik berenang di kolam!' },
      { emoji: '🐰', bm: 'Arnab Melompat', en: 'Rabbit', soundText: 'Arnab suka makan lobak merah!' }
    ],
    traceItems: ['D', 'E', 'F', '3', '4', '5', 'ت', 'ث', '△']
  },
  {
    dayIndex: 2,
    dayName: 'Selasa',
    title: '🍎 Tema Hari Ini: Kebun Buah & Makanan Sihat',
    color: '#10b981',
    coloringTemplate: 'apple',
    items: [
      { emoji: '🍎', bm: 'Epal Merah', en: 'Red Apple', soundText: 'Epal merah rangup dan manis!' },
      { emoji: '🍌', bm: 'Pisang Kuning', en: 'Yellow Banana', soundText: 'Pisang kuning beri kita tenaga!' },
      { emoji: '🍉', bm: 'Tembikai Berair', en: 'Watermelon', soundText: 'Tembikai merah sangat sedap!' },
      { emoji: '🍇', bm: 'Anggur Ungu', en: 'Purple Grapes', soundText: 'Buah anggur berwarna ungu!' },
      { emoji: '🥕', bm: 'Lobak Merah', en: 'Carrot', soundText: 'Lobak merah bagus untuk mata!' },
      { emoji: '🥛', bm: 'Susu Segar', en: 'Fresh Milk', soundText: 'Minum susu supaya tulang kuat!' }
    ],
    traceItems: ['G', 'H', 'I', '5', '6', '7', 'ج', 'ح', '□']
  },
  {
    dayIndex: 3,
    dayName: 'Rabu',
    title: '🚗 Tema Hari Ini: Kenderaan Bergerak Laju',
    color: '#0ea5e9',
    coloringTemplate: 'car',
    items: [
      { emoji: '🚗', bm: 'Kereta Merah', en: 'Red Car', soundText: 'Vroom! Vroom! Kereta bergerak di jalan raya!' },
      { emoji: '🚂', bm: 'Kereta Api', en: 'Train', soundText: 'Choo! Choo! Kereta api panjang!' },
      { emoji: '✈️', bm: 'Kapal Terbang', en: 'Airplane', soundText: 'Whooosh! Kapal terbang di awan biru!' },
      { emoji: '🚒', bm: 'Jentera Bomba', en: 'Fire Truck', soundText: 'Nino! Nino! Bomba datang menolong!' },
      { emoji: '⛵', bm: 'Kapal Layar', en: 'Sailboat', soundText: 'Kapal layar belayar di atas laut!' },
      { emoji: '🚲', bm: 'Basikal Saya', en: 'Bicycle', soundText: 'Kring! Kring! Jom kayuh basikal!' }
    ],
    traceItems: ['J', 'K', 'L', '7', '8', '9', 'د', 'ر', '☆']
  },
  {
    dayIndex: 4,
    dayName: 'Khamis',
    title: '🐠 Tema Hari Ini: Dunia Lautan Biru',
    color: '#0284c7',
    coloringTemplate: 'fish',
    items: [
      { emoji: '🐠', bm: 'Ikan Tropika', en: 'Tropical Fish', soundText: 'Blup! Blup! Ikan berenang di dalam laut!' },
      { emoji: '🐬', bm: 'Lumba-Lumba Pintar', en: 'Dolphin', soundText: 'Lumba-lumba melompat tinggi!' },
      { emoji: '🐢', bm: 'Penyu Hijau', en: 'Sea Turtle', soundText: 'Penyu mempunyai cangkerang keras!' },
      { emoji: '🐙', bm: 'Kurita Lapan Kaki', en: 'Octopus', soundText: 'Kurita ada lapan tangan yang lembut!' },
      { emoji: '🦀', bm: 'Ketam Merah', en: 'Red Crab', soundText: 'Ketam berjalan mengiring di pantai!' },
      { emoji: '🐳', bm: 'Ikan Paus Besar', en: 'Blue Whale', soundText: 'Ikan paus haiwan paling besar di laut!' }
    ],
    traceItems: ['M', 'N', 'O', '1', '5', '9', 'س', 'ش', '♡']
  },
  {
    dayIndex: 5,
    dayName: 'Jumaat',
    title: '🚀 Tema Hari Ini: Pengembaraan Angkasa Lepas',
    color: '#8b5cf6',
    coloringTemplate: 'rocket',
    items: [
      { emoji: '🚀', bm: 'Roket Angkasa', en: 'Space Rocket', soundText: 'Tiga, dua, satu, meluncur ke angkasa!' },
      { emoji: '☀️', bm: 'Matahari Bersinar', en: 'Bright Sun', soundText: 'Matahari bersinar terang pada waktu siang!' },
      { emoji: '🌙', bm: 'Bulan Sabit', en: 'Crescent Moon', soundText: 'Bulan bercahaya indah pada waktu malam!' },
      { emoji: '⭐', bm: 'Bintang Berkelipan', en: 'Twinkling Star', soundText: 'Kelip-kelip bintang di langit!' },
      { emoji: '🪐', bm: 'Planet Bergelang', en: 'Planet Saturn', soundText: 'Planet Zuhal ada cincin yang cantik!' },
      { emoji: '☁️', bm: 'Awan Putih Gebu', en: 'Fluffy Cloud', soundText: 'Awan putih lembut di langit biru!' }
    ],
    traceItems: ['P', 'Q', 'R', '2', '4', '8', 'ع', 'ف', '☆']
  },
  {
    dayIndex: 6,
    dayName: 'Sabtu',
    title: '🦕 Tema Hari Ini: Taman Dinosaur & Alam',
    color: '#059669',
    coloringTemplate: 'dino',
    items: [
      { emoji: '🦕', bm: 'Dinosaur Leher Panjang', en: 'Brachiosaurus', soundText: 'Dinosaur leher panjang makan daun pokok tinggi!' },
      { emoji: '🦖', bm: 'T-Rex Gagah', en: 'T-Rex', soundText: 'Roooaaar! Ini dinosaur T-Rex!' },
      { emoji: '🌋', bm: 'Gunung Tinggi', en: 'Mountain', soundText: 'Gunung yang tinggi dan besar!' },
      { emoji: '🌴', bm: 'Pokok Kelapa', en: 'Coconut Tree', soundText: 'Pokok kelapa di tepi pantai!' },
      { emoji: '🦜', bm: 'Burung Kakak Tua', en: 'Parrot', soundText: 'Helo! Burung kakak tua berbulu warna-warni!' },
      { emoji: '🐸', bm: 'Katak Hijau', en: 'Green Frog', soundText: 'Ong! Ong! Katak melompat tinggi!' }
    ],
    traceItems: ['S', 'T', 'U', '6', '7', '10', 'ك', 'م', '○']
  }
];

const COLOR_PALETTE = [
  { name: 'Merah', hex: '#ef4444' },
  { name: 'Jingga', hex: '#f97316' },
  { name: 'Kuning', hex: '#facc15' },
  { name: 'Hijau', hex: '#22c55e' },
  { name: 'Biru Langit', hex: '#38bdf8' },
  { name: 'Biru Tua', hex: '#3b82f6' },
  { name: 'Ungu', hex: '#a855f7' },
  { name: 'Merah Jambu', hex: '#ec4899' },
  { name: 'Coklat', hex: '#a16207' },
  { name: 'Putih', hex: '#f8fafc' }
];

let kidsState = {
  themeOffset: 0,
  activeActivity: 'coloring', // 'coloring' | 'puzzle' | 'tracing' | 'balloons' | 'soundboard' | 'memory'
  selectedColor: '#ef4444',
  selectedColorName: 'Merah',
  selectedColoringPic: null,
  svgPartColors: {},
  currentTraceIdx: 0,
  puzzleSelectedPiece: null,
  puzzlePlaced: {},
  balloonScore: 0,
  balloons: [],
  memoryCards: [],
  memoryFlipped: [],
  memoryMatched: []
};

function getTodayTheme() {
  const todayDay = new Date().getDay(); // 0 (Ahad) - 6 (Sabtu)
  const idx = (todayDay + kidsState.themeOffset) % DAILY_THEMES.length;
  return DAILY_THEMES[idx];
}

function speakKids(text) {
  if (typeof window.speakText === 'function') {
    window.speakText(text, 'ms-MY', 0.92);
  }
}

function playCheerSound() {
  if (typeof playTone === 'function') {
    playTone('win');
  }
}

// ================= PAPARAN UTAMA TAMAN SI CILIK (2-6 TAHUN) =================
window.openKidsZone = function () {
  const theme = getTodayTheme();
  if (!kidsState.selectedColoringPic) {
    kidsState.selectedColoringPic = theme.coloringTemplate;
  }
  showView('viewKids');
  renderKidsZone();
};

window.switchKidsTheme = function () {
  kidsState.themeOffset = (kidsState.themeOffset + 1) % DAILY_THEMES.length;
  const theme = getTodayTheme();
  kidsState.selectedColoringPic = theme.coloringTemplate;
  kidsState.svgPartColors = {};
  kidsState.puzzlePlaced = {};
  kidsState.memoryCards = [];
  playCheerSound();
  speakKids(theme.title.replace(/^[^\w]+/, ''));
  renderKidsZone();
};

window.selectKidsActivity = function (act) {
  kidsState.activeActivity = act;
  if (typeof playTone === 'function') playTone('correct');
  renderKidsZone();
};

function renderKidsZone() {
  const theme = getTodayTheme();
  const headerEl = document.getElementById('kidsThemeBanner');
  if (!headerEl) return;

  headerEl.style.background = `linear-gradient(135deg, ${theme.color}55, rgba(236,72,153,0.3))`;
  headerEl.innerHTML = `
    <div style="display:flex; align-items:center; gap:14px; flex-wrap:wrap;">
      <div style="font-size:3rem;">🧸</div>
      <div>
        <div style="display:flex; align-items:center; gap:8px; flex-wrap:wrap;">
          <span class="badge-chip" style="background:#facc15; color:#1e1b4b; font-size:0.85rem;">KHAS UMUR 2 – 6 TAHUN • TANPA LOGIN</span>
          <span class="badge-chip" style="background:rgba(255,255,255,0.2); color:#fff; font-size:0.85rem;">📅 Jadual Hari ${theme.dayName}</span>
        </div>
        <h2 style="margin:6px 0 2px; font-size:1.5rem; color:#fde047;">${theme.title}</h2>
        <p style="margin:0; font-size:0.92rem; color:#e2e8f0;">
          Aktiviti bertukar secara automatik setiap hari! Tekan butang di sebelah jika mahu menukar set aktiviti hari lain.
        </p>
      </div>
    </div>
    <div style="display:flex; gap:10px; flex-wrap:wrap;">
      <button class="btn-3d gold" onclick="switchKidsTheme()">
        🎲 Tukar Set Hari Lain
      </button>
      <button class="btn-3d slate" onclick="showView('viewProfiles')">
        🏠 Muka Depan
      </button>
    </div>
  `;

  // Bar Pilihan 6 Aktiviti Si Cilik
  const navActivities = [
    { id: 'coloring', icon: '🎨', label: 'Mewarna Gambar' },
    { id: 'puzzle', icon: '🧩', label: 'Puzzle & Bentuk' },
    { id: 'tracing', icon: '✍️', label: 'Surih ABC / 123 / ا ب' },
    { id: 'balloons', icon: '🎈', label: 'Letup Belon Kira' },
    { id: 'soundboard', icon: '🔊', label: 'Kenali & Dengar Bunyi' },
    { id: 'memory', icon: '🃏', label: 'Cari Kembar Comel' }
  ];

  document.getElementById('kidsActivityTabs').innerHTML = navActivities
    .map(
      (a) => `
      <button class="btn-3d ${kidsState.activeActivity === a.id ? 'gold' : 'slate'}"
              style="flex:1; min-width:145px; padding:14px 12px; font-size:0.98rem;"
              onclick="selectKidsActivity('${a.id}')">
        <span style="font-size:1.4rem;">${a.icon}</span>
        <span>${a.label}</span>
      </button>
    `
    )
    .join('');

  // Render Aktiviti Aktif
  const mount = document.getElementById('kidsActivityMount');
  if (kidsState.activeActivity === 'coloring') {
    renderColoringActivity(mount, theme);
  } else if (kidsState.activeActivity === 'puzzle') {
    renderPuzzleActivity(mount, theme);
  } else if (kidsState.activeActivity === 'tracing') {
    renderTracingActivity(mount, theme);
  } else if (kidsState.activeActivity === 'balloons') {
    renderBalloonsActivity(mount, theme);
  } else if (kidsState.activeActivity === 'soundboard') {
    renderSoundboardActivity(mount, theme);
  } else if (kidsState.activeActivity === 'memory') {
    renderMemoryActivity(mount, theme);
  }
}

// ============================================================================
// AKTIVITI 1: BUKU MEWARNA AJAIB (TAP-TO-FILL SVG)
// ============================================================================
const SVG_TEMPLATES = {
  house: {
    name: '🏡 Rumah & Taman',
    parts: [
      { id: 'sky', label: 'Langit', d: 'M10,10 H490 V310 H10 Z', defaultFill: '#e0f2fe' },
      { id: 'grass', label: 'Rumput', d: 'M10,240 H490 V310 H10 Z', defaultFill: '#dcfce7' },
      { id: 'sun', label: 'Matahari', d: 'M75,65 m-35,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0', defaultFill: '#fef9c3' },
      { id: 'wall', label: 'Dinding Rumah', d: 'M150,140 H350 V265 H150 Z', defaultFill: '#ffffff' },
      { id: 'roof', label: 'Bumbung Rumah', d: 'M125,140 L250,50 L375,140 Z', defaultFill: '#fee2e2' },
      { id: 'door', label: 'Pintu', d: 'M225,185 H275 V265 H225 Z', defaultFill: '#fef3c7' },
      { id: 'win1', label: 'Tingkap Kiri', d: 'M170,165 H208 V205 H170 Z', defaultFill: '#ffffff' },
      { id: 'win2', label: 'Tingkap Kanan', d: 'M292,165 H330 V205 H292 Z', defaultFill: '#ffffff' },
      { id: 'treeTrunk', label: 'Batang Pokok', d: 'M415,190 H440 V265 H415 Z', defaultFill: '#f5f5f4' },
      { id: 'treeTop', label: 'Daun Pokok', d: 'M427,145 m-45,0 a45,45 0 1,0 90,0 a45,45 0 1,0 -90,0', defaultFill: '#ecfccb' }
    ]
  },
  cat: {
    name: '🐱 Kucing Comel',
    parts: [
      { id: 'bg', label: 'Latar Belakang', d: 'M10,10 H490 V310 H10 Z', defaultFill: '#fdf2f8' },
      { id: 'mat', label: 'Tikar Kucing', d: 'M90,260 a160,30 0 1,0 320,0 a160,30 0 1,0 -320,0', defaultFill: '#e0e7ff' },
      { id: 'body', label: 'Badan Kucing', d: 'M180,175 H320 V265 H180 Z', defaultFill: '#ffffff' },
      { id: 'tail', label: 'Ekor Kucing', d: 'M320,235 Q395,220 390,165 Q375,160 365,215 L320,220 Z', defaultFill: '#ffffff' },
      { id: 'earL', label: 'Telinga Kiri', d: 'M175,115 L165,45 L225,85 Z', defaultFill: '#ffe4e6' },
      { id: 'earR', label: 'Telinga Kanan', d: 'M325,115 L335,45 L275,85 Z', defaultFill: '#ffe4e6' },
      { id: 'head', label: 'Kepala Kucing', d: 'M250,130 m-75,0 a75,65 0 1,0 150,0 a75,65 0 1,0 -150,0', defaultFill: '#ffffff' },
      { id: 'nose', label: 'Hidung Kucing', d: 'M240,135 L260,135 L250,150 Z', defaultFill: '#fbcfe8' },
      { id: 'collar', label: 'Rantai Leher', d: 'M185,180 H315 V198 H185 Z', defaultFill: '#fef08a' },
      { id: 'bell', label: 'Loceng Comel', d: 'M250,205 m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0', defaultFill: '#fde047' }
    ]
  },
  car: {
    name: '🚗 Kereta Ceria',
    parts: [
      { id: 'sky', label: 'Langit', d: 'M10,10 H490 V230 H10 Z', defaultFill: '#e0f2fe' },
      { id: 'road', label: 'Jalan Raya', d: 'M10,230 H490 V310 H10 Z', defaultFill: '#cbd5e1' },
      { id: 'sun', label: 'Matahari', d: 'M420,65 m-35,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0', defaultFill: '#fef9c3' },
      { id: 'topCab', label: 'Bumbung Kereta', d: 'M150,150 L190,90 H320 L360,150 Z', defaultFill: '#ffffff' },
      { id: 'winL', label: 'Cermin Depan', d: 'M198,100 H250 V145 H170 Z', defaultFill: '#bae6fd' },
      { id: 'winR', label: 'Cermin Belakang', d: 'M260,100 H312 L340,145 H260 Z', defaultFill: '#bae6fd' },
      { id: 'carBody', label: 'Badan Kereta', d: 'M95,150 H405 Q425,150 425,185 V225 H80 V185 Q80,150 95,150 Z', defaultFill: '#fee2e2' },
      { id: 'wheel1', label: 'Tayar Depan', d: 'M165,225 m-36,0 a36,36 0 1,0 72,0 a36,36 0 1,0 -72,0', defaultFill: '#94a3b8' },
      { id: 'wheel2', label: 'Tayar Belakang', d: 'M345,225 m-36,0 a36,36 0 1,0 72,0 a36,36 0 1,0 -72,0', defaultFill: '#94a3b8' },
      { id: 'light', label: 'Lampu Kereta', d: 'M80,165 H105 V190 H80 Z', defaultFill: '#fef08a' }
    ]
  },
  fish: {
    name: '🐠 Ikan Lautan',
    parts: [
      { id: 'sea', label: 'Air Laut', d: 'M10,10 H490 V310 H10 Z', defaultFill: '#e0f2fe' },
      { id: 'sand', label: 'Pasir Dasar Laut', d: 'M10,255 H490 V310 H10 Z', defaultFill: '#fef3c7' },
      { id: 'tail', label: 'Ekor Ikan', d: 'M340,155 L430,95 V215 Z', defaultFill: '#ffffff' },
      { id: 'finTop', label: 'Sirip Atas', d: 'M200,95 L265,45 L295,98 Z', defaultFill: '#ffffff' },
      { id: 'finBot', label: 'Sirip Bawah', d: 'M210,210 L265,255 L290,208 Z', defaultFill: '#ffffff' },
      { id: 'fishBody', label: 'Badan Ikan', d: 'M240,155 m-115,0 a115,68 0 1,0 230,0 a115,68 0 1,0 -230,0', defaultFill: '#ffffff' },
      { id: 'stripe1', label: 'Belang Ikan 1', d: 'M220,90 Q240,155 220,220 H250 Q270,155 250,90 Z', defaultFill: '#fef08a' },
      { id: 'stripe2', label: 'Belang Ikan 2', d: 'M285,98 Q305,155 285,212 H312 Q330,155 312,98 Z', defaultFill: '#fef08a' },
      { id: 'eye', label: 'Mata Ikan', d: 'M175,140 m-14,0 a14,14 0 1,0 28,0 a14,14 0 1,0 -28,0', defaultFill: '#ffffff' }
    ]
  },
  rocket: {
    name: '🚀 Roket Angkasa',
    parts: [
      { id: 'space', label: 'Angkasa Lepas', d: 'M10,10 H490 V310 H10 Z', defaultFill: '#1e1b4b' },
      { id: 'moon', label: 'Bulan', d: 'M90,80 m-40,0 a40,40 0 1,0 80,0 a40,40 0 1,0 -80,0', defaultFill: '#fef9c3' },
      { id: 'planet', label: 'Planet', d: 'M405,95 m-35,0 a35,35 0 1,0 70,0 a35,35 0 1,0 -70,0', defaultFill: '#fbcfe8' },
      { id: 'flame', label: 'Api Roket', d: 'M220,240 L250,300 L280,240 Z', defaultFill: '#fde047' },
      { id: 'wingL', label: 'Sayap Kiri', d: 'M200,185 L150,245 H200 Z', defaultFill: '#fee2e2' },
      { id: 'wingR', label: 'Sayap Kanan', d: 'M300,185 L350,245 H300 Z', defaultFill: '#fee2e2' },
      { id: 'body', label: 'Badan Roket', d: 'M200,100 H300 V240 H200 Z', defaultFill: '#ffffff' },
      { id: 'noseCone', label: 'Muncung Roket', d: 'M200,100 L250,30 L300,100 Z', defaultFill: '#fee2e2' },
      { id: 'window', label: 'Tingkap Roket', d: 'M250,155 m-26,0 a26,26 0 1,0 52,0 a26,26 0 1,0 -52,0', defaultFill: '#bae6fd' }
    ]
  },
  apple: {
    name: '🍎 Buah Epal & Daun',
    parts: [
      { id: 'bg', label: 'Latar Ceria', d: 'M10,10 H490 V310 H10 Z', defaultFill: '#fefce8' },
      { id: 'plate', label: 'Pinggan Buah', d: 'M100,265 a150,28 0 1,0 300,0 a150,28 0 1,0 -300,0', defaultFill: '#e0f2fe' },
      { id: 'appleBody', label: 'Buah Epal', d: 'M250,120 C190,85 135,145 160,220 C180,275 235,270 250,250 C265,270 320,275 340,220 C365,145 310,85 250,120 Z', defaultFill: '#fee2e2' },
      { id: 'stem', label: 'Tangkai Epal', d: 'M243,65 H258 V122 H243 Z', defaultFill: '#d6d3d1' },
      { id: 'leaf', label: 'Daun Hijau', d: 'M258,85 Q315,50 325,95 Q285,120 258,85 Z', defaultFill: '#dcfce7' }
    ]
  },
  dino: {
    name: '🦕 Dinosaur Comel',
    parts: [
      { id: 'sky', label: 'Langit', d: 'M10,10 H490 V245 H10 Z', defaultFill: '#e0f2fe' },
      { id: 'ground', label: 'Padang Rumput', d: 'M10,245 H490 V310 H10 Z', defaultFill: '#dcfce7' },
      { id: 'tail', label: 'Ekor Dinosaur', d: 'M320,195 L425,225 L320,235 Z', defaultFill: '#ffffff' },
      { id: 'dinoBody', label: 'Badan Dinosaur', d: 'M255,195 m-75,0 a75,50 0 1,0 150,0 a75,50 0 1,0 -150,0', defaultFill: '#ecfccb' },
      { id: 'neck', label: 'Leher & Kepala', d: 'M155,75 H205 V200 H155 Z', defaultFill: '#ecfccb' },
      { id: 'snout', label: 'Muka Dinosaur', d: 'M115,65 H195 V115 H115 Z', defaultFill: '#ecfccb' },
      { id: 'leg1', label: 'Kaki Depan', d: 'M195,230 H230 V280 H195 Z', defaultFill: '#ffffff' },
      { id: 'leg2', label: 'Kaki Belakang', d: 'M280,230 H315 V280 H280 Z', defaultFill: '#ffffff' },
      { id: 'spots', label: 'Tompok Badan', d: 'M260,185 m-22,0 a22,22 0 1,0 44,0 a22,22 0 1,0 -44,0', defaultFill: '#fef08a' }
    ]
  }
};

window.selectColorSwatch = function (hex, name) {
  kidsState.selectedColor = hex;
  kidsState.selectedColorName = name;
  speakKids(`Warna ${name}`);
  renderKidsZone();
};

window.selectColoringTemplate = function (key) {
  kidsState.selectedColoringPic = key;
  kidsState.svgPartColors = {};
  playCheerSound();
  renderKidsZone();
};

window.fillSvgPart = function (partId, partLabel) {
  kidsState.svgPartColors[partId] = kidsState.selectedColor;
  if (typeof playTone === 'function') playTone('correct');
  speakKids(`${partLabel} warna ${kidsState.selectedColorName}`);
  renderKidsZone();
};

window.resetColoring = function () {
  kidsState.svgPartColors = {};
  renderKidsZone();
};

function renderColoringActivity(mount, theme) {
  const picKey = kidsState.selectedColoringPic || theme.coloringTemplate;
  const tpl = SVG_TEMPLATES[picKey] || SVG_TEMPLATES.house;

  const picButtons = Object.entries(SVG_TEMPLATES)
    .map(
      ([k, v]) => `
      <button class="darjah-tab ${picKey === k ? 'active' : ''}" onclick="selectColoringTemplate('${k}')">
        ${v.name}
      </button>
    `
    )
    .join('');

  const swatches = COLOR_PALETTE.map(
    (c) => `
      <div onclick="selectColorSwatch('${c.hex}', '${c.name}')"
           style="width:52px; height:52px; border-radius:50%; background:${c.hex}; cursor:pointer;
                  border:${kidsState.selectedColor === c.hex ? '5px solid #fff' : '2px solid rgba(255,255,255,0.3)'};
                  box-shadow:0 4px 10px rgba(0,0,0,0.4); transform:${kidsState.selectedColor === c.hex ? 'scale(1.15)' : 'scale(1)'};
                  transition:transform 0.15s;"
           title="${c.name}">
      </div>
    `
  ).join('');

  const svgPaths = tpl.parts
    .map((p) => {
      const fill = kidsState.svgPartColors[p.id] || p.defaultFill;
      return `<path d="${p.d}" fill="${fill}" stroke="#1e293b" stroke-width="4" stroke-linejoin="round"
                    style="cursor:pointer; transition:fill 0.2s;"
                    onclick="fillSvgPart('${p.id}', '${p.label}')" />`;
    })
    .join('');

  mount.innerHTML = `
    <div class="question-card" style="align-items:center; text-align:center;">
      <div style="width:100%;">
        <h3 style="margin:0 0 8px; color:#fde047; font-size:1.35rem;">
          🎨 Buku Mewarna Sentuh Jari — Pilih Gambar & Sentuh Bahagian Untuk Mewarna!
        </h3>
        <div class="darjah-tabs" style="justify-content:center; margin-bottom:12px;">
          ${picButtons}
        </div>
      </div>

      <!-- Palet Warna Besar -->
      <div style="display:flex; gap:12px; flex-wrap:wrap; justify-content:center; background:#0f172a; padding:14px 20px; border-radius:20px; border:2px solid rgba(255,255,255,0.15);">
        ${swatches}
      </div>

      <div style="font-weight:800; color:#a5b4fc;">
        Warna dipilih: <span style="color:${kidsState.selectedColor};">${kidsState.selectedColorName}</span> • Sentuh mana-mana bahagian lukisan di bawah!
      </div>

      <!-- Kanvas SVG Interaktif -->
      <div style="width:100%; max-width:660px; background:#fff; border-radius:24px; padding:10px; border:4px solid #fde047; box-shadow:0 14px 30px rgba(0,0,0,0.45);">
        <svg viewBox="0 0 500 320" style="width:100%; height:auto; display:block; border-radius:16px;">
          ${svgPaths}
        </svg>
      </div>

      <div style="display:flex; gap:12px;">
        <button class="btn-3d slate" onclick="resetColoring()">🔄 Bersihkan Warna</button>
        <button class="btn-3d green" onclick="playCheerSound(); speakKids('Wah, cantiknya lukisan awak! Pandainya!')">
          🌟 Siap Mewarna!
        </button>
      </div>
    </div>
  `;
}

// ============================================================================
// AKTIVITI 2: PUZZLE PADANKAN BENTUK & GAMBAR (SHAPE & PICTURE SORTER)
// ============================================================================
window.pickPuzzlePiece = function (idx) {
  kidsState.puzzleSelectedPiece = idx;
  const theme = getTodayTheme();
  const item = theme.items[idx];
  if (item) speakKids(item.bm);
  renderKidsZone();
};

window.placePuzzleInSlot = function (slotIdx) {
  if (kidsState.puzzleSelectedPiece === null) {
    speakKids('Sentuh gambar di atas dahulu, kemudian sentuh kotaknya!');
    return;
  }
  if (kidsState.puzzleSelectedPiece === slotIdx) {
    kidsState.puzzlePlaced[slotIdx] = true;
    kidsState.puzzleSelectedPiece = null;
    playCheerSound();
    const theme = getTodayTheme();
    const totalDone = Object.keys(kidsState.puzzlePlaced).length;
    if (totalDone >= theme.items.length) {
      speakKids('Tahniah! Semua puzzle telah lengkap disusun! Hebatnya awak!');
    } else {
      speakKids('Betul! Pandainya!');
    }
  } else {
    if (typeof playTone === 'function') playTone('wrong');
    speakKids('Cuba padankan dengan bayang-bayang yang sama bentuk!');
  }
  renderKidsZone();
};

window.resetKidsPuzzle = function () {
  kidsState.puzzlePlaced = {};
  kidsState.puzzleSelectedPiece = null;
  renderKidsZone();
};

function renderPuzzleActivity(mount, theme) {
  const items = theme.items;
  const allComplete = Object.keys(kidsState.puzzlePlaced).length === items.length;

  mount.innerHTML = `
    <div class="question-card" style="text-align:center;">
      <h3 style="margin:0; font-size:1.35rem; color:#fde047;">
        🧩 Puzzle Padankan Gambar — Sentuh Kepingan Di Atas & Letakkan Pada Kotak Bayangnya!
      </h3>

      ${
        allComplete
          ? `<div style="background:rgba(16,185,129,0.25); border:2px solid #10b981; padding:16px; border-radius:18px; font-size:1.25rem; font-weight:900; color:#6ee7b7;">
              🎉 YEAY! SEMUA KEPINGAN PUZZLE BERJAYA DISUSUN! 🌟
             </div>`
          : ''
      }

      <!-- Kepingan Puzzle Untuk Dipilih -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(125px, 1fr)); gap:12px;">
        ${items
          .map((it, idx) => {
            const placed = kidsState.puzzlePlaced[idx];
            const isSel = kidsState.puzzleSelectedPiece === idx;
            return `
              <div onclick="${placed ? '' : `pickPuzzlePiece(${idx})`}"
                   style="padding:16px 10px; border-radius:20px; cursor:${placed ? 'default' : 'pointer'};
                          background:${placed ? 'rgba(16,185,129,0.15)' : isSel ? 'rgba(250,204,21,0.3)' : '#0f172a'};
                          border:3px solid ${placed ? '#10b981' : isSel ? '#fde047' : 'rgba(255,255,255,0.18)'};
                          opacity:${placed ? '0.35' : '1'}; transform:${isSel ? 'scale(1.06)' : 'scale(1)'};">
                <div style="font-size:3rem;">${it.emoji}</div>
                <div style="font-weight:800; margin-top:4px; font-size:0.92rem;">${it.bm}</div>
              </div>
            `;
          })
          .join('')}
      </div>

      <div style="font-weight:800; color:#38bdf8; font-size:1.05rem;">
        ⬇️ Letakkan Pada Petak Bayang-Bayang Di Bawah ⬇️
      </div>

      <!-- Petak Sasaran Bayang-Bayang -->
      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(140px, 1fr)); gap:14px;">
        ${items
          .map((it, idx) => {
            const placed = kidsState.puzzlePlaced[idx];
            return `
              <div onclick="${placed ? '' : `placePuzzleInSlot(${idx})`}"
                   style="padding:20px 12px; border-radius:22px; cursor:pointer;
                          background:${placed ? 'linear-gradient(135deg, #065f46, #059669)' : 'rgba(15,23,42,0.75)'};
                          border:3px dashed ${placed ? '#34d399' : '#94a3b8'};">
                <div style="font-size:3.2rem; filter:${placed ? 'none' : 'brightness(0) invert(0.35)'};">
                  ${it.emoji}
                </div>
                <div style="font-weight:900; margin-top:6px; color:${placed ? '#fde047' : '#cbd5e1'};">
                  ${placed ? `✅ ${it.bm}` : `Petak: ${it.bm}`}
                </div>
              </div>
            `;
          })
          .join('')}
      </div>

      <div>
        <button class="btn-3d gold" onclick="resetKidsPuzzle()">🔄 Main Semula Puzzle</button>
      </div>
    </div>
  `;
}

// ============================================================================
// AKTIVITI 3: SURIH / JEJAK GARISAN HURUF ABC, 123 & ALIF-BA-TA (TRACING)
// ============================================================================
window.selectTraceChar = function (idx) {
  kidsState.currentTraceIdx = idx;
  const theme = getTodayTheme();
  const ch = theme.traceItems[idx];
  speakKids(`Mari tulis ${ch}`);
  renderKidsZone();
};

function renderTracingActivity(mount, theme) {
  const chars = theme.traceItems;
  const activeChar = chars[kidsState.currentTraceIdx % chars.length];

  mount.innerHTML = `
    <div class="question-card" style="align-items:center; text-align:center;">
      <h3 style="margin:0; font-size:1.35rem; color:#fde047;">
        ✍️ Surih Huruf & Nombor — Gunakan Jari Untuk Mengikut Bentuk Di Skrin!
      </h3>

      <div class="darjah-tabs" style="justify-content:center;">
        ${chars
          .map(
            (c, idx) => `
            <button class="darjah-tab ${kidsState.currentTraceIdx === idx ? 'active' : ''}"
                    style="font-size:1.25rem; padding:10px 18px;"
                    onclick="selectTraceChar(${idx})">
              ${c}
            </button>
          `
          )
          .join('')}
      </div>

      <div style="position:relative; width:100%; max-width:460px; height:320px; background:#090d16; border:4px solid #fde047; border-radius:26px; overflow:hidden; touch-action:none;">
        <!-- Panduan Huruf Besar Di Belakang Kanvas -->
        <div style="position:absolute; inset:0; display:flex; align-items:center; justify-content:center;
                    font-size:12.5rem; font-weight:900; color:rgba(255,255,255,0.16); pointer-events:none;">
          ${activeChar}
        </div>
        <canvas id="kidsTraceCanvas" style="width:100%; height:100%; display:block; position:relative; z-index:2; touch-action:none;"></canvas>
      </div>

      <div style="display:flex; gap:10px; flex-wrap:wrap; justify-content:center;">
        <button class="btn-3d slate" onclick="selectTraceChar(${kidsState.currentTraceIdx})">🗑️ Padam & Cuba Lagi</button>
        <button class="btn-3d green" onclick="playCheerSound(); speakKids('Cantiknya tulisan awak!'); selectTraceChar((${kidsState.currentTraceIdx} + 1) % ${chars.length})">
          🌟 Cantik! Huruf Seterusnya ➡️
        </button>
      </div>
    </div>
  `;

  setTimeout(initKidsTraceCanvas, 30);
}

function initKidsTraceCanvas() {
  const canvas = document.getElementById('kidsTraceCanvas');
  if (!canvas) return;
  const r = canvas.getBoundingClientRect();
  canvas.width = r.width;
  canvas.height = r.height;
  const ctx = canvas.getContext('2d');
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.lineWidth = 18;
  ctx.strokeStyle = '#fde047';
  ctx.shadowColor = '#f472b6';
  ctx.shadowBlur = 10;

  let drawing = false;
  const pos = (e) => {
    const rect = canvas.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const y = (e.touches ? e.touches[0].clientY : e.clientY) - rect.top;
    return { x, y };
  };

  canvas.onpointerdown = (e) => {
    drawing = true;
    const p = pos(e);
    ctx.beginPath();
    ctx.moveTo(p.x, p.y);
  };
  canvas.onpointermove = (e) => {
    if (!drawing) return;
    const p = pos(e);
    ctx.lineTo(p.x, p.y);
    ctx.stroke();
  };
  window.addEventListener('pointerup', () => {
    drawing = false;
  });
}

// ============================================================================
// AKTIVITI 4: LETUP BELON BELAJAR KIRA 1 HINGGA 10 (POP THE BALLOONS)
// ============================================================================
const BALLOON_WORDS = ['Satu!', 'Dua!', 'Tiga!', 'Empat!', 'Lima!', 'Enam!', 'Tujuh!', 'Lapan!', 'Sembilan!', 'Sepuluh!'];

function initBalloons() {
  kidsState.balloonScore = 0;
  kidsState.balloons = Array.from({ length: 10 }, (_, i) => ({
    num: i + 1,
    popped: false,
    color: COLOR_PALETTE[i % (COLOR_PALETTE.length - 1)].hex
  }));
}

window.popKidsBalloon = function (idx) {
  const b = kidsState.balloons[idx];
  if (!b || b.popped) return;
  b.popped = true;
  kidsState.balloonScore++;
  if (typeof playTone === 'function') playTone('correct');
  speakKids(BALLOON_WORDS[kidsState.balloonScore - 1] || String(kidsState.balloonScore));
  renderKidsZone();
};

window.resetKidsBalloons = function () {
  initBalloons();
  speakKids('Mari pecahkan belon sambil mengira satu hingga sepuluh!');
  renderKidsZone();
};

function renderBalloonsActivity(mount) {
  if (!kidsState.balloons.length) initBalloons();

  mount.innerHTML = `
    <div class="question-card" style="text-align:center;">
      <h3 style="margin:0; font-size:1.35rem; color:#fde047;">
        🎈 Pecahkan Belon Sambil Mengira 1 Hingga 10! (Belon Pecah: ${kidsState.balloonScore} / 10)
      </h3>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(115px, 1fr)); gap:16px; padding:14px 0;">
        ${kidsState.balloons
          .map(
            (b, idx) => `
            <div onclick="popKidsBalloon(${idx})"
                 style="height:135px; border-radius:50% 50% 48% 48%; cursor:${b.popped ? 'default' : 'pointer'};
                        background:${b.popped ? 'rgba(255,255,255,0.06)' : `radial-gradient(circle at 30% 30%, #fff, ${b.color})`};
                        border:3px solid ${b.popped ? 'rgba(255,255,255,0.1)' : '#fff'};
                        display:flex; flex-direction:column; align-items:center; justify-content:center;
                        box-shadow:${b.popped ? 'none' : '0 10px 22px rgba(0,0,0,0.4)'};
                        transform:${b.popped ? 'scale(0.82)' : 'scale(1)'}; transition:all 0.2s;">
              <div style="font-size:2.4rem; font-weight:900; color:${b.popped ? '#64748b' : '#0f172a'};">
                ${b.popped ? '💥' : b.num}
              </div>
              <div style="font-size:0.82rem; font-weight:800; color:${b.popped ? '#94a3b8' : '#1e293b'};">
                ${b.popped ? 'Pecah!' : 'Sentuh!'}
              </div>
            </div>
          `
          )
          .join('')}
      </div>

      <div>
        <button class="btn-3d gold" onclick="resetKidsBalloons()">🎈 Tiup Belon Baharu</button>
      </div>
    </div>
  `;
}

// ============================================================================
// AKTIVITI 5: PAPAN BUNYI & PERKATAAN (TAP & LISTEN SOUNDBOARD)
// ============================================================================
function renderSoundboardActivity(mount, theme) {
  mount.innerHTML = `
    <div class="question-card" style="text-align:center;">
      <h3 style="margin:0; font-size:1.35rem; color:#fde047;">
        🔊 Sentuh Kad Gambar Untuk Mendengar Sebutan & Bunyinya!
      </h3>

      <div style="display:grid; grid-template-columns:repeat(auto-fit, minmax(210px, 1fr)); gap:16px;">
        ${theme.items
          .map(
            (it) => `
            <div class="iqra-flashcard" style="cursor:pointer;"
                 onclick="playCheerSound(); speakKids('${it.soundText.replace(/'/g, "\\'")}')">
              <div style="font-size:4.2rem;">${it.emoji}</div>
              <div style="font-size:1.3rem; font-weight:900; color:#fde047;">${it.bm}</div>
              <div class="rumi-translit">🇬🇧 ${it.en}</div>
              <button class="btn-3d gold" style="width:100%; margin-top:6px;">🔊 Dengar Bunyi</button>
            </div>
          `
          )
          .join('')}
      </div>
    </div>
  `;
}

// ============================================================================
// AKTIVITI 6: CARI PASANGAN KEMBAR COMEL (MEMORY MATCH MUDAH)
// ============================================================================
function initKidsMemory(theme) {
  const subset = theme.items.slice(0, 4); // 4 pasang = 8 kad besar mesra 2-6 tahun
  const pairs = [...subset, ...subset].map((it, idx) => ({
    uid: idx,
    emoji: it.emoji,
    bm: it.bm
  }));
  for (let i = pairs.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [pairs[i], pairs[j]] = [pairs[j], pairs[i]];
  }
  kidsState.memoryCards = pairs;
  kidsState.memoryFlipped = [];
  kidsState.memoryMatched = [];
}

window.flipKidsMemoryCard = function (idx) {
  if (
    kidsState.memoryFlipped.includes(idx) ||
    kidsState.memoryMatched.includes(idx) ||
    kidsState.memoryFlipped.length >= 2
  ) {
    return;
  }
  kidsState.memoryFlipped.push(idx);
  const card = kidsState.memoryCards[idx];
  speakKids(card.bm);
  renderKidsZone();

  if (kidsState.memoryFlipped.length === 2) {
    const [a, b] = kidsState.memoryFlipped;
    if (kidsState.memoryCards[a].emoji === kidsState.memoryCards[b].emoji) {
      kidsState.memoryMatched.push(a, b);
      kidsState.memoryFlipped = [];
      playCheerSound();
      renderKidsZone();
    } else {
      setTimeout(() => {
        kidsState.memoryFlipped = [];
        renderKidsZone();
      }, 900);
    }
  }
};

window.resetKidsMemory = function () {
  initKidsMemory(getTodayTheme());
  renderKidsZone();
};

function renderMemoryActivity(mount, theme) {
  if (!kidsState.memoryCards.length) initKidsMemory(theme);

  mount.innerHTML = `
    <div class="question-card" style="text-align:center;">
      <h3 style="margin:0; font-size:1.35rem; color:#fde047;">
        🃏 Cari Pasangan Gambar Kembar Yang Sama! (${kidsState.memoryMatched.length / 2} / 4 Pasangan)
      </h3>

      <div style="display:grid; grid-template-columns:repeat(4, 1fr); gap:14px; max-width:640px; margin:0 auto; width:100%;">
        ${kidsState.memoryCards
          .map((c, idx) => {
            const open = kidsState.memoryFlipped.includes(idx) || kidsState.memoryMatched.includes(idx);
            return `
              <div onclick="flipKidsMemoryCard(${idx})"
                   style="height:130px; border-radius:22px; cursor:pointer;
                          background:${open ? 'linear-gradient(135deg, #4f46e5, #ec4899)' : '#0f172a'};
                          border:3px solid ${open ? '#fde047' : 'rgba(255,255,255,0.22)'};
                          display:flex; flex-direction:column; align-items:center; justify-content:center;">
                <div style="font-size:3.2rem;">${open ? c.emoji : '🎁'}</div>
                <div style="font-size:0.8rem; font-weight:800; margin-top:4px;">
                  ${open ? c.bm : 'Sentuh!'}
                </div>
              </div>
            `;
          })
          .join('')}
      </div>

      <div>
        <button class="btn-3d gold" onclick="resetKidsMemory()">🔄 Kocok Semula Kad</button>
      </div>
    </div>
  `;
}
