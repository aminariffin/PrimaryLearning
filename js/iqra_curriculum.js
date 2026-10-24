// ============================================================================
// IQRA' SAGA (IQRA 1 HINGGA IQRA 6) & DOA HARIAN ANAK SOLEH
// Lengkap dengan Tulisan Arab, Sebutan Rumi di Bawahnya, Audio & Kuiz Interaktif
// ============================================================================

const iqraShuffle = (arr) => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

// ================= ENJIN SEBUTAN AUDIO (ARAB & RUMI / MELAYU) =================
// Menyokong Web Speech API pada Android Tablet, Windows & iOS
window.speakText = function (text, langPref = 'ar-SA', rate = 0.82) {
  if (!('speechSynthesis' in window)) {
    alert('Peranti ini tidak menyokong enjin suara pelayar.');
    return;
  }
  try {
    window.speechSynthesis.cancel();
    const utter = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices() || [];

    // Cari suara mengikut bahasa pilihan
    const langPrefix = langPref.split('-')[0].toLowerCase();
    let matchedVoice =
      voices.find((v) => v.lang && v.lang.toLowerCase() === langPref.toLowerCase()) ||
      voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(langPrefix));

    // Jika tiada pek suara Arab dipasang di Android, gunakan suara Bahasa Melayu/Indonesia untuk membaca sebutan
    if (!matchedVoice && langPrefix === 'ar') {
      matchedVoice =
        voices.find((v) => v.lang && (v.lang.toLowerCase().startsWith('ms') || v.lang.toLowerCase().startsWith('id'))) ||
        null;
    }

    if (matchedVoice) {
      utter.voice = matchedVoice;
      utter.lang = matchedVoice.lang;
    } else {
      utter.lang = langPref;
    }

    utter.rate = rate;
    utter.pitch = 1.0;
    window.speechSynthesis.speak(utter);
  } catch (e) {
    console.error('Ralat audio TTS:', e);
  }
};

// Membunyikan bacaan Arab diikuti sebutan Rumi supaya jelas di semua Tab Android
window.speakIqraCard = function (arabicText, rumiPhonetic, mode = 'both') {
  if (!('speechSynthesis' in window)) return;
  window.speechSynthesis.cancel();
  const voices = window.speechSynthesis.getVoices() || [];
  const hasArabicVoice = voices.some((v) => v.lang && v.lang.toLowerCase().startsWith('ar'));

  if (mode === 'arabic') {
    if (hasArabicVoice) {
      window.speakText(arabicText, 'ar-SA', 0.75);
    } else {
      // Fallback fonetik jika tiada pek suara Arab di peranti
      window.speakText(rumiPhonetic, 'ms-MY', 0.8);
    }
  } else if (mode === 'rumi') {
    window.speakText(rumiPhonetic, 'ms-MY', 0.82);
  } else {
    // Kedua-duanya: bunyi Arab dahulu, diikuti sebutan Rumi
    if (hasArabicVoice) {
      const u1 = new SpeechSynthesisUtterance(arabicText);
      const arVoice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('ar'));
      if (arVoice) u1.voice = arVoice;
      u1.lang = 'ar-SA';
      u1.rate = 0.75;

      const u2 = new SpeechSynthesisUtterance(rumiPhonetic);
      const msVoice = voices.find(
        (v) => v.lang && (v.lang.toLowerCase().startsWith('ms') || v.lang.toLowerCase().startsWith('id'))
      );
      if (msVoice) u2.voice = msVoice;
      u2.lang = 'ms-MY';
      u2.rate = 0.85;

      window.speechSynthesis.speak(u1);
      window.speechSynthesis.speak(u2);
    } else {
      window.speakText(rumiPhonetic, 'ms-MY', 0.8);
    }
  }
};

// Pra-muat senarai suara pelayar
if ('speechSynthesis' in window) {
  window.speechSynthesis.getVoices();
  window.speechSynthesis.onvoiceschanged = () => {
    window.speechSynthesis.getVoices();
  };
}

