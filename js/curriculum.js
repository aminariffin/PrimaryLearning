// ============================================================================
// MATH SAGA KSSR (SEMAKAN) MALAYSIA — DARJAH 1 HINGGA DARJAH 6
// Enjin Penjana Soalan Dinamik + Langkah Penyelesaian Terperinci
// ============================================================================

const randInt = (min, max) => Math.floor(Math.random() * (max - min + 1)) + min;
const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const shuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

const NAMES = ['Aiman', 'Danish', 'Haziq', 'Irfan', 'Luqman', 'Nurul', 'Aisyah', 'Farah', 'Zara', 'Syafiq', 'Amira', 'Hakim'];
const ITEMS = [
  { name: 'biji guli', singular: 'biji guli' },
  { name: 'biji epal', singular: 'biji epal' },
  { name: 'buah buku cerita', singular: 'buah buku' },
  { name: 'batang pensel', singular: 'batang pensel' },
  { name: 'keping pelekat', singular: 'keping pelekat' },
  { name: 'biji karipap', singular: 'biji karipap' }
];

// Membina pilihan jawapan unik untuk soalan objektif
function makeOptions(correct, distractors, formatter = (v) => String(v)) {
  const correctStr = formatter(correct);
  const set = new Set([correctStr]);
  for (const d of distractors) {
    const s = formatter(d);
    if (s !== correctStr && !String(s).includes('NaN') && !String(s).includes('-')) {
      set.add(s);
    }
    if (set.size >= 4) break;
  }
  let offset = 1;
  while (set.size < 4) {
    const fallback = typeof correct === 'number' ? Math.max(0, correct + offset * (offset % 2 === 0 ? 1 : -1)) : `${correctStr} (${offset})`;
    const fStr = formatter(fallback);
    if (fStr !== correctStr) set.add(fStr);
    offset++;
  }
  return {
    answer: correctStr,
    options: shuffle(Array.from(set))
  };
}

