// ============================================================================
// SAINS SAGA KSSR (SEMAKAN) MALAYSIA — DARJAH 1 HINGGA DARJAH 6
// Enjin Penjana Soalan Sains Dinamik + Penerangan Cikgu Sains
// ============================================================================

const sciPick = (arr) => arr[Math.floor(Math.random() * arr.length)];
const sciShuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// Membina soalan daripada bank variasi topik supaya setiap kali ulang ("Cuba Semula"),
// susunan soalan dan pilihan jawapan diacak secara dinamik.
function buildFromPool(topicName, pool, count) {
  const shuffledPool = sciShuffle(pool);
  const selected = [];
  for (let i = 0; i < count; i++) {
    const item = shuffledPool[i % shuffledPool.length];
    // Jika item ialah fungsi dinamik (contohnya kiraan kelajuan Darjah 6), panggil fungsi tersebut
    const resolved = typeof item === 'function' ? item() : item;
    selected.push({
      topic: topicName,
      inputMode: resolved.inputMode || 'mcq',
      prompt: resolved.prompt,
      hint: resolved.hint,
      explanation: resolved.exp,
      answer: String(resolved.ans),
      options: sciShuffle(resolved.opts.map(String))
    });
  }
  return selected;
}

// ============================================================================
// DEFINISI 6 PULAU SAINS KSSR (DARJAH 1 - DARJAH 6) — 30 STESEN KESELURUHAN
// ============================================================================
window.SCIENCE_WORLDS = [
  {
    darjah: 1,
    title: 'Darjah 1: Taman Alam & Deria',
    subtitle: 'Benda Hidup, Deria Manusia, Bahagian Haiwan & Tumbuhan, Magnet & Penyerapan',
    themeColor: '#10b981',
    bgGradient: 'linear-gradient(180deg, #064e3b 0%, #059669 100%)',
    badge: '🌱',
    nodes: [
      {
        id: 's1_s1',
        code: 'S1.1',
        title: 'Benda Hidup & Deria Manusia',
        topic: 'Ciri Benda Hidup & 5 Deria Manusia',
        desc: 'Kenali ciri benda hidup (bernafas, membiak, membesar) serta fungsi 5 organ deria.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's1_s2',
        code: 'S1.2',
        title: 'Bahagian Tubuh Haiwan',
        topic: 'Haiwan & Fungsinya',
        desc: 'Kenali paruh, sisik, sirip, kepak, tanduk, cangkerang dan fungsinya kepada haiwan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's1_s3',
        code: 'S1.3',
        title: 'Rahsia Bahagian Tumbuhan',
        topic: 'Akar, Batang, Daun & Bunga',
        desc: 'Urat daun jejala vs selari, akar tunjang vs akar serabut, batang berkayu vs tidak berkayu.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's1_s4',
        code: 'S1.4',
        title: 'Kuasa Magnet & Penyerapan Air',
        topic: 'Magnet, Objek Menyerap Air & Bentuk Asas',
        desc: 'Kutub magnet (tarik/tolak), bahan menyerap air vs kalis air, serta bentuk asas.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's1_boss',
        code: 'UJIAN S1',
        title: 'BOSS SAINS DARJAH 1: Ujian Naik Darjah 2',
        topic: 'Penilaian Menyeluruh Sains Darjah 1',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Sains Darjah 2!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 2,
    title: 'Darjah 2: Makmal Tumbesaran & Litar',
    subtitle: 'Tumbesaran Manusia, Pembiakan Haiwan, Bayang-Bayang, Litar Elektrik & Campuran',
    themeColor: '#0284c7',
    bgGradient: 'linear-gradient(180deg, #0c4a6e 0%, #0369a1 100%)',
    badge: '🔦',
    nodes: [
      {
        id: 's2_s1',
        code: 'S2.1',
        title: 'Tumbesaran Manusia & Haiwan',
        topic: 'Perubahan Tumbesaran & Cara Haiwan Membiak',
        desc: 'Perubahan saiz/tinggi/berat manusia, haiwan bertelur vs melahirkan anak & kitar hidup.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's2_s2',
        code: 'S2.2',
        title: 'Keperluan Asas Tumbuhan',
        topic: 'Air, Udara & Cahaya Matahari',
        desc: 'Kepentingan air, udara dan cahaya matahari untuk tumbesaran pokok yang sihat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's2_s3',
        code: 'S2.3',
        title: 'Terang, Gelap & Litar Elektrik',
        topic: 'Bayang-Bayang, Komponen Elektrik, Konduktor & Penebat',
        desc: 'Pembentukan bayang-bayang, fungsi suis/mentol/sel kering, serta konduktor vs penebat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's2_s4',
        code: 'S2.4',
        title: 'Campuran, Air & Udara',
        topic: 'Kaedah Mengasingkan Campuran & Sumber Air Semula Jadi',
        desc: 'Menyaring, menggunakan magnet, mengapung, menuras serta keterlarutan bahan dalam air.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's2_boss',
        code: 'UJIAN S2',
        title: 'BOSS SAINS DARJAH 2: Ujian Naik Darjah 3',
        topic: 'Penilaian Menyeluruh Sains Darjah 2',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Sains Darjah 3!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 3,
    title: 'Darjah 3: Dunia Nutrisi & Sistem Suria',
    subtitle: 'Gigi & Kelas Makanan, Herbivor/Karnivor/Omnivor, Ketumpatan, Asid/Alkali & Planet',
    themeColor: '#d97706',
    bgGradient: 'linear-gradient(180deg, #78350f 0%, #b45309 100%)',
    badge: '🪐',
    nodes: [
      {
        id: 's3_s1',
        code: 'S3.1',
        title: 'Kegigian, Kelas Makanan & Pencernaan',
        topic: 'Fungsi Gigi, 7 Kelas Makanan & Aliran Pencernaan',
        desc: 'Gigi kacip/taring/geraham, fungsi karbohidrat/protein/vitamin, serta urutan pencernaan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's3_s2',
        code: 'S3.2',
        title: 'Tabiat Pemakanan Haiwan & Pembiakan Tumbuhan',
        topic: 'Herbivor, Karnivor, Omnivor & 6 Cara Tumbuhan Membiak',
        desc: 'Kegigian haiwan serta pembiakan tumbuhan melalui spora, keratan batang, daun & sulur.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's3_s3',
        code: 'S3.3',
        title: 'Ketumpatan, Asid & Alkali',
        topic: 'Timbul/Tenggelam & Sifat Kimia Bahan (Kertas Litmus)',
        desc: 'Konsep ketumpatan berbanding air serta perubahan warna kertas litmus biru dan merah.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's3_s4',
        code: 'S3.4',
        title: 'Sistem Suria & Takal',
        topic: 'Susunan 8 Planet & Fungsi Takal',
        desc: 'Urutan planet dari Matahari (Utarid hingga Neptun), suhu planet, dan mesin takal.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's3_boss',
        code: 'UJIAN S3',
        title: 'BOSS SAINS DARJAH 3: Ujian Naik Darjah 4',
        topic: 'Penilaian Menyeluruh Sains Darjah 3',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk melangkah ke Sains Tahap II (Darjah 4)!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 4,
    title: 'Darjah 4: Kota Sains Tahap II (10 Tahun)',
    subtitle: 'Pernafasan, Vertebrata, Fotosintesis, Pantulan/Pembiasan Cahaya, Tenaga & Mesin Ringkas',
    themeColor: '#7c3aed',
    bgGradient: 'linear-gradient(180deg, #3b0764 0%, #6d28d9 100%)',
    badge: '🔬',
    nodes: [
      {
        id: 's4_s1',
        code: 'S4.1',
        title: 'Pernafasan, Perkumuhan & Rangsangan',
        topic: 'Manusia: Peparu, Ginjal, Kulit & Gerak Balas',
        desc: 'Kandungan oksigen/karbon dioksida semasa tarik & hembus nafas, serta hasil perkumuhan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's4_s2',
        code: 'S4.2',
        title: 'Organ Pernafasan Haiwan, Vertebrata & Fotosintesis',
        topic: 'Peparu/Insang/Spirakel, 5 Kelas Vertebrata & Fotosintesis',
        desc: 'Pengelasan Mamalia, Reptilia, Amfibia, Burung, Ikan serta keperluan dan hasil fotosintesis.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's4_s3',
        code: 'S4.3',
        title: 'Sifat Cahaya, Bunyi & Tenaga',
        topic: 'Pantulan, Pembiasan Cahaya, Lut Sinar/Legap & Perubahan Tenaga',
        desc: 'Aplikasi periskop, cermin sisi, pembiasan cahaya, serta perubahan bentuk tenaga.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's4_s4',
        code: 'S4.4',
        title: 'Sumber Bahan, Graviti Bumi & Mesin Ringkas',
        topic: 'Sumber Asas Bahan, Putaran Bumi & 7 Jenis Mesin Ringkas',
        desc: 'Kesan putaran Bumi (siang/malam, kedudukan bayang-bayang) serta Tuas, Baji, Gear & Skru.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's4_boss',
        code: 'UJIAN S4',
        title: 'BOSS SAINS DARJAH 4: Ujian Naik Darjah 5',
        topic: 'Penilaian Menyeluruh UASA Sains Darjah 4',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Sains Darjah 5!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 5,
    title: 'Darjah 5: Menara Ekosistem & Fizik',
    subtitle: 'Rangka & Peredaran Darah, Kemandirian Spesies, Litar Selari, Haba, Jirim & Fasa Bulan',
    themeColor: '#db2777',
    bgGradient: 'linear-gradient(180deg, #831843 0%, #be185d 100%)',
    badge: '⚡',
    nodes: [
      {
        id: 's5_s1',
        code: 'S5.1',
        title: 'Sistem Rangka & Peredaran Darah',
        topic: 'Fungsi Rangka Utama, Sendi & Laluan Peredaran Darah',
        desc: 'Fungsi tengkorak, tulang rusuk, tulang belakang serta peranan jantung & peparu.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's5_s2',
        code: 'S5.2',
        title: 'Kemandirian Spesies, Rantai Makanan & Pencaran',
        topic: 'Ciri Khas Haiwan/Tumbuhan, Siratan Makanan & Agen Pencaran Biji Benih',
        desc: 'Pengeluar dan pengguna dalam rantai makanan serta ciri pencaran melalui air, angin & letupan.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's5_s3',
        code: 'S5.3',
        title: 'Litar Bersiri vs Selari, Haba & Pengaratan',
        topic: 'Kecerahan Mentol, Pengembangan/Pengecutan & Faktor Pengaratan',
        desc: 'Kelebihan litar selari, kesan haba pada landasan kereta api/kabel, dan syarat pengaratan besi.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's5_s4',
        code: 'S5.4',
        title: 'Perubahan Keadaan Jirim, Fasa Bulan & Buruj',
        topic: 'Peleburan/Pendidihan/Kondensasi, Kitaran Air, Fasa Bulan & Buruj',
        desc: 'Proses menerima/kehilangan haba, pembentukan awan & hujan, serta buruj Pari dan Belantik.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's5_boss',
        code: 'UJIAN S5',
        title: 'BOSS SAINS DARJAH 5: Ujian Naik Darjah 6',
        topic: 'Penilaian Menyeluruh UASA Sains Darjah 5',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk mara ke Puncak Sains Darjah 6!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  },
  {
    darjah: 6,
    title: 'Darjah 6: Puncak Juara Sains UASA (12 Tahun)',
    subtitle: 'Sistem Saraf, Mikroorganisma, Simbiosis, Daya Geseran, Kelajuan, Pengawetan & Gerhana',
    themeColor: '#dc2626',
    bgGradient: 'linear-gradient(180deg, #450a0a 0%, #b91c1c 100%)',
    badge: '🧬',
    nodes: [
      {
        id: 's6_s1',
        code: 'S6.1',
        title: 'Sistem Saraf, Pembiakan & Mikroorganisma',
        topic: 'Saraf Pusat vs Periferi & 5 Jenis Mikroorganisma',
        desc: 'Fungsi otak dan saraf tunjang, serta pengelasan Fungi (Yis/Mukor), Bakteria, Virus, Alga & Protozoa.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's6_s2',
        code: 'S6.2',
        title: 'Interaksi Simbiosis & Pemuliharaan',
        topic: 'Mutualisme, Komensalisme, Parasitisme & Spesies Terancam',
        desc: 'Hubungan antara hidupan serta perbezaan pemeliharaan dan pemuliharaan alam.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's6_s3',
        code: 'S6.3',
        title: 'Daya Geseran, Tekanan Udara & Kiraan Kelajuan',
        topic: 'Faktor Geseran, Aplikasi Tekanan Udara & Formula Kelajuan = Jarak ÷ Masa',
        desc: 'Kebaikan/keburukan daya geseran, prinsip sifon/picagari, serta pengiraan kelajuan (km/j).',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's6_s4',
        code: 'S6.4',
        title: 'Pengawetan Makanan, Gerhana & Kestabilan',
        topic: 'Pempasteuran/Pengetinan, Bahan Terbiodegradasi, Gerhana & Kekuatan Binaan',
        desc: 'Faktor pertumbuhan mikroorganisma, kedudukan Gerhana Bulan/Matahari, serta faktor kestabilan objek.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75
      },
      {
        id: 's6_boss',
        code: 'UJIAN S6',
        title: 'BOSS AKHIR SAINS DARJAH 6: Juara UASA Sains!',
        topic: 'Penilaian Akhir Komprehensif Silibus Sains Sekolah Rendah KSSR',
        desc: 'Lulus dengan markah ≥80% untuk dinobatkan sebagai Saintis Muda Terbaik KSSR!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80
      }
    ]
  }
];

// ============================================================================
// BANK SOALAN SAINS KSSR MENGIKUT STESEN (DARJAH 1 - DARJAH 6)
// ============================================================================
const SciencePools = {
  // ---------------- DARJAH 1 ----------------
  s1_s1: [
    {
      prompt: 'Antara berikut, yang manakah merupakan **benda hidup**?',
      hint: 'Benda hidup memerlukan air dan makanan, bernafas, bergerak, membesar dan membiak.',
      ans: 'Pokok bunga matahari',
      opts: ['Pokok bunga matahari', 'Kereta kawalan jauh', 'Anak patung beruang', 'Batu sungai'],
      exp: '**Pokok bunga matahari** ialah benda hidup kerana ia membesar, membiak dan memerlukan air serta udara.'
    },
    {
      prompt: 'Apakah ciri **benda hidup** yang ditunjukkan apabila seekor ayam betina bertelur?',
      hint: 'Bertelur menambahkan bilangan anak ayam.',
      ans: 'Membiak',
      opts: ['Membiak', 'Bernafas', 'Bergerak', 'Bernyahkumuh'],
      exp: 'Bertelur atau melahirkan anak ialah proses **membiak** untuk memastikan benda hidup terus wujud.'
    },
    {
      prompt: 'Organ deria manakah yang digunakan untuk mengenali **bau wangi** sekuntum bunga mawar?',
      hint: 'Organ yang digunakan untuk menghidu.',
      ans: 'Hidung',
      opts: ['Hidung', 'Lidah', 'Kulit', 'Telinga'],
      exp: '**Hidung** ialah organ deria bau yang membolehkan kita menghidu bau wangi atau busuk.'
    },
    {
      prompt: 'Aisyah menyentuh segelas air kopi dan mendapati ia **panas**. Apakah organ deria yang terlibat?',
      hint: 'Organ deria sentuhan yang meliputi seluruh tubuh.',
      ans: 'Kulit',
      opts: ['Kulit', 'Mata', 'Lidah', 'Telinga'],
      exp: '**Kulit** ialah organ deria sentuh untuk mengesan panas, sejuk, kasar, licin atau sakit.'
    },
    {
      prompt: 'Rasa **pahit** pada buah peria dan rasa **masam** pada buah limau dikesan oleh organ...',
      hint: 'Organ di dalam mulut.',
      ans: 'Lidah',
      opts: ['Lidah', 'Hidung', 'Gigi', 'Kulit'],
      exp: '**Lidah** ialah organ deria rasa yang mengesan manis, masin, masam, dan pahit.'
    },
    {
      prompt: 'Mengapakah sebuah **robot** yang boleh berjalan dikelaskan sebagai **benda bukan hidup**?',
      hint: 'Adakah robot bernafas, makan, membesar atau membiak?',
      ans: 'Robot tidak bernafas, tidak membesar dan tidak membiak',
      opts: [
        'Robot tidak bernafas, tidak membesar dan tidak membiak',
        'Robot bergerak terlalu perlahan',
        'Robot diperbuat daripada plastik',
        'Robot mempunyai bateri'
      ],
      exp: 'Walaupun robot boleh bergerak menggunakan bateri, ia **bukan benda hidup** kerana tidak bernafas, tidak memerlukan makanan/air, tidak membesar dan tidak membiak.'
    },
    {
      prompt: 'Apakah keperluan asas manusia dan haiwan untuk mengelakkan rasa **dahaga** dan mengekalkan suhu badan?',
      hint: 'Cecair yang kita minum setiap hari.',
      ans: 'Air',
      opts: ['Air', 'Pasir', 'Cahaya lampu', 'Batu'],
      exp: 'Keperluan asas benda hidup ialah **air, udara, dan makanan** (serta tempat perlindungan).'
    },
    {
      prompt: 'Apakah peraturan keselamatan yang **betul** semasa berada di dalam **Bilik Sains**?',
      hint: 'Sentiasa ikut arahan guru dan jangan berlari.',
      ans: 'Menjalankan eksperimen mengikut arahan guru',
      opts: [
        'Menjalankan eksperimen mengikut arahan guru',
        'Makan dan minum di dalam Bilik Sains',
        'Berlari dan bergurau bersama rakan',
        'Merasa bahan kimia tanpa kebenaran guru'
      ],
      exp: 'Murid mestilah sentiasa **mematuhi arahan guru** dan dilarang makan, minum atau berlari di dalam Bilik Sains.'
    },
    {
      prompt: 'Organ deria **telinga** berfungsi untuk mengesan...',
      hint: 'Bunyi kuat atau perlahan.',
      ans: 'Bunyi (Pendengaran)',
      opts: ['Bunyi (Pendengaran)', 'Warna dan cahaya', 'Rasa manis', 'Permukaan kasar'],
      exp: '**Telinga** ialah organ deria pendengaran untuk mengesan bunyi.'
    }
  ],

  s1_s2: [
    {
      prompt: 'Apakah bahagian tubuh yang membantu **ikan** berenang dan mengawal arah di dalam air?',
      hint: 'Bahagian pada badan dan ekor ikan.',
      ans: 'Sirip dan ekor',
      opts: ['Sirip dan ekor', 'Kepak dan paruh', 'Tanduk dan kuku', 'Cangkerang'],
      exp: '**Sirip dan ekor** membantu ikan berenang serta mengimbangi badannya di dalam air.'
    },
    {
      prompt: 'Siput babi dan kura-kura mempunyai **cangkerang** yang keras. Apakah fungsi utama cangkerang itu?',
      hint: 'Ke mana siput menyembunyikan badannya apabila diganggu?',
      ans: 'Melindungi badan yang lembut daripada bahaya',
      opts: [
        'Melindungi badan yang lembut daripada bahaya',
        'Membantu haiwan terbang tinggi',
        'Untuk berenang dengan laju',
        'Untuk mengunyah makanan keras'
      ],
      exp: '**Cangkerang keras** melindungi tubuh lembut siput dan kura-kura daripada musuh atau kecederaan.'
    },
    {
      prompt: 'Apakah persamaan bahagian tubuh yang terdapat pada **itik** dan **katak** untuk memudahkan mereka berenang?',
      hint: 'Perhatikan jari kaki mereka.',
      ans: 'Kaki berselaput renang',
      opts: ['Kaki berselaput renang', 'Badan berbulu pelepah', 'Mempunyai sesungut', 'Mempunyai tanduk'],
      exp: 'Itik dan katak mempunyai **kaki berselaput renang** yang bertindak seperti pendayung di dalam air.'
    },
    {
      prompt: 'Kerbau dan rusa mempunyai **tanduk** di kepalanya. Apakah kegunaan tanduk tersebut?',
      hint: 'Apabila diserang musuh.',
      ans: 'Melindungi diri daripada musuh',
      opts: [
        'Melindungi diri daripada musuh',
        'Untuk mendengar bunyi dari jauh',
        'Untuk menghidu makanan',
        'Untuk memanjat pokok'
      ],
      exp: '**Tanduk** digunakan oleh haiwan seperti kerbau, lembu dan rusa untuk mempertahankan diri daripada ancaman musuh.'
    },
    {
      prompt: 'Haiwan manakah yang mempunyai **kulit bersisik** pada badannya?',
      hint: 'Ikan, ular dan tenggiling.',
      ans: 'Ikan dan ular',
      opts: ['Ikan dan ular', 'Kucing dan arnab', 'Katak dan cacing', 'Burung helang dan itik'],
      exp: '**Ikan, ular, buaya dan tenggiling** mempunyai sisik untuk melindungi badan mereka.'
    },
    {
      prompt: 'Rama-rama dan pepatung menggunakan bahagian tubuh apakah untuk terbang di udara?',
      hint: 'Bahagian nipis pada badan serangga.',
      ans: 'Kepak (Sayap)',
      opts: ['Kepak (Sayap)', 'Sirip', 'Cangkerang', 'Kaki berselaput'],
      exp: 'Serangga seperti rama-rama dan burung mempunyai **kepak (sayap)** untuk terbang.'
    },
    {
      prompt: 'Apakah bahagian tubuh pada **kucing** dan **rama-rama** yang sensitif terhadap sentuhan dan deria di sekelilingnya?',
      hint: 'Misai atau antena halus di bahagian kepala.',
      ans: 'Sesungut / Misai',
      opts: ['Sesungut / Misai', 'Sisik', 'Paruh', 'Sumbu'],
      exp: '**Sesungut** membantu serangga mengesan rangsangan di persekitarannya.'
    },
    {
      prompt: 'Badak sumbu mempunyai bahagian khas yang keras di atas hidungnya yang dipanggil...',
      hint: 'Namanya sendiri ada pada nama haiwan itu.',
      ans: 'Sumbu',
      opts: ['Sumbu', 'Paruh', 'Sirip', 'Kepak'],
      exp: 'Badak sumbu mempunyai **sumbu** untuk mempertahankan dirinya.'
    }
  ],

  s1_s3: [
    {
      prompt: 'Pokok bunga raya dan pokok mangga mempunyai **urat daun jejala**. Apakah jenis akar bagi pokok tersebut?',
      hint: 'Pasangan urat daun jejala ialah akar tunjang.',
      ans: 'Akar tunjang',
      opts: ['Akar tunjang', 'Akar serabut', 'Akar gantung', 'Tiada akar'],
      exp: 'Tumbuhan berurat daun **jejala** (seperti pokok bunga raya, mangga, keembung) lazimnya mempunyai **akar tunjang**.'
    },
    {
      prompt: 'Pokok kelapa, pokok padi dan rumput mempunyai **urat daun selari**. Apakah jenis akarnya?',
      hint: 'Pasangan urat daun selari ialah akar serabut.',
      ans: 'Akar serabut',
      opts: ['Akar serabut', 'Akar tunjang', 'Batang berkayu', 'Urat jejala'],
      exp: 'Tumbuhan berurat daun **selari** (seperti rumput, padi, jagung, kelapa) mempunyai **akar serabut**.'
    },
    {
      prompt: 'Apakah fungsi utama **akar** kepada sebatang pokok?',
      hint: 'Apa yang akar serap dari dalam tanah dan bagaimana pokok berdiri tegak?',
      ans: 'Menyerap air dan nutrien serta mencengkam tanah supaya pokok tegak',
      opts: [
        'Menyerap air dan nutrien serta mencengkam tanah supaya pokok tegak',
        'Menghasilkan biji benih di udara',
        'Menarik perhatian serangga dengan warna terang',
        'Menghalang pokok daripada mendapat cahaya'
      ],
      exp: '**Akar** menyerap air dan nutrien dari tanah serta menyokong pokok supaya berdiri kukuh.'
    },
    {
      prompt: 'Bahagian tumbuhan manakah yang berfungsi **membuat makanan sendiri** (melalui cahaya matahari)?',
      hint: 'Bahagian yang berwarna hijau.',
      ans: 'Daun',
      opts: ['Daun', 'Akar', 'Bunga', 'Biji benih'],
      exp: '**Daun** yang berwarna hijau berfungsi menghasilkan makanan bagi tumbuhan.'
    },
    {
      prompt: 'Antara tumbuhan berikut, yang manakah mempunyai **batang tidak berkayu (lembut)**?',
      hint: 'Pokok pisang atau pokok betik.',
      ans: 'Pokok pisang dan pokok betik',
      opts: ['Pokok pisang dan pokok betik', 'Pokok durian dan pokok mangga', 'Pokok getah dan pokok rambutan', 'Pokok bunga raya dan pokok jati'],
      exp: '**Pokok pisang, betik dan keembung** mempunyai batang yang lembut (tidak berkayu).'
    },
    {
      prompt: 'Bahagian tumbuhan manakah yang akan bertukar menjadi **buah dan biji benih** untuk pembiakan?',
      hint: 'Bahagian yang cantik dan berwarna-warni.',
      ans: 'Bunga',
      opts: ['Bunga', 'Akar', 'Batang', 'Duri'],
      exp: '**Bunga** ialah bahagian pembiakan tumbuhan yang akan berkembang menjadi buah dan biji benih.'
    },
    {
      prompt: 'Apakah fungsi **batang** pada tumbuhan?',
      hint: 'Laluan antara akar di bawah dan daun di atas.',
      ans: 'Mengangkut air dan makanan ke seluruh bahagian tumbuhan',
      opts: [
        'Mengangkut air dan makanan ke seluruh bahagian tumbuhan',
        'Menyerap bunyi dari persekitaran',
        'Menukar warna bunga',
        'Menghasilkan oksigen di dalam tanah'
      ],
      exp: '**Batang** mengangkut air dan nutrien dari akar ke daun serta menyokong dahan dan daun.'
    },
    {
      prompt: 'Antara berikut, yang manakah merupakan tumbuhan **tidak berbunga**?',
      hint: 'Pokok paku pakis.',
      ans: 'Pokok paku pakis',
      opts: ['Pokok paku pakis', 'Pokok teratai', 'Pokok bunga kertas', 'Pokok mangga'],
      exp: '**Pokok paku pakis** dan lumut ialah tumbuhan tidak berbunga.'
    }
  ],

  s1_s4: [
    {
      prompt: 'Apakah yang berlaku apabila **dua kutub magnet yang SAMA** (contohnya Kutub Utara dan Kutub Utara) didekatkan?',
      hint: 'Sama kutub = tolak, berlainan kutub = tarik.',
      ans: 'Kedua-dua magnet akan menolak antara satu sama lain',
      opts: [
        'Kedua-dua magnet akan menolak antara satu sama lain',
        'Kedua-dua magnet akan menarik antara satu sama lain',
        'Magnet akan cair',
        'Tiada apa-apa berlaku'
      ],
      exp: '**Kutub magnet yang sama akan menolak**, manakala **kutub magnet yang berlainan (Utara & Selatan) akan menarik**.'
    },
    {
      prompt: 'Antara objek berikut, yang manakah **ditarik oleh magnet**?',
      hint: 'Cari objek yang diperbuat daripada besi atau keluli.',
      ans: 'Klip kertas besi dan paku besi',
      opts: ['Klip kertas besi dan paku besi', 'Pemadam getah dan pembaris plastik', 'Pensel kayu dan kertas tisu', 'Guli kaca dan syiling emas'],
      exp: 'Magnet menarik objek **bahan magnet** yang diperbuat daripada **besi, keluli, kobalt atau nikel**.'
    },
    {
      prompt: 'Objek manakah yang **menyerap air** dengan paling banyak?',
      hint: 'Digunakan untuk mengelap badan selepas mandi.',
      ans: 'Tuala kapas',
      opts: ['Tuala kapas', 'Beg plastik', 'Baju hujan', 'Sudu besi'],
      exp: '**Tuala kapas, tisu dan span** mempunyai liang halus yang menyerap air dengan banyak.'
    },
    {
      prompt: 'Mengapakah **payung** dan **baju hujan** diperbuat daripada bahan yang **tidak menyerap air (kalis air)**?',
      hint: 'Supaya air hujan tidak meresap ke badan kita.',
      ans: 'Supaya badan kita tidak basah apabila terkena hujan',
      opts: [
        'Supaya badan kita tidak basah apabila terkena hujan',
        'Supaya payung menjadi lebih berat semasa hujan',
        'Untuk menyerap semua air hujan',
        'Kerana kain kapas tidak boleh diwarnakan'
      ],
      exp: 'Bahan **kalis air** seperti plastik dan nilon menghalang air daripada menembusinya.'
    },
    {
      prompt: 'Sebiji **bola sepak** dan sebiji **guli** mempunyai bentuk tiga dimensi (3D) yang dipanggil...',
      hint: 'Bentuk bulat sempurna 3D.',
      ans: 'Sfera',
      opts: ['Sfera', 'Kubus', 'Piramid', 'Silinder'],
      exp: 'Objek berbentuk bulat 3D seperti bola dan guli mempunyai bentuk **Sfera**.'
    },
    {
      prompt: 'Sebuah tin susu pekat berbentuk **Silinder**. Apakah bentuk permukaan rata di bahagian atas dan bawah tin tersebut?',
      hint: 'Bentuk 2D pada penutup tin.',
      ans: 'Bulatan',
      opts: ['Bulatan', 'Segi tiga', 'Segi empat tepat', 'Bintang'],
      exp: 'Bentuk 3D **Silinder** mempunyai dua permukaan rata berbentuk **bulatan** dan satu permukaan melengkung.'
    },
    {
      prompt: 'Jenis tanah manakah yang mempunyai kandungan batu-batu kecil dan mengalirkan air dengan **paling laju** (kurang menakung air)?',
      hint: 'Tanah di tepi pantai.',
      ans: 'Tanah pasir',
      opts: ['Tanah pasir', 'Tanah liat', 'Tanah kebun', 'Lumpur'],
      exp: '**Tanah pasir** mempunyai ruang udara yang besar di antara butir pasir, menyebabkan air mengalir melaluinya dengan sangat cepat.'
    },
    {
      prompt: 'Jenis tanah yang mengandungi tumbuhan reput dan haiwan mati (humus) serta paling sesuai untuk bercucuk tanam ialah...',
      hint: 'Tanah berwarna gelap di kebun sayur.',
      ans: 'Tanah kebun',
      opts: ['Tanah kebun', 'Tanah pasir', 'Tanah liat', 'Batu kerikil'],
      exp: '**Tanah kebun** kaya dengan humus (nutrien) dan memegang jumlah air yang sesuai untuk pokok.'
    }
  ],

  // ---------------- DARJAH 2 ----------------
  s2_s1: [
    {
      prompt: 'Apakah perubahan yang berlaku kepada manusia sejak dilahirkan sehingga dewasa?',
      hint: 'Perhatikan baju dan kasut lama anda.',
      ans: 'Saiz badan, tinggi dan berat bertambah',
      opts: [
        'Saiz badan, tinggi dan berat bertambah',
        'Bilangan jari tangan semakin bertambah',
        'Saiz badan semakin mengecil',
        'Warna mata berubah setiap hari'
      ],
      exp: 'Semasa membesar, manusia mengalami pertambahan **saiz, ketinggian, dan berat badan**.'
    },
    {
      prompt: 'Walaupun dua orang murid berumur **8 tahun** yang sama, ketinggian dan berat badan mereka berbeza. Ini membuktikan bahawa...',
      hint: 'Adakah semua orang membesar pada kadar yang sama?',
      ans: 'Tumbesaran adalah berbeza antara individu walaupun sama umur',
      opts: [
        'Tumbesaran adalah berbeza antara individu walaupun sama umur',
        'Semua murid mesti mempunyai berat yang sama',
        'Murid yang rendah lebih tua',
        'Umur menentukan saiz kasut yang tepat'
      ],
      exp: 'Kadar tumbesaran adalah **berbeza antara individu** walaupun mereka sebaya.'
    },
    {
      prompt: 'Antara haiwan berikut, yang manakah membiak secara **melahirkan anak**?',
      hint: 'Haiwan mamalia (termasuk yang hidup di laut seperti ikan paus dan lumba-lumba).',
      ans: 'Ikan paus, kelawar dan kucing',
      opts: [
        'Ikan paus, kelawar dan kucing',
        'Penyu, katak dan buaya',
        'Ayam, itik dan burung unta',
        'Ular, cicak dan semut'
      ],
      exp: '**Ikan paus, lumba-lumba, kelawar, kucing dan gajah** ialah mamalia yang membiak dengan cara **melahirkan anak**.'
    },
    {
      prompt: 'Pilih urutan **kitar hidup katak** yang betul bermula daripada telur:',
      hint: 'Telur -> Berudu -> Anak katak -> Katak dewasa.',
      ans: 'Telur → Berudu → Anak katak → Katak dewasa',
      opts: [
        'Telur → Berudu → Anak katak → Katak dewasa',
        'Telur → Pupa → Berudu → Katak dewasa',
        'Berudu → Telur → Anak katak → Katak dewasa',
        'Telur → Beluncas → Kepompong → Katak dewasa'
      ],
      exp: 'Kitar hidup katak ialah: **Telur → Berudu → Anak katak → Katak dewasa**.'
    },
    {
      prompt: 'Pilih urutan **kitar hidup rama-rama** yang betul:',
      hint: 'Selepas telur menetas jadi beluncas (ulat), kemudian jadi kepompong (pupa).',
      ans: 'Telur → Beluncas (Larva) → Kepompong (Pupa) → Rama-rama',
      opts: [
        'Telur → Beluncas (Larva) → Kepompong (Pupa) → Rama-rama',
        'Telur → Kepompong → Beluncas → Rama-rama',
        'Beluncas → Telur → Rama-rama → Kepompong',
        'Telur → Berudu → Pupa → Rama-rama'
      ],
      exp: 'Kitar hidup rama-rama mengalami perubahan rupa (metamorfosis): **Telur → Beluncas (Larva) → Kepompong (Pupa) → Rama-rama dewasa**.'
    },
    {
      prompt: 'Mengapakah haiwan seperti **penyu** dan **katak** bertelur dengan bilangan yang **sangat banyak**?',
      hint: 'Adakah penyu menjaga telurnya daripada dimakan pemangsa?',
      ans: 'Kerana telurnya tidak dijaga dan mudah dimakan oleh haiwan lain',
      opts: [
        'Kerana telurnya tidak dijaga dan mudah dimakan oleh haiwan lain',
        'Kerana saiz badan penyu sangat kecil',
        'Supaya semua telur tenggelam ke dasar laut',
        'Kerana penyu tinggal di atas pokok'
      ],
      exp: 'Haiwan yang tidak menjaga telurnya akan **bertelur dengan banyak** bagi memastikan sebahagian anaknya terselamat untuk meneruskan spesies.'
    },
    {
      prompt: 'Antara anak haiwan berikut, yang manakah **TIDAK menyerupai** ibunya semasa baru menetas?',
      hint: 'Berudu dan beluncas.',
      ans: 'Berudu (anak katak) dan beluncas (anak rama-rama)',
      opts: [
        'Berudu (anak katak) dan beluncas (anak rama-rama)',
        'Anak kucing dan anak lembu',
        'Anak ayam dan anak itik',
        'Anak gajah dan anak kuda'
      ],
      exp: '**Berudu, beluncas dan jentik-jentik** mempunyai rupa bentuk yang berbeza daripada induknya dan akan berubah apabila dewasa.'
    },
    {
      prompt: 'Ciri manakah yang boleh **diwarisi** oleh seorang anak daripada ibu bapanya?',
      hint: 'Warna anak mata, jenis rambut (kerinting/lurus) atau warna kulit.',
      ans: 'Jenis rambut dan warna anak mata',
      opts: [
        'Jenis rambut dan warna anak mata',
        'Kegemaran makanan dan hobi membaca',
        'Parut luka akibat terjatuh basikal',
        'Markah peperiksaan Matematik'
      ],
      exp: 'Anak mewarisi ciri fizikal semula jadi seperti **warna iris mata, warna kulit, dan jenis rambut** daripada ibu bapa atau keturunannya.'
    }
  ],

  s2_s2: [
    {
      prompt: 'Apakah **tiga keperluan asas** untuk biji benih bercambah?',
      hint: 'Biji benih di dalam tanah belum ada daun, jadi ia belum perlukan cahaya matahari untuk bercambah!',
      ans: 'Air, udara dan suhu yang sesuai',
      opts: [
        'Air, udara dan suhu yang sesuai',
        'Cahaya matahari, baja dan racun serangga',
        'Batu, pasir dan plastik',
        'Cahaya lampu sahaja'
      ],
      exp: 'Untuk **percambahan biji benih**, ia memerlukan **air, udara dan suhu yang sesuai** (belum memerlukan cahaya matahari sehingga daun pertama tumbuh).'
    },
    {
      prompt: 'Apakah tiga keperluan asas tumbuhan untuk **terus hidup dan membesar dengan sihat** selepas mempunyai daun?',
      hint: 'Air, udara dan cahaya matahari.',
      ans: 'Air, udara dan cahaya matahari',
      opts: [
        'Air, udara dan cahaya matahari',
        'Makanan manusia, susu dan garam',
        'Api, ais dan angin kencang',
        'Kegelapan sepenuhnya'
      ],
      exp: 'Tumbuhan memerlukan **air, udara, dan cahaya matahari** untuk menjalankan proses membuat makanan dan membesar.'
    },
    {
      prompt: 'Sepasu pokok keembung diletakkan di dalam **kotak hitam yang tertutup rapat** selama seminggu tetapi disiram air setiap hari. Apakah yang akan berlaku kepada daunnya?',
      hint: 'Pokok itu tidak mendapat cahaya matahari.',
      ans: 'Daun pokok akan bertukar menjadi kekuningan dan layu',
      opts: [
        'Daun pokok akan bertukar menjadi kekuningan dan layu',
        'Daun pokok menjadi semakin hijau pekat dan segar',
        'Pokok akan mengeluarkan buah dengan cepat',
        'Pokok bertukar menjadi batu'
      ],
      exp: 'Tanpa **cahaya matahari**, daun tumbuhan tidak dapat membuat makanan dan akan berubah menjadi **kekuningan**.'
    },
    {
      prompt: 'Semasa tumbuhan membesar, perubahan manakah yang dapat diperhatikan?',
      hint: 'Lihat bilangan daun, saiz daun, tinggi pokok dan ukur lilit batang.',
      ans: 'Bilangan daun, ketinggian pokok dan ukur lilit batang bertambah',
      opts: [
        'Bilangan daun, ketinggian pokok dan ukur lilit batang bertambah',
        'Pokok semakin rendah dan daun semakin mengecil',
        'Akar pokok bertukar menjadi bunga',
        'Batang pokok hilang'
      ],
      exp: 'Semasa tumbesaran tumbuhan, **bilangan daun, saiz daun, tinggi pokok, dan ukur lilit batang akan bertambah**.'
    },
    {
      prompt: 'Mengapakah tumbuhan sangat penting kepada manusia dan haiwan?',
      hint: 'Apakah yang tumbuhan bekalkan kepada kita?',
      ans: 'Membekalkan sumber makanan, udara (oksigen) dan tempat perlindungan',
      opts: [
        'Membekalkan sumber makanan, udara (oksigen) dan tempat perlindungan',
        'Menghasilkan plastik dan besi',
        'Menyerap semua cahaya matahari supaya bumi gelap',
        'Menghasilkan bunyi bising'
      ],
      exp: 'Tumbuhan menjadi **sumber makanan**, membekalkan **oksigen** untuk pernafasan, dan menjadi **habitat (tempat tinggal)** haiwan.'
    },
    {
      prompt: 'Jika sehelai daun disapu dengan minyak vaselin pada kedua-dua permukaannya, daun itu akan layu kerana...',
      hint: 'Liang halus pada daun tertutup oleh minyak.',
      ans: 'Daun tidak mendapat udara',
      opts: [
        'Daun tidak mendapat udara',
        'Daun terlalu sejuk',
        'Daun menyerap terlalu banyak cahaya',
        'Akar pokok patah'
      ],
      exp: 'Minyak menutup liang pernafasan pada daun menyebabkan tumbuhan **tidak mendapat udara**.'
    }
  ],

  s2_s3: [
    {
      prompt: 'Antara berikut, yang manakah merupakan **sumber cahaya utama** bagi Bumi?',
      hint: 'Terbit pada waktu siang.',
      ans: 'Matahari',
      opts: ['Matahari', 'Bulan', 'Cermin muka', 'Kertas putih'],
      exp: '**Matahari** ialah sumber cahaya semula jadi yang utama. *(Bulan bukan sumber cahaya kerana ia hanya memantulkan cahaya Matahari).*'
    },
    {
      prompt: 'Bagaimanakah **bayang-bayang** terbentuk?',
      hint: 'Cahaya bergerak lurus dan tidak dapat menembusi objek legap.',
      ans: 'Apabila cahaya dihalang oleh suatu objek',
      opts: [
        'Apabila cahaya dihalang oleh suatu objek',
        'Apabila semua lampu dipadamkan di dalam bilik gelap',
        'Apabila cahaya menembusi kaca jernih sepenuhnya',
        'Apabila air mendidih'
      ],
      exp: '**Bayang-bayang** terbentuk apabila cahaya yang bergerak lurus **dihalang oleh objek legap atau lut cahaya**.'
    },
    {
      prompt: 'Objek manakah yang menghasilkan bayang-bayang yang **paling jelas**?',
      hint: 'Pilih objek legap yang tidak membenarkan cahaya menembusinya langsung.',
      ans: 'Buku tebal / Kad manila',
      opts: ['Buku tebal / Kad manila', 'Cermin mata kaca jernih', 'Akuarium kaca kosong', 'Plastik pembalut jernih'],
      exp: '**Buku tebal atau kad manila** ialah objek legap yang menghalang cahaya sepenuhnya, menghasilkan bayang-bayang paling jelas.'
    },
    {
      prompt: 'Apakah fungsi **sel kering (bateri)** di dalam satu litar elektrik lengkap?',
      hint: 'Membekalkan tenaga.',
      ans: 'Membekalkan tenaga elektrik',
      opts: [
        'Membekalkan tenaga elektrik',
        'Memutuskan dan menyambungkan litar',
        'Mengeluarkan cahaya',
        'Menyejukkan wayar'
      ],
      exp: '• **Sel kering**: Membekalkan tenaga elektrik.\n• **Mentol**: Mengeluarkan cahaya.\n• **Suis**: Menyambung dan memutuskan litar.'
    },
    {
      prompt: 'Apakah yang berlaku kepada mentol jika **suis dibuka (tidak bersambung)** dalam litar elektrik?',
      hint: 'Litar terbuka = arus elektrik tidak dapat mengalir.',
      ans: 'Mentol tidak menyala kerana litar tidak lengkap',
      opts: [
        'Mentol tidak menyala kerana litar tidak lengkap',
        'Mentol menyala dengan sangat terang',
        'Sel kering akan meletup',
        'Wayar bertukar warna'
      ],
      exp: 'Apabila suis **dibuka**, litar menjadi **tidak lengkap (terputus)** dan arus elektrik tidak dapat mengalir, maka mentol tidak menyala.'
    },
    {
      prompt: 'Bahan yang membenarkan arus elektrik mengalir melaluinya supaya mentol menyala dipanggil...',
      hint: 'Contohnya paku besi, kunci logam dan duit syiling.',
      ans: 'Konduktor elektrik',
      opts: ['Konduktor elektrik', 'Penebat elektrik', 'Bahan lut sinar', 'Sumber cahaya'],
      exp: '**Konduktor elektrik** (seperti logam besi, kuprum, emas) membenarkan arus elektrik mengalir melaluinya.'
    },
    {
      prompt: 'Antara objek berikut, yang manakah merupakan **penebat elektrik** (mentol TIDAK menyala apabila disambungkan)?',
      hint: 'Bukan logam.',
      ans: 'Pemadam getah dan batang aiskrim kayu',
      opts: ['Pemadam getah dan batang aiskrim kayu', 'Paku besi dan sudu keluli', 'Klip kertas logam', 'Kunci tembaga'],
      exp: '**Getah, plastik, kayu, kaca dan kain** ialah **penebat elektrik** yang tidak mengalirkan arus elektrik.'
    }
  ],

  s2_s4: [
    {
      prompt: 'Apakah kaedah paling sesuai untuk mengasingkan campuran **serbuk besi (klip kertas)** dan **pasir halus**?',
      hint: 'Besi ditarik oleh magnet.',
      ans: 'Menggunakan magnet',
      opts: ['Menggunakan magnet', 'Menggunakan kertas turas dan air', 'Mengapungkan di atas air', 'Membiarkan di bawah matahari'],
      exp: 'Kerana besi ialah bahan magnet manakala pasir bukan bahan magnet, kita boleh mengasingkannya dengan **menggunakan magnet**.'
    },
    {
      prompt: 'Kaedah manakah yang paling sesuai untuk mengasingkan campuran **tepung gandum** dan **kacang tanah**?',
      hint: 'Saiz butiran tepung halus, manakala kacang tanah bersaiz besar.',
      ans: 'Menyaring (Mengayak)',
      opts: ['Menyaring (Mengayak)', 'Menggunakan magnet', 'Menuras dengan kapas', 'Meniup dengan penyedut minuman'],
      exp: '**Menyaring (mengayak)** digunakan untuk mengasingkan dua bahan pepejal yang berbeza saiz.'
    },
    {
      prompt: 'Bagaimanakah cara mengasingkan **pasir** yang bercampur di dalam **air**?',
      hint: 'Pasir tidak larut dalam air.',
      ans: 'Menuras menggunakan corong turas dan kertas turas',
      opts: [
        'Menuras menggunakan corong turas dan kertas turas',
        'Menggunakan magnet bar',
        'Mengayak dengan penapis teh kasar',
        'Mengutip satu demi satu dengan jari'
      ],
      exp: 'Kaedah **menuras** menggunakan kertas turas dapat mengasingkan bahan pepejal tidak larut (pasir) daripada cecair (air).'
    },
    {
      prompt: 'Antara keadaan berikut, yang manakah menyebabkan **gula melarut paling cepat** di dalam air?',
      hint: 'Air panas + dikacau + gula halus.',
      ans: 'Gula halus dimasukkan ke dalam air panas dan dikacau',
      opts: [
        'Gula halus dimasukkan ke dalam air panas dan dikacau',
        'Gula batu besar dimasukkan ke dalam air sejuk tanpa dikacau',
        'Gula kasar di dalam air sejuk tanpa dikacau',
        'Gula batu di dalam ais'
      ],
      exp: 'Bahan lebih cepat larut apabila:\n1) Menggunakan **air panas**\n2) **Dikacau**\n3) Saiz bahan **lebih kecil/halus**.'
    },
    {
      prompt: 'Ke manakah arah **aliran air semula jadi** seperti sungai dan air terjun?',
      hint: 'Dari gunung ke laut.',
      ans: 'Dari tempat tinggi ke tempat rendah',
      opts: [
        'Dari tempat tinggi ke tempat rendah',
        'Dari tempat rendah ke puncak gunung',
        'Dari laut naik ke bukit',
        'Air tidak bergerak langsung'
      ],
      exp: 'Secara semula jadi, air sentiasa mengalir **dari kawasan tinggi ke kawasan rendah**.'
    },
    {
      prompt: 'Apakah yang dinamakan sebagai **angin**?',
      hint: 'Berkaitan dengan udara.',
      ans: 'Udara yang bergerak',
      opts: ['Udara yang bergerak', 'Air yang membeku', 'Cahaya yang terpantul', 'Tanah yang bergetar'],
      exp: '**Angin** ialah **udara yang bergerak**. Walaupun udara tidak dapat dilihat, pergerakannya dapat dirasai.'
    }
  ],

  // ---------------- DARJAH 3 ----------------
  s3_s1: [
    {
      prompt: 'Apakah fungsi utama **gigi kacip** (gigi hadapan yang rata) pada manusia?',
      hint: 'Ketika kita menggigit buah epal atau roti.',
      ans: 'Memotong makanan',
      opts: ['Memotong makanan', 'Mengoyak makanan (seperti daging)', 'Melumatkan makanan', 'Menelan makanan'],
      exp: '• **Gigi kacip**: Memotong makanan\n• **Gigi taring**: Mengoyak makanan\n• **Gigi geraham**: Memecah dan melumatkan makanan.'
    },
    {
      prompt: 'Berapakah bilangan keseluruhan **set gigi kekal** bagi seorang manusia dewasa yang lengkap?',
      hint: 'Set gigi susu ada 20 batang, manakala set gigi kekal ada 32 batang.',
      ans: '32 batang',
      opts: ['32 batang', '20 batang', '16 batang', '40 batang'],
      exp: 'Set **gigi susu** mempunyai **20 batang**, manakala set **gigi kekal** mempunyai **32 batang**.'
    },
    {
      prompt: 'Kelas makanan manakah yang berfungsi untuk **membina tubuh dan membantu tumbesaran** (contohnya ikan, ayam, telur, susu dan kekacang)?',
      hint: 'Penting untuk otot dan tumbesaran kanak-kanak.',
      ans: 'Protein',
      opts: ['Protein', 'Karbohidrat', 'Pelawas (Serat)', 'Lemak'],
      exp: '**Protein** (ikan, daging, telur, susu) berfungsi untuk **tumbesaran** dan membaiki tisu badan.'
    },
    {
      prompt: 'Nasi, roti, mi dan ubi kentang kaya dengan **karbohidrat**. Apakah kepentingan karbohidrat kepada badan?',
      hint: 'Supaya kita bertenaga untuk belajar dan bersukan.',
      ans: 'Memberikan tenaga',
      opts: ['Memberikan tenaga', 'Mencegah sembelit sahaja', 'Mengawal suhu badan sahaja', 'Merawat tulang patah'],
      exp: '**Karbohidrat** merupakan sumber utama yang **memberikan tenaga** kepada tubuh.'
    },
    {
      prompt: 'Makan sayur-sayuran dan buah-buahan yang kaya dengan **pelawas (serat)** dapat mengelakkan masalah...',
      hint: 'Masalah sukar membuang air besar.',
      ans: 'Sembelit',
      opts: ['Sembelit', 'Rabun mata', 'Kerosakan gigi', 'Demam panas'],
      exp: '**Pelawas** melancarkan pergerakan makanan dalam usus dan mencegah **sembelit**.'
    },
    {
      prompt: 'Pilih urutan **aliran makanan semasa pencernaan** yang betul:',
      hint: 'Bermula dari mulut dan berakhir di dubur.',
      ans: 'Mulut → Esofagus → Perut → Usus → Dubur',
      opts: [
        'Mulut → Esofagus → Perut → Usus → Dubur',
        'Mulut → Peparu → Perut → Jantung → Dubur',
        'Mulut → Perut → Esofagus → Usus → Dubur',
        'Hidung → Esofagus → Usus → Perut → Dubur'
      ],
      exp: 'Urutan saluran pencernaan manusia ialah: **Mulut → Esofagus → Perut → Usus → Dubur**.'
    }
  ],

  s3_s2: [
    {
      prompt: 'Haiwan yang makan **tumbuhan sahaja** seperti lembu, kambing, arnab dan belalang dikenali sebagai...',
      hint: 'Herb = tumbuhan.',
      ans: 'Herbivor',
      opts: ['Herbivor', 'Karnivor', 'Omnivor', 'Pemangsa'],
      exp: '• **Herbivor**: Makan tumbuhan sahaja\n• **Karnivor**: Makan haiwan lain sahaja\n• **Omnivor**: Makan tumbuhan dan haiwan lain.'
    },
    {
      prompt: 'Apakah fungsi **gigi taring yang tajam** pada haiwan **karnivor** seperti harimau dan singa?',
      hint: 'Untuk makan daging mangsa.',
      ans: 'Mengoyakkan daging mangsa',
      opts: ['Mengoyakkan daging mangsa', 'Mengisar rumput sehingga lumat', 'Memotong daun pokok', 'Menyimpan air'],
      exp: 'Haiwan **karnivor** mempunyai **gigi taring yang panjang dan tajam** untuk mengoyakkan daging.'
    },
    {
      prompt: 'Ayam, monyet, beruang dan lipas makan kedua-dua tumbuhan dan haiwan lain. Haiwan ini dikelaskan sebagai...',
      hint: 'Omni = semuanya.',
      ans: 'Omnivor',
      opts: ['Omnivor', 'Herbivor', 'Karnivor', 'Amfibia'],
      exp: '**Omnivor** makan kedua-dua tumbuhan dan haiwan lain, serta mempunyai ketiga-tiga jenis gigi (kacip, taring, geraham).'
    },
    {
      prompt: 'Bagaimanakah **pokok paku pakis**, **cendawan** dan **lumut** membiak?',
      hint: 'Tumbuhan ini tidak berbunga dan tidak menghasilkan biji benih.',
      ans: 'Melalui spora',
      opts: ['Melalui spora', 'Melalui biji benih', 'Melalui keratan batang', 'Melalui daun'],
      exp: 'Paku pakis, cendawan dan lumut membiak melalui **spora**.'
    },
    {
      prompt: 'Tumbuhan manakah yang membiak melalui **daun**?',
      hint: 'Pokok setawar dan pokok lidah jin.',
      ans: 'Pokok setawar dan pokok lidah jin',
      opts: [
        'Pokok setawar dan pokok lidah jin',
        'Pokok pisang dan pokok nanas',
        'Pokok ubi kayu dan pokok tebu',
        'Pokok durian dan pokok betik'
      ],
      exp: '**Pokok setawar, begonia dan lidah jin** boleh membiak melalui **daun**.'
    },
    {
      prompt: 'Pokok **ubi kayu**, **tebu** dan **bunga raya** membiak menggunakan kaedah...',
      hint: 'Batangnya dipotong dan dicucuk ke dalam tanah.',
      ans: 'Keratan batang',
      opts: ['Keratan batang', 'Spora', 'Batang bawah tanah', 'Daun'],
      exp: '**Ubi kayu, tebu dan bunga raya** membiak melalui **keratan batang**.'
    },
    {
      prompt: 'Pokok **pisang** dan pokok **buluh** membiak melalui...',
      hint: 'Tumbuh tunas baharu di pangkal pokok induk.',
      ans: 'Anak pokok (Sulur)',
      opts: ['Anak pokok (Sulur)', 'Spora', 'Daun', 'Keratan batang'],
      exp: 'Pokok pisang, nanas dan buluh membiak melalui **anak pokok (sulur)**.'
    }
  ],

  s3_s3: [
    {
      prompt: 'Mengapakah seketul **gabus** dan **pelampung plastik** timbul di permukaan air, manakala **duit syiling** tenggelam?',
      hint: 'Bandingkan ketumpatan objek dengan ketumpatan air.',
      ans: 'Gabus kurang tumpat daripada air, manakala syiling lebih tumpat daripada air',
      opts: [
        'Gabus kurang tumpat daripada air, manakala syiling lebih tumpat daripada air',
        'Gabus lebih tumpat daripada air',
        'Semua objek ringan mesti tenggelam',
        'Air menolak objek logam ke atas'
      ],
      exp: 'Objek yang **kurang tumpat daripada air akan timbul**, manakala objek yang **lebih tumpat daripada air akan tenggelam**.'
    },
    {
      prompt: 'Sebiji telur ayam yang tenggelam di dalam air paip akan **timbul** apabila kita melarutkan banyak **garam** ke dalam air tersebut. Mengapa?',
      hint: 'Garam meningkatkan ketumpatan air.',
      ans: 'Air garam menjadi lebih tumpat daripada telur itu',
      opts: [
        'Air garam menjadi lebih tumpat daripada telur itu',
        'Telur menjadi lebih berat di dalam air garam',
        'Air garam menjadi kurang tumpat daripada air paip',
        'Garam mengecilkan saiz telur'
      ],
      exp: 'Melarutkan garam atau gula menjadikan air **lebih tumpat**, menyebabkan telur menjadi kurang tumpat berbanding air garam lalu timbul.'
    },
    {
      prompt: 'Bahan **berasid** seperti jus limau dan cuka akan menukarkan warna **kertas litmus** daripada...',
      hint: 'Ingat kod mudah: Asid = Biru ke Merah (B -> M).',
      ans: 'Biru kepada Merah',
      opts: ['Biru kepada Merah', 'Merah kepada Biru', 'Tidak berubah warna', 'Bertukar menjadi hijau'],
      exp: 'Bahan **berasid** (rasa masam) menukarkan kertas litmus **Biru kepada Merah**.'
    },
    {
      prompt: 'Bahan **beralkali** seperti sabun pencuci, ubat gigi dan syampu berasa pahit serta licin apabila disentuh. Ia menukarkan kertas litmus...',
      hint: 'Alkali = Merah ke Biru (M -> B).',
      ans: 'Merah kepada Biru',
      opts: ['Merah kepada Biru', 'Biru kepada Merah', 'Merah kepada Kuning', 'Tiada perubahan'],
      exp: 'Bahan **beralkali** menukarkan kertas litmus **Merah kepada Biru**.'
    },
    {
      prompt: 'Air suling, air gula dan minyak masak tidak menukarkan warna kedua-dua kertas litmus merah dan biru. Apakah sifat kimia bahan ini?',
      hint: 'Bukan asid dan bukan alkali.',
      ans: 'Neutral',
      opts: ['Neutral', 'Berasid kuat', 'Beralkali kuat', 'Beracun'],
      exp: 'Bahan **neutral** tidak mengubah warna kertas litmus biru mahupun merah.'
    },
    {
      prompt: 'Apakah alat dan kaedah yang digunakan untuk menyukat **isi padu sebiji batu yang tidak sekata**?',
      hint: 'Masukkan batu ke dalam silinder penyukat berisi air.',
      ans: 'Silinder penyukat melalui kaedah sesaran air',
      opts: [
        'Silinder penyukat melalui kaedah sesaran air',
        'Pembaris meter dan kertas petak',
        'Termometer makmal',
        'Kertas litmus biru'
      ],
      exp: 'Isi padu objek tidak sekata disukat menggunakan **silinder penyukat** dan **tinureka** melalui **kaedah sesaran air**.'
    }
  ],

  s3_s4: [
    {
      prompt: 'Berapakah jumlah planet utama yang mengelilingi Matahari di dalam **Sistem Suria** kita?',
      hint: 'Utarid, Zuhrah, Bumi, Marikh, Musytari, Zuhal, Uranus, Neptun.',
      ans: '8 buah planet',
      opts: ['8 buah planet', '9 buah planet', '7 buah planet', '12 buah planet'],
      exp: 'Terdapat **8 buah planet** dalam Sistem Suria: **Utarid, Zuhrah, Bumi, Marikh, Musytari, Zuhal, Uranus, dan Neptun**.'
    },
    {
      prompt: 'Apakah planet yang terletak **paling dekat** dengan Matahari?',
      hint: 'Planet pertama dalam urutan Sistem Suria.',
      ans: 'Utarid',
      opts: ['Utarid', 'Zuhrah', 'Marikh', 'Neptun'],
      exp: '**Utarid (Mercury)** ialah planet pertama dan paling hampir dengan Matahari.'
    },
    {
      prompt: 'Apakah planet yang **paling besar** di dalam Sistem Suria?',
      hint: 'Planet kelima selepas Marikh.',
      ans: 'Musytari',
      opts: ['Musytari', 'Zuhal', 'Bumi', 'Uranus'],
      exp: '**Musytari (Jupiter)** ialah planet terbesar di dalam Sistem Suria.'
    },
    {
      prompt: 'Planet manakah yang mempunyai **gelang (cincin) yang paling jelas dan cantik** mengelilinginya?',
      hint: 'Planet keenam dari Matahari.',
      ans: 'Zuhal',
      opts: ['Zuhal', 'Zuhrah', 'Marikh', 'Utarid'],
      exp: '**Zuhal (Saturn)** terkenal dengan sistem gelang ais dan batuan yang mengelilinginya.'
    },
    {
      prompt: 'Di manakah terletaknya **jaluran asteroid** di dalam Sistem Suria?',
      hint: 'Di antara planet keempat dan planet kelima.',
      ans: 'Di antara planet Marikh dan Musytari',
      opts: [
        'Di antara planet Marikh dan Musytari',
        'Di antara Bumi dan Zuhrah',
        'Di antara Zuhal dan Uranus',
        'Di sekeliling Bulan sahaja'
      ],
      exp: 'Lingkaran **asteroid** beredar mengelilingi Matahari di antara orbit **Marikh dan Musytari**.'
    },
    {
      prompt: 'Apakah kelebihan menggunakan **takal** untuk mengangkat beban yang berat (seperti menaikkan bendera atau timba perigi)?',
      hint: 'Menjadikan kerja mengangkat beban lebih mudah.',
      ans: 'Memudahkan kerja mengangkat beban berat dengan daya yang lebih kecil',
      opts: [
        'Memudahkan kerja mengangkat beban berat dengan daya yang lebih kecil',
        'Menjadikan beban dua kali ganda lebih berat',
        'Menghasilkan tenaga elektrik',
        'Menyejukkan tali'
      ],
      exp: '**Takal** ialah mesin ringkas yang mengubah arah daya dan memudahkan kerja mengangkat beban ke tempat tinggi.'
    }
  ],

  // ---------------- DARJAH 4 (SASARAN ANAK 10 TAHUN) ----------------
  s4_s1: [
    {
      prompt: 'Pilih urutan laluan udara yang betul semasa manusia **menarik nafas**:',
      hint: 'Udara masuk dari luar menuju ke peparu.',
      ans: 'Hidung → Trakea → Peparu',
      opts: [
        'Hidung → Trakea → Peparu',
        'Peparu → Trakea → Hidung',
        'Hidung → Esofagus → Perut',
        'Mulut → Jantung → Peparu'
      ],
      exp: 'Semasa **menarik nafas**, udara masuk melalui **Hidung → Trakea → Peparu** (dan dada bergerak ke atas serta mengembang).'
    },
    {
      prompt: 'Berbanding udara sedutan, **udara hembusan** mengandungi...',
      hint: 'Badan kita telah menggunakan oksigen dan membebaskan karbon dioksida.',
      ans: 'Kurang oksigen dan lebih banyak karbon dioksida',
      opts: [
        'Kurang oksigen dan lebih banyak karbon dioksida',
        'Lebih banyak oksigen dan kurang karbon dioksida',
        'Tiada oksigen langsung',
        'Kandungan gas yang sama tepat'
      ],
      exp: 'Udara **hembusan** mengandungi **kurang oksigen** dan **lebih karbon dioksida** berbanding udara sedutan.'
    },
    {
      prompt: 'Apakah perbezaan antara proses **perkumuhan** dan **penyahtinjaan**?',
      hint: 'Ginjal/kulit/peparu vs tinja melalui dubur.',
      ans: 'Perkumuhan menyingkirkan bahan buangan dari badan (peluh/air kencing), manakala penyahtinjaan menyingkirkan sisa makanan tidak tercerna (tinja)',
      opts: [
        'Perkumuhan menyingkirkan bahan buangan dari badan (peluh/air kencing), manakala penyahtinjaan menyingkirkan sisa makanan tidak tercerna (tinja)',
        'Kedua-duanya mengeluarkan peluh melalui kulit',
        'Perkumuhan berlaku di perut sahaja',
        'Penyahtinjaan mengeluarkan karbon dioksida melalui peparu'
      ],
      exp: '• **Perkumuhan**: Peparu (karbon dioksida & wap air), Kulit (peluh), Ginjal (air kencing).\n• **Penyahtinjaan**: Penyingkiran tinja melalui dubur.'
    },
    {
      prompt: 'Apakah hasil perkumuhan yang disingkirkan oleh organ **ginjal (buah pinggang)**?',
      hint: 'Disingkirkan melalui pundi kencing.',
      ans: 'Air kencing (Urin)',
      opts: ['Air kencing (Urin)', 'Peluh sahaja', 'Tinja', 'Gas oksigen'],
      exp: '**Ginjal** menapis darah dan menyingkirkan bahan buangan dalam bentuk **air kencing (urin)**.'
    },
    {
      prompt: 'Hakim menarik tangannya dengan pantas apabila tersentuh cerek panas. Apakah kepentingan gerak balas terhadap rangsangan ini?',
      hint: 'Apa akan berlaku jika tangan Hakim kekal di atas cerek panas?',
      ans: 'Melindungi diri daripada kecederaan dan bahaya',
      opts: [
        'Melindungi diri daripada kecederaan dan bahaya',
        'Untuk menguji kepanasan cerek',
        'Untuk menguatkan otot jari',
        'Supaya air lebih cepat mendidih'
      ],
      exp: 'Gerak balas terhadap rangsangan melindungi manusia daripada **bahaya dan kecederaan serius**.'
    },
    {
      prompt: 'Tabiat buruk manakah yang **mengganggu gerak balas manusia** terhadap rangsangan dan merosakkan organ deria?',
      hint: 'Menyebabkan khayal dan lambat bertindak balas.',
      ans: 'Menghidu gam, penyalahgunaan dadah dan meminum alkohol',
      opts: [
        'Menghidu gam, penyalahgunaan dadah dan meminum alkohol',
        'Bersenam tiga kali seminggu',
        'Tidur selama 8 jam sehari',
        'Minum air kosong yang mencukupi'
      ],
      exp: 'Alkohol, dadah dan menghidu gam **melambatkan gerak balas sistem saraf dan deria** terhadap rangsangan.'
    }
  ],

  s4_s2: [
    {
      prompt: 'Haiwan manakah yang bernafas menggunakan **spirakel** (liang pernafasan pada abdomen)?',
      hint: 'Serangga.',
      ans: 'Belalang, lipas dan beluncas',
      opts: [
        'Belalang, lipas dan beluncas',
        'Ikan, berudu dan ketam',
        'Cacing tanah dan lintah',
        'Kucing, burung dan ikan paus'
      ],
      exp: 'Serangga seperti **belalang, lipas, semut dan beluncas** bernafas melalui **spirakel**.'
    },
    {
      prompt: 'Mengapakah **katak** dikategorikan sebagai haiwan yang mempunyai **dua organ pernafasan**?',
      hint: 'Di darat dan di dalam air.',
      ans: 'Bernafas menggunakan peparu di darat dan kulit lembap semasa di dalam air',
      opts: [
        'Bernafas menggunakan peparu di darat dan kulit lembap semasa di dalam air',
        'Bernafas menggunakan insang dan spirakel',
        'Bernafas menggunakan hidung dan telinga',
        'Katak tidak bernafas di dalam air'
      ],
      exp: 'Haiwan amfibia seperti **katak dan salamander** mempunyai **peparu** (untuk di darat) dan **kulit yang lembap** (untuk resapan udara di dalam air).'
    },
    {
      prompt: 'Apakah maksud haiwan **vertebrata**?',
      hint: 'Mempunyai tulang belakang.',
      ans: 'Haiwan yang mempunyai tulang belakang',
      opts: [
        'Haiwan yang mempunyai tulang belakang',
        'Haiwan yang tidak mempunyai tulang belakang',
        'Haiwan yang hidup di dalam air sahaja',
        'Haiwan yang makan tumbuhan sahaja'
      ],
      exp: '**Vertebrata** ialah haiwan bertulang belakang (Mamalia, Reptilia, Amfibia, Burung, Ikan), manakala **Invertebrata** tidak mempunyai tulang belakang.'
    },
    {
      prompt: 'Kelawar, ikan paus dan tenggiling dikelaskan dalam kumpulan **Mamalia** kerana...',
      hint: 'Walaupun kelawar terbang dan paus berenang, bagaimana mereka membiak dan menyusukan anak?',
      ans: 'Melahirkan anak, menyusukan anak dan bernafas menggunakan peparu',
      opts: [
        'Melahirkan anak, menyusukan anak dan bernafas menggunakan peparu',
        'Bertelur dan berdarah sejuk',
        'Bernafas menggunakan insang',
        'Mempunyai bulu pelepah'
      ],
      exp: '**Mamalia** melahirkan anak, menyusukan anaknya, berdarah panas, dan bernafas melalui peparu.'
    },
    {
      prompt: 'Bahagian tumbuhan iaitu **pucuk** akan bergerak balas tumbuh ke arah...',
      hint: 'Untuk mendapatkan cahaya.',
      ans: 'Cahaya matahari',
      opts: ['Cahaya matahari', 'Tarikan graviti ke bawah', 'Tempat gelap', 'Bunyi bising'],
      exp: '• **Pucuk**: Bergerak balas terhadap **cahaya matahari**.\n• **Akar**: Bergerak balas terhadap **air** dan **graviti**.'
    },
    {
      prompt: 'Apakah **dua hasil utama** daripada proses **fotosintesis** yang dijalankan oleh tumbuhan?',
      hint: 'Makanan tumbuhan (disimpan sebagai kanji) dan gas untuk kita bernafas.',
      ans: 'Glukosa (kanji) dan gas oksigen',
      opts: [
        'Glukosa (kanji) dan gas oksigen',
        'Gas karbon dioksida dan klorofil',
        'Air dan cahaya matahari',
        'Tanah dan baja'
      ],
      exp: 'Semasa **fotosintesis**, tumbuhan menggunakan cahaya matahari, klorofil, karbon dioksida dan air untuk menghasilkan **glukosa (disimpan sebagai kanji) dan oksigen**.'
    }
  ],

  s4_s3: [
    {
      prompt: 'Sebatang pensel yang diletakkan di dalam gelas berisi air kelihatan **bengkok**. Fenomena ini berlaku kerana sifat cahaya iaitu...',
      hint: 'Cahaya bergerak melalui dua medium berbeza (udara dan air).',
      ans: 'Cahaya boleh dibiaskan (Pembiasan cahaya)',
      opts: [
        'Cahaya boleh dibiaskan (Pembiasan cahaya)',
        'Cahaya dipantulkan oleh cermin',
        'Cahaya tidak dapat menembusi air',
        'Pensel menjadi lembut di dalam air'
      ],
      exp: '**Pembiasan cahaya** berlaku apabila cahaya bergerak melalui dua medium yang berbeza ketumpatan (udara dan air), menyebabkan pensel kelihatan bengkok.'
    },
    {
      prompt: 'Alat manakah yang menggunakan prinsip **pantulan cahaya** dengan dua keping cermin satah untuk melihat objek di sebalik halangan (seperti di dalam kapal selam)?',
      hint: 'Digunakan dalam kapal selam.',
      ans: 'Periskop',
      opts: ['Periskop', 'Kanta pembesar', 'Stetoskop', 'Termometer'],
      exp: '**Periskop** menggunakan dua cermin satah untuk **memantulkan cahaya** daripada objek di sebalik halangan ke mata pemerhati.'
    },
    {
      prompt: 'Bagaimanakah **bunyi** dihasilkan oleh alat muzik seperti gitar, gendang dan seruling?',
      hint: 'Tali gitar dipetik, kulit gendang dipalu.',
      ans: 'Melalui getaran',
      opts: ['Melalui getaran', 'Melalui pembiasan cahaya', 'Melalui tarikan magnet', 'Melalui penyejatan'],
      exp: 'Semua bunyi dihasilkan oleh objek yang **bergetar** dan bunyi bergerak ke semua arah.'
    },
    {
      prompt: 'Pantulan bunyi apabila terkena permukaan keras seperti dinding gua atau bilik kosong dipanggil...',
      hint: 'Bunyi berulang di dalam gua.',
      ans: 'Gema',
      opts: ['Gema', 'Pembiasan', 'Pelangi', 'Getaran cahaya'],
      exp: '**Gema** ialah bunyi yang terpantul apabila terkena permukaan yang keras dan rata.'
    },
    {
      prompt: 'Apakah perubahan bentuk tenaga yang berlaku apabila **lampu suluh dinyalakan**?',
      hint: 'Bateri (tenaga kimia) -> elektrik -> cahaya + haba.',
      ans: 'Tenaga kimia → Tenaga elektrik → Tenaga cahaya + Tenaga haba',
      opts: [
        'Tenaga kimia → Tenaga elektrik → Tenaga cahaya + Tenaga haba',
        'Tenaga suria → Tenaga kinetik → Tenaga bunyi',
        'Tenaga keupayaan → Tenaga nuklear',
        'Tenaga bunyi → Tenaga kimia'
      ],
      exp: 'Sel kering menyimpan **tenaga kimia**, ditukar kepada **tenaga elektrik**, dan mentol menghasilkan **tenaga cahaya serta tenaga haba**.'
    },
    {
      prompt: 'Antara sumber tenaga berikut, yang manakah merupakan **sumber tenaga BOLEH DIBAHARUI**?',
      hint: 'Tenaga yang tidak akan habis dan mesra alam.',
      ans: 'Matahari (Suria), angin, ombak dan biojisim',
      opts: [
        'Matahari (Suria), angin, ombak dan biojisim',
        'Petroleum, arang batu dan gas asli',
        'Bahan api nuklear dan diesel',
        'Bateri pakai buang'
      ],
      exp: '**Matahari, angin, air (hidro), ombak dan biojisim** ialah sumber tenaga **boleh dibaharui** yang sentiasa ada secara berterusan.'
    }
  ],

  s4_s4: [
    {
      prompt: 'Apakah sumber asas bagi bahan untuk membuat **tayar kereta** dan **sarung tangan getah**?',
      hint: 'Susu getah daripada pokok getah.',
      ans: 'Tumbuhan (Pokok getah)',
      opts: ['Tumbuhan (Pokok getah)', 'Batuan (Logam)', 'Petroleum', 'Haiwan (Biri-biri)'],
      exp: 'Getah asli diperoleh daripada susu pokok getah, iaitu sumber asas **tumbuhan**.'
    },
    {
      prompt: 'Mengapakah pemegang periuk memasak diperbuat daripada **plastik atau kayu**, manakala badannya diperbuat daripada **logam**?',
      hint: 'Kaitkan dengan konduktor haba dan penebat haba.',
      ans: 'Logam ialah konduktor haba yang baik (cepat panas), manakala plastik/kayu ialah penebat haba (elak tangan melecur)',
      opts: [
        'Logam ialah konduktor haba yang baik (cepat panas), manakala plastik/kayu ialah penebat haba (elak tangan melecur)',
        'Plastik lebih cepat mengalirkan haba berbanding logam',
        'Kayu boleh mencairkan logam',
        'Supaya periuk terapung di atas air'
      ],
      exp: '**Logam** ialah **konduktor haba** supaya makanan cepat masak, manakala **plastik/kayu** ialah **penebat haba** supaya tangan tidak melecur apabila memegangnya.'
    },
    {
      prompt: 'Bumi berputar pada paksinya mengikut arah **lawan jam** (dari Barat ke Timur) selama **24 jam**. Apakah kesan putaran Bumi ini?',
      hint: 'Perubahan siang dan malam.',
      ans: 'Kejadian siang dan malam serta perubahan panjang dan arah bayang-bayang',
      opts: [
        'Kejadian siang dan malam serta perubahan panjang dan arah bayang-bayang',
        'Bumi berhenti mengelilingi Matahari',
        'Tarikan graviti Bumi hilang pada waktu malam',
        'Bulan bertukar menjadi Matahari'
      ],
      exp: 'Kesan **putaran Bumi pada paksinya** ialah:\n1) Kejadian siang dan malam\n2) Kedudukan Matahari kelihatan berubah-ubah\n3) Perubahan panjang dan arah bayang-bayang.'
    },
    {
      prompt: 'Pada waktu **pukul 8:00 pagi** (Matahari terbit di sebelah **Timur**), ke arah manakah **bayang-bayang** sebatang tiang akan terbentuk?',
      hint: 'Bayang-bayang sentiasa terbentuk bertentangan dengan arah cahaya Matahari.',
      ans: 'Barat',
      opts: ['Barat', 'Timur', 'Tepat di bawah tiang sahaja', 'Tiada bayang-bayang'],
      exp: 'Pada waktu **pagi**, Matahari berada di sebelah **Timur**, maka bayang-bayang menghala ke arah **Barat**. Pada waktu **petang**, Matahari di Barat, maka bayang-bayang menghala ke **Timur**.'
    },
    {
      prompt: 'Pada komponen mesin ringkas **Tuas** (seperti jongkang-jongket atau penyepit ais), apakah tiga bahagian utamanya?',
      hint: 'Beban, Daya, dan titik tengah yang menyokongnya.',
      ans: 'Beban, Fulkrum dan Daya',
      opts: [
        'Beban, Fulkrum dan Daya',
        'Gear, Skru dan Roda',
        'Takal, Tali dan Satah',
        'Bateri, Suis dan Mentol'
      ],
      exp: 'Sistem **Tuas** terdiri daripada tiga bahagian iaitu **Beban**, **Fulkrum** (titik pangsi), dan **Daya**.'
    },
    {
      prompt: 'Sebilah **kapak** dan **pisau** menggunakan prinsip mesin ringkas apakah untuk membelah atau memotong objek?',
      hint: 'Mempunyai satu atau dua satah condong yang tajam.',
      ans: 'Baji',
      opts: ['Baji', 'Takal', 'Roda dan gandar', 'Gear'],
      exp: '**Baji** (seperti pisau, kapak, paku, penyendal pintu) digunakan untuk memisahkan, memotong atau menahan objek.'
    }
  ],

  // ---------------- DARJAH 5 ----------------
  s5_s1: [
    {
      prompt: 'Apakah fungsi utama **tulang rusuk** dalam sistem rangka manusia?',
      hint: 'Organ apakah yang berada di dalam rongga dada?',
      ans: 'Melindungi organ dalaman seperti jantung dan peparu',
      opts: [
        'Melindungi organ dalaman seperti jantung dan peparu',
        'Melindungi otak daripada gegaran',
        'Menghasilkan sel darah di dalam perut',
        'Membantu jari membengkok'
      ],
      exp: '• **Tengkorak**: Melindungi otak\n• **Tulang rusuk**: Melindungi jantung dan peparu\n• **Tulang belakang**: Menyokong tubuh.'
    },
    {
      prompt: 'Apakah yang dinamakan sebagai **sendi** pada sistem rangka manusia?',
      hint: 'Contohnya di siku, lutut, bahu dan pergelangan tangan.',
      ans: 'Tempat pertemuan dua atau lebih tulang yang membolehkan pergerakan dan kebolehlenturan tubuh',
      opts: [
        'Tempat pertemuan dua atau lebih tulang yang membolehkan pergerakan dan kebolehlenturan tubuh',
        'Organ yang mengepam darah ke seluruh badan',
        'Saluran yang membawa makanan ke perut',
        'Bahagian tulang yang paling keras dan tidak boleh bergerak'
      ],
      exp: '**Sendi** ialah tempat pertemuan dua atau lebih tulang yang membolehkan anggota badan dibengkokkan dan digerakkan.'
    },
    {
      prompt: 'Organ manakah yang bertindak mengepam darah secara berterusan ke peparu dan ke seluruh bahagian tubuh manusia?',
      hint: 'Berdegup di bahagian dada.',
      ans: 'Jantung',
      opts: ['Jantung', 'Ginjal', 'Perut', 'Hati'],
      exp: '**Jantung** ialah organ utama dalam sistem peredaran darah yang mengepam darah ke seluruh tubuh.'
    },
    {
      prompt: 'Darah yang mengalir dari **peparu menuju ke jantung dan seluruh tubuh** adalah kaya dengan gas...',
      hint: 'Darah itu baru sahaja menerima gas segar di peparu.',
      ans: 'Oksigen',
      opts: ['Oksigen', 'Karbon dioksida', 'Nitrogen', 'Hidrogen'],
      exp: 'Laluan darah dari **peparu → jantung → seluruh tubuh** mengandungi **lebih banyak oksigen**, manakala darah dari **tubuh → jantung → peparu** mengandungi **lebih banyak karbon dioksida**.'
    },
    {
      prompt: 'Apabila seseorang **tercekik makanan**, sistem apakah yang terganggu selain sistem pencernaan?',
      hint: 'Makanan tersekat di saluran udara (trakea).',
      ans: 'Sistem pernafasan',
      opts: ['Sistem pernafasan', 'Sistem rangka', 'Sistem perkumuhan', 'Sistem pembiakan'],
      exp: 'Apabila makanan menghalang saluran pernafasan (trakea), udara tidak dapat sampai ke peparu lalu mengganggu **sistem pernafasan**.'
    }
  ],

  s5_s2: [
    {
      prompt: 'Bagaimanakah **landak** dan **ikan buntal** melindungi diri daripada ancaman musuh?',
      hint: 'Ciri khas pada permukaan badan mereka.',
      ans: 'Mempunyai duri yang tajam pada badan',
      opts: [
        'Mempunyai duri yang tajam pada badan',
        'Memutuskan anggota badan',
        'Menyemburkan dakwat hitam',
        'Hidup berkumpulan dalam kawanan besar'
      ],
      exp: '**Landak dan ikan buntal** mempunyai **duri tajam** untuk mencederakan pemangsa yang cuba menangkapnya.'
    },
    {
      prompt: 'Apakah tingkah laku khas yang dilakukan oleh **cicak** dan **kurita** apabila diserang musuh?',
      hint: 'Meninggalkan sebahagian anggota badan supaya musuh keliru.',
      ans: 'Memutuskan anggota badan',
      opts: [
        'Memutuskan anggota badan',
        'Menggulungkan diri menjadi bola keras',
        'Berhibernasi sepanjang musim sejuk',
        'Mempunyai bonggol lemak'
      ],
      exp: '**Cicak dan kurita** akan **memutuskan anggota badannya** untuk mengelirukan musuh dan melarikan diri.'
    },
    {
      prompt: 'Bagaimanakah **beruang kutub** dan **paus** menyesuaikan diri untuk hidup di kawasan **iklim terlalu sejuk**?',
      hint: 'Lapisan di bawah kulit mereka.',
      ans: 'Mempunyai lapisan lemak yang tebal (dan bulu tebal bagi beruang kutub)',
      opts: [
        'Mempunyai lapisan lemak yang tebal (dan bulu tebal bagi beruang kutub)',
        'Mempunyai bonggol di belakang badan',
        'Berkubang di dalam lumpur panas',
        'Mempunyai telinga yang sangat besar dan nipis'
      ],
      exp: '**Lapisan lemak yang tebal** di bawah kulit bertindak sebagai penebat haba untuk mengekalkan suhu badan di kawasan sejuk.'
    },
    {
      prompt: 'Dalam satu rantai makanan: **Pokok Padi → Tikus → Ular → Helang**, hidupan manakah yang bertindak sebagai **Pengeluar**?',
      hint: 'Pengeluar boleh membuat makanannya sendiri melalui fotosintesis.',
      ans: 'Pokok Padi',
      opts: ['Pokok Padi', 'Tikus', 'Ular', 'Helang'],
      exp: 'Semua rantai makanan bermula dengan tumbuhan hijau sebagai **Pengeluar** (kerana membuat makanan sendiri melalui fotosintesis). Haiwan ialah **Pengguna**.'
    },
    {
      prompt: 'Buah **kelapa** dan buah **teratai** mempunyai kulit berlilin yang kalis air serta **rongga udara (sabut)**. Apakah agen pencaran biji benihnya?',
      hint: 'Rongga udara membolehkannya terapung.',
      ans: 'Air',
      opts: ['Air', 'Angin', 'Mekanisme letupan', 'Haiwan dan manusia'],
      exp: 'Biji benih yang dipencarkan oleh **air** (seperti kelapa, teratai, pong-pong) mempunyai **rongga udara/sabut** dan kulit berlilin supaya boleh terapung.'
    },
    {
      prompt: 'Biji benih **getah**, **keembung** dan **kacang pis** dipencarkan melalui kaedah...',
      hint: 'Buahnya mengering, merekah dan meletup.',
      ans: 'Mekanisme letupan',
      opts: ['Mekanisme letupan', 'Angin', 'Air', 'Serangga'],
      exp: 'Buah **getah, keembung, bendi dan semarak api** akan mengering dan **meletup** untuk melontarkan biji benihnya jauh daripada pokok induk.'
    }
  ],

  s5_s3: [
    {
      prompt: 'Dalam satu **litar selari** yang mempunyai dua mentol, apakah yang akan berlaku kepada mentol kedua jika **mentol pertama terbakar**?',
      hint: 'Litar selari mempunyai lebih daripada satu laluan arus elektrik.',
      ans: 'Mentol kedua tetap menyala kerana arus elektrik masih boleh mengalir melalui laluan cabangnya',
      opts: [
        'Mentol kedua tetap menyala kerana arus elektrik masih boleh mengalir melalui laluan cabangnya',
        'Mentol kedua turut terpadam serta-merta',
        'Bateri akan meletup',
        'Suis tidak boleh ditutup lagi'
      ],
      exp: 'Dalam **litar selari**, terdapat lebih daripada satu laluan arus elektrik. Jika satu mentol rosak, mentol pada cabang lain **masih menyala**.'
    },
    {
      prompt: 'Mengapakah mentol dalam **litar selari** menyala **lebih terang** berbanding litar bersiri (dengan bilangan sel kering yang sama)?',
      hint: 'Setiap cabang menerima tenaga elektrik yang sama seperti sumber.',
      ans: 'Setiap laluan dalam litar selari menerima jumlah tenaga elektrik yang sama daripada sel kering',
      opts: [
        'Setiap laluan dalam litar selari menerima jumlah tenaga elektrik yang sama daripada sel kering',
        'Litar selari tidak menggunakan wayar',
        'Mentol dalam litar selari lebih kecil',
        'Litar bersiri mempunyai banyak suis'
      ],
      exp: 'Dalam **litar selari**, setiap mentol menerima voltan/tenaga penuh daripada sel kering, menjadikannya **lebih terang** berbanding litar bersiri yang berkongsi satu laluan.'
    },
    {
      prompt: 'Apakah ukuran darjah kepanasan atau kesejukan sesuatu bahan, dan apakah **unit piawainya**?',
      hint: 'Diukur menggunakan termometer dalam unit °C.',
      ans: 'Suhu, diukur dalam unit darjah Celsius (°C)',
      opts: [
        'Suhu, diukur dalam unit darjah Celsius (°C)',
        'Haba, diukur dalam unit kilogram (kg)',
        'Ketumpatan, diukur dalam unit sentimeter (cm)',
        'Masa, diukur dalam unit saat (s)'
      ],
      exp: '**Suhu** ialah ukuran darjah kepanasan sesuatu bahan dan unit piawainya di Malaysia ialah **darjah Celsius (°C)**.'
    },
    {
      prompt: 'Mengapakah **kabel elektrik di tiang** dipasang secara **sedikit kendur (melendut)** dan bukannya tegang?',
      hint: 'Pada waktu malam yang sejuk, bahan akan mengecut.',
      ans: 'Untuk mengelakkan kabel putus apabila mengecut pada waktu sejuk (malam)',
      opts: [
        'Untuk mengelakkan kabel putus apabila mengecut pada waktu sejuk (malam)',
        'Supaya burung mudah hinggap di atas kabel',
        'Kerana pekerja kehabisan tiang elektrik',
        'Supaya arus elektrik bergerak lebih perlahan'
      ],
      exp: 'Bahan **mengembang apabila menerima haba** dan **mengecut apabila kehilangan haba**. Kabel dipasang kendur supaya tidak putus apabila mengecut pada waktu sejuk.'
    },
    {
      prompt: 'Apakah **dua faktor utama** yang menyebabkan objek besi **berkarat**?',
      hint: 'Jika tiada salah satu daripada dua ini, paku besi tidak akan berkarat.',
      ans: 'Kehadiran air dan udara (oksigen)',
      opts: [
        'Kehadiran air dan udara (oksigen)',
        'Kehadiran minyak dan cahaya matahari',
        'Kehadiran cat dan plastik',
        'Suhu sejuk dan kegelapan'
      ],
      exp: 'Pengaratan besi hanya berlaku apabila terdedah kepada **air DAN udara**.'
    },
    {
      prompt: 'Antara berikut, yang manakah merupakan **cara mencegah pengaratan** pada pagar besi atau rantai basikal?',
      hint: 'Menghalang besi daripada bersentuhan dengan air dan udara.',
      ans: 'Mengecat, menyapu minyak/gris, menyadur dengan logam lain atau menyalut plastik',
      opts: [
        'Mengecat, menyapu minyak/gris, menyadur dengan logam lain atau menyalut plastik',
        'Merendam rantai basikal di dalam air garam',
        'Menggosok pagar dengan air hujan setiap hari',
        'Membiarkan besi terdedah di tepi pantai'
      ],
      exp: '**Mengecat, menyapu minyak/gris, menyadur dan menyalut plastik** menghalang permukaan besi daripada terkena air dan udara.'
    }
  ],

  s5_s4: [
    {
      prompt: 'Negeri jirim manakah yang mempunyai **bentuk yang tetap**, **isi padu yang tetap**, dan tidak boleh dimampatkan?',
      hint: 'Contohnya batu, kayu dan buku.',
      ans: 'Pepejal',
      opts: ['Pepejal', 'Cecair', 'Gas', 'Awan'],
      exp: '• **Pepejal**: Bentuk tetap, isi padu tetap.\n• **Cecair**: Mengikut bentuk bekas, isi padu tetap.\n• **Gas**: Mengikut bentuk dan memenuhi ruang bekas.'
    },
    {
      prompt: 'Titisan air terbentuk di **permukaan luar** gelas yang berisi air ais sejuk. Apakah proses perubahan keadaan jirim yang berlaku?',
      hint: 'Wap air (gas) di udara terkena gelas sejuk lalu bertukar menjadi cecair.',
      ans: 'Kondensasi (Gas → Cecair apabila kehilangan haba)',
      opts: [
        'Kondensasi (Gas → Cecair apabila kehilangan haba)',
        'Peleburan (Pepejal → Cecair)',
        'Penyejatan (Cecair → Gas)',
        'Pembekuan (Cecair → Pepejal)'
      ],
      exp: 'Proses **kondensasi** berlaku apabila wap air (gas) di persekitaran kehilangan haba apabila terkena permukaan gelas sejuk dan bertukar menjadi titisan air (cecair).'
    },
    {
      prompt: 'Dalam **kitaran air semula jadi**, apakah dua proses utama yang membentuk **awan** daripada air laut?',
      hint: 'Air laut tersejat menjadi wap air, kemudian naik ke atas dan terkondensasi.',
      ans: 'Penyejatan diikuti oleh Kondensasi',
      opts: [
        'Penyejatan diikuti oleh Kondensasi',
        'Pembekuan diikuti oleh Peleburan',
        'Pendidihan pada suhu 100°C sahaja',
        'Penurasan dan pengayakan'
      ],
      exp: 'Air di bumi mengalami **penyejatan** menjadi wap air, naik ke udara sejuk dan mengalami **kondensasi** membentuk titisan air kecil di dalam **awan**.'
    },
    {
      prompt: 'Mengapakah **Bulan** bercahaya pada waktu malam sedangkan Bulan bukan sumber cahaya?',
      hint: 'Cahaya daripada Matahari.',
      ans: 'Bulan memantulkan cahaya Matahari ke Bumi',
      opts: [
        'Bulan memantulkan cahaya Matahari ke Bumi',
        'Bulan mempunyai api yang besar di permukaannya',
        'Bulan menyerap cahaya daripada bintang',
        'Lampu dari Bumi menyinari Bulan'
      ],
      exp: 'Bulan tidak mengeluarkan cahaya sendiri, sebaliknya ia **memantulkan cahaya Matahari**.'
    },
    {
      prompt: 'Pada malam **14 atau 15 hari bulan Takwim Qamari**, fasa Bulan yang kelihatan bulat penuh di langit dikenali sebagai...',
      hint: 'Bulan penuh.',
      ans: 'Bulan Purnama',
      opts: ['Bulan Purnama', 'Anak Bulan', 'Bulan Sabit', 'Bulan Separa'],
      exp: 'Urutan fasa Bulan: **Anak Bulan → Bulan Sabit → Bulan Separa → Bulan Hampir Purnama → Bulan Purnama** (pada malam ke-14/15 Qamari).'
    },
    {
      prompt: 'Buruj manakah yang berbentuk seperti **layang-layang (empat bintang)** dan menunjuk ke arah **Selatan**?',
      hint: 'Buruj paling kecil di langit malam.',
      ans: 'Buruj Pari',
      opts: ['Buruj Pari', 'Buruj Biduk', 'Buruj Belantik', 'Buruj Skorpio'],
      exp: '• **Buruj Pari**: Menunjuk arah **Selatan**.\n• **Buruj Biduk**: Menunjuk arah **Utara**.\n• **Buruj Belantik**: Berbentuk pemburu dan menunjuk arah Utara.'
    }
  ],

  // ---------------- DARJAH 6 (SASARAN ANAK 12 TAHUN / UASA) ----------------
  s6_s1: [
    {
      prompt: 'Sistem saraf manusia terbahagi kepada dua bahagian utama iaitu **Sistem Saraf Pusat** dan **Sistem Saraf Periferi**. Apakah organ yang membentuk **Sistem Saraf Pusat**?',
      hint: 'Pusat kawalan di kepala dan di sepanjang tulang belakang.',
      ans: 'Otak dan saraf tunjang',
      opts: [
        'Otak dan saraf tunjang',
        'Jantung dan saluran darah',
        'Peparu dan trakea',
        'Tulang rangka dan otot sahaja'
      ],
      exp: '**Sistem Saraf Pusat** terdiri daripada **Otak** dan **Saraf Tunjang**, manakala **Sistem Saraf Periferi** terdiri daripada rangkaian saraf di seluruh tubuh.'
    },
    {
      prompt: 'Dalam sistem pembiakan manusia, di manakah proses **persenyawaan** (pencantuman sperma dan ovum) berlaku?',
      hint: 'Saluran yang menghubungkan ovari ke uterus.',
      ans: 'Tiub Fallopio',
      opts: ['Tiub Fallopio', 'Uterus (Rahim)', 'Ovari', 'Faraj'],
      exp: '• **Ovari**: Menghasilkan ovum.\n• **Tiub Fallopio**: Tempat berlakunya **persenyawaan**.\n• **Uterus**: Tempat embrio berkembang menjadi fetus.'
    },
    {
      prompt: 'Adunan tepung roti menaik dan menjadi gebu selepas dicampurkan dengan **yis (mikroorganisma)**. Mengapakah doh roti itu menaik?',
      hint: 'Yis menjalankan proses pernafasan dan membebaskan gas.',
      ans: 'Yis bernafas dan membebaskan gas karbon dioksida',
      opts: [
        'Yis bernafas dan membebaskan gas karbon dioksida',
        'Yis menyerap semua tepung',
        'Yis menghasilkan ais di dalam doh',
        'Yis menukarkan tepung menjadi plastik'
      ],
      exp: '**Yis (Fungi)** menjalankan proses hidup (bernafas) apabila terdapat gula dan air suam, lalu membebaskan **gas karbon dioksida** yang mengembangkan doh roti.'
    },
    {
      prompt: 'Antara kumpulan mikroorganisma berikut, yang manakah **paling halus** dan hanya dapat dilihat menggunakan **mikroskop elektron** (contohnya HIV dan Influenza)?',
      hint: 'Mikroorganisma terkecil.',
      ans: 'Virus',
      opts: ['Virus', 'Fungi (Kulat)', 'Protozoa (Paramecium)', 'Alga'],
      exp: '**Virus** ialah mikroorganisma yang paling kecil dan hanya boleh dilihat melalui mikroskop elektron.'
    },
    {
      prompt: 'Mikroorganisma manakah yang mempunyai klorofil dan boleh membuat makanannya sendiri melalui **fotosintesis**?',
      hint: 'Contohnya Spirogyra dan fitoplankton.',
      ans: 'Alga',
      opts: ['Alga', 'Bakteria', 'Fungi', 'Virus'],
      exp: '**Alga** mempunyai sifat seperti tumbuhan kerana mempunyai klorofil dan menjalankan **fotosintesis**.'
    },
    {
      prompt: 'Apakah fungsi bakteria *Lactobacillus* yang bermanfaat dalam industri makanan?',
      hint: 'Produk tenusu masam yang baik untuk pencernaan.',
      ans: 'Menghasilkan yogurt dan keju daripada susu',
      opts: [
        'Menghasilkan yogurt dan keju daripada susu',
        'Menyebabkan penyakit malaria',
        'Membuat tayar getah',
        'Mengawet ikan masin'
      ],
      exp: 'Mikroorganisma berfaedah digunakan untuk membuat **roti (yis), tempe (kulat), yogurt dan keju (bakteria)**, serta menghasilkan antibiotik.'
    }
  ],

  s6_s2: [
    {
      prompt: 'Burung gembala kerbau makan kutu di atas badan kerbau. Burung mendapat makanan manakala kerbau bebas daripada gatal kutu. Apakah jenis interaksi **simbiosis** ini?',
      hint: 'Kedua-dua hidupan mendapat manfaat (+ / +).',
      ans: 'Mutualisme',
      opts: ['Mutualisme', 'Komensalisme', 'Parasitisme', 'Persaingan'],
      exp: '• **Mutualisme**: Kedua-dua pihak mendapat manfaat (contoh: burung gembala & kerbau, umang-umang & buran).\n• **Komensalisme**: Satu untung, satu tiada kesan.\n• **Parasitisme**: Satu untung, satu rugi.'
    },
    {
      prompt: 'Pokok paku pakis langsuyar menumpang di atas dahan pokok kelapa sawit yang tinggi untuk mendapatkan cahaya matahari tanpa merosakkan pokok itu. Apakah interaksi ini?',
      hint: 'Satu pihak mendapat manfaat, manakala pokok perumah tidak untung dan tidak rugi (+ / 0).',
      ans: 'Komensalisme',
      opts: ['Komensalisme', 'Parasitisme', 'Mutualisme', 'Pemangsaan'],
      exp: '**Komensalisme** menguntungkan satu spesies (paku langsuyar atau ikan remora pada jerung) tanpa memudaratkan perumahnya.'
    },
    {
      prompt: 'Pokok dedalu tumbuh pada batang pokok mangga dan menyerap air serta nutrien daripada pokok mangga sehingga dahan mangga itu mati. Apakah interaksi ini?',
      hint: 'Satu pihak untung, satu pihak rugi/terjejas (+ / −).',
      ans: 'Parasitisme',
      opts: ['Parasitisme', 'Komensalisme', 'Mutualisme', 'Kerjasama'],
      exp: '**Parasitisme** menguntungkan parasit (pokok dedalu, rafflesia, kutu, cacing pita) tetapi **merugikan perumah**.'
    },
    {
      prompt: 'Antara haiwan berikut, yang manakah telah **PUPUS** di muka Bumi?',
      hint: 'Tidak wujud lagi di dunia.',
      ans: 'Burung Dodo, Mamot dan Dinosaur (T-Rex)',
      opts: [
        'Burung Dodo, Mamot dan Dinosaur (T-Rex)',
        'Harimau Malaya, Orang Utan dan Tapir',
        'Gajah Pygmy dan Badak Sumbu',
        'Kucing hutan dan burung enggang'
      ],
      exp: '**Burung Dodo, Harimau Dahan Taiwan, Quagga, Mamot dan Dinosaur** telah **pupus** sepenuhnya.'
    },
    {
      prompt: 'Apakah langkah **pemuliharaan** untuk memulihkan semula populasi penyu dan hutan yang telah diteroka?',
      hint: 'Memulihkan kembali kepada keadaan asal.',
      ans: 'Menubuhkan pusat penetasan penyu dan melakukan penanaman semula hutan',
      opts: [
        'Menubuhkan pusat penetasan penyu dan melakukan penanaman semula hutan',
        'Menebang semua pokok tua di hutan simpan',
        'Memburu haiwan liar untuk dijual',
        'Menimbus kawasan paya bakau'
      ],
      exp: '**Pemuliharaan** bermaksud memulihkan semula haiwan dan tumbuhan yang terancam (seperti penanaman semula pokok dan pusat pemuliharaan orang utan/penyu).'
    }
  ],

  s6_s3: [
    {
      prompt: 'Apakah arah tindakan **daya geseran** berbanding arah pergerakan sesuatu objek?',
      hint: 'Mengapa bola yang bergolek akhirnya berhenti?',
      ans: 'Sentiasa bertentangan dengan arah pergerakan objek',
      opts: [
        'Sentiasa bertentangan dengan arah pergerakan objek',
        'Sentiasa searah dengan pergerakan objek',
        'Menolak objek naik ke udara',
        'Tiada arah tertentu'
      ],
      exp: '**Daya geseran** ialah daya yang terhasil apabila dua permukaan bersentuhan dan ia **sentiasa menentang arah pergerakan objek**.'
    },
    {
      prompt: 'Apakah dua faktor utama yang mempengaruhi saiz **daya geseran**?',
      hint: 'Kasar/licin permukaan dan berat objek.',
      ans: 'Jenis permukaan dan jisim objek',
      opts: [
        'Jenis permukaan dan jisim objek',
        'Warna objek dan suhu bilik',
        'Bentuk bayang-bayang dan arah angin',
        'Masa dan jarak'
      ],
      exp: 'Daya geseran bergantung pada **jenis permukaan** (semakin kasar, semakin besar geseran) dan **jisim objek** (semakin berat, semakin besar geseran).'
    },
    {
      prompt: 'Mengapakah kita menebuk **dua lubang** pada bahagian atas tin susu pekat sebelum menuangnya?',
      hint: 'Kaitkan dengan tekanan udara.',
      ans: 'Supaya udara luar dapat masuk dan menolak susu keluar dengan lancar melalui tekanan udara',
      opts: [
        'Supaya udara luar dapat masuk dan menolak susu keluar dengan lancar melalui tekanan udara',
        'Supaya susu menjadi lebih manis',
        'Untuk menyejukkan susu di dalam tin',
        'Untuk mengurangkan berat tin'
      ],
      exp: 'Lubang kedua membenarkan **tekanan udara atmosfera** dari luar masuk ke dalam tin dan menolak susu pekat keluar dengan mudah.'
    },
    () => {
      const speed = sciPick([60, 70, 80, 90, 100]);
      const time = sciPick([2, 3, 4]);
      const dist = speed * time;
      return {
        inputMode: 'numpad',
        prompt: `Sebuah kereta bergerak sejauh **${dist} km** dalam masa **${time} jam**.\nBerapakah **kelajuan** kereta tersebut dalam **km/j**?`,
        hint: `Gunakan formula Kelajuan = Jarak ÷ Masa = ${dist} km ÷ ${time} jam.`,
        ans: speed,
        opts: [speed, speed + 10, dist + time, speed - 15],
        exp: `Formula: **Kelajuan = Jarak ÷ Masa**\n= ${dist} km ÷ ${time} jam = **${speed} km/j**.`
      };
    },
    () => {
      const speed = sciPick([50, 60, 80, 90]);
      const time = sciPick([2, 3, 5]);
      const dist = speed * time;
      return {
        inputMode: 'numpad',
        prompt: `Sebuah bas ekspres bergerak dengan kelajuan malar **${speed} km/j** selama **${time} jam**.\nBerapakah **jarak** yang dilalui oleh bas itu (dalam km)?`,
        hint: `Formula Jarak = Kelajuan × Masa = ${speed} × ${time}.`,
        ans: dist,
        opts: [dist, dist + 20, speed + time, dist - 30],
        exp: `Formula: **Jarak = Kelajuan × Masa**\n= ${speed} km/j × ${time} jam = **${dist} km**.`
      };
    }
  ],

  s6_s4: [
    {
      prompt: 'Kaedah pengawetan makanan yang manakah melibatkan pemanasan susu pada suhu tertentu (sekitar 63°C–72°C) selama beberapa saat dan diikuti **penyejukan segera**?',
      hint: 'Digunakan untuk susu segar dan jus buah-buahan supaya rasa dan nutrien kekal.',
      ans: 'Pempasteuran',
      opts: ['Pempasteuran', 'Pengetinan dan pembotolan', 'Penyalaian', 'Penjerukan'],
      exp: '**Pempasteuran** (ditemui oleh Louis Pasteur) memanaskan cecair seperti susu diikuti penyejukan segera untuk membunuh kebanyakan bakteria sambil mengekalkan khasiatnya.'
    },
    {
      prompt: 'Mengapakah kaedah **pembungkusan vakum** dapat melambatkan kerosakan makanan seperti kacang, sosej dan daging?',
      hint: 'Semua udara dikeluarkan daripada bungkusan.',
      ans: 'Tiada udara (oksigen) di dalam bungkusan menyebabkan mikroorganisma tidak dapat bertumbuh',
      opts: [
        'Tiada udara (oksigen) di dalam bungkusan menyebabkan mikroorganisma tidak dapat bertumbuh',
        'Plastik vakum sangat panas',
        'Garam ditambah dengan banyak ke dalam plastik',
        'Makanan dibekukan menjadi ais batu'
      ],
      exp: 'Dalam **pembungkusan vakum**, semua udara disedut keluar. Tanpa **udara (oksigen)**, bakteria dan kulat tidak dapat hidup dan membiak.'
    },
    {
      prompt: 'Apakah maksud **bahan buangan terbiodegradasi**?',
      hint: 'Contohnya sisa makanan, kertas dan daun kering.',
      ans: 'Bahan buangan yang boleh direputkan oleh mikroorganisma (pengurai)',
      opts: [
        'Bahan buangan yang boleh direputkan oleh mikroorganisma (pengurai)',
        'Bahan buangan seperti plastik dan kaca yang kekal ratusan tahun',
        'Bahan buangan toksik dari kilang kimia',
        'Logam berat yang boleh dikitar semula sahaja'
      ],
      exp: '**Bahan terbiodegradasi** (sisa makanan, kertas, bahan kumuh) ialah bahan organik yang boleh **direputkan oleh mikroorganisma** menjadi kompos/nutrien tanah.'
    },
    {
      prompt: 'Apakah susunan kedudukan dalam satu garis lurus semasa berlakunya **Gerhana Bulan**?',
      hint: 'Bumi menghalang cahaya Matahari daripada sampai ke Bulan (M - B - b).',
      ans: 'Matahari → Bumi → Bulan',
      opts: [
        'Matahari → Bumi → Bulan',
        'Matahari → Bulan → Bumi',
        'Bumi → Matahari → Bulan',
        'Bulan → Bumi → Matahari'
      ],
      exp: '• **Gerhana Bulan**: **Matahari → Bumi → Bulan** (Bumi berada di tengah).\n• **Gerhana Matahari**: **Matahari → Bulan → Bumi** (Bulan berada di tengah).'
    },
    {
      prompt: 'Apakah dua faktor utama yang mempengaruhi **kestabilan** sesuatu objek atau struktur binaan?',
      hint: 'Fikirkan mengapa kon jalan raya mempunyai tapak yang lebar dan rendah.',
      ans: 'Ketinggian objek dan luas tapak',
      opts: [
        'Ketinggian objek dan luas tapak',
        'Jenis bahan dan warna cat binaan',
        'Harga bahan dan lokasi bangunan',
        'Suhu udara dan arah cahaya'
      ],
      exp: '• **Kestabilan** dipengaruhi oleh **luas tapak** (semakin luas, semakin stabil) dan **ketinggian** (semakin rendah, semakin stabil).\n• **Kekuatan** dipengaruhi oleh **jenis bahan** dan **bentuk struktur** (seperti lengkung/kubah).'
    },
    {
      prompt: 'Sistem Suria kita terletak di dalam sebuah galaksi berbentuk pilin berpalang yang dinamakan...',
      hint: 'Milky Way dalam Bahasa Melayu.',
      ans: 'Galaksi Bima Sakti',
      opts: ['Galaksi Bima Sakti', 'Galaksi Andromeda', 'Buruj Belantik', 'Nebula'],
      exp: 'Bumi dan Sistem Suria kita berada di dalam **Galaksi Bima Sakti (Milky Way)**.'
    }
  ]
};

// Penjana soalan Sains mengikut ID Stesen
window.generateScienceQuestionsForNode = function (nodeId) {
  const world = window.SCIENCE_WORLDS.find((w) => w.nodes.some((n) => n.id === nodeId));
  const node = world.nodes.find((n) => n.id === nodeId);
  const count = node.questionCount || 8;

  if (node.isBoss) {
    const subNodes = world.nodes.filter((n) => !n.isBoss);
    const combined = [];
    for (let i = 0; i < count; i++) {
      const sub = subNodes[i % subNodes.length];
      const oneQ = buildFromPool(`${sub.topic} (Darjah ${world.darjah})`, SciencePools[sub.id], 1)[0];
      oneQ.sourceNodeId = sub.id;
      combined.push(oneQ);
    }
    return sciShuffle(combined);
  } else {
    return buildFromPool(`${node.topic} (Darjah ${world.darjah})`, SciencePools[nodeId], count);
  }
};