// ============================================================================
// DEFINISI 6 PULAU IQRA' (IQRA 1 HINGGA IQRA 6) — 30 STESEN KESELURUHAN
// ============================================================================
window.IQRA_WORLDS = [
  {
    darjah: 1,
    title: 'Iqra 1: Asas Huruf Hijaiyah Berbaris Atas (Fathah)',
    subtitle: 'Kenali 28 Huruf Tunggal Berbaris Atas (A, Ba, Ta hingga Ya) Dengan Sebutan Pendek 1 Harakat',
    themeColor: '#059669',
    bgGradient: 'linear-gradient(180deg, #064e3b 0%, #047857 100%)',
    badge: '📗',
    nodes: [
      {
        id: 'i1_s1',
        code: 'IQ 1.1',
        title: 'Huruf Alif Hingga Kha (أَ بَ تَ ثَ جَ حَ خَ)',
        topic: 'Iqra 1: Huruf Tunggal Berbaris Fathah (Bahagian 1)',
        desc: 'Belajar sebutan tepat A, Ba, Ta, Tsa, Ja, Ha, Kha dengan bacaan pendek 1 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'أَ', rumi: 'A', note: 'Alif berbaris atas dibaca pendek: A', ttsRumi: 'A' },
          { arabic: 'بَ', rumi: 'Ba', note: 'Huruf Ba (1 titik di bawah): Ba', ttsRumi: 'Ba' },
          { arabic: 'تَ', rumi: 'Ta', note: 'Huruf Ta (2 titik di atas): Ta', ttsRumi: 'Ta' },
          { arabic: 'ثَ', rumi: 'Tsa', note: 'Huruf Tsa (3 titik di atas, hujung lidah): Tsa', ttsRumi: 'Sa' },
          { arabic: 'جَ', rumi: 'Ja', note: 'Huruf Jim (1 titik di tengah): Ja', ttsRumi: 'Ja' },
          { arabic: 'حَ', rumi: 'Ha', note: 'Huruf Ha pedas/bersih (tiada titik): Ha', ttsRumi: 'Ha' },
          { arabic: 'خَ', rumi: 'Kha', note: 'Huruf Kha (1 titik di atas, bunyi kerongkong): Kha', ttsRumi: 'Kha' },
          { arabic: 'بَ تَ ثَ', rumi: 'Ba - Ta - Tsa', note: 'Baca satu demi satu dengan pendek (1 harakat).', ttsRumi: 'Ba, Ta, Sa' },
          { arabic: 'جَ حَ خَ', rumi: 'Ja - Ha - Kha', note: 'Bezakan bunyi Ja, Ha nipis, dan Kha tebal.', ttsRumi: 'Ja, Ha, Kha' }
        ]
      },
      {
        id: 'i1_s2',
        code: 'IQ 1.2',
        title: 'Huruf Dal Hingga Shad (دَ ذَ رَ زَ سَ شَ صَ)',
        topic: 'Iqra 1: Huruf Tunggal Berbaris Fathah (Bahagian 2)',
        desc: 'Kenali huruf Da, Dza, Ra, Za, Sa, Sya dan Sha dengan sebutan rumi yang betul.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'دَ', rumi: 'Da', note: 'Huruf Dal (tiada titik): Da', ttsRumi: 'Da' },
          { arabic: 'ذَ', rumi: 'Dza', note: 'Huruf Dzal (1 titik di atas, hujung lidah): Dza', ttsRumi: 'Dza' },
          { arabic: 'رَ', rumi: 'Ra', note: 'Huruf Ra (dibaca tebal): Ra', ttsRumi: 'Ro' },
          { arabic: 'زَ', rumi: 'Za', note: 'Huruf Zai (1 titik di atas, berdesir): Za', ttsRumi: 'Za' },
          { arabic: 'سَ', rumi: 'Sa', note: 'Huruf Sin (tiada titik): Sa', ttsRumi: 'Sa' },
          { arabic: 'شَ', rumi: 'Sya', note: 'Huruf Syin (3 titik di atas): Sya', ttsRumi: 'Sya' },
          { arabic: 'صَ', rumi: 'Sha', note: 'Huruf Shad (tebal, muncung sedikit): Sha', ttsRumi: 'Sho' },
          { arabic: 'دَ رَ سَ', rumi: 'Da - Ra - Sa', note: 'Gabungan 3 huruf tunggal: Da - Ra - Sa', ttsRumi: 'Da, Ro, Sa' }
        ]
      },
      {
        id: 'i1_s3',
        code: 'IQ 1.3',
        title: 'Huruf Dhad Hingga Qaf (ضَ طَ ظَ عَ غَ فَ قَ)',
        topic: 'Iqra 1: Huruf Tunggal Berbaris Fathah (Bahagian 3)',
        desc: 'Huruf tebal Dha, Tha, Zha, serta huruf kerongkong ‘A, Gha, Fa dan Qa.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'ضَ', rumi: 'Dha', note: 'Huruf Dhad (1 titik di atas, tepi lidah): Dha', ttsRumi: 'Dho' },
          { arabic: 'طَ', rumi: 'Tha', note: 'Huruf Tha bertiang (tebal): Tha', ttsRumi: 'Tho' },
          { arabic: 'ظَ', rumi: 'Zha', note: 'Huruf Zha bertiang & 1 titik: Zha', ttsRumi: 'Zho' },
          { arabic: 'عَ', rumi: '‘A', note: 'Huruf ‘Ain (tengah kerongkong): ‘A', ttsRumi: 'A' },
          { arabic: 'غَ', rumi: 'Gha', note: 'Huruf Ghain (1 titik di atas): Gha', ttsRumi: 'Gho' },
          { arabic: 'فَ', rumi: 'Fa', note: 'Huruf Fa (1 titik di atas): Fa', ttsRumi: 'Fa' },
          { arabic: 'قَ', rumi: 'Qa', note: 'Huruf Qaf (2 titik di atas, pangkal lidah): Qa', ttsRumi: 'Qo' },
          { arabic: 'صَ ضَ طَ ظَ', rumi: 'Sha - Dha - Tha - Zha', note: 'Empat huruf tebal berbaris atas.', ttsRumi: 'Sho, Dho, Tho, Zho' }
        ]
      },
      {
        id: 'i1_s4',
        code: 'IQ 1.4',
        title: 'Huruf Kaf Hingga Ya & Gabungan 3 Huruf',
        topic: 'Iqra 1: Huruf كَ لَ مَ نَ وَ هَ ءَ يَ',
        desc: 'Kuasai Ka, La, Ma, Na, Wa, Ha, A, Ya serta latihan gabungan tiga huruf berbaris atas.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'كَ', rumi: 'Ka', note: 'Huruf Kaf (nipis): Ka', ttsRumi: 'Ka' },
          { arabic: 'لَ', rumi: 'La', note: 'Huruf Lam: La', ttsRumi: 'La' },
          { arabic: 'مَ', rumi: 'Ma', note: 'Huruf Mim (bibir rapat): Ma', ttsRumi: 'Ma' },
          { arabic: 'نَ', rumi: 'Na', note: 'Huruf Nun (1 titik di atas): Na', ttsRumi: 'Na' },
          { arabic: 'وَ', rumi: 'Wa', note: 'Huruf Waw (bibir membulat): Wa', ttsRumi: 'Wa' },
          { arabic: 'هَ', rumi: 'Ha', note: 'Huruf Ha simpul (pangkal dada): Ha', ttsRumi: 'Ha' },
          { arabic: 'يَ', rumi: 'Ya', note: 'Huruf Ya (2 titik di bawah): Ya', ttsRumi: 'Ya' },
          { arabic: 'مَ لَ كَ', rumi: 'Ma - La - Ka', note: 'Baca dari KANAN ke KIRI: Ma - La - Ka', ttsRumi: 'Ma, La, Ka' },
          { arabic: 'حَ سَ نَ', rumi: 'Ha - Sa - Na', note: 'Baca dari KANAN ke KIRI: Ha - Sa - Na', ttsRumi: 'Ha, Sa, Na' }
        ]
      },
      {
        id: 'i1_boss',
        code: 'UJIAN IQ1',
        title: 'BOSS IQRA 1: Ujian Naik ke Iqra 2',
        topic: 'Penilaian Menyeluruh Huruf Hijaiyah Iqra 1',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Iqra 2!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80,
        cards: []
      }
    ]
  },
  {
    darjah: 2,
    title: 'Iqra 2: Huruf Bersambung & Bacaan Panjang (Mad Asli)',
    subtitle: 'Kenali Huruf Apabila Bersambung (Awal, Tengah, Akhir) & Bacaan Panjang Alif 2 Harakat',
    themeColor: '#0284c7',
    bgGradient: 'linear-gradient(180deg, #0c4a6e 0%, #0369a1 100%)',
    badge: '📘',
    nodes: [
      {
        id: 'i2_s1',
        code: 'IQ 2.1',
        title: 'Huruf Bersambung (Awal, Tengah & Akhir)',
        topic: 'Iqra 2: Bentuk Huruf Bersambung',
        desc: 'Kenali rupa huruf Ba, Ta, Tsa, Jim, Sin, Syin, Ain, Fa, Qaf, Kaf, Lam, Mim, Nun apabila bersambung.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'بَتَ', rumi: 'Ba - Ta', note: 'Huruf Ba (1 titik bawah) bersambung dengan Ta (2 titik atas).', ttsRumi: 'Ba Ta' },
          { arabic: 'ثَبَتَ', rumi: 'Tsa - Ba - Ta', note: 'Tsa (3 titik atas) + Ba (1 titik bawah) + Ta (2 titik atas).', ttsRumi: 'Sa Ba Ta' },
          { arabic: 'نَصَرَ', rumi: 'Na - Sha - Ra', note: 'Nun di awal + Shad di tengah + Ra di akhir.', ttsRumi: 'Na Sho Ro' },
          { arabic: 'جَعَلَ', rumi: 'Ja - ‘A - La', note: 'Jim di awal + ‘Ain di tengah + Lam di akhir.', ttsRumi: 'Ja A La' },
          { arabic: 'فَتَحَ', rumi: 'Fa - Ta - Ha', note: 'Fa (1 titik atas) + Ta (2 titik atas) + Ha.', ttsRumi: 'Fa Ta Ha' },
          { arabic: 'كَتَبَ', rumi: 'Ka - Ta - Ba', note: 'Bentuk Kaf apabila berada di awal kalimah: Ka - Ta - Ba.', ttsRumi: 'Ka Ta Ba' }
        ]
      },
      {
        id: 'i2_s2',
        code: 'IQ 2.2',
        title: 'Latihan Kalimah 3 Huruf Bersambung',
        topic: 'Iqra 2: Lancar Kalimah Berbaris Atas',
        desc: 'Latihan membaca kalimah bersambung tiga huruf dengan lancar tanpa mengeja.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'سَأَلَ', rumi: 'Sa - A - La', note: 'Sin + Hamzah di atas Alif + Lam.', ttsRumi: 'Sa A La' },
          { arabic: 'خَلَقَ', rumi: 'Kha - La - Qa', note: 'Kha + Lam + Qaf.', ttsRumi: 'Kho La Qo' },
          { arabic: 'عَبَدَ', rumi: '‘A - Ba - Da', note: '‘Ain + Ba + Dal.', ttsRumi: 'A Ba Da' },
          { arabic: 'ذَهَبَ', rumi: 'Dza - Ha - Ba', note: 'Dzal (tidak boleh disambung ke kiri) + Ha simpul + Ba.', ttsRumi: 'Dza Ha Ba' },
          { arabic: 'وَجَدَ', rumi: 'Wa - Ja - Da', note: 'Waw + Jim + Dal.', ttsRumi: 'Wa Ja Da' },
          { arabic: 'صَدَقَ', rumi: 'Sha - Da - Qa', note: 'Shad + Dal + Qaf.', ttsRumi: 'Sho Da Qo' }
        ]
      },
      {
        id: 'i2_s3',
        code: 'IQ 2.3',
        title: 'Bacaan Panjang Alif (Mad Asli 2 Harakat)',
        topic: 'Iqra 2: Mad Asli Huruf Alif (ـَا)',
        desc: 'Apabila huruf berbaris atas bertemu Alif tanpa baris, panjangkan bacaan sebanyak 2 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'بَا', rumi: 'Baa (2 Harakat)', note: 'Ba berbaris atas bertemu Alif dibaca panjang 2 harakat: Baa.', ttsRumi: 'Baa' },
          { arabic: 'مَا لَا', rumi: 'Maa - Laa', note: 'Kedua-duanya dibaca panjang 2 harakat.', ttsRumi: 'Maa Laa' },
          { arabic: 'قَالَ', rumi: 'Qaa - La', note: 'Qaf panjang (Qaa), Lam pendek (La).', ttsRumi: 'Qoo La' },
          { arabic: 'كَانَ', rumi: 'Kaa - Na', note: 'Kaf panjang (Kaa), Nun pendek (Na).', ttsRumi: 'Kaa Na' },
          { arabic: 'طَابَ', rumi: 'Thaa - Ba', note: 'Tha panjang (Thaa), Ba pendek (Ba).', ttsRumi: 'Thoo Ba' },
          { arabic: 'ءَامَنَ', rumi: 'Aa - Ma - Na', note: 'Alif kecil/Mad Badal pada awal dibaca panjang 2 harakat: Aa - Ma - Na.', ttsRumi: 'Aa Ma Na' }
        ]
      },
      {
        id: 'i2_s4',
        code: 'IQ 2.4',
        title: 'Beza Pendek (1 Harakat) & Panjang (2 Harakat)',
        topic: 'Iqra 2: Kawalan Panjang Pendek Bacaan',
        desc: 'Latihan membezakan suku kata yang mempunyai Alif Mad dengan yang tiada Alif Mad.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'كَتَبَا', rumi: 'Ka - Ta - Baa', note: 'Ka (pendek), Ta (pendek), Baa (panjang 2 harakat).', ttsRumi: 'Ka Ta Baa' },
          { arabic: 'كَاتَبَ', rumi: 'Kaa - Ta - Ba', note: 'Kaa (panjang 2 harakat), Ta (pendek), Ba (pendek).', ttsRumi: 'Kaa Ta Ba' },
          { arabic: 'جَاهَدَ', rumi: 'Jaa - Ha - Da', note: 'Jaa (panjang), Ha (pendek), Da (pendek).', ttsRumi: 'Jaa Ha Da' },
          { arabic: 'تَعَالَىٰ', rumi: 'Ta - ‘Aa - Laa', note: 'Alif kecil di atas ‘Ain dan Alif Maqsurah di hujung dibaca panjang 2 harakat.', ttsRumi: 'Ta Aa Laa' },
          { arabic: 'فَسَادَ', rumi: 'Fa - Saa - Da', note: 'Fa (pendek), Saa (panjang), Da (pendek).', ttsRumi: 'Fa Saa Da' }
        ]
      },
      {
        id: 'i2_boss',
        code: 'UJIAN IQ2',
        title: 'BOSS IQRA 2: Ujian Naik ke Iqra 3',
        topic: 'Penilaian Menyeluruh Iqra 2 (Huruf Bersambung & Mad Alif)',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Iqra 3!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80,
        cards: []
      }
    ]
  },
  {
    darjah: 3,
    title: 'Iqra 3: Baris Bawah (Kasrah), Depan (Dhammah) & Mad Ya / Waw',
    subtitle: 'Bunyi "i" (Kasrah), Bunyi "u" (Dhammah), serta Bacaan Panjang Ya Mati (ii) dan Waw Mati (uu)',
    themeColor: '#d97706',
    bgGradient: 'linear-gradient(180deg, #78350f 0%, #b45309 100%)',
    badge: '📙',
    nodes: [
      {
        id: 'i3_s1',
        code: 'IQ 3.1',
        title: 'Baris Bawah / Kasrah (بِ تِ سِ مِ)',
        topic: 'Iqra 3: Bacaan Baris Bawah (Bunyi i)',
        desc: 'Kenali tanda baris di bawah huruf yang berbunyi "i" (Bi, Ti, Tsi, Ji, Hi, Khi).',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'إِ بَ تِ', rumi: 'I - Ba - Ti', note: 'Baris di bawah menghasilkan bunyi "i" pendek (1 harakat).', ttsRumi: 'I, Ba, Ti' },
          { arabic: 'سَمِعَ', rumi: 'Sa - Mi - ‘A', note: 'Sin (atas: Sa), Mim (bawah: Mi), ‘Ain (atas: ‘A).', ttsRumi: 'Sa Mi A' },
          { arabic: 'عَلِمَ', rumi: '‘A - Li - Ma', note: '‘Ain (atas: ‘A), Lam (bawah: Li), Mim (atas: Ma).', ttsRumi: 'A Li Ma' },
          { arabic: 'حَبِطَ', rumi: 'Ha - Bi - Tha', note: 'Ha (atas: Ha), Ba (bawah: Bi), Tha (atas: Tha).', ttsRumi: 'Ha Bi Tho' },
          { arabic: 'شَهِدَ', rumi: 'Sya - Hi - Da', note: 'Syin (atas: Sya), Ha (bawah: Hi), Dal (atas: Da).', ttsRumi: 'Sya Hi Da' },
          { arabic: 'رَحِمَ', rumi: 'Ra - Hi - Ma', note: 'Ra (atas: Ra), Ha (bawah: Hi), Mim (atas: Ma).', ttsRumi: 'Ro Hi Ma' }
        ]
      },
      {
        id: 'i3_s2',
        code: 'IQ 3.2',
        title: 'Mad Asli Ya Mati (ـِي — Bii, Tii, Fii)',
        topic: 'Iqra 3: Bacaan Panjang Baris Bawah Bertemu Ya',
        desc: 'Apabila huruf berbaris bawah diikuti huruf Ya tanpa baris, panjangkan 2 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'بِي تِي', rumi: 'Bii - Tii', note: 'Baris bawah bertemu Ya dibaca panjang 2 harakat.', ttsRumi: 'Bii Tii' },
          { arabic: 'فِيهَا', rumi: 'Fii - Haa', note: 'Fii (panjang 2 harakat) + Haa (panjang 2 harakat).', ttsRumi: 'Fii Haa' },
          { arabic: 'دِينِ', rumi: 'Dii - Ni', note: 'Dii (panjang 2 harakat), Ni (pendek 1 harakat).', ttsRumi: 'Dii Ni' },
          { arabic: 'قِيلَ', rumi: 'Qii - La', note: 'Qii (panjang 2 harakat), La (pendek 1 harakat).', ttsRumi: 'Qii La' },
          { arabic: 'سَبِيلِ', rumi: 'Sa - Bii - Li', note: 'Sa (pendek), Bii (panjang 2 harakat), Li (pendek).', ttsRumi: 'Sa Bii Li' }
        ]
      },
      {
        id: 'i3_s3',
        code: 'IQ 3.3',
        title: 'Baris Depan / Dhammah (بُ تُ كُ رُ)',
        topic: 'Iqra 3: Bacaan Baris Depan (Bunyi u)',
        desc: 'Kenali tanda baris depan seperti waw kecil di atas huruf yang berbunyi "u".',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'أُ بُ تُ', rumi: 'U - Bu - Tu', note: 'Baris depan (Dhammah) dibaca dengan memuncungkan bibir: U, Bu, Tu.', ttsRumi: 'U, Bu, Tu' },
          { arabic: 'كُتِبَ', rumi: 'Ku - Ti - Ba', note: 'Kaf (depan: Ku), Ta (bawah: Ti), Ba (atas: Ba).', ttsRumi: 'Ku Ti Ba' },
          { arabic: 'رُسُلُ', rumi: 'Ru - Su - Lu', note: 'Ketiga-tiga huruf berbaris depan (pendek 1 harakat).', ttsRumi: 'Ru Su Lu' },
          { arabic: 'قُرِئَ', rumi: 'Qu - Ri - A', note: 'Qaf (depan: Qu), Ra (bawah: Ri), Hamzah (atas: A).', ttsRumi: 'Qu Ri A' },
          { arabic: 'حَسُنَ', rumi: 'Ha - Su - Na', note: 'Ha (atas), Sin (depan: Su), Nun (atas).', ttsRumi: 'Ha Su Na' },
          { arabic: 'يَعِدُ', rumi: 'Ya - ‘I - Du', note: 'Ya (atas), ‘Ain (bawah), Dal (depan: Du).', ttsRumi: 'Ya I Du' }
        ]
      },
      {
        id: 'i3_s4',
        code: 'IQ 3.4',
        title: 'Mad Asli Waw Mati (ـُو — Buu, Tuu, Yuu)',
        topic: 'Iqra 3: Bacaan Panjang Baris Depan Bertemu Waw',
        desc: 'Huruf berbaris depan bertemu Waw tanpa baris dibaca panjang 2 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'بُو تُو', rumi: 'Buu - Tuu', note: 'Baris depan bertemu Waw dibaca panjang 2 harakat.', ttsRumi: 'Buu Tuu' },
          { arabic: 'يَقُولُ', rumi: 'Ya - Quu - Lu', note: 'Ya (pendek), Quu (panjang 2 harakat), Lu (pendek).', ttsRumi: 'Ya Quu Lu' },
          { arabic: 'نُوحِيهَا', rumi: 'Nuu - Hii - Haa', note: 'Gabungan 3 Mad Asli: Nuu (Waw), Hii (Ya), Haa (Alif)!', ttsRumi: 'Nuu Hii Haa' },
          { arabic: 'تُوبُوا', rumi: 'Tuu - Buu', note: 'Alif di hujung selepas Waw jamak tidak dibaca: Tuu - Buu.', ttsRumi: 'Tuu Buu' },
          { arabic: 'قُلُوبُ', rumi: 'Qu - Luu - Bu', note: 'Qu (pendek), Luu (panjang 2 harakat), Bu (pendek).', ttsRumi: 'Qu Luu Bu' }
        ]
      },
      {
        id: 'i3_boss',
        code: 'UJIAN IQ3',
        title: 'BOSS IQRA 3: Ujian Naik ke Iqra 4',
        topic: 'Penilaian Menyeluruh Iqra 3 (Kasrah, Dhammah & Mad)',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Iqra 4!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80,
        cards: []
      }
    ]
  },
  {
    darjah: 4,
    title: 'Iqra 4: Tanwin, Tanda Mati (Sukun), Qalqalah & Izhar',
    subtitle: 'Baris Dua (An, In, Un), Huruf Mati (Sukun), Detakan Qalqalah (Baju Di Toko) & Mim/Nun Mati',
    themeColor: '#7c3aed',
    bgGradient: 'linear-gradient(180deg, #3b0764 0%, #6d28d9 100%)',
    badge: '📕',
    nodes: [
      {
        id: 'i4_s1',
        code: 'IQ 4.1',
        title: 'Baris Dua / Tanwin (ـً ـٍ ـٌ — An, In, Un)',
        topic: 'Iqra 4: Tanwin Fathatain, Kasratain & Dhammatain',
        desc: 'Kenali bunyi hujung "n" pada baris dua di atas (an), dua di bawah (in), dan dua di depan (un).',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'بً بٍ بٌ', rumi: 'Ban - Bin - Bun', note: 'Baris dua atas (Ban), dua bawah (Bin), dua depan (Bun).', ttsRumi: 'Ban, Bin, Bun' },
          { arabic: 'تً تٍ تٌ', rumi: 'Tan - Tin - Tun', note: 'Sebutan jelas tanpa dipanjangkan: Tan, Tin, Tun.', ttsRumi: 'Tan, Tin, Tun' },
          { arabic: 'كِتَابًا', rumi: 'Ki - Taa - Ban', note: 'Alif di hujung selepas baris dua atas tidak memanjangkan bunyi "Ban" (melainkan jika berhenti/waqaf).', ttsRumi: 'Ki Taa Ban' },
          { arabic: 'عَلِيمٌ', rumi: '‘A - Lii - Mun', note: 'Mim berbaris dua depan dibaca: Mun.', ttsRumi: 'A Lii Mun' },
          { arabic: 'حَسَنَةٍ', rumi: 'Ha - Sa - Na - Tin', note: 'Ta Marbuthah berbaris dua bawah dibaca: Tin.', ttsRumi: 'Ha Sa Na Tin' }
        ]
      },
      {
        id: 'i4_s2',
        code: 'IQ 4.2',
        title: 'Tanda Mati / Sukun (ـْ) & Huruf Lin',
        topic: 'Iqra 4: Bacaan Huruf Bertanda Sukun',
        desc: 'Matikan bunyi huruf yang bertanda sukun serta kenali bacaan lembut Waw Lin (au) dan Ya Lin (ai).',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'أَنْعَمْتَ', rumi: 'An - ‘Am - Ta', note: 'Nun mati (An) dan Mim mati (‘Am) dibaca jelas.', ttsRumi: 'An Am Ta' },
          { arabic: 'الْحَمْدُ', rumi: 'Al - Ham - Du', note: 'Lam mati (Al) dan Mim mati (Ham).', ttsRumi: 'Al Ham Du' },
          { arabic: 'يَوْمَ', rumi: 'Yau - Ma', note: 'Huruf Lin: Baris atas bertemu Waw mati dibaca lembut "Yau".', ttsRumi: 'Yau Ma' },
          { arabic: 'خَوْفٍ', rumi: 'Khau - Fin', note: 'Kha berbaris atas bertemu Waw mati dibaca "Khau".', ttsRumi: 'Khau Fin' },
          { arabic: 'قُرَيْشٍ', rumi: 'Qu - Rai - Syin', note: 'Huruf Lin: Ra berbaris atas bertemu Ya mati dibaca "Rai".', ttsRumi: 'Qu Roi Syin' }
        ]
      },
      {
        id: 'i4_s3',
        code: 'IQ 4.3',
        title: 'Huruf Qalqalah (ق ط ب ج د — Baju Di Toko)',
        topic: 'Iqra 4: Pantulan Bunyi Qalqalah',
        desc: 'Apabila 5 huruf Qalqalah (ق ط ب ج د) bertanda mati/sukun, bunyinya melantun sedikit.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'أَحَدْ', rumi: 'A - Had (Qalqalah)', note: 'Dal mati di hujung dilantunkan bunyinya: A-Had(e).', ttsRumi: 'A Had' },
          { arabic: 'قُلْ أَعُوذُ بِرَبِّ الْفَلَقْ', rumi: 'Bi - Rab - Bil - Fa - Laq', note: 'Qaf mati di hujung dilantunkan dengan jelas.', ttsRumi: 'Fa Laq' },
          { arabic: 'يَدْخُلُونَ', rumi: 'Yad - Khu - Luu - Na', note: 'Dal mati di tengah kalimah (Qalqalah Sughra): Yad-khu-luu-na.', ttsRumi: 'Yad Khu Luu Na' },
          { arabic: 'أَطْعَمَهُمْ', rumi: 'Ath - ‘A - Ma - Hum', note: 'Tha mati (Qalqalah): Ath-‘a-ma-hum.', ttsRumi: 'Ath A Ma Hum' },
          { arabic: 'أَجْرٌ', rumi: 'Aj - Run', note: 'Jim mati (Qalqalah): Aj-run.', ttsRumi: 'Aj Run' }
        ]
      },
      {
        id: 'i4_s4',
        code: 'IQ 4.4',
        title: 'Izhar Halqi & Mim Mati (Bacaan Jelas Tanpa Dengung)',
        topic: 'Iqra 4: Nun Mati Bertemu Huruf Halqi (ء هـ ع ح غ خ)',
        desc: 'Apabila Nun mati atau Tanwin bertemu 6 huruf kerongkong (ء هـ ع ح غ خ), baca jelas tanpa dengung.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'مَنْ ءَامَنَ', rumi: 'Man Aa - Ma - Na', note: 'Nun mati bertemu Hamzah (Izhar Halqi) — bunyi "Man" jelas tanpa dengung.', ttsRumi: 'Man Aa Ma Na' },
          { arabic: 'مِنْ خَوْفٍ', rumi: 'Min Khau - Fin', note: 'Nun mati bertemu Kha — bunyi "Min" jelas.', ttsRumi: 'Min Khau Fin' },
          { arabic: 'عَذَابٌ أَلِيمٌ', rumi: '‘A - Dzaa - Bun A - Lii - Mun', note: 'Tanwin bertemu Hamzah — bunyi "Bun" jelas.', ttsRumi: 'A Dzaa Bun A Lii Mun' },
          { arabic: 'عَلَيْهِمْ وَلَا', rumi: '‘A - Lai - Him Wa - Laa', note: 'Mim mati bertemu Waw (Izhar Syafawi) — bunyi "Him" jelas.', ttsRumi: 'A Lai Him Wa Laa' }
        ]
      },
      {
        id: 'i4_boss',
        code: 'UJIAN IQ4',
        title: 'BOSS IQRA 4: Ujian Naik ke Iqra 5',
        topic: 'Penilaian Menyeluruh Iqra 4 (Tanwin, Sukun, Qalqalah & Izhar)',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk membuka kunci Iqra 5!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80,
        cards: []
      }
    ]
  },
  {
    darjah: 5,
    title: 'Iqra 5: Sabdu (Tasydid), Alif Lam, Dengung & Mad Panjang',
    subtitle: 'Alif Lam Qamariyah/Syamsiyah, Wajibul Ghunnah (إِنَّ / ثُمَّ), Lafaz Allah & Mad 4–5 Harakat',
    themeColor: '#db2777',
    bgGradient: 'linear-gradient(180deg, #831843 0%, #be185d 100%)',
    badge: '📔',
    nodes: [
      {
        id: 'i5_s1',
        code: 'IQ 5.1',
        title: 'Alif Lam Qamariyah vs Alif Lam Syamsiyah',
        topic: 'Iqra 5: Hukum Alif Lam (الْ vs الـّ)',
        desc: 'Alif Lam Qamariyah (Lam berbaris mati dibaca jelas) vs Alif Lam Syamsiyah (terus masuk ke huruf bersabdu).',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'الْقَمَرُ', rumi: 'Al - Qa - Ma - Ru', note: 'Alif Lam Qamariyah: Lam bertanda sukun dibaca jelas "Al".', ttsRumi: 'Al Qo Ma Ru' },
          { arabic: 'الشَّمْسُ', rumi: 'Asy - Syam - Su', note: 'Alif Lam Syamsiyah: Lam tidak dibaca, terus masuk ke huruf Syin bersabdu ("Asy").', ttsRumi: 'Asy Syam Su' },
          { arabic: 'الرَّحْمَٰنُ', rumi: 'Ar - Rah - Maa - Nu', note: 'Alif Lam Syamsiyah: Terus masuk ke huruf Ra bersabdu ("Ar").', ttsRumi: 'Ar Roh Maa Nu' },
          { arabic: 'النَّاسِ', rumi: 'An - Naa - Si', note: 'Alif Lam Syamsiyah bertemu Nun bersabdu: Dengung 2 harakat pada "An-Naa-Si".', ttsRumi: 'An Naa Si' }
        ]
      },
      {
        id: 'i5_s2',
        code: 'IQ 5.2',
        title: 'Sabdu (Tasydid ـّ) & Wajibul Ghunnah (إِنَّ / ثُمَّ)',
        topic: 'Iqra 5: Tekanan Sabdu & Dengung Nun/Mim Bersabdu',
        desc: 'Huruf Nun bersabdu (نّ) dan Mim bersabdu (مّ) wajib didengungkan selama 2 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'إِنَّ', rumi: 'In - na (Dengung 2 Harakat)', note: 'Wajibul Ghunnah: Nun bersabdu wajib ditahan dengungnya 2 harakat.', ttsRumi: 'In na' },
          { arabic: 'ثُمَّ', rumi: 'Tsum - ma (Dengung 2 Harakat)', note: 'Wajibul Ghunnah: Mim bersabdu wajib didengungkan 2 harakat.', ttsRumi: 'Sum ma' },
          { arabic: 'عَمَّ', rumi: '‘Am - ma (Dengung 2 Harakat)', note: 'Mim bersabdu: Tahan bibir dengan dengung 2 harakat.', ttsRumi: 'Am ma' },
          { arabic: 'تَبَّتْ', rumi: 'Tab - bat', note: 'Ba bersabdu ditekan tanpa dengung: Tab-bat.', ttsRumi: 'Tab bat' }
        ]
      },
      {
        id: 'i5_s3',
        code: 'IQ 5.3',
        title: 'Lafaz Allah (اللّٰه) & Idgham Bilaghunnah (ل / ر)',
        topic: 'Iqra 5: Masuk Tanpa Dengung (مِنْ رَّبِّهِمْ)',
        desc: 'Nun mati/Tanwin bertemu Lam (ل) atau Ra (ر) dimasukkan terus tanpa dengung.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'بِسْمِ اللّٰهِ', rumi: 'Bis - mil - laa - hi', note: 'Sebelum lafaz Allah berbaris bawah (Mi), maka Lam pada Allah dibaca nipis: Bis-mil-laa-hi.', ttsRumi: 'Bis mil laa hi' },
          { arabic: 'هُوَ اللّٰهُ', rumi: 'Hu - wal - laa - hu', note: 'Sebelum lafaz Allah berbaris atas (Wa), maka lafaz Allah dibaca tebal: Hu-wal-laa-hu.', ttsRumi: 'Hu wal laa hu' },
          { arabic: 'مِنْ رَّبِّهِمْ', rumi: 'Mir - Rab - Bi - Him', note: 'Idgham Bilaghunnah: Nun mati bertemu Ra terus dibaca "Mir-Rab-Bi-Him" (tanpa dengung!).', ttsRumi: 'Mir Rob Bi Him' },
          { arabic: 'غَفُورٌ رَّحِيمٌ', rumi: 'Gha - Fuu - Rur - Ra - Hii - Mun', note: 'Tanwin bertemu Ra dimasukkan terus menjadi "Rur" tanpa dengung.', ttsRumi: 'Gho Fuu Rur Ro Hii Mun' },
          { arabic: 'مِنْ لَّدُنْهُ', rumi: 'Mil - La - Dun - Hu', note: 'Nun mati bertemu Lam terus dibaca "Mil" tanpa dengung.', ttsRumi: 'Mil La Dun Hu' }
        ]
      },
      {
        id: 'i5_s4',
        code: 'IQ 5.4',
        title: 'Bacaan Panjang Mad (Tanda Ombak ٓ — 4/5 Harakat)',
        topic: 'Iqra 5: Mad Wajib Muttasil & Mad Jaiz Munfasil',
        desc: 'Apabila terdapat tanda ombak (ٓ) di atas huruf Mad bertemu Hamzah, panjangkan 4 atau 5 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'جَآءَ', rumi: 'Jaaaa - a (4/5 Harakat)', note: 'Mad Wajib Muttasil: Tanda ombak bertemu Hamzah dalam satu kalimah (4 atau 5 harakat).', ttsRumi: 'Jaaaa a' },
          { arabic: 'سَوَآءٌ', rumi: 'Sa - Waaaa - un', note: 'Panjangkan "Waaaa" selama 4 atau 5 harakat.', ttsRumi: 'Sa Waaaa un' },
          { arabic: 'إِنَّآ أَعْطَيْنَاكَ', rumi: 'In - naaaa A‘ - Thai - Naa - Ka', note: 'Mad Jaiz Munfasil pada "In-naaaa" (4/5 harakat).', ttsRumi: 'In naaaa A Thoi Naa Ka' },
          { arabic: 'لَآ أَعْبُدُ', rumi: 'Laaaa A‘ - Bu - Du', note: 'Panjangkan "Laaaa" (4/5 harakat) sebelum masuk ke "A‘-bu-du".', ttsRumi: 'Laaaa A Bu Du' }
        ]
      },
      {
        id: 'i5_boss',
        code: 'UJIAN IQ5',
        title: 'BOSS IQRA 5: Ujian Naik ke Iqra 6',
        topic: 'Penilaian Menyeluruh Iqra 5',
        desc: 'Lulus sekurang-kurangnya 80% (8/10) untuk mara ke Puncak Iqra 6!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80,
        cards: []
      }
    ]
  },
  {
    darjah: 6,
    title: 'Iqra 6: Idgham Bighunnah, Iqlab, Ikhfa’, Waqaf & Khatam!',
    subtitle: 'Hukum Nun Mati/Tanwin Lengkap, Cara Berhenti Bacaan (Waqaf) & Huruf Pembuka Surah',
    themeColor: '#dc2626',
    bgGradient: 'linear-gradient(180deg, #450a0a 0%, #b91c1c 100%)',
    badge: '👑',
    nodes: [
      {
        id: 'i6_s1',
        code: 'IQ 6.1',
        title: 'Idgham Ma’al Ghunnah (ي ن م و)',
        topic: 'Iqra 6: Masuk Dengan Dengung (2 Harakat)',
        desc: 'Apabila Nun mati atau Tanwin bertemu huruf Ya, Nun, Mim atau Waw (ي ن م و), masukkan dengan dengung 2 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'مَنْ يَّعْمَلْ', rumi: 'May - Ya‘ - Mal (Dengung)', note: 'Nun mati bertemu Ya: Masuk menjadi bunyi "May" beserta dengung 2 harakat.', ttsRumi: 'May Ya Mal' },
          { arabic: 'مِنْ وَّلِيٍّ', rumi: 'Miw - Wa - Liy - Yin (Dengung)', note: 'Nun mati bertemu Waw: Masuk menjadi bunyi "Miw" beserta dengung 2 harakat.', ttsRumi: 'Miw Wa Liy Yin' },
          { arabic: 'مِنْ مَّاءٍ', rumi: 'Mim - Maaa - in (Dengung)', note: 'Nun mati bertemu Mim: Masuk menjadi "Mim" dengan dengung 2 harakat.', ttsRumi: 'Mim Maaa in' },
          { arabic: 'يَوْمَئِذٍ نَّاعِمَةٌ', rumi: 'Yau - Ma - I - Dzin - Naa - ‘I - Mah', note: 'Tanwin bertemu Nun: Masuk dengan dengung 2 harakat.', ttsRumi: 'Yau Ma I Dzin Naa I Mah' }
        ]
      },
      {
        id: 'i6_s2',
        code: 'IQ 6.2',
        title: 'Hukum Iqlab (نْ / تنوين Bertemu ب)',
        topic: 'Iqra 6: Tukar Bunyi Nun Kepada Mim (مۢ)',
        desc: 'Apabila Nun mati atau Tanwin bertemu huruf Ba (ب), bunyi "n" bertukar menjadi "m" dengan dengung 2 harakat.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'مِنۢ بَعْدِ', rumi: 'Mim - Ba‘ - Di (Iqlab)', note: 'Tanda Mim kecil menunjukkan Nun mati ditukar kepada bunyi Mim ("Mim-Ba‘-Di") dengan dengung 2 harakat.', ttsRumi: 'Mim Ba Di' },
          { arabic: 'سَمِيعٌۢ بَصِيرٌ', rumi: 'Sa - Mii - ‘Um - Ba - Shii - Run', note: 'Tanwin "‘Un" bertemu Ba bertukar menjadi "‘Um-Ba-Shii-Run".', ttsRumi: 'Sa Mii Um Ba Shii Run' },
          { arabic: 'لَنَسْفَعًۢا بِالنَّاصِيَةِ', rumi: 'La - Nas - Fa - ‘Am - Bin - Naa - Shi - Yah', note: 'Tanwin bertemu Ba dibaca dengan bibir dirapatkan lembut (Mim dengung).', ttsRumi: 'La Nas Fa Am Bin Naa Shi Yah' }
        ]
      },
      {
        id: 'i6_s3',
        code: 'IQ 6.3',
        title: 'Hukum Ikhfa’ Haqiqi (Bacaan Samar & Dengung)',
        topic: 'Iqra 6: Nun Mati/Tanwin Bertemu 15 Huruf Ikhfa’',
        desc: 'Apabila Nun mati/Tanwin bertemu huruf seperti ت ث ج د ذ ز س ش ص ض ط ظ ف ق ك, bunyi "n" disamarkan dengan dengung.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'مِنْ شَرِّ', rumi: 'Min(g) - Syar - Ri (Ikhfa’)', note: 'Nun mati bertemu Syin: Bunyi "n" disamarkan beserta dengung 2 harakat.', ttsRumi: 'Min Syar Ri' },
          { arabic: 'أَنفُسِهِمْ', rumi: 'An(g) - Fu - Si - Him', note: 'Nun mati bertemu Fa: Disamarkan bunyi Nun bersedia menyebut Fa.', ttsRumi: 'An Fu Si Him' },
          { arabic: 'مِنْ قَبْلِ', rumi: 'Ming - Qab - Li', note: 'Nun mati bertemu Qaf: Dengung Ikhfa’ tebal ("Ming-Qab-Li").', ttsRumi: 'Ming Qob Li' },
          { arabic: 'كُنْتُمْ', rumi: 'Kun(g) - Tum', note: 'Nun mati bertemu Ta: Dengung Ikhfa’ 2 harakat.', ttsRumi: 'Kun Tum' }
        ]
      },
      {
        id: 'i6_s4',
        code: 'IQ 6.4',
        title: 'Cara Waqaf (Berhenti Bacaan) & Huruf Muqatta’ah',
        topic: 'Iqra 6: Peraturan Berhenti di Hujung Ayat & الم / يس',
        desc: 'Matikan baris akhir apabila berhenti (waqaf), Ta Marbuthah (ة) bertukar bunyi "h", dan bacaan Alif-Lam-Mim.',
        isBoss: false,
        questionCount: 8,
        passPercent: 75,
        cards: [
          { arabic: 'الْعَالَمِينَ ۝', rumi: 'Al - ‘Aa - La - Miin (Waqaf)', note: 'Apabila berhenti (waqaf) pada "Miina", baris akhir dimatikan menjadi "Miin" (Mad ‘Aridh Lissukun).', ttsRumi: 'Al Aa La Miin' },
          { arabic: 'الْقَارِعَةُ ۝', rumi: 'Al - Qaa - Ri - ‘Ah (Waqaf)', note: 'Ta Marbuthah (ةُ) apabila berhenti (waqaf) bertukar menjadi bunyi Ha mati: "Al-Qaa-Ri-‘Ah".', ttsRumi: 'Al Qoo Ri Ah' },
          { arabic: 'عَلِيمًا حَكِيمًا ۝', rumi: '‘A - Lii - Man Ha - Kii - Maa (Waqaf)', note: 'Baris dua di atas (ـًا) apabila berhenti di hujung ayat dibaca panjang 2 harakat ("Kii-Maa" — Mad ‘Iwadh).', ttsRumi: 'A Lii Man Ha Kii Maa' },
          { arabic: 'الٓمٓ', rumi: 'Alif - Laam - Miim', note: 'Huruf pembuka surah (Fawatihus Suwar): Alif (1), Laam (6 harakat), Miim (6 harakat).', ttsRumi: 'Alif Laam Miim' },
          { arabic: 'يسٓ', rumi: 'Yaa - Siiin', note: 'Yaa (2 harakat), Siiin (6 harakat).', ttsRumi: 'Yaa Siiin' }
        ]
      },
      {
        id: 'i6_boss',
        code: 'UJIAN IQ6',
        title: 'BOSS AKHIR IQRA 6: Ujian Khatam Iqra 1–6!',
        topic: 'Penilaian Akhir Komprehensif Iqra 1 Hingga Iqra 6',
        desc: 'Lulus dengan markah ≥80% untuk menamatkan pengembaraan Iqra 1–6 dengan cemerlang!',
        isBoss: true,
        questionCount: 10,
        passPercent: 80,
        cards: []
      }
    ]
  }
];