// ============================================================================
// DEFINISI 6 PULAU DARJAH (DARJAH 1 - DARJAH 6) — 30 STESEN KESELURUHAN
// ============================================================================
window.KSSR_WORLDS = [
  {
    darjah: 1,
    title: 'Darjah 1: Lembah Asas Nombor',
    subtitle: 'Nombor Bulat Hingga 100, Tambah & Tolak Asas, Wang & Masa',
    themeColor: '#10b981',
    bgGradient: 'linear-gradient(180deg, #064e3b 0%, #047857 100%)',
    badge: '🌱',
    nodes: [
      {
        id: 'd1_s1',
        code: '1.1',
        title: 'Kenali Nombor & Nilai Tempat',
        topic: 'Nombor Bulat Hingga 100',
        desc: 'Nilai tempat Puluh & Sa, susunan menaik/menurun & perbandingan nombor.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd1_s2',
        code: '1.2',
        title: 'Tambah Pantas & Kumpul Semula',
        topic: 'Operasi Tambah Dalam Lingkungan 100',
        desc: 'Tambah dua nombor tanpa dan dengan mengumpul semula.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd1_s3',
        code: '1.3',
        title: 'Tolak & Pinjam Puluh',
        topic: 'Operasi Tolak Dalam Lingkungan 100',
        desc: 'Tolak nombor bulat dan penyelesaian masalah mudah.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd1_s4',
        code: '1.4',
        title: 'Tabung Duit & Jam Dinding',
        topic: 'Wang (RM & Sen) serta Masa & Waktu',
        desc: 'Kira nilai syiling/wang kertas hingga RM10 dan baca waktu jam/setengah/suku.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd1_boss',
        code: 'UJIAN 1',
        title: 'BOSS DARJAH 1: Ujian Naik Darjah 2',
        topic: 'Penilaian Menyeluruh Silibus Darjah 1',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Pulau Darjah 2!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 2,
    title: 'Darjah 2: Pulau Sifir & Ribu',
    subtitle: 'Nombor Hingga 1,000, Sifir Asas (2, 3, 4, 5, 10), Bahagi & Pecahan',
    themeColor: '#0ea5e9',
    bgGradient: 'linear-gradient(180deg, #0c4a6e 0%, #0284c7 100%)',
    badge: '⚓',
    nodes: [
      {
        id: 'd2_s1',
        code: '2.1',
        title: 'Ratus, Puluh & Cerakinan',
        topic: 'Nombor Bulat Hingga 1,000',
        desc: 'Nilai tempat Ratus, Puluh, Sa, cerakinan & pembundaran kepada puluh/ratus terdekat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd2_s2',
        code: '2.2',
        title: 'Tambah & Tolak Hingga 1,000',
        topic: 'Operasi Tambah & Tolak',
        desc: 'Tambah dan tolak melibatkan tiga digit serta cari nilai anu.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd2_s3',
        code: '2.3',
        title: 'Cabaran Sifir 2, 3, 4, 5 & 10',
        topic: 'Operasi Darab & Bahagi Asas',
        desc: 'Kemahiran sifir teras dan bahagi tepat sebagai songsangan darab.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd2_s4',
        code: '2.4',
        title: 'Pecahan Wajar & Wang RM100',
        topic: 'Pecahan, Perpuluhan & Wang Hingga RM100',
        desc: 'Kenali pecahan wajar, tukar pecahan persepuluh kepada perpuluhan & kira baki wang.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd2_boss',
        code: 'UJIAN 2',
        title: 'BOSS DARJAH 2: Ujian Naik Darjah 3',
        topic: 'Penilaian Menyeluruh Silibus Darjah 2',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Pulau Darjah 3!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 3,
    title: 'Darjah 3: Hutan Sifir Lengkap',
    subtitle: 'Nombor Hingga 10,000, Sifir 6-9, Pecahan Setara & Ukuran',
    themeColor: '#f59e0b',
    bgGradient: 'linear-gradient(180deg, #78350f 0%, #d97706 100%)',
    badge: '🦁',
    nodes: [
      {
        id: 'd3_s1',
        code: '3.1',
        title: 'Ribuan & Bundar 10,000',
        topic: 'Nombor Bulat Hingga 10,000',
        desc: 'Nilai digit, pola nombor, serta tambah dan tolak hingga 10,000.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd3_s2',
        code: '3.2',
        title: 'Pahlawan Sifir 6, 7, 8 & 9',
        topic: 'Darab & Bahagi (Termasuk Sifir 6 hingga 9)',
        desc: 'Kuasai sifir 6, 7, 8, 9 serta darab/bahagi nombor dua digit dengan satu digit.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd3_s3',
        code: '3.3',
        title: 'Pecahan Termudah & Peratus',
        topic: 'Pecahan, Perpuluhan & Peratus (Perseratus)',
        desc: 'Pecahan setara, bentuk termudah, tambah/tolak pecahan & peratus daripada 100.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd3_s4',
        code: '3.4',
        title: 'Ukuran m/cm, kg/g & l/ml',
        topic: 'Panjang, Jisim, Isi Padu Cecair & Masa',
        desc: 'Penukaran unit asas (1 m = 100 cm, 1 kg = 1000 g, 1 jam = 60 minit).',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd3_boss',
        code: 'UJIAN 3',
        title: 'BOSS DARJAH 3: Ujian Naik Darjah 4',
        topic: 'Penilaian Menyeluruh Silibus Darjah 3',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk melangkah ke Tahap II (Darjah 4)!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 4,
    title: 'Darjah 4: Kota Tahap II (10 Tahun)',
    subtitle: 'Nombor 100,000, Operasi Bergabung, Nombor Bercampur, Luas & Isi Padu',
    themeColor: '#8b5cf6',
    bgGradient: 'linear-gradient(180deg, #3b0764 0%, #6d28d9 100%)',
    badge: '🏰',
    nodes: [
      {
        id: 'd4_s1',
        code: '4.1',
        title: '100,000 & Operasi Bergabung',
        topic: 'Nombor Hingga 100,000, Genap/Ganjil & Operasi Bergabung',
        desc: 'Bundar kepada puluh ribu terdekat, tambah/tolak dan darab/bahagi bergabung.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd4_s2',
        code: '4.2',
        title: 'Nombor Bercampur & Peratus',
        topic: 'Pecahan Tak Wajar, Nombor Bercampur, Perpuluhan & Peratus',
        desc: 'Tukar pecahan tak wajar <-> nombor bercampur, pecahan daripada suatu kuantiti.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd4_s3',
        code: '4.3',
        title: 'Sistem 24-Jam & Wang RM100k',
        topic: 'Masa (Sistem 24-Jam, Tempoh) & Pengurusan Wang',
        desc: 'Tukar waktu 12-jam kepada sistem 24-jam, kira tempoh masa & bajet kewangan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd4_s4',
        code: '4.4',
        title: 'Perimeter, Luas & Isi Padu',
        topic: 'Ruang (Perimeter, Luas, Isi Padu Kuboid) & Kadaran',
        desc: 'Kira perimeter, luas segi empat/segi tiga, isi padu kubus/kuboid & kaedah unitari.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd4_boss',
        code: 'UJIAN 4',
        title: 'BOSS DARJAH 4: Ujian Naik Darjah 5',
        topic: 'Penilaian Menyeluruh UASA Darjah 4',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Pulau Darjah 5!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 5,
    title: 'Darjah 5: Menara Pintar UASA',
    subtitle: 'Nombor 1,000,000, Nombor Perdana, BODMAS, Untung/Rugi & Data',
    themeColor: '#ec4899',
    bgGradient: 'linear-gradient(180deg, #831843 0%, #db2777 100%)',
    badge: '🚀',
    nodes: [
      {
        id: 'd5_s1',
        code: '5.1',
        title: 'Nombor Perdana & Tertib BODMAS',
        topic: 'Nombor Hingga 1,000,000, Nombor Perdana & Operasi Bergabung',
        desc: 'Kenal pasti nombor perdana (2 hingga 100) & selesaikan operasi bergabung melibatkan kurungan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd5_s2',
        code: '5.2',
        title: 'Darab Pecahan & Peratusan',
        topic: 'Pecahan, Perpuluhan & Peratus Lanjutan',
        desc: 'Darab pecahan, peratus melebihi 100%, serta perubahan peratusan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd5_s3',
        code: '5.3',
        title: 'Untung, Rugi, Diskaun & Unit',
        topic: 'Wang (Untung/Rugi/Diskaun) & Penukaran Unit Perpuluhan',
        desc: 'Kira untung, rugi, harga selepas diskaun, serta penukaran km/m, kg/g dalam perpuluhan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd5_s4',
        code: '5.4',
        title: 'Nisbah, Min, Mod, Median & Julat',
        topic: 'Nisbah, Kadaran & Pengurusan Data',
        desc: 'Permudahkan nisbah, cari nilai kadaran serta hitung Min (Purata), Mod, Median dan Julat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd5_boss',
        code: 'UJIAN 5',
        title: 'BOSS DARJAH 5: Ujian Naik Darjah 6',
        topic: 'Penilaian Menyeluruh UASA Darjah 5',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk mara ke Puncak Darjah 6!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 6,
    title: 'Darjah 6: Puncak Juara UASA (12 Tahun)',
    subtitle: 'Pecahan/Perpuluhan Juta, Kewangan Pintar, Zon Masa, Nisbah & Kebolehjadian',
    themeColor: '#ef4444',
    bgGradient: 'linear-gradient(180deg, #450a0a 0%, #b91c1c 100%)',
    badge: '👑',
    nodes: [
      {
        id: 'd6_s1',
        code: '6.1',
        title: 'Pecahan Juta & Perpuluhan Juta',
        topic: 'Nombor Hingga 10 Juta, Nombor Gubahan/Perdana & Penukaran Juta',
        desc: 'Tukar perpuluhan juta & pecahan juta (1/2 juta, 1/4 juta, 3/4 juta, 1/5 juta, 1/8 juta) kepada nombor bulat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd6_s2',
        code: '6.2',
        title: 'Bahagi Pecahan & Peratusan UASA',
        topic: 'Operasi Pecahan, Perpuluhan & Peratus Darjah 6',
        desc: 'Bahagi pecahan dengan nombor bulat/pecahan, serta penyelesaian masalah peratusan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd6_s3',
        code: '6.3',
        title: 'Bijak Kewangan: Kos, Cukai & Rebat',
        topic: 'Harga Kos, Harga Jual, % Untung/Rugi, Diskaun, Rebat & Cukai Perkhidmatan',
        desc: 'Soalan aplikasi kewangan sebenar: peratus untung, rebat baucar & cukai perkhidmatan 6% / 8%.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd6_s4',
        code: '6.4',
        title: 'Zon Masa Dunia, Nisbah & Ruang',
        topic: 'Beza Zon Masa, Nisbah Sebahagian-Keseluruhan, Sudut & Kebolehjadian',
        desc: 'Kira waktu tempatan antara dua negara, nisbah selepas perubahan, dan kebolehjadian peristiwa.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 'd6_boss',
        code: 'UJIAN 6',
        title: 'BOSS AKHIR DARJAH 6: Juara UASA Matematik!',
        topic: 'Penilaian Akhir Komprehensif Silibus Sekolah Rendah KSSR',
        desc: 'Tewaskan Boss Terakhir dengan markah ≥80% untuk dinobatkan sebagai Juara Matematik KSSR!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  }
];

// ============================================================================
// PENJANA SOALAN MENGIKUT STESEN (DENGAN PENERANGAN LANGKAH DEMI LANGKAH)
// ============================================================================

const Generators = {
  // ---------------- DARJAH 1 ----------------
  d1_s1: () => {
    const type = randInt(1, 4);
    if (type === 1) {
      const tens = randInt(1, 9);
      const ones = randInt(0, 9);
      const num = tens * 10 + ones;
      const askTens = Math.random() < 0.5;
      if (askTens) {
        return {
          topic: 'Nilai Tempat & Nilai Digit (Darjah 1)',
          inputMode: 'mcq',
          prompt: `Apakah **nilai digit** bagi angka **${tens}** dalam nombor **${num}**?`,
          hint: `Dalam nombor ${num}, angka ${tens} berada di rumah Puluh (${tens} puluh = ${tens * 10}).`,
          explanation: `Nombor **${num}** mempunyai **${tens} puluh** dan **${ones} sa**.\nMaka, nilai digit bagi ${tens} ialah **${tens * 10}**.`,
          ...makeOptions(tens * 10, [tens, ones, num, tens * 10 + 10])
        };
      } else {
        return {
          topic: 'Nilai Tempat (Darjah 1)',
          inputMode: 'mcq',
          prompt: `Apakah **nilai tempat** bagi digit **${ones}** dalam nombor **${num}**?`,
          hint: `Digit paling kanan ialah rumah Sa, manakala di sebelahnya ialah rumah Puluh.`,
          explanation: `Dalam nombor **${num}**, digit **${tens}** ialah **Puluh** dan digit **${ones}** ialah **Sa**.`,
          answer: 'Sa',
          options: shuffle(['Sa', 'Puluh', 'Ratus', 'Ribu'])
        };
      }
    } else if (type === 2) {
      const start = randInt(15, 75);
      const step = pick([1, 2, 5, 10]);
      const seq = [start, start + step, start + step * 2, start + step * 3];
      return {
        topic: 'Susunan Nombor Menaik (Darjah 1)',
        inputMode: 'numpad',
        prompt: `Lengkapkan urutan nombor berikut:\n**${seq[0]}, ${seq[1]}, ${seq[2]}, [ ? ]**`,
        hint: `Setiap nombor bertambah sebanyak ${step}. Tambahkan ${step} kepada ${seq[2]}.`,
        explanation: `Pola nombor ini ialah **menambah ${step}** setiap langkah:\n${seq[0]} + ${step} = ${seq[1]}\n${seq[1]} + ${step} = ${seq[2]}\n${seq[2]} + ${step} = **${seq[3]}**.`,
        ...makeOptions(seq[3], [seq[3] + step, seq[3] - 1, seq[2] + 1])
      };
    } else if (type === 3) {
      const a = randInt(21, 98);
      return {
        topic: 'Nombor Sebelum & Selepas (Darjah 1)',
        inputMode: 'numpad',
        prompt: `Apakah nombor yang terletak **di antara ${a - 1} dan ${a + 1}**?`,
        hint: `Kira menaik satu-satu bermula daripada ${a - 1}.`,
        explanation: `Susunan menaik ialah **${a - 1}, ${a}, ${a + 1}**. Jadi nombor di tengah ialah **${a}**.`,
        ...makeOptions(a, [a - 2, a + 2, a + 10])
      };
    } else {
      const tens = randInt(2, 9);
      const ones = randInt(1, 9);
      const ans = tens * 10 + ones;
      return {
        topic: 'Cerakin Nilai Tempat (Darjah 1)',
        inputMode: 'numpad',
        prompt: `**${tens} puluh + ${ones} sa** bersamaan dengan nombor berapa?`,
        hint: `${tens} puluh ialah ${tens * 10}. Tambahkan dengan ${ones}.`,
        explanation: `${tens} puluh = ${tens * 10}\n${ones} sa = ${ones}\n${tens * 10} + ${ones} = **${ans}**.`,
        ...makeOptions(ans, [ones * 10 + tens, tens + ones, ans + 10])
      };
    }
  },

  d1_s2: () => {
    const isWord = Math.random() < 0.45;
    const a = randInt(14, 58);
    const b = randInt(8, 39);
    const sum = a + b;
    if (!isWord) {
      return {
        topic: 'Operasi Tambah (Darjah 1)',
        inputMode: 'numpad',
        prompt: `Selesaikan operasi tambah berikut:\n**${a} + ${b} = ?**`,
        hint: `Tambah rumah Sa dahulu: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}. Jika lebih 10, kumpul semula 1 puluh ke rumah Puluh.`,
        explanation: `Langkah kira bentuk lazim:\n1) Rumah Sa: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}\n2) Rumah Puluh: ${Math.floor(a / 10)}0 + ${Math.floor(b / 10)}0 = ${(Math.floor(a / 10) + Math.floor(b / 10)) * 10}\nJumlah keseluruhan: ${a} + ${b} = **${sum}**.`,
        ...makeOptions(sum, [sum + 10, sum - 10, sum + 1, Math.abs(a - b)])
      };
    } else {
      const name = pick(NAMES);
      const item = pick(ITEMS);
      return {
        topic: 'Penyelesaian Masalah Tambah (Darjah 1)',
        inputMode: 'mcq',
        prompt: `${name} ada **${a} ${item.name}**. Ibu memberinya **${b} ${item.name}** lagi.\nBerapakah jumlah ${item.singular} ${name} kesemuanya?`,
        hint: `Kata kunci "jumlah kesemuanya" bermaksud operasi TAMBAH (+). Kira ${a} + ${b}.`,
        explanation: `Operasi: **${a} + ${b}**\nRumah Sa: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}\nRumah Puluh: ${Math.floor(a / 10) * 10} + ${Math.floor(b / 10) * 10} = ${(Math.floor(a / 10) + Math.floor(b / 10)) * 10}\nJumlah = **${sum}**.`,
        ...makeOptions(sum, [sum + 10, sum - 2, a - b > 0 ? a - b : sum + 5])
      };
    }
  },

  d1_s3: () => {
    const a = randInt(35, 95);
    const b = randInt(9, a - 8);
    const diff = a - b;
    const isWord = Math.random() < 0.45;
    if (!isWord) {
      return {
        topic: 'Operasi Tolak (Darjah 1)',
        inputMode: 'numpad',
        prompt: `Berapakah baki bagi penolakan ini?\n**${a} − ${b} = ?**`,
        hint: a % 10 < b % 10
          ? `Digit Sa (${a % 10}) lebih kecil daripada ${b % 10}. Pinjam 1 puluh daripada ${Math.floor(a / 10)} puluh supaya rumah Sa menjadi ${(a % 10) + 10}.`
          : `Tolak rumah Sa (${a % 10} - ${b % 10}), kemudian tolak rumah Puluh.`,
        explanation: a % 10 < b % 10
          ? `Kerana ${a % 10} tidak cukup untuk tolak ${b % 10}, kita kumpul semula 1 puluh:\n• Rumah Sa: ${(a % 10) + 10} − ${b % 10} = ${(a % 10) + 10 - (b % 10)}\n• Rumah Puluh: ${Math.floor(a / 10) - 1} puluh − ${Math.floor(b / 10)} puluh = ${Math.floor(a / 10) - 1 - Math.floor(b / 10)} puluh\nJawapan = **${diff}**.`
          : `• Rumah Sa: ${a % 10} − ${b % 10} = ${(a % 10) - (b % 10)}\n• Rumah Puluh: ${Math.floor(a / 10)} − ${Math.floor(b / 10)} = ${Math.floor(a / 10) - Math.floor(b / 10)} puluh\nJawapan = **${diff}**.`,
        ...makeOptions(diff, [diff + 10, diff - 10, diff + 2, a + b])
      };
    } else {
      const name = pick(NAMES);
      const item = pick(ITEMS);
      return {
        topic: 'Penyelesaian Masalah Tolak (Darjah 1)',
        inputMode: 'mcq',
        prompt: `Di dalam sebuah bakul ada **${a} ${item.name}**. **${name}** mengambil **${b} ${item.name}** daripadanya.\nBerapakah **baki** ${item.singular} yang tinggal?`,
        hint: `Kata kunci "baki yang tinggal" bermaksud operasi TOLAK (−). Kira ${a} − ${b}.`,
        explanation: `Operasi: **${a} − ${b} = ${diff}**.\nJadi, baki yang tinggal ialah **${diff}**.`,
        ...makeOptions(diff, [diff + 10, Math.abs(diff - 10), diff + 4, a + b])
      };
    }
  },

  d1_s4: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const c50 = randInt(1, 3);
      const c20 = randInt(1, 3);
      const c10 = randInt(0, 2);
      const totalSen = c50 * 50 + c20 * 20 + c10 * 10;
      return {
        topic: 'Wang Syiling Malaysia (Darjah 1)',
        inputMode: 'numpad',
        prompt: `Kira jumlah nilai syiling berikut dalam **sen**:\n**${c50} keping 50 sen + ${c20} keping 20 sen${c10 ? ` + ${c10} keping 10 sen` : ''} = ? sen**`,
        hint: `${c50} × 50 sen = ${c50 * 50} sen. ${c20} × 20 sen = ${c20 * 20} sen. Tambahkan semuanya.`,
        explanation: `• ${c50} keping 50 sen = ${c50 * 50} sen\n• ${c20} keping 20 sen = ${c20 * 20} sen\n${c10 ? `• ${c10} keping 10 sen = ${c10 * 10} sen\n` : ''}Jumlah = **${totalSen} sen**.`,
        ...makeOptions(totalSen, [totalSen + 10, totalSen - 20, totalSen + 20])
      };
    } else if (type === 2) {
      const have = pick([5, 10]);
      const price = randInt(2, have - 1);
      const change = have - price;
      const name = pick(NAMES);
      return {
        topic: 'Wang Kertas RM (Darjah 1)',
        inputMode: 'mcq',
        prompt: `${name} membayar **RM${have}** untuk membeli sebungkus nasi lemak berharga **RM${price}**.\nBerapakah wang baki yang diterima oleh ${name}?`,
        hint: `Baki wang = Wang dibayar − Harga barang = RM${have} − RM${price}.`,
        explanation: `RM${have} − RM${price} = **RM${change}**.`,
        ...makeOptions(change, [change + 1, change + 2, have + price], (v) => `RM${v}`)
      };
    } else {
      const hour = randInt(1, 11);
      const subType = pick(['half', 'quarter']);
      if (subType === 'half') {
        return {
          topic: 'Masa & Waktu (Darjah 1)',
          inputMode: 'mcq',
          prompt: `Jarum pendek berada di antara **${hour}** dan **${hour + 1}**, manakala jarum panjang menunjuk tepat pada nombor **6**.\nApakah waktu tersebut?`,
          hint: `Apabila jarum panjang menunjuk nombor 6, ia bermaksud "setengah jam" (30 minit).`,
          explanation: `Jarum minit pada nombor 6 mewakili **setengah jam** selepas pukul ${hour}, iaitu **Setengah jam selepas pukul ${hour} (Pukul ${hour}:30)**.`,
          answer: `Pukul ${hour}:30 (Setengah jam selepas pukul ${hour})`,
          options: shuffle([
            `Pukul ${hour}:30 (Setengah jam selepas pukul ${hour})`,
            `Pukul ${hour}:15 (Suku jam selepas pukul ${hour})`,
            `Pukul ${hour}:00 tepat`,
            `Pukul 6:00 tepat`
          ])
        };
      } else {
        return {
          topic: 'Masa & Waktu (Darjah 1)',
          inputMode: 'mcq',
          prompt: `Jarum pendek menunjuk nombor **${hour}** dan jarum panjang menunjuk nombor **3**.\nBerapakah waktu yang ditunjukkan?`,
          hint: `Nombor 3 pada muka jam mewakili 15 minit atau "suku jam".`,
          explanation: `Apabila jarum panjang berada di nombor 3, ia ialah **15 minit (suku jam)**.\nJadi waktunya ialah **Pukul ${hour}:15 (Suku jam selepas pukul ${hour})**.`,
          answer: `Pukul ${hour}:15 (Suku jam selepas pukul ${hour})`,
          options: shuffle([
            `Pukul ${hour}:15 (Suku jam selepas pukul ${hour})`,
            `Pukul ${hour}:30 (Setengah jam selepas pukul ${hour})`,
            `Pukul ${hour}:45`,
            `Pukul 3:00 tepat`
          ])
        };
      }
    }
  },

  // ---------------- DARJAH 2 ----------------
  d2_s1: () => {
    const type = randInt(1, 3);
    const h = randInt(1, 9);
    const t = randInt(1, 9);
    const o = randInt(1, 9);
    const num = h * 100 + t * 10 + o;
    if (type === 1) {
      const roundTo100 = Math.round(num / 100) * 100;
      return {
        topic: 'Bundar Ratus Terdekat (Darjah 2)',
        inputMode: 'numpad',
        prompt: `Bundarkan nombor **${num}** kepada **ratus yang terdekat**.`,
        hint: `Lihat digit Puluh iaitu ${t}. Jika 5 atau lebih, tambah 1 pada rumah Ratus. Jika kurang daripada 5, kekalkan rumah Ratus dan jadikan puluh & sa kepada 00.`,
        explanation: `Dalam nombor **${num}**, digit Puluh ialah **${t}** (${t >= 5 ? '5 atau lebih, jadi bundar ke atas' : 'kurang daripada 5, jadi kekalkan ratus'}).\nMaka, ${num} dibundarkan kepada ratus terdekat menjadi **${roundTo100}**.`,
        ...makeOptions(roundTo100, [h * 100, (h + 1) * 100, Math.round(num / 10) * 10, num])
      };
    } else if (type === 2) {
      return {
        topic: 'Cerakinan Nilai Digit (Darjah 2)',
        inputMode: 'mcq',
        prompt: `Antara berikut, yang manakah **cerakinan nilai digit** yang betul bagi **${num}**?`,
        hint: `Pisahkan mengikut Ratus (${h * 100}), Puluh (${t * 10}), dan Sa (${o}).`,
        explanation: `**${num}** = **${h * 100} + ${t * 10} + ${o}**.`,
        answer: `${h * 100} + ${t * 10} + ${o}`,
        options: shuffle([
          `${h * 100} + ${t * 10} + ${o}`,
          `${h} + ${t} + ${o}`,
          `${h * 100} + ${o * 10} + ${t}`,
          `${h * 10} + ${t * 100} + ${o}`
        ])
      };
    } else {
      return {
        topic: 'Nilai Digit Ratus (Darjah 2)',
        inputMode: 'numpad',
        prompt: `Nyatakan **nilai digit** bagi angka **${h}** dalam nombor **${num}**.`,
        hint: `Angka ${h} berada di rumah Ratus.`,
        explanation: `Angka **${h}** berada di nilai tempat **Ratus**, maka nilai digitnya ialah **${h * 100}**.`,
        ...makeOptions(h * 100, [h * 10, h, t * 100])
      };
    }
  },

  d2_s2: () => {
    const isAdd = Math.random() < 0.5;
    if (isAdd) {
      const a = randInt(145, 589);
      const b = randInt(125, 385);
      const ans = a + b;
      return {
        topic: 'Tambah Hingga 1,000 (Darjah 2)',
        inputMode: 'numpad',
        prompt: `Hitung hasil tambah:\n**${a} + ${b} = ?**`,
        hint: `Susun mengikut bentuk lazim (Sa, Puluh, Ratus). Jangan lupa kumpul semula jika hasil tambah melebihi 9.`,
        explanation: `Kira dari kanan (Sa ke Ratus):\n• Sa: ${a % 10} + ${b % 10} = ${(a % 10) + (b % 10)}\n• Jumlah penuh: **${a} + ${b} = ${ans}**.`,
        ...makeOptions(ans, [ans + 10, ans - 10, ans + 100])
      };
    } else {
      const a = randInt(450, 960);
      const b = randInt(165, a - 50);
      const ans = a - b;
      return {
        topic: 'Tolak Hingga 1,000 (Darjah 2)',
        inputMode: 'numpad',
        prompt: `Selesaikan operasi tolak:\n**${a} − ${b} = ?**`,
        hint: `Tolak dari rumah Sa, diikuti Puluh dan Ratus. Gunakan Kertas Conteng di sebelah jika mahu menulis bentuk lazim!`,
        explanation: `Mengikut bentuk lazim:\n**${a} − ${b} = ${ans}**.`,
        ...makeOptions(ans, [ans + 10, ans - 10, ans + 100, ans - 20])
      };
    }
  },

  d2_s3: () => {
    const isMult = Math.random() < 0.55;
    const table = pick([2, 3, 4, 5, 10]);
    const factor = randInt(3, 9);
    const prod = table * factor;
    if (isMult) {
      return {
        topic: `Sifir ${table} (Darjah 2)`,
        inputMode: 'numpad',
        prompt: `Berapakah hasil darab berikut?\n**${factor} × ${table} = ?**`,
        hint: `${factor} kumpulan yang setiap satunya ada ${table} objek.`,
        explanation: `Mengikut Sifir ${table}:\n**${factor} × ${table} = ${prod}**.`,
        ...makeOptions(prod, [prod + table, prod - table, factor + table])
      };
    } else {
      const name = pick(NAMES);
      return {
        topic: `Operasi Bahagi Sifir ${table} (Darjah 2)`,
        inputMode: 'numpad',
        prompt: `${name} mengagihkan **${prod} biji gula-gula** secara sama banyak kepada **${table} orang rakannya**.\nBerapakah biji gula-gula yang setiap rakan dapat?`,
        hint: `Operasi bahagi: ${prod} ÷ ${table}. Fikirkan: (? × ${table} = ${prod}).`,
        explanation: `Operasi: **${prod} ÷ ${table}**\nKerana **${factor} × ${table} = ${prod}**, maka setiap rakan mendapat **${factor}** biji gula-gula.`,
        ...makeOptions(factor, [factor + 1, factor - 1, factor + 2, prod - table])
      };
    }
  },

  d2_s4: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const n = randInt(1, 9);
      const ans = `0.${n}`;
      return {
        topic: 'Pecahan Persepuluh & Perpuluhan (Darjah 2)',
        inputMode: 'mcq',
        prompt: `Tukarkan pecahan **${n}/10** kepada nombor **perpuluhan**.`,
        hint: `Pecahan persepuluh (/10) mempunyai satu tempat selepas titik perpuluhan.`,
        explanation: `**${n}/10** dalam bentuk perpuluhan ialah **0.${n}**.`,
        answer: ans,
        options: shuffle([`0.${n}`, `${n}.0`, `0.0${n}`, `1.${n}`])
      };
    } else if (type === 2) {
      const d1 = pick([2, 3, 4]);
      const d2 = randInt(d1 + 1, 9);
      return {
        topic: 'Bandingkan Pecahan (Darjah 2)',
        inputMode: 'mcq',
        prompt: `Antara pecahan **1/${d1}** dan **1/${d2}**, yang manakah **lebih besar**?`,
        hint: `Bayangkan sebiji kek: dipotong kepada ${d1} bahagian berbanding dipotong kepada ${d2} bahagian. Potongan mana lebih besar saiznya?`,
        explanation: `Bagi pecahan pengangka 1, **semakin kecil penyebutnya, semakin besar saiz bahagian itu**.\nJadi **1/${d1}** lebih besar daripada 1/${d2}.`,
        answer: `1/${d1}`,
        options: shuffle([`1/${d1}`, `1/${d2}`, 'Kedua-duanya sama besar', `${d1}/${d2}`])
      };
    } else {
      const total = pick([50, 100]);
      const b1 = randInt(12, 24);
      const b2 = randInt(11, 20);
      const left = total - (b1 + b2);
      const name = pick(NAMES);
      return {
        topic: 'Wang Hingga RM100 (Darjah 2)',
        inputMode: 'numpad',
        prompt: `${name} membawa **RM${total}** ke kedai buku. Dia membeli sebuah kamus berharga **RM${b1}** dan sebuah kotak warna berharga **RM${b2}**.\nBerapakah baki wangnya (RM)?`,
        hint: `Jumlah belanja = RM${b1} + RM${b2} = RM${b1 + b2}. Kemudian tolak daripada RM${total}.`,
        explanation: `1) Jumlah harga barang: RM${b1} + RM${b2} = **RM${b1 + b2}**\n2) Baki wang: RM${total} − RM${b1 + b2} = **RM${left}**.`,
        ...makeOptions(left, [left + 10, left - 5, b1 + b2])
      };
    }
  },

  // ---------------- DARJAH 3 ----------------
  d3_s1: () => {
    const type = randInt(1, 3);
    const th = randInt(1, 9);
    const h = randInt(0, 9);
    const t = randInt(1, 9);
    const o = randInt(1, 9);
    const num = th * 1000 + h * 100 + t * 10 + o;
    if (type === 1) {
      const rounded = Math.round(num / 1000) * 1000;
      return {
        topic: 'Bundar Ribu Terdekat (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Bundarkan **${num.toLocaleString('en-US')}** kepada **ribu yang terdekat**.`,
        hint: `Perhatikan digit Ratus (${h}). Jika 5 atau lebih, tambah 1 kepada rumah Ribu (${th}).`,
        explanation: `Digit Ratus bagi **${num}** ialah **${h}** (${h >= 5 ? '≥ 5, bundar ke atas' : '< 5, kekalkan ribu'}).\nMaka jawapannya ialah **${rounded}**.`,
        ...makeOptions(rounded, [th * 1000, (th + 1) * 1000, Math.round(num / 100) * 100])
      };
    } else if (type === 2) {
      const a = randInt(2350, 5800);
      const b = randInt(1450, 3400);
      const sum = a + b;
      return {
        topic: 'Tambah Hingga 10,000 (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Hitung:\n**${a} + ${b} = ?**`,
        hint: `Susun bentuk lazim dari rumah Sa hingga Ribu. Gunakan Kertas Conteng jika perlu!`,
        explanation: `**${a} + ${b} = ${sum}**.`,
        ...makeOptions(sum, [sum + 100, sum - 100, sum + 10])
      };
    } else {
      const a = randInt(5200, 9400);
      const b = randInt(1650, 4800);
      const diff = a - b;
      return {
        topic: 'Tolak Hingga 10,000 (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Hitung beza antara dua nombor ini:\n**${a} − ${b} = ?**`,
        hint: `Kata kunci "beza" bermaksud operasi tolak.`,
        explanation: `**${a} − ${b} = ${diff}**.`,
        ...makeOptions(diff, [diff + 100, diff - 100, diff + 10])
      };
    }
  },

  d3_s2: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const a = randInt(6, 9);
      const b = randInt(6, 9);
      const ans = a * b;
      return {
        topic: 'Sifir 6, 7, 8 & 9 (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Ujian Pantas Sifir:\n**${a} × ${b} = ?**`,
        hint: `Ingat sifir ${a}: ${a} × ${b - 1} = ${a * (b - 1)}, kemudian tambah ${a} lagi.`,
        explanation: `Daripada sifir ${a}:\n**${a} × ${b} = ${ans}**.`,
        ...makeOptions(ans, [ans + a, ans - b, ans + 2, (a - 1) * b])
      };
    } else if (type === 2) {
      const a = randInt(13, 34);
      const b = randInt(3, 7);
      const ans = a * b;
      return {
        topic: 'Darab Dua Digit (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Kira hasil darab:\n**${a} × ${b} = ?**`,
        hint: `Pisahkan ${a} kepada (${Math.floor(a / 10) * 10} + ${a % 10}), kemudian darab kedua-duanya dengan ${b}.`,
        explanation: `• ${Math.floor(a / 10) * 10} × ${b} = ${Math.floor(a / 10) * 10 * b}\n• ${a % 10} × ${b} = ${(a % 10) * b}\nJumlah = ${Math.floor(a / 10) * 10 * b} + ${(a % 10) * b} = **${ans}**.`,
        ...makeOptions(ans, [ans + 10, ans - b, ans + b])
      };
    } else {
      const div = randInt(4, 9);
      const quot = randInt(12, 28);
      const total = div * quot;
      return {
        topic: 'Operasi Bahagi (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Selesaikan operasi bahagi berikut:\n**${total} ÷ ${div} = ?**`,
        hint: `Bahagikan rumah Puluh dahulu, kemudian bawa baki ke rumah Sa.`,
        explanation: `Semakan songsang: **${quot} × ${div} = ${total}**.\nJadi **${total} ÷ ${div} = ${quot}**.`,
        ...makeOptions(quot, [quot + 1, quot - 1, quot + 10])
      };
    }
  },

  d3_s3: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const pairs = [
        { raw: '2/4', simp: '1/2', factor: 2 },
        { raw: '3/6', simp: '1/2', factor: 3 },
        { raw: '2/6', simp: '1/3', factor: 2 },
        { raw: '3/9', simp: '1/3', factor: 3 },
        { raw: '4/8', simp: '1/2', factor: 4 },
        { raw: '6/8', simp: '3/4', factor: 2 },
        { raw: '4/10', simp: '2/5', factor: 2 },
        { raw: '6/10', simp: '3/5', factor: 2 }
      ];
      const item = pick(pairs);
      return {
        topic: 'Pecahan Bentuk Termudah (Darjah 3)',
        inputMode: 'mcq',
        prompt: `Permudahkan pecahan **${item.raw}** kepada **bentuk termudah**.`,
        hint: `Bahagikan pengangka (atas) dan penyebut (bawah) dengan sifir ${item.factor}.`,
        explanation: `Bahagikan pengangka dan penyebut bagi **${item.raw}** dengan **${item.factor}**:\nJawapan = **${item.simp}**.`,
        answer: item.simp,
        options: shuffle([item.simp, '1/4', '2/3', '3/8', '1/5'].filter((v, idx, a) => a.indexOf(v) === idx).slice(0, 4))
      };
    } else if (type === 2) {
      const p = randInt(15, 85);
      return {
        topic: 'Peratus & Perpuluhan (Darjah 3)',
        inputMode: 'mcq',
        prompt: `Tukarkan **${p}%** kepada nombor **perpuluhan**.`,
        hint: `${p}% bermaksud ${p}/100 (perseratus), iaitu dua tempat perpuluhan.`,
        explanation: `**${p}% = ${p}/100 = 0.${p}**.`,
        answer: `0.${p}`,
        options: shuffle([`0.${p}`, `${p / 10}`, `0.0${p}`, `${p}.0`])
      };
    } else {
      // Tambah pecahan penyebut tak sama mudah
      const q = pick([
        { q: '1/2 + 1/4', hint: 'Samakan penyebut: 1/2 = 2/4. Kemudian 2/4 + 1/4.', ans: '3/4', exp: '1/2 = 2/4.\nMaka 2/4 + 1/4 = **3/4**.' },
        { q: '1/3 + 1/6', hint: 'Samakan penyebut: 1/3 = 2/6. Kemudian 2/6 + 1/6 = 3/6 = 1/2.', ans: '3/6 (atau 1/2)', exp: '1/3 = 2/6.\n2/6 + 1/6 = **3/6 (atau 1/2)**.' },
        { q: '3/4 − 1/2', hint: 'Samakan penyebut: 1/2 = 2/4. Kemudian 3/4 − 2/4.', ans: '1/4', exp: '1/2 = 2/4.\n3/4 − 2/4 = **1/4**.' },
        { q: '4/5 − 3/10', hint: 'Samakan penyebut: 4/5 = 8/10. Kemudian 8/10 − 3/10.', ans: '5/10 (atau 1/2)', exp: '4/5 = 8/10.\n8/10 − 3/10 = **5/10 (atau 1/2)**.' }
      ]);
      return {
        topic: 'Tambah & Tolak Pecahan (Darjah 3)',
        inputMode: 'mcq',
        prompt: `Selesaikan operasi pecahan berikut:\n**${q.q} = ?**`,
        hint: q.hint,
        explanation: q.exp,
        answer: q.ans,
        options: shuffle([q.ans, '2/6', '1/8', '4/9'])
      };
    }
  },

  d3_s4: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const m = randInt(2, 9);
      const cm = randInt(15, 85);
      const ans = m * 100 + cm;
      return {
        topic: 'Penukaran Unit Panjang (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Tukarkan **${m} m ${cm} cm** kepada unit **cm**.`,
        hint: `Ingat formula: 1 m = 100 cm. Jadi ${m} m = ${m * 100} cm.`,
        explanation: `1 m = 100 cm\n${m} m = ${m * 100} cm\n${m * 100} cm + ${cm} cm = **${ans} cm**.`,
        ...makeOptions(ans, [m * 10 + cm, ans + 100, m + cm])
      };
    } else if (type === 2) {
      const kg = randInt(1, 6);
      const g = randInt(1, 9) * 100 + randInt(0, 1) * 50;
      const ans = kg * 1000 + g;
      return {
        topic: 'Penukaran Unit Jisim (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Tukarkan **${kg} kg ${g} g** kepada unit **gram (g)**.`,
        hint: `Ingat: 1 kg = 1,000 g.`,
        explanation: `1 kg = 1,000 g\n${kg} kg = ${kg * 1000} g\n${kg * 1000} g + ${g} g = **${ans} g**.`,
        ...makeOptions(ans, [kg * 100 + g, ans + 1000, kg + g])
      };
    } else {
      const h = randInt(2, 5);
      const m = randInt(10, 45);
      const ans = h * 60 + m;
      return {
        topic: 'Penukaran Masa (Darjah 3)',
        inputMode: 'numpad',
        prompt: `Tukarkan **${h} jam ${m} minit** kepada **minit**.`,
        hint: `1 jam = 60 minit. Darabkan ${h} dengan 60, kemudian tambah ${m}.`,
        explanation: `1 jam = 60 minit\n${h} jam = ${h} × 60 = ${h * 60} minit\n${h * 60} + ${m} = **${ans} minit**.`,
        ...makeOptions(ans, [h * 100 + m, ans + 60, (h - 1) * 60 + m])
      };
    }
  },

  // ---------------- DARJAH 4 (SASARAN ANAK 10 TAHUN) ----------------
  d4_s1: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const num = randInt(12, 94) * 1000 + randInt(120, 890);
      const rounded = Math.round(num / 10000) * 10000;
      return {
        topic: 'Nombor Hingga 100,000 (Darjah 4)',
        inputMode: 'mcq',
        prompt: `Bundarkan **${num.toLocaleString('en-US')}** kepada **puluh ribu yang terdekat**.`,
        hint: `Lihat digit pada rumah Ribu. Jika 5 atau lebih, tambah 1 kepada rumah Puluh Ribu.`,
        explanation: `Nombor **${num.toLocaleString('en-US')}** apabila dibundarkan kepada puluh ribu terdekat menjadi **${rounded.toLocaleString('en-US')}**.`,
        ...makeOptions(rounded, [rounded + 10000, Math.max(10000, rounded - 10000), Math.round(num / 1000) * 1000], (v) => v.toLocaleString('en-US'))
      };
    } else if (type === 2) {
      const a = randInt(40, 95);
      const b = randInt(15, 35);
      const c = randInt(18, 45);
      const ans = a - b + c;
      return {
        topic: 'Operasi Bergabung Tambah & Tolak (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Selesaikan operasi bergabung berikut:\n**${a} − ${b} + ${c} = ?**`,
        hint: `Bagi operasi tambah dan tolak, kira mengikut urutan dari KIRI ke KANAN: (${a} − ${b}) dahulu, kemudian tambah ${c}.`,
        explanation: `1) Kira dari kiri: ${a} − ${b} = ${a - b}\n2) Kemudian tambah ${c}: ${a - b} + ${c} = **${ans}**.`,
        ...makeOptions(ans, [a - (b + c), ans + 10, ans - 5])
      };
    } else {
      const div = randInt(3, 8);
      const q = randInt(6, 15);
      const first = div * q;
      const mult = randInt(3, 6);
      const ans = q * mult;
      return {
        topic: 'Operasi Bergabung Darab & Bahagi (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Selesaikan:\n**${first} ÷ ${div} × ${mult} = ?**`,
        hint: `Kira dari kiri ke kanan: (${first} ÷ ${div} = ${q}), kemudian darabkan dengan ${mult}.`,
        explanation: `1) ${first} ÷ ${div} = ${q}\n2) ${q} × ${mult} = **${ans}**.`,
        ...makeOptions(ans, [ans + mult, first, q + mult])
      };
    }
  },

  d4_s2: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const whole = randInt(1, 4);
      const den = pick([3, 4, 5, 7, 8]);
      const num = randInt(1, den - 1);
      const impNum = whole * den + num;
      return {
        topic: 'Nombor Bercampur & Pecahan Tak Wajar (Darjah 4)',
        inputMode: 'mcq',
        prompt: `Tukarkan nombor bercampur **${whole} ${num}/${den}** kepada **pecahan tak wajar**.`,
        hint: `Formula "Darab Bawah, Tambah Atas": (${whole} × ${den}) + ${num}, kekalkan penyebut /${den}.`,
        explanation: `Langkah kira:\n1) Darab nombor bulat dengan penyebut: ${whole} × ${den} = ${whole * den}\n2) Tambah pengangka: ${whole * den} + ${num} = ${impNum}\nJawapan = **${impNum}/${den}**.`,
        answer: `${impNum}/${den}`,
        options: shuffle([
          `${impNum}/${den}`,
          `${whole + num}/${den}`,
          `${whole * num + den}/${den}`,
          `${impNum + den}/${den}`
        ])
      };
    } else if (type === 2) {
      const den = pick([4, 5, 6, 8]);
      const num = randInt(1, den - 1);
      const mult = randInt(4, 12);
      const total = den * mult;
      const ans = num * mult;
      return {
        topic: 'Pecahan Daripada Suatu Kuantiti (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Hitung nilai bagi:\n**${num}/${den} daripada ${total}**`,
        hint: `Bahagikan ${total} dengan penyebut (${den}), kemudian darabkan hasilnya dengan pengangka (${num}).`,
        explanation: `1) Bahagi dengan penyebut: ${total} ÷ ${den} = ${mult}\n2) Darab dengan pengangka: ${mult} × ${num} = **${ans}**.`,
        ...makeOptions(ans, [mult, ans + mult, total - ans])
      };
    } else {
      const pct = pick([20, 25, 40, 50, 75]);
      const total = pick([40, 60, 80, 120, 200]);
      const ans = (pct * total) / 100;
      return {
        topic: 'Peratus Daripada Kuantiti (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Berapakah **${pct}% daripada ${total}**?`,
        hint: `${pct}% = ${pct}/100. Kira (${pct} × ${total}) ÷ 100.`,
        explanation: `(${pct} / 100) × ${total} = ${pct * total} ÷ 100 = **${ans}**.`,
        ...makeOptions(ans, [ans + 10, ans / 2, total - ans])
      };
    }
  },

  d4_s3: () => {
    const type = randInt(1, 2);
    if (type === 1) {
      const h12 = randInt(1, 10);
      const min = pick([15, 20, 30, 45]);
      const h24 = h12 + 12;
      const str24 = `Jam ${h24}${min}`;
      return {
        topic: 'Sistem 24-Jam (Darjah 4)',
        inputMode: 'mcq',
        prompt: `Tukarkan waktu **${h12}:${min} petang/malam (p.m.)** kepada **sistem 24-jam**.`,
        hint: `Bagi waktu selepas 12:00 tengah hari (p.m.), tambahkan 12 kepada jam (${h12} + 12 = ${h24}) dan tulis dalam 4 digit.`,
        explanation: `Waktu p.m. ditambah 12 jam:\n${h12} + 12 = ${h24}.\nDalam sistem 24-jam ditulis sebagai **${str24}**.`,
        answer: str24,
        options: shuffle([
          str24,
          `Jam 0${h12}${min}`,
          `Jam ${h24 - 2}${min}`,
          `Jam ${h12 + 10}${min}`
        ])
      };
    } else {
      const startH = randInt(8, 10);
      const durH = randInt(2, 5);
      const endH = startH + durH;
      const name = pick(NAMES);
      return {
        topic: 'Tempoh Masa (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Kelas tambahan Matematik ${name} bermula pada **Jam 0${startH}30** dan tamat pada **Jam ${endH}30** pada hari yang sama.\nBerapakah tempoh masa kelas tersebut dalam **jam**?`,
        hint: `Tolakkan waktu tamat dengan waktu mula: Jam ${endH}30 − Jam 0${startH}30.`,
        explanation: `Jam ${endH}30 − Jam 0${startH}30 = **${durH} jam**.`,
        ...makeOptions(durH, [durH + 1, durH - 1, durH + 2])
      };
    }
  },

  d4_s4: () => {
    const type = randInt(1, 4);
    if (type === 1) {
      const l = randInt(7, 15);
      const w = randInt(4, l - 1);
      const peri = 2 * (l + w);
      return {
        topic: 'Perimeter Segi Empat Tepat (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Sebuah segi empat tepat mempunyai panjang **${l} cm** dan lebar **${w} cm**.\nHitung **perimeter** segi empat tepat itu dalam **cm**.`,
        hint: `Perimeter ialah jumlah ukur keliling semua 4 sisi: ${l} + ${w} + ${l} + ${w}.`,
        explanation: `Perimeter = 2 × (Panjang + Lebar)\n= 2 × (${l} cm + ${w} cm)\n= 2 × ${l + w} cm = **${peri} cm**.`,
        ...makeOptions(peri, [l * w, l + w, peri + 4])
      };
    } else if (type === 2) {
      const base = pick([6, 8, 10, 12]);
      const height = randInt(4, 9);
      const area = (base * height) / 2;
      return {
        topic: 'Luas Segi Tiga (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Sebuah segi tiga mempunyai tapak **${base} cm** dan tinggi **${height} cm**.\nHitung **luas** segi tiga tersebut dalam **cm²**.`,
        hint: `Formula Luas Segi Tiga = ½ × Tapak × Tinggi = (${base} × ${height}) ÷ 2.`,
        explanation: `Luas Segi Tiga = ½ × Tapak × Tinggi\n= ½ × ${base} cm × ${height} cm\n= ${base * height} ÷ 2 = **${area} cm²**.`,
        ...makeOptions(area, [base * height, base + height, area + base])
      };
    } else if (type === 3) {
      const l = randInt(4, 8);
      const w = randInt(3, 6);
      const h = randInt(2, 5);
      const vol = l * w * h;
      return {
        topic: 'Isi Padu Kuboid (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Sebuah kotak berbentuk kuboid berukuran panjang **${l} cm**, lebar **${w} cm**, dan tinggi **${h} cm**.\nBerapakah **isi padu** kotak tersebut dalam **cm³**?`,
        hint: `Formula Isi Padu Kuboid = Panjang × Lebar × Tinggi = ${l} × ${w} × ${h}.`,
        explanation: `Isi Padu = Panjang × Lebar × Tinggi\n= ${l} × ${w} × ${h}\n= ${l * w} × ${h} = **${vol} cm³**.`,
        ...makeOptions(vol, [l + w + h, l * w + h, vol + 10])
      };
    } else {
      const unitPrice = randInt(3, 8);
      const q1 = randInt(3, 5);
      const q2 = randInt(6, 9);
      const total1 = unitPrice * q1;
      const ans = unitPrice * q2;
      return {
        topic: 'Kadaran / Kaedah Unitari (Darjah 4)',
        inputMode: 'numpad',
        prompt: `Harga bagi **${q1} batang pen** yang sama ialah **RM${total1}**.\nBerapakah harga bagi **${q2} batang pen** yang sama (dalam RM)?`,
        hint: `Langkah 1: Cari harga 1 batang pen dahulu (RM${total1} ÷ ${q1}). Langkah 2: Darabkan dengan ${q2}.`,
        explanation: `1) Harga 1 batang pen = RM${total1} ÷ ${q1} = RM${unitPrice}\n2) Harga ${q2} batang pen = RM${unitPrice} × ${q2} = **RM${ans}**.`,
        ...makeOptions(ans, [ans + unitPrice, total1 + q2, unitPrice * (q2 - 1)])
      };
    }
  },

  // ---------------- DARJAH 5 ----------------
  d5_s1: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const primes = [11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97];
      const composites = [9, 15, 21, 27, 33, 39, 49, 51, 57, 63, 69, 77, 81, 87, 91, 93];
      const p = pick(primes);
      const cList = shuffle(composites).slice(0, 3);
      return {
        topic: 'Nombor Perdana (Darjah 5)',
        inputMode: 'mcq',
        prompt: `Antara nombor berikut, yang manakah merupakan **Nombor Perdana**?`,
        hint: `Nombor perdana hanya boleh dibahagi tepat dengan 1 dan dirinya sendiri sahaja. Hati-hati dengan nombor ganjil yang boleh dibahagi dengan 3 atau 7!`,
        explanation: `**${p}** ialah **Nombor Perdana** kerana ia hanya mempunyai dua pembahagi iaitu 1 dan ${p}.\nNombor lain (${cList.join(', ')}) ialah nombor gubahan (boleh dibahagi dengan 3 atau 7).`,
        answer: String(p),
        options: shuffle([String(p), ...cList.map(String)])
      };
    } else if (type === 2) {
      const a = randInt(15, 40);
      const b = randInt(4, 9);
      const c = randInt(3, 8);
      const ans = a + b * c;
      return {
        topic: 'Tertib Operasi BODMAS (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Selesaikan mengikut tertib operasi yang betul:\n**${a} + ${b} × ${c} = ?**`,
        hint: `Ingat peraturan BODMAS / KUDABATATO: Selesaikan operasi DARAB (${b} × ${c}) dahulu sebelum TAMBAH!`,
        explanation: `Mengikut hukum BODMAS, operasi **Darab** perlu dibuat dahulu:\n1) ${b} × ${c} = ${b * c}\n2) ${a} + ${b * c} = **${ans}**.\n*(Jangan tambah ${a} + ${b} dahulu!)*`,
        ...makeOptions(ans, [(a + b) * c, ans + 10, a + b + c])
      };
    } else {
      const a = randInt(12, 25);
      const b = randInt(6, 15);
      const c = randInt(3, 6);
      const ans = (a + b) * c;
      return {
        topic: 'Operasi Bergabung Dengan Kurungan (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Hitung nilai bagi:\n**(${a} + ${b}) × ${c} = ?**`,
        hint: `Selesaikan operasi di dalam kurungan (${a} + ${b}) terlebih dahulu!`,
        explanation: `1) Selesaikan kurungan: ${a} + ${b} = ${a + b}\n2) Darabkan dengan ${c}: ${a + b} × ${c} = **${ans}**.`,
        ...makeOptions(ans, [a + b * c, ans + c, ans - 10])
      };
    }
  },

  d5_s2: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const items = [
        { q: '1/2 × 3/4', ans: '3/8', exp: 'Darab pengangka dengan pengangka (1 × 3 = 3) dan penyebut dengan penyebut (2 × 4 = 8).\nJawapan = **3/8**.' },
        { q: '2/3 × 3/5', ans: '2/5', exp: '(2 × 3) / (3 × 5) = 6/15.\nPermudahkan dengan membahagi 3: **2/5**.' },
        { q: '3/4 × 2/9', ans: '1/6', exp: '(3 × 2) / (4 × 9) = 6/36.\nPermudahkan dengan membahagi 6: **1/6**.' },
        { q: '4/5 × 5/8', ans: '1/2', exp: '(4 × 5) / (5 × 8) = 20/40.\nPermudahkan kepada bentuk termudah: **1/2**.' }
      ];
      const it = pick(items);
      return {
        topic: 'Darab Pecahan (Darjah 5)',
        inputMode: 'mcq',
        prompt: `Selesaikan dan beri jawapan dalam **bentuk termudah**:\n**${it.q} = ?**`,
        hint: `Darab atas dengan atas, bawah dengan bawah, kemudian kecilkan pecahan.`,
        explanation: it.exp,
        answer: it.ans,
        options: shuffle([it.ans, '5/9', '3/7', '4/9'])
      };
    } else if (type === 2) {
      const dec = pick([2.45, 3.7, 0.85, 1.25, 4.6]);
      const mult = pick([10, 100]);
      const ans = Math.round(dec * mult * 100) / 100;
      return {
        topic: 'Darab Perpuluhan Dengan 10 & 100 (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Hitung:\n**${dec} × ${mult} = ?**`,
        hint: `Gerakkan titik perpuluhan ke KANAN sebanyak ${mult === 10 ? '1' : '2'} langkah (mengikut bilangan sifar pada ${mult}).`,
        explanation: `Apabila mendarab dengan **${mult}**, gerakkan titik perpuluhan **${mult === 10 ? '1' : '2'} tempat ke kanan**:\n**${dec} × ${mult} = ${ans}**.`,
        ...makeOptions(ans, [ans / 10, ans * 10, ans + 10])
      };
    } else {
      const pct = pick([120, 150, 125]);
      const qty = pick([40, 60, 80]);
      const ans = (pct * qty) / 100;
      return {
        topic: 'Peratus Melebihi 100% (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Hitung nilai bagi:\n**${pct}% daripada ${qty}**`,
        hint: `(${pct} ÷ 100) × ${qty}. Oleh sebab peratus melebihi 100%, jawapannya mesti lebih besar daripada ${qty}!`,
        explanation: `(${pct} / 100) × ${qty} = ${pct * qty} ÷ 100 = **${ans}**.`,
        ...makeOptions(ans, [qty, ans - 20, ans + 15])
      };
    }
  },

  d5_s3: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const cost = randInt(4, 15) * 10;
      const sell = cost + randInt(2, 6) * 5;
      const profit = sell - cost;
      const name = pick(NAMES);
      return {
        topic: 'Untung & Rugi (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Harga kos sepasang kasut ialah **RM${cost}**. ${name} menjual kasut tersebut dengan harga **RM${sell}**.\nBerapakah **untung** yang diperoleh (dalam RM)?`,
        hint: `Formula Untung = Harga Jual − Harga Kos.`,
        explanation: `Untung = Harga Jual − Harga Kos\n= RM${sell} − RM${cost} = **RM${profit}**.`,
        ...makeOptions(profit, [profit + 5, sell + cost, profit + 10])
      };
    } else if (type === 2) {
      const orig = pick([80, 100, 120, 150, 200]);
      const discPct = pick([10, 20, 25, 30]);
      const discVal = (orig * discPct) / 100;
      const finalPrice = orig - discVal;
      return {
        topic: 'Diskaun Harga Barang (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Harga asal sebuah beg sekolah ialah **RM${orig}**. Semasa jualan murah, diskaun sebanyak **${discPct}%** diberikan.\nBerapakah **harga selepas diskaun** (dalam RM)?`,
        hint: `Kira nilai diskaun dahulu (${discPct}% × RM${orig} = RM${discVal}), kemudian tolakkan daripada harga asal RM${orig}.`,
        explanation: `1) Nilai diskaun = (${discPct}/100) × RM${orig} = RM${discVal}\n2) Harga selepas diskaun = RM${orig} − RM${discVal} = **RM${finalPrice}**.`,
        ...makeOptions(finalPrice, [discVal, orig - discPct, finalPrice + 10])
      };
    } else {
      const km = pick([1.5, 2.4, 3.25, 4.75, 5.6]);
      const ans = Math.round(km * 1000);
      return {
        topic: 'Penukaran Unit Perpuluhan (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Tukarkan **${km} km** kepada unit **meter (m)**.`,
        hint: `1 km = 1,000 m. Darabkan ${km} dengan 1,000 (gerakkan titik perpuluhan 3 langkah ke kanan).`,
        explanation: `1 km = 1,000 m\n${km} × 1,000 = **${ans} m**.`,
        ...makeOptions(ans, [ans / 10, ans + 100, Math.round(km * 100)])
      };
    }
  },

  d5_s4: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const base = randInt(6, 15);
      const arr = [base - 2, base, base + 1, base + 5];
      const sum = arr.reduce((a, b) => a + b, 0);
      const mean = sum / 4;
      return {
        topic: 'Min / Purata (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Hitung **min (purata)** bagi set empat nombor berikut:\n**${arr.join(',  ')}**`,
        hint: `Formula Min (Purata) = Jumlah semua nilai ÷ Bilangan data (4).`,
        explanation: `1) Jumlah data = ${arr.join(' + ')} = ${sum}\n2) Min = ${sum} ÷ 4 = **${mean}**.`,
        ...makeOptions(mean, [mean + 1, mean + 2, sum])
      };
    } else if (type === 2) {
      const minVal = randInt(12, 25);
      const maxVal = minVal + randInt(15, 35);
      const mid1 = minVal + 4;
      const mid2 = maxVal - 5;
      const list = shuffle([minVal, maxVal, mid1, mid2, mid1]);
      const julat = maxVal - minVal;
      return {
        topic: 'Julat Data (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Cari **julat** bagi set data berikut:\n**${list.join(',  ')}**`,
        hint: `Formula Julat = Nilai Paling Besar (Maksimum) − Nilai Paling Kecil (Minimum).`,
        explanation: `• Nilai maksimum = ${maxVal}\n• Nilai minimum = ${minVal}\n• Julat = ${maxVal} − ${minVal} = **${julat}**.`,
        ...makeOptions(julat, [maxVal, minVal, julat + 5])
      };
    } else {
      const r1 = randInt(2, 5);
      const r2 = randInt(r1 + 1, 7);
      const k = randInt(3, 6);
      const aVal = r1 * k;
      const bVal = r2 * k;
      const name = pick(NAMES);
      return {
        topic: 'Nisbah & Kadaran (Darjah 5)',
        inputMode: 'numpad',
        prompt: `Nisbah bilangan guli merah kepada guli biru milik ${name} ialah **${r1} : ${r2}**.\nJika terdapat **${aVal} biji guli merah**, berapakah bilangan **guli biru**?`,
        hint: `1 bahagian mewakili ${aVal} ÷ ${r1} = ${k} biji guli. Darabkan ${k} dengan ${r2} bahagian.`,
        explanation: `• ${r1} bahagian = ${aVal} biji, maka 1 bahagian = ${aVal} ÷ ${r1} = ${k} biji.\n• Guli biru (${r2} bahagian) = ${r2} × ${k} = **${bVal} biji**.`,
        ...makeOptions(bVal, [bVal + k, aVal + r2, bVal - 2])
      };
    }
  },

  // ---------------- DARJAH 6 (SASARAN ANAK 12 TAHUN / UASA) ----------------
  d6_s1: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const table = [
        { frac: '1/2 juta', val: 500000, hint: '1/2 daripada 1,000,000 ialah separuh juta (500,000).' },
        { frac: '1/4 juta', val: 250000, hint: '1/4 juta = 1,000,000 ÷ 4 = 250,000.' },
        { frac: '3/4 juta', val: 750000, hint: '1/4 juta ialah 250,000, maka 3/4 juta = 3 × 250,000 = 750,000.' },
        { frac: '1/5 juta', val: 200000, hint: '1/5 juta = 1,000,000 ÷ 5 = 200,000.' },
        { frac: '2/5 juta', val: 400000, hint: '1/5 juta ialah 200,000, maka 2/5 juta = 400,000.' },
        { frac: '1/8 juta', val: 125000, hint: 'Ingat fakta penting Darjah 6: 1/8 juta = 125,000.' },
        { frac: '3/8 juta', val: 375000, hint: '1/8 juta = 125,000. Maka 3/8 juta = 3 × 125,000 = 375,000.' },
        { frac: '1 1/4 juta', val: 1250000, hint: '1 juta (1,000,000) + 1/4 juta (250,000).' }
      ];
      const item = pick(table);
      return {
        topic: 'Pecahan Juta (Darjah 6)',
        inputMode: 'mcq',
        prompt: `Tukarkan **${item.frac}** kepada **nombor bulat**.`,
        hint: item.hint,
        explanation: `1 juta = 1,000,000.\nMaka **${item.frac} = ${item.val.toLocaleString('en-US')}**.`,
        ...makeOptions(item.val, [item.val + 50000, item.val / 10, item.val + 150000], (v) => v.toLocaleString('en-US'))
      };
    } else if (type === 2) {
      const dec = pick([0.45, 1.25, 2.08, 3.6, 0.09]);
      const ans = Math.round(dec * 1000000);
      return {
        topic: 'Perpuluhan Juta (Darjah 6)',
        inputMode: 'mcq',
        prompt: `Tukarkan **${dec} juta** kepada **nombor bulat**.`,
        hint: `Darabkan ${dec} dengan 1,000,000 (gerakkan titik perpuluhan 6 tempat ke kanan).`,
        explanation: `${dec} × 1,000,000 = **${ans.toLocaleString('en-US')}**.`,
        ...makeOptions(ans, [ans / 10, ans * 10, ans + 100000], (v) => v.toLocaleString('en-US'))
      };
    } else {
      // Operasi bergabung melibatkan pecahan juta & perpuluhan juta
      const dec = pick([1.5, 2.25, 0.75]);
      const sub = pick([250000, 150000, 300000]);
      const ans = Math.round(dec * 1000000) - sub;
      return {
        topic: 'Operasi Nombor Juta (Darjah 6)',
        inputMode: 'mcq',
        prompt: `Selesaikan:\n**${dec} juta − ${sub.toLocaleString('en-US')} = ?**`,
        hint: `Tukarkan ${dec} juta kepada nombor bulat (${(dec * 1000000).toLocaleString('en-US')}) dahulu sebelum menolak.`,
        explanation: `1) ${dec} juta = ${(dec * 1000000).toLocaleString('en-US')}\n2) ${(dec * 1000000).toLocaleString('en-US')} − ${sub.toLocaleString('en-US')} = **${ans.toLocaleString('en-US')}**.`,
        ...makeOptions(ans, [ans + 100000, ans - 50000, Math.round(dec * 1000000) + sub], (v) => v.toLocaleString('en-US'))
      };
    }
  },

  d6_s2: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const items = [
        { q: '3/4 ÷ 3', ans: '1/4', exp: '3/4 ÷ 3/1 = 3/4 × 1/3 = 3/12 = **1/4**.' },
        { q: '2/5 ÷ 1/10', ans: '4', exp: 'Tukarkan ÷ kepada × dan songsangkan pecahan kedua:\n2/5 × 10/1 = 20/5 = **4**.' },
        { q: '3/8 ÷ 3/4', ans: '1/2', exp: '3/8 × 4/3 = 12/24 = **1/2**.' },
        { q: '4/5 ÷ 2/5', ans: '2', exp: '4/5 × 5/2 = 20/10 = **2**.' },
        { q: '5/6 ÷ 5', ans: '1/6', exp: '5/6 × 1/5 = 5/30 = **1/6**.' }
      ];
      const it = pick(items);
      return {
        topic: 'Bahagi Pecahan (Darjah 6)',
        inputMode: 'mcq',
        prompt: `Hitung hasil bahagi pecahan berikut:\n**${it.q} = ?**`,
        hint: `Kaedah KSF (Kekal pecahan pertama, Songsangkan pecahan kedua, Tukar ÷ kepada ×).`,
        explanation: it.exp,
        answer: it.ans,
        options: shuffle([it.ans, '3/16', '2/3', '5/12'])
      };
    } else if (type === 2) {
      const orig = pick([50, 80, 120, 200]);
      const incPct = pick([15, 20, 25, 30]);
      const inc = (orig * incPct) / 100;
      const ans = orig + inc;
      return {
        topic: 'Peningkatan Peratusan (Darjah 6)',
        inputMode: 'numpad',
        prompt: `Berat hasil tanaman meningkat sebanyak **${incPct}%** berbanding bulan lepas iaitu **${orig} kg**.\nBerapakah berat hasil tanaman pada bulan ini (dalam kg)?`,
        hint: `Kira ${incPct}% daripada ${orig} kg (${inc} kg), kemudian tambahkan kepada ${orig} kg.`,
        explanation: `1) Pertambahan = (${incPct}/100) × ${orig} = ${inc} kg\n2) Jumlah baharu = ${orig} + ${inc} = **${ans} kg**.`,
        ...makeOptions(ans, [orig - inc, inc, ans + 10])
      };
    } else {
      const part = pick([15, 18, 24, 30]);
      const pct = pick([20, 25, 30, 50]);
      const total = (part * 100) / pct;
      return {
        topic: 'Cari Jumlah Asal Daripada Peratus (Darjah 6)',
        inputMode: 'numpad',
        prompt: `Jika **${pct}%** daripada sejumlah murid ialah **${part} orang**, berapakah **jumlah keseluruhan** murid itu?`,
        hint: `Jika ${pct}% = ${part}, maka 100% = (${part} ÷ ${pct}) × 100.`,
        explanation: `${pct}% → ${part} orang\n100% → (${part} ÷ ${pct}) × 100 = **${total} orang**.`,
        ...makeOptions(total, [total + 20, part * 2, total - 15])
      };
    }
  },

  d6_s3: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const cost = pick([50, 80, 100, 200, 250]);
      const pct = pick([10, 20, 25, 30, 40]);
      const profit = (cost * pct) / 100;
      const sell = cost + profit;
      return {
        topic: 'Peratus Untung (Darjah 6)',
        inputMode: 'numpad',
        prompt: `Harga kos sebuah jam tangan ialah **RM${cost}** dan dijual pada harga **RM${sell}**.\nHitung **peratus untung** yang diperoleh (%).`,
        hint: `Untung = RM${sell} − RM${cost} = RM${profit}. Peratus Untung = (Untung ÷ Harga Kos) × 100%.`,
        explanation: `1) Untung = RM${sell} − RM${cost} = RM${profit}\n2) Peratus Untung = (RM${profit} / RM${cost}) × 100% = **${pct}%**.`,
        ...makeOptions(pct, [profit, pct + 10, Math.round((profit / sell) * 100)])
      };
    } else if (type === 2) {
      const food = pick([50, 100, 150, 200]);
      const taxRate = 6;
      const tax = (food * taxRate) / 100;
      const total = food + tax;
      return {
        topic: 'Cukai Perkhidmatan 6% (Darjah 6)',
        inputMode: 'numpad',
        prompt: `Keluarga ${pick(NAMES)} makan malam di sebuah restoran dengan harga makanan **RM${food}**. Restoran mengenakan **cukai perkhidmatan sebanyak 6%**.\nBerapakah **jumlah bil** yang perlu dibayar (dalam RM)?`,
        hint: `Cukai perkhidmatan = 6% × RM${food} = RM${tax}. Tambahkan cukai kepada harga asal.`,
        explanation: `1) Cukai perkhidmatan (6%) = (6/100) × RM${food} = RM${tax}\n2) Jumlah bil = RM${food} + RM${tax} = **RM${total}**.`,
        ...makeOptions(total, [tax, food - tax, total + 6])
      };
    } else {
      const price = pick([200, 300, 400]);
      const discPct = pick([10, 20]);
      const rebate = pick([15, 20, 25]);
      const afterDisc = price - (price * discPct) / 100;
      const finalPay = afterDisc - rebate;
      return {
        topic: 'Diskaun & Rebat Baucar (Darjah 6)',
        inputMode: 'numpad',
        prompt: `Harga sebuah periuk elektrik ialah **RM${price}**. Kedai menawarkan **diskaun ${discPct}%** dan pelanggan juga menebus **rebat baucar RM${rebate}**.\nBerapakah bayaran akhir yang perlu dibuat (RM)?`,
        hint: `Langkah 1: Tolak diskaun ${discPct}% dahulu (RM${price} − RM${(price * discPct) / 100} = RM${afterDisc}). Langkah 2: Tolak rebat RM${rebate}.`,
        explanation: `1) Selepas diskaun ${discPct}%: RM${price} − RM${(price * discPct) / 100} = RM${afterDisc}\n2) Tolak rebat RM${rebate}: RM${afterDisc} − RM${rebate} = **RM${finalPay}**.`,
        ...makeOptions(finalPay, [afterDisc, price - rebate, finalPay + 10])
      };
    }
  },

  d6_s4: () => {
    const type = randInt(1, 3);
    if (type === 1) {
      const cities = [
        { name: 'Tokyo, Jepun', diff: 1, dir: 'mendahului' },
        { name: 'London, UK', diff: -8, dir: 'lewat' },
        { name: 'Riyadh, Arab Saudi', diff: -5, dir: 'lewat' },
        { name: 'Sydney, Australia', diff: 2, dir: 'mendahului' }
      ];
      const c = pick(cities);
      const klHour = randInt(10, 16);
      const targetHour = klHour + c.diff;
      const ansStr = `Jam ${String(targetHour).padStart(2, '0')}00`;
      return {
        topic: 'Zon Masa Dunia (Darjah 6)',
        inputMode: 'mcq',
        prompt: `Waktu di **Kuala Lumpur** ialah **Jam ${klHour}00**. Waktu di **${c.name}** adalah **${Math.abs(c.diff)} jam ${c.dir}** waktu Kuala Lumpur.\nApakah waktu di ${c.name} ketika itu?`,
        hint: c.diff > 0
          ? `"Mendahului" bermaksud waktu di sana lebih awal/ke hadapan, jadi TAMBAH ${c.diff} jam.`
          : `"Lewat" bermaksud waktu di sana berada di belakang KL, jadi TOLAK ${Math.abs(c.diff)} jam.`,
        explanation: `Jam ${klHour}00 ${c.diff > 0 ? `+ ${c.diff} jam` : `− ${Math.abs(c.diff)} jam`} = **${ansStr}**.`,
        answer: ansStr,
        options: shuffle([
          ansStr,
          `Jam ${String(klHour - c.diff).padStart(2, '0')}00`,
          `Jam ${String(targetHour + 2).padStart(2, '0')}00`,
          `Jam ${String(targetHour - 1).padStart(2, '0')}00`
        ])
      };
    } else if (type === 2) {
      const events = [
        { ev: 'Sebulan mempunyai 40 hari', ans: 'Mustahil', exp: 'Bilangan hari paling banyak dalam sebulan hanya 31 hari. Maka peristiwa ini **Mustahil**.' },
        { ev: 'Matahari terbit dari arah timur', ans: 'Pasti', exp: 'Ini ialah fakta alam yang sentiasa berlaku, maka kebolehjadiannya ialah **Pasti**.' },
        { ev: 'Mendapat nombor genap apabila melambung sebiji dadu adil (1 hingga 6)', ans: 'Sama kemungkinan', exp: 'Ada 3 nombor genap (2, 4, 6) dan 3 nombor ganjil (1, 3, 5). Maka ia **Sama kemungkinan**.' },
        { ev: 'Memilih sebiji guli merah dari balang yang mengandungi 9 biji guli merah dan 1 biji guli biru', ans: 'Besar kemungkinan', exp: 'Bilangan guli merah jauh lebih banyak (9 daripada 10), maka ia **Besar kemungkinan**.' }
      ];
      const e = pick(events);
      return {
        topic: 'Kebolehjadian (Darjah 6)',
        inputMode: 'mcq',
        prompt: `Nyatakan kebolehjadian bagi peristiwa berikut:\n**"${e.ev}"**`,
        hint: `Pilih antara: Pasti, Besar kemungkinan, Sama kemungkinan, Kecil kemungkinan, atau Mustahil.`,
        explanation: e.exp,
        answer: e.ans,
        options: ['Pasti', 'Besar kemungkinan', 'Sama kemungkinan', 'Mustahil']
      };
    } else {
      const rA = randInt(2, 4);
      const rB = randInt(5, 7);
      const totalParts = rA + rB;
      const mult = randInt(4, 8);
      const totalItems = totalParts * mult;
      const ansA = rA * mult;
      return {
        topic: 'Nisbah Kepada Jumlah Keseluruhan (Darjah 6)',
        inputMode: 'numpad',
        prompt: `Nisbah bilangan murid lelaki kepada murid perempuan di dalam sebuah dewan ialah **${rA} : ${rB}**.\nJika **jumlah semua murid** ialah **${totalItems} orang**, berapakah bilangan **murid lelaki**?`,
        hint: `Jumlah bahagian = ${rA} + ${rB} = ${totalParts} bahagian. Cari nilai 1 bahagian (${totalItems} ÷ ${totalParts}), kemudian darab ${rA}.`,
        explanation: `1) Jumlah bahagian = ${rA} + ${rB} = ${totalParts} bahagian\n2) Nilai 1 bahagian = ${totalItems} ÷ ${totalParts} = ${mult} orang\n3) Murid lelaki (${rA} bahagian) = ${rA} × ${mult} = **${ansA} orang**.`,
        ...makeOptions(ansA, [rB * mult, totalItems - rA, ansA + mult])
      };
    }
  }
};

// Fungsi utama menjana senarai soalan mengikut ID stesen
window.generateQuestionsForNode = function (nodeId) {
  const world = window.KSSR_WORLDS.find((w) => w.nodes.some((n) => n.id === nodeId));
  const node = world.nodes.find((n) => n.id === nodeId);
  const count = node.questionCount || 8;
  const questions = [];

  if (node.isBoss) {
    // Boss mengambil gabungan daripada keempat-empat stesen dalam Darjah tersebut
    const subIds = world.nodes.filter((n) => !n.isBoss).map((n) => n.id);
    for (let i = 0; i < count; i++) {
      const targetSubId = subIds[i % subIds.length];
      const q = Generators[targetSubId]();
      q.sourceNodeId = targetSubId;
      questions.push(q);
    }
  } else {
    const gen = Generators[nodeId];
    for (let i = 0; i < count; i++) {
      const q = gen();
      q.sourceNodeId = nodeId;
      questions.push(q);
    }
  }
  return questions;
};