// ============================================================================
// PENJANA KUIZ IQRA' DINAMIK BERDASARKAN KAD STESEN
// ============================================================================
window.generateIqraQuestionsForNode = function (nodeId) {
  const world = window.IQRA_WORLDS.find((w) => w.nodes.some((n) => n.id === nodeId));
  const node = world.nodes.find((n) => n.id === nodeId);
  const count = node.questionCount || 8;

  // Kumpulkan semua kad dalam dunia (Darjah/Iqra) ini untuk dijadikan distraktor pilihan jawapan
  const allWorldCards = [];
  world.nodes.forEach((n) => {
    if (n.cards && n.cards.length) {
      n.cards.forEach((c) => allWorldCards.push({ ...c, sourceTopic: n.topic }));
    }
  });

  const targetCards = node.isBoss ? allWorldCards : node.cards || allWorldCards;
  const shuffledCards = iqraShuffle(targetCards);
  const questions = [];

  for (let i = 0; i < count; i++) {
    const card = shuffledCards[i % shuffledCards.length];
    const askRumi = i % 2 === 0;

    if (askRumi) {
      const otherRumis = iqraShuffle(
        allWorldCards.map((c) => c.rumi).filter((r) => r !== card.rumi)
      ).slice(0, 3);
      while (otherRumis.length < 3) {
        otherRumis.push(['Ba - Ta - Tsa', 'Ma - La - Ka', 'Fii - Haa', 'Al - Ham - Du'][otherRumis.length]);
      }

      questions.push({
        topic: card.sourceTopic || node.topic,
        inputMode: 'mcq',
        arabicDisplay: card.arabic,
        ttsArabic: card.arabic,
        ttsRumi: card.ttsRumi || card.rumi,
        prompt: `Apakah **sebutan Rumi** yang betul bagi bacaan di bawah?\n\n**${card.arabic}**`,
        hint: card.note,
        explanation: `Bacaan bagi **${card.arabic}** ialah **${card.rumi}**.\n💡 Nota Ustaz: ${card.note}`,
        answer: card.rumi,
        options: iqraShuffle([card.rumi, ...otherRumis])
      });
    } else {
      const otherArabics = iqraShuffle(
        allWorldCards.map((c) => c.arabic).filter((a) => a !== card.arabic)
      ).slice(0, 3);
      while (otherArabics.length < 3) {
        otherArabics.push(['بَ تَ ثَ', 'مَ لَ كَ', 'فِيهَا', 'الْحَمْدُ'][otherArabics.length]);
      }

      questions.push({
        topic: card.sourceTopic || node.topic,
        inputMode: 'mcq',
        arabicDisplay: null,
        ttsArabic: card.arabic,
        ttsRumi: card.ttsRumi || card.rumi,
        prompt: `Pilih tulisan **Iqra' (Arab)** yang berbunyi:\n\n**"${card.rumi}"**`,
        hint: card.note,
        explanation: `Sebutan **${card.rumi}** ditulis sebagai **${card.arabic}**.\n💡 Nota Ustaz: ${card.note}`,
        answer: card.arabic,
        options: iqraShuffle([card.arabic, ...otherArabics])
      });
    }
  }

  return questions;
};

// ============================================================================
// KOLEKSI DOA HARIAN ANAK SOLEH (ARAB + RUMI + MAKSUD + AUDIO + KUIZ)
// ============================================================================
window.DAILY_DOA_LIST = [
  {
    id: 'doa_makan',
    icon: '🍽️',
    title: 'Doa Sebelum Makan',
    category: 'Amalan Harian',
    arabic: 'اللَّهُمَّ بَارِكْ لَنَا فِيمَا رَزَقْتَنَا وَقِنَا عَذَابَ النَّارِ',
    rumi: 'Allaahumma baarik lanaa fiimaa razaqtanaa wa qinaa ‘adzaaban-naar.',
    meaning: 'Ya Allah, berkatilah rezeki yang Engkau kurniakan kepada kami dan peliharalah kami daripada azab api neraka.',
    quizQ: 'Apakah maksud "wa qinaa ‘adzaaban-naar" di hujung Doa Sebelum Makan?',
    quizAns: 'Dan peliharalah kami daripada azab api neraka',
    quizOpts: [
      'Dan peliharalah kami daripada azab api neraka',
      'Jadikanlah kami orang yang tidur lena',
      'Tambahkanlah ilmu pengetahuan kami',
      'Ampunilah dosa kedua-dua ibu bapa kami'
    ]
  },
  {
    id: 'doa_selepas_makan',
    icon: '🥛',
    title: 'Doa Selepas Makan',
    category: 'Amalan Harian',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَطْعَمَنَا وَسَقَانَا وَجَعَلَنَا مِنَ الْمُسْلِمِينَ',
    rumi: 'Alhamdulillaahil-ladzii ath‘amanaa wa saqaanaa wa ja‘alanaa minal-muslimiin.',
    meaning: 'Segala puji bagi Allah yang telah memberi kami makan dan minum serta menjadikan kami daripada kalangan orang Islam.',
    quizQ: 'Bilakah kita membaca doa "Alhamdulillaahil-ladzii ath‘amanaa wa saqaanaa..."?',
    quizAns: 'Selepas selesai makan dan minum',
    quizOpts: [
      'Selepas selesai makan dan minum',
      'Sebelum masuk ke dalam tandas',
      'Semasa melihat cermin',
      'Ketika hendak keluar rumah'
    ]
  },
  {
    id: 'doa_belajar',
    icon: '📚',
    title: 'Doa Sebelum Belajar & Penerang Hati',
    category: 'Ilmu & Sekolah',
    arabic: 'اللَّهُمَّ افْتَحْ عَلَيْنَا حِكْمَتَكَ وَانْشُرْ عَلَيْنَا مِنْ خَزَائِنِ رَحْمَتِكَ يَا أَرْحَمَ الرَّاحِمِينَ ، رَبِّ زِدْنِي عِلْمًا وَارْزُقْنِي فَهِمًا',
    rumi: 'Allaahummaf-tah ‘alainaa hikmataka wansyur ‘alainaa min khazaa-ini rahmatika yaa Arhamar-Raahimiin. Rabbi zidnii ‘ilman warzuqnii fahman.',
    meaning: 'Ya Allah, bukakanlah ke atas kami hikmah-Mu dan limpahkanlah ke atas kami khazanah rahmat-Mu, wahai Tuhan Yang Maha Penyayang. Ya Tuhanku, tambahkanlah ilmuku dan kurniakanlah kefahaman kepadaku.',
    quizQ: 'Apakah maksud potongan doa pendek "Rabbi zidnii ‘ilman"?',
    quizAns: 'Ya Tuhanku, tambahkanlah ilmuku',
    quizOpts: [
      'Ya Tuhanku, tambahkanlah ilmuku',
      'Ya Tuhanku, berkatilah makananku',
      'Ya Tuhanku, lindungilah perjalananku',
      'Segala puji bagi Allah'
    ]
  },
  {
    id: 'doa_ibubapa',
    icon: '👨‍👩‍👧‍👦',
    title: 'Doa Untuk Ibu Bapa',
    category: 'Keluarga & Kasih Sayang',
    arabic: 'رَبِّ اغْفِرْ لِي وَلِوَالِدَيَّ وَارْحَمْهُمَا كَمَا رَبَّيَانِي صَغِيرًا',
    rumi: 'Rabbigh-fir lii wa liwaalidayya warhamhumaa kamaa rabbayaanii shaghiiraa.',
    meaning: 'Ya Tuhanku, ampunilah dosaku dan dosa kedua-dua ibu bapaku, serta kasihilah mereka sebagaimana mereka mendidik dan mengasihiku semasa aku kecil.',
    quizQ: 'Dalam doa ibu bapa, perkataan "wa liwaalidayya" merujuk kepada siapa?',
    quizAns: 'Kedua-dua ibu bapaku',
    quizOpts: [
      'Kedua-dua ibu bapaku',
      'Semua rakan sekelasku',
      'Jiran tetanggaku',
      'Haiwan peliharaanku'
    ]
  },
  {
    id: 'doa_tidur',
    icon: '😴',
    title: 'Doa Sebelum Tidur',
    category: 'Waktu Tidur',
    arabic: 'بِاسْمِكَ اللَّهُمَّ أَحْيَا وَأَمُوتُ',
    rumi: 'Bismikallaahumma ahyaa wa amuut.',
    meaning: 'Dengan nama-Mu ya Allah, aku hidup dan aku mati.',
    quizQ: 'Apakah bacaan Rumi bagi Doa Sebelum Tidur?',
    quizAns: 'Bismikallaahumma ahyaa wa amuut',
    quizOpts: [
      'Bismikallaahumma ahyaa wa amuut',
      'Alhamdulillaahil-ladzii ahyaanaa',
      'Bismillaahi tawakkaltu ‘alallaah',
      'Ghufranaka'
    ]
  },
  {
    id: 'doa_bangun_tidur',
    icon: '☀️',
    title: 'Doa Bangun Tidur',
    category: 'Waktu Tidur',
    arabic: 'الْحَمْدُ لِلَّهِ الَّذِي أَحْيَانَا بَعْدَ مَا أَمَاتَنَا وَإِلَيْهِ النُّشُورُ',
    rumi: 'Alhamdulillaahil-ladzii ahyaanaa ba‘da maa amaatanaa wa ilaihin-nusyuur.',
    meaning: 'Segala puji bagi Allah yang telah menghidupkan kami kembali selepas mematikan kami (tidur), dan kepada-Nya jualah tempat kembali.',
    quizQ: 'Mengapakah kita membaca doa ini sebaik sahaja terjaga daripada tidur?',
    quizAns: 'Bersyukur kepada Allah kerana menghidupkan kita semula selepas tidur',
    quizOpts: [
      'Bersyukur kepada Allah kerana menghidupkan kita semula selepas tidur',
      'Untuk meminta makanan yang sedap',
      'Sebelum memulakan sukan',
      'Ketika hujan turun'
    ]
  },
  {
    id: 'doa_keluar_rumah',
    icon: '🏠',
    title: 'Doa Keluar Rumah',
    category: 'Perjalanan & Keselamatan',
    arabic: 'بِسْمِ اللَّهِ تَوَكَّلْتُ عَلَى اللَّهِ ، لَا حَوْلَ وَلَا قُوَّةَ إِلَّا بِاللَّهِ',
    rumi: 'Bismillaahi tawakkaltu ‘alallaah, laa haula wa laa quwwata illaa billaah.',
    meaning: 'Dengan nama Allah, aku bertawakal (berserah diri) kepada Allah, tiada daya dan tiada kekuatan melainkan dengan pertolongan Allah.',
    quizQ: 'Bilakah doa "Bismillaahi tawakkaltu ‘alallaah..." dibaca?',
    quizAns: 'Ketika melangkah keluar dari rumah',
    quizOpts: [
      'Ketika melangkah keluar dari rumah',
      'Selepas selesai makan malam',
      'Ketika keluar dari tandas',
      'Semasa memakai baju baharu'
    ]
  },
  {
    id: 'doa_kenderaan',
    icon: '🚗',
    title: 'Doa Menaiki Kenderaan',
    category: 'Perjalanan & Keselamatan',
    arabic: 'سُبْحَانَ الَّذِي سَخَّرَ لَنَا هَٰذَا وَمَا كُنَّا لَهُ مُقْرِنِينَ وَإِنَّا إِلَىٰ رَبِّنَا لَمُنقَلِبُونَ',
    rumi: 'Subhaanal-ladzii sakh-khara lanaa haadzaa wa maa kunnaa lahuu muqriniin, wa innaa ilaa Rabbinaa lamunqalibuun.',
    meaning: 'Maha Suci Allah yang telah memudahkan kenderaan ini untuk kami, sedangkan kami sebelum ini tidak mampu menguasainya, dan sesungguhnya kepada Tuhan kamilah kami akan kembali.',
    quizQ: 'Doa "Subhaanal-ladzii sakh-khara lanaa haadzaa..." dibaca ketika...',
    quizAns: 'Menaiki kenderaan (kereta, bas, kapal terbang)',
    quizOpts: [
      'Menaiki kenderaan (kereta, bas, kapal terbang)',
      'Masuk ke dalam bilik tidur',
      'Membasuh tangan',
      'Memulakan peperiksaan'
    ]
  },
  {
    id: 'doa_masuk_tandas',
    icon: '🚿',
    title: 'Doa Masuk Tandas (Langkah Kaki Kiri)',
    category: 'Amalan Harian',
    arabic: 'اللَّهُمَّ إِنِّي أَعُوذُ بِكَ مِنَ الْخُبُثِ وَالْخَبَائِثِ',
    rumi: 'Allaahumma innii a‘uudzu bika minal-khubutsi wal-khabaa-its.',
    meaning: 'Ya Allah, sesungguhnya aku berlindung dengan-Mu daripada gangguan syaitan jantan dan syaitan betina.',
    quizQ: 'Kaki manakah yang patut didahulukan ketika melangkah masuk ke dalam tandas beserta doa ini?',
    quizAns: 'Kaki kiri',
    quizOpts: ['Kaki kiri', 'Kaki kanan', 'Melompat kedua-dua kaki', 'Berjalan mengundur']
  },
  {
    id: 'doa_keluar_tandas',
    icon: '✨',
    title: 'Doa Keluar Tandas (Langkah Kaki Kanan)',
    category: 'Amalan Harian',
    arabic: 'غُفْرَانَكَ الْحَمْدُ لِلَّهِ الَّذِي أَذْهَبَ عَنِّي الْأَذَىٰ وَعَافَانِي',
    rumi: 'Ghufraanaka, alhamdulillaahil-ladzii adzhaba ‘annil-adzaa wa ‘aafaanii.',
    meaning: 'Aku memohon keampunan-Mu (Ya Allah). Segala puji bagi Allah yang telah menghilangkan kotoran/penyakit daripadaku dan menyihatkanku.',
    quizQ: 'Apakah perkataan pertama dalam Doa Keluar Tandas yang bermaksud "Aku memohon keampunan-Mu"?',
    quizAns: 'Ghufraanaka',
    quizOpts: ['Ghufraanaka', 'Bismillaah', 'Subhaanallaah', 'Allahu Akbar']
  },
  {
    id: 'doa_cermin',
    icon: '🪞',
    title: 'Doa Ketika Melihat Cermin',
    category: 'Amalan Harian',
    arabic: 'اللَّهُمَّ كَمَا حَسَّنْتَ خَلْقِي فَحَسِّنْ خُلُقِي',
    rumi: 'Allaahumma kamaa hassanta khalqii fa hassin khuluqii.',
    meaning: 'Ya Allah, sebagaimana Engkau telah mencantikkan kejadian rupaku, maka cantikkanlah juga akhlak (budi pekerti)ku.',
    quizQ: 'Apakah yang kita pohon kepada Allah apabila membaca doa melihat cermin?',
    quizAns: 'Supaya Allah mencantikkan akhlak kita sebagaimana Dia mencantikkan rupa kejadian kita',
    quizOpts: [
      'Supaya Allah mencantikkan akhlak kita sebagaimana Dia mencantikkan rupa kejadian kita',
      'Supaya cermin tidak pecah',
      'Supaya kita menjadi paling tinggi di sekolah',
      'Supaya rambut cepat panjang'
    ]
  },
  {
    id: 'doa_dunia_akhirat',
    icon: '🌍',
    title: 'Doa Kebaikan Dunia & Akhirat (Sapu Muka)',
    category: 'Keluarga & Kasih Sayang',
    arabic: 'رَبَّنَا آتِنَا فِي الدُّنْيَا حَسَنَةً وَفِي الْآخِرَةِ حَسَنَةً وَقِنَا عَذَابَ النَّارِ',
    rumi: 'Rabbanaa aatinaa fid-dunyaa hasanatan wa fil-aakhirati hasanatan wa qinaa ‘adzaaban-naar.',
    meaning: 'Ya Tuhan kami, kurniakanlah kepada kami kebaikan di dunia dan kebaikan di akhirat, serta peliharalah kami daripada azab api neraka.',
    quizQ: 'Apakah dua kebaikan ("hasanah") yang dipohon di dalam doa "Rabbanaa aatinaa..." ini?',
    quizAns: 'Kebaikan di dunia dan kebaikan di akhirat',
    quizOpts: [
      'Kebaikan di dunia dan kebaikan di akhirat',
      'Harta yang banyak sahaja',
      'Kemenangan dalam permainan sahaja',
      'Cuaca yang sejuk sahaja'
    ]
  }
];
