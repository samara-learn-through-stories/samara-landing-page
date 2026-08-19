import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

export const LOCALES = [
  { id: "en", flag: "🇬🇧", native: "English", dir: "ltr" },
  { id: "fr", flag: "🇫🇷", native: "Français", dir: "ltr" },
  { id: "ar", flag: "🇸🇦", native: "العربية", dir: "rtl" },
  { id: "es", flag: "🇪🇸", native: "Español", dir: "ltr" },
  { id: "de", flag: "🇩🇪", native: "Deutsch", dir: "ltr" },
  { id: "pt", flag: "🇧🇷", native: "Português", dir: "ltr" },
  { id: "tr", flag: "🇹🇷", native: "Türkçe", dir: "ltr" },
  { id: "id", flag: "🇮🇩", native: "Bahasa Indonesia", dir: "ltr" },
  { id: "it", flag: "🇮🇹", native: "Italiano", dir: "ltr" },
  { id: "nl", flag: "🇳🇱", native: "Nederlands", dir: "ltr" },
  { id: "ru", flag: "🇷🇺", native: "Русский", dir: "ltr" },
  { id: "zh", flag: "🇨🇳", native: "中文", dir: "ltr" },
  { id: "ja", flag: "🇯🇵", native: "日本語", dir: "ltr" },
  { id: "ko", flag: "🇰🇷", native: "한국어", dir: "ltr" },
  { id: "hi", flag: "🇮🇳", native: "हिन्दी", dir: "ltr" },
  { id: "ur", flag: "🇵🇰", native: "اردو", dir: "rtl" },
  { id: "ms", flag: "🇲🇾", native: "Bahasa Melayu", dir: "ltr" },
  { id: "sv", flag: "🇸🇪", native: "Svenska", dir: "ltr" },
  { id: "pl", flag: "🇵🇱", native: "Polski", dir: "ltr" },
  { id: "sw", flag: "🇰🇪", native: "Kiswahili", dir: "ltr" },
];

const STORAGE_KEY = "samara-lang";

const dict = {
  en: {
    "nav.method": "Method",
    "nav.stories": "Stories",
    "nav.origin": "Origin",
    "nav.cta": "Join the first circle",
    "nav.menu": "Menu",
    "nav.lang": "Language",

    "hero.title.1": "Read Arabic tales.",
    "hero.title.2": "Learn new words.",
    "hero.lede":
      "Illustrated tales. Tap any word to save it. Master it in five days.",
    "hero.badge": "100 spots open — first circle closes soon",
    "hero.cta": "Join the first circle",
    "hero.note": "100 spots available.",
    "final.note": "No spam. One email when you're in.",

    "method.kicker": "the method",
    "method.title.1": "Read,",
    "method.title.2": "Memorize,",
    "method.title.3": "Repeat.",
    "method.step1.when": "read",
    "method.step1.title.1": "Tap a word.",
    "method.step1.title.2": "Get its meaning.",
    "method.step1.body":
      "Tap any word in the story. A card appears with the meaning, transliteration, and a button to memorise it.",
    "method.step1.try": "Get early access →",
    "method.step2.when": "remember",
    "method.step2.title.1": "Five days to",
    "method.step2.title.2": "own a word.",
    "method.step2.body":
      "Tapped words become flashcards. Five correct answers across five days, and it's yours.",

    "demo.cap": "Book III · The Lion's Court",
    "demo.hint": "Tap an underlined word.",
    "demo.memorise": "Memorise",
    "demo.memorised": "✓",
    "demo.alt": "The donkey rises before the lion's court",

    "sr.translate": "Translate",
    "sr.write": "Write in Arabic",
    "sr.typeMeaning": "type the meaning…",
    "sr.typeArabic": "اكتب…",
    "sr.dayLabel": "Day {n} · {label}",
    "sr.return24": "return in 24h",
    "sr.oneMore": "one more day",
    "sr.finalRecall": "final recall",
    "sr.freed": "Word memorised — Yaraa is free",
    "sr.missed": "48h without practice — the word fades",

    "stories.kicker": "the library",
    "stories.title.1": "Read classic Arabic tales,",
    "stories.title.2": "word by word.",
    "stories.beginner": "beginner",
    "stories.intermediate": "intermediate",
    "stories.book": "Book {n}",
    "stories.meta": "{pages} pages · {words} words",
    "stories.b1.t": "The Child and the Grocer",
    "stories.b1.alt": "The child enters the grocer's shop",
    "stories.b2.t": "Juha and the Officer",
    "stories.b2.alt": "Juha walks at midnight",
    "stories.b3.t": "The Lion's Court",
    "stories.b3.alt": "The lion holds court",

    "origin.sub": "where stories cross languages",
    "origin.hint": "scroll",
    "origin.kicker": "Samara",
    "origin.p1":
      "Named after Samarkand, where the Silk Road carried stories between worlds.",
    "origin.p2": "We carry Arabic tales to yours.",

    "final.title.1": "Be among",
    "final.title.2": "the first.",

    "footer.tag": "learn Arabic through stories",
  },

  fr: {
    "nav.method": "Méthode",
    "nav.stories": "Histoires",
    "nav.origin": "Origine",
    "nav.cta": "Accès anticipé",
    "nav.menu": "Menu",
    "nav.lang": "Langue",

    "hero.title.1": "Lisez des contes arabes.",
    "hero.title.2": "Apprenez de nouveaux mots.",
    "hero.lede":
      "Des contes illustrés. Touchez un mot pour le garder. Maîtrisez-le en cinq jours.",
    "hero.badge": "100 places ouvertes — le premier cercle ferme bientôt",
    "hero.cta": "Rejoindre le premier cercle",
    "hero.note": "100 places disponibles.",
    "final.note": "Pas de spam. Un e-mail quand c'est votre tour.",

    "method.kicker": "la méthode",
    "method.title.1": "Lire,",
    "method.title.2": "Mémoriser,",
    "method.title.3": "Répéter.",
    "method.step1.when": "lire",
    "method.step1.title.1": "Touchez un mot.",
    "method.step1.title.2": "Voyez son sens.",
    "method.step1.body":
      "Touchez n'importe quel mot de l'histoire. Une carte apparaît avec le sens, la translittération, et un bouton pour le mémoriser.",
    "method.step1.try": "Accès anticipé →",
    "method.step2.when": "retenir",
    "method.step2.title.1": "Cinq jours pour",
    "method.step2.title.2": "posséder un mot.",
    "method.step2.body":
      "Les mots touchés deviennent des flashcards. Cinq bonnes réponses en cinq jours, et il est à vous.",

    "demo.cap": "Livre III · La Cour du Lion",
    "demo.hint": "Touchez un mot souligné.",
    "demo.memorise": "Mémoriser",
    "demo.memorised": "✓",
    "demo.alt": "L'âne se dresse devant la cour du lion",

    "sr.translate": "Traduire",
    "sr.write": "Écrire en arabe",
    "sr.typeMeaning": "tapez le sens…",
    "sr.typeArabic": "اكتب…",
    "sr.dayLabel": "Jour {n} · {label}",
    "sr.return24": "revenir dans 24h",
    "sr.oneMore": "encore un jour",
    "sr.finalRecall": "rappel final",
    "sr.freed": "Mot mémorisé — Yaraa est libre",
    "sr.missed": "48h sans pratique — le mot s'efface",

    "stories.kicker": "la bibliothèque",
    "stories.title.1": "Des contes qui",
    "stories.title.2": "valent la peine d'être lus.",
    "stories.beginner": "débutant",
    "stories.intermediate": "intermédiaire",
    "stories.book": "Livre {n}",
    "stories.meta": "{pages} pages · {words} mots",
    "stories.b1.t": "L'Enfant et l'Épicier",
    "stories.b1.alt": "L'enfant entre chez l'épicier",
    "stories.b2.t": "Juha et l'Officier",
    "stories.b2.alt": "Juha marche à minuit",
    "stories.b3.t": "La Cour du Lion",
    "stories.b3.alt": "Le lion tient cour",

    "origin.sub": "là où les histoires traversent les langues",
    "origin.hint": "défiler",
    "origin.kicker": "Samara",
    "origin.p1":
      "Nommée d'après Samarcande, là où la Route de la soie portait les histoires entre les mondes.",
    "origin.p2": "Nous portons les contes arabes jusqu'à vous.",

    "final.title.1": "Faites partie",
    "final.title.2": "des premiers.",

    "footer.tag": "apprendre l'arabe par les histoires",
  },

  ar: {
    "nav.method": "المنهج",
    "nav.stories": "القصص",
    "nav.origin": "الأصل",
    "nav.cta": "وصول مبكر",
    "nav.menu": "القائمة",
    "nav.lang": "اللغة",

    "hero.title.1": "اقرأ حكايات عربية.",
    "hero.title.2": "تعلّم كلمات جديدة.",
    "hero.lede":
      "حكايات مصوّرة. المس أي كلمة لحفظها. أتقنها في خمسة أيام.",
    "hero.badge": "١٠٠ مكان متاح — الدائرة الأولى تُغلق قريباً",
    "hero.cta": "انضم إلى الدائرة الأولى",
    "hero.note": "١٠٠ مكان متاح.",
    "final.note": "بلا رسائل مزعجة. رسالة واحدة حين يحين دورك.",

    "method.kicker": "المنهج",
    "method.title.1": "اقرأ،",
    "method.title.2": "احفظ،",
    "method.title.3": "كرّر.",
    "method.step1.when": "اقرأ",
    "method.step1.title.1": "المس كلمة.",
    "method.step1.title.2": "اعرف معناها.",
    "method.step1.body":
      "المس أي كلمة في القصة. تظهر بطاقة بالمعنى والنطق وزرّ لحفظها.",
    "method.step1.try": "وصول مبكر ←",
    "method.step2.when": "احفظ",
    "method.step2.title.1": "خمسة أيام لـ",
    "method.step2.title.2": "تملك الكلمة.",
    "method.step2.body":
      "الكلمات التي تلمسها تصبح بطاقات. خمس إجابات صحيحة عبر خمسة أيام، فتصير لك.",

    "demo.cap": "الكتاب الثالث · بلاط الأسد",
    "demo.hint": "المس كلمة تحتها خط.",
    "demo.memorise": "احفظ",
    "demo.memorised": "✓",
    "demo.alt": "الحمار ينهض أمام بلاط الأسد",

    "sr.translate": "ترجم",
    "sr.write": "اكتب بالعربية",
    "sr.typeMeaning": "اكتب المعنى…",
    "sr.typeArabic": "اكتب…",
    "sr.dayLabel": "اليوم {n} · {label}",
    "sr.return24": "عد بعد ٢٤ ساعة",
    "sr.oneMore": "يوم آخر",
    "sr.finalRecall": "الاسترجاع الأخير",
    "sr.freed": "حُفظت الكلمة — يراع حرّة",
    "sr.missed": "٤٨ ساعة بلا تمرين — الكلمة تتلاشى",

    "stories.kicker": "المكتبة",
    "stories.title.1": "حكايات تستحق",
    "stories.title.2": "عناء القراءة.",
    "stories.beginner": "مبتدئ",
    "stories.intermediate": "متوسط",
    "stories.book": "الكتاب {n}",
    "stories.meta": "{pages} صفحات · {words} كلمة",
    "stories.b1.t": "الولد والبقّال",
    "stories.b1.alt": "الولد يدخل دكان البقّال",
    "stories.b2.t": "جحا والشرطي",
    "stories.b2.alt": "جحا يسير في منتصف الليل",
    "stories.b3.t": "بلاط الأسد",
    "stories.b3.alt": "الأسد يعقد مجلسه",

    "origin.sub": "حيث تعبر القصص بين اللغات",
    "origin.hint": "مرّر",
    "origin.kicker": "سمرة",
    "origin.p1":
      "سُمّيت على اسم سمرقند، حيث حملت طريق الحرير القصص بين العوالم.",
    "origin.p2": "نحن نحمل الحكايات العربية إليكم.",

    "final.title.1": "كن من",
    "final.title.2": "الأوائل.",

    "footer.tag": "تعلّم العربية عبر القصص",
  },

  es: {
    "nav.method": "Método",
    "nav.stories": "Historias",
    "nav.origin": "Origen",
    "nav.cta": "Acceso anticipado",
    "nav.menu": "Menú",
    "nav.lang": "Idioma",
    "hero.title.1": "Lee cuentos árabes.",
    "hero.title.2": "Aprende palabras nuevas.",
    "hero.lede": "Cuentos ilustrados. Toca una palabra para guardarla. Domínala en cinco días.",
    "hero.badge": "100 plazas abiertas — el primer círculo cierra pronto",
    "hero.cta": "Únete al primer círculo",
    "hero.note": "100 plazas disponibles.",
    "final.note": "Sin spam. Un correo cuando entres.",
    "final.title.1": "Sé de",
    "final.title.2": "los primeros.",
    "footer.tag": "aprende árabe a través de historias",
  },

  de: {
    "nav.method": "Methode",
    "nav.stories": "Geschichten",
    "nav.origin": "Ursprung",
    "nav.cta": "Früher Zugang",
    "nav.menu": "Menü",
    "nav.lang": "Sprache",
    "hero.title.1": "Lies arabische Geschichten.",
    "hero.title.2": "Lerne neue Wörter.",
    "hero.lede": "Illustrierte Erzählungen. Tippe auf ein Wort, um es zu speichern. Beherrsche es in fünf Tagen.",
    "hero.badge": "100 Plätze offen — der erste Kreis schließt bald",
    "hero.cta": "Dem ersten Kreis beitreten",
    "hero.note": "100 Plätze verfügbar.",
    "final.note": "Kein Spam. Eine E-Mail, wenn du drin bist.",
    "final.title.1": "Gehöre zu",
    "final.title.2": "den Ersten.",
    "footer.tag": "Arabisch lernen durch Geschichten",
  },

  pt: {
    "nav.method": "Método",
    "nav.stories": "Histórias",
    "nav.origin": "Origem",
    "nav.cta": "Acesso antecipado",
    "nav.menu": "Menu",
    "nav.lang": "Idioma",
    "hero.title.1": "Leia contos árabes.",
    "hero.title.2": "Aprenda palavras novas.",
    "hero.lede": "Contos ilustrados. Toque numa palavra para guardá-la. Domine-a em cinco dias.",
    "hero.badge": "100 vagas abertas — o primeiro círculo fecha em breve",
    "hero.cta": "Entrar no primeiro círculo",
    "hero.note": "100 vagas disponíveis.",
    "final.note": "Sem spam. Um e-mail quando entrar.",
    "final.title.1": "Esteja entre",
    "final.title.2": "os primeiros.",
    "footer.tag": "aprenda árabe através de histórias",
  },

  tr: {
    "nav.method": "Yöntem",
    "nav.stories": "Hikâyeler",
    "nav.origin": "Köken",
    "nav.cta": "Erken erişim",
    "nav.menu": "Menü",
    "nav.lang": "Dil",
    "hero.title.1": "Arapça masallar oku.",
    "hero.title.2": "Yeni kelimeler öğren.",
    "hero.lede": "Resimli masallar. Bir kelimeye dokun ve kaydet. Beş günde öğren.",
    "hero.badge": "100 yer açık — ilk çevre yakında kapanıyor",
    "hero.cta": "İlk çevreye katıl",
    "hero.note": "100 yer mevcut.",
    "final.note": "Spam yok. Sıran gelince tek bir e-posta.",
    "final.title.1": "İlklerden",
    "final.title.2": "ol.",
    "footer.tag": "hikâyelerle Arapça öğren",
  },

  id: {
    "nav.method": "Metode",
    "nav.stories": "Cerita",
    "nav.origin": "Asal-usul",
    "nav.cta": "Akses awal",
    "nav.menu": "Menu",
    "nav.lang": "Bahasa",
    "hero.title.1": "Baca kisah Arab.",
    "hero.title.2": "Pelajari kata baru.",
    "hero.lede": "Kisah bergambar. Ketuk kata untuk menyimpannya. Kuasai dalam lima hari.",
    "hero.badge": "100 tempat tersedia — lingkaran pertama segera ditutup",
    "hero.cta": "Bergabung dengan lingkaran pertama",
    "hero.note": "100 tempat tersedia.",
    "final.note": "Tanpa spam. Satu email saat kamu masuk.",
    "final.title.1": "Jadilah",
    "final.title.2": "yang pertama.",
    "footer.tag": "belajar bahasa Arab melalui cerita",
  },

  it: {
    "nav.method": "Metodo",
    "nav.stories": "Storie",
    "nav.origin": "Origine",
    "nav.cta": "Accesso anticipato",
    "nav.menu": "Menu",
    "nav.lang": "Lingua",
    "hero.title.1": "Leggi racconti arabi.",
    "hero.title.2": "Impara parole nuove.",
    "hero.lede": "Racconti illustrati. Tocca una parola per salvarla. Padroneggiala in cinque giorni.",
    "hero.badge": "100 posti aperti — il primo cerchio chiude presto",
    "hero.cta": "Unisciti al primo cerchio",
    "hero.note": "100 posti disponibili.",
    "final.note": "Niente spam. Una email quando entri.",
    "final.title.1": "Sii tra",
    "final.title.2": "i primi.",
    "footer.tag": "impara l'arabo attraverso le storie",
  },

  nl: {
    "nav.method": "Methode",
    "nav.stories": "Verhalen",
    "nav.origin": "Oorsprong",
    "nav.cta": "Vroege toegang",
    "nav.menu": "Menu",
    "nav.lang": "Taal",
    "hero.title.1": "Lees Arabische verhalen.",
    "hero.title.2": "Leer nieuwe woorden.",
    "hero.lede": "Geïllustreerde verhalen. Tik op een woord om het op te slaan. Beheers het in vijf dagen.",
    "hero.badge": "100 plekken open — de eerste kring sluit binnenkort",
    "hero.cta": "Sluit je aan bij de eerste kring",
    "hero.note": "100 plekken beschikbaar.",
    "final.note": "Geen spam. Eén e-mail wanneer je erin bent.",
    "final.title.1": "Wees bij",
    "final.title.2": "de eersten.",
    "footer.tag": "leer Arabisch door verhalen",
  },

  ru: {
    "nav.method": "Метод",
    "nav.stories": "Истории",
    "nav.origin": "Происхождение",
    "nav.cta": "Ранний доступ",
    "nav.menu": "Меню",
    "nav.lang": "Язык",
    "hero.title.1": "Читайте арабские сказки.",
    "hero.title.2": "Учите новые слова.",
    "hero.lede": "Иллюстрированные сказки. Нажмите на слово, чтобы сохранить. Освойте за пять дней.",
    "hero.badge": "100 мест открыто — первый круг закрывается скоро",
    "hero.cta": "Войти в первый круг",
    "hero.note": "100 мест доступно.",
    "final.note": "Без спама. Одно письмо, когда вы внутри.",
    "final.title.1": "Будьте среди",
    "final.title.2": "первых.",
    "footer.tag": "учите арабский через истории",
  },

  zh: {
    "nav.method": "方法",
    "nav.stories": "故事",
    "nav.origin": "起源",
    "nav.cta": "抢先体验",
    "nav.menu": "菜单",
    "nav.lang": "语言",
    "hero.title.1": "阅读阿拉伯故事。",
    "hero.title.2": "学习新词汇。",
    "hero.lede": "插画故事。点击单词保存。五天内掌握。",
    "hero.badge": "100个名额开放 — 第一圈即将关闭",
    "hero.cta": "加入第一圈",
    "hero.note": "100个名额开放。",
    "final.note": "没有垃圾邮件。入选时发一封邮件。",
    "final.title.1": "成为",
    "final.title.2": "最早的人。",
    "footer.tag": "通过故事学习阿拉伯语",
  },

  ja: {
    "nav.method": "メソッド",
    "nav.stories": "ストーリー",
    "nav.origin": "由来",
    "nav.cta": "先行アクセス",
    "nav.menu": "メニュー",
    "nav.lang": "言語",
    "hero.title.1": "アラビア語の物語を読む。",
    "hero.title.2": "新しい言葉を覚える。",
    "hero.lede": "イラスト付きの物語。単語をタップして保存。5日で習得。",
    "hero.badge": "100枠オープン — 最初の輪はまもなく締め切り",
    "hero.cta": "最初の輪に参加",
    "hero.note": "100枠のみ。",
    "final.note": "スパムなし。参加時に1通だけ。",
    "final.title.1": "最初の一人に",
    "final.title.2": "なろう。",
    "footer.tag": "物語でアラビア語を学ぶ",
  },

  ko: {
    "nav.method": "방법",
    "nav.stories": "이야기",
    "nav.origin": "유래",
    "nav.cta": "얼리 액세스",
    "nav.menu": "메뉴",
    "nav.lang": "언어",
    "hero.title.1": "아랍어 이야기를 읽으세요.",
    "hero.title.2": "새 단어를 배우세요.",
    "hero.lede": "삽화가 있는 이야기. 단어를 탭해 저장. 5일 안에 마스터.",
    "hero.badge": "100자리 오픈 — 첫 번째 서클이 곧 마감됩니다",
    "hero.cta": "첫 번째 서클에 참여",
    "hero.note": "100자리 가능.",
    "final.note": "스팸 없음. 입장 시 이메일 한 통.",
    "final.title.1": "가장 먼저",
    "final.title.2": "경험하세요.",
    "footer.tag": "이야기로 아랍어 배우기",
  },

  hi: {
    "nav.method": "विधि",
    "nav.stories": "कहानियाँ",
    "nav.origin": "मूल",
    "nav.cta": "अर्ली एक्सेस",
    "nav.menu": "मेनू",
    "nav.lang": "भाषा",
    "hero.title.1": "अरबी कहानियाँ पढ़ें।",
    "hero.title.2": "नए शब्द सीखें।",
    "hero.lede": "चित्रित कहानियाँ। शब्द छूकर सहेजें। पाँच दिन में सीखें।",
    "hero.badge": "100 स्थान उपलब्ध — पहला दायरा जल्द बंद होगा",
    "hero.cta": "पहले दायरे में शामिल हों",
    "hero.note": "100 स्थान उपलब्ध।",
    "final.note": "कोई स्पैम नहीं। शामिल होने पर एक ईमेल।",
    "final.title.1": "सबसे पहले",
    "final.title.2": "अनुभव करें।",
    "footer.tag": "कहानियों से अरबी सीखें",
  },

  ur: {
    "nav.method": "طریقہ",
    "nav.stories": "کہانیاں",
    "nav.origin": "اصل",
    "nav.cta": "ابتدائی رسائی",
    "nav.menu": "مینو",
    "nav.lang": "زبان",
    "hero.title.1": "عربی کہانیاں پڑھیں۔",
    "hero.title.2": "نئے الفاظ سیکھیں۔",
    "hero.lede": "مصوّر کہانیاں۔ لفظ چھو کر محفوظ کریں۔ پانچ دنوں میں سیکھیں۔",
    "hero.badge": "100 جگہیں دستیاب — پہلا حلقہ جلد بند ہوگا",
    "hero.cta": "پہلے حلقے میں شامل ہوں",
    "hero.note": "100 جگہیں دستیاب۔",
    "final.note": "کوئی سپیم نہیں۔ شامل ہونے پر ایک ای میل۔",
    "final.title.1": "سب سے پہلے",
    "final.title.2": "آزمائیں۔",
    "footer.tag": "کہانیوں سے عربی سیکھیں",
  },

  ms: {
    "nav.method": "Kaedah",
    "nav.stories": "Cerita",
    "nav.origin": "Asal",
    "nav.cta": "Akses awal",
    "nav.menu": "Menu",
    "nav.lang": "Bahasa",
    "hero.title.1": "Baca kisah Arab.",
    "hero.title.2": "Pelajari perkataan baru.",
    "hero.lede": "Kisah bergambar. Ketik perkataan untuk menyimpannya. Kuasai dalam lima hari.",
    "hero.badge": "100 tempat dibuka — bulatan pertama ditutup tidak lama lagi",
    "hero.cta": "Sertai bulatan pertama",
    "hero.note": "100 tempat tersedia.",
    "final.note": "Tiada spam. Satu e-mel apabila anda masuk.",
    "final.title.1": "Jadilah",
    "final.title.2": "yang pertama.",
    "footer.tag": "belajar bahasa Arab melalui cerita",
  },

  sv: {
    "nav.method": "Metod",
    "nav.stories": "Berättelser",
    "nav.origin": "Ursprung",
    "nav.cta": "Tidig åtkomst",
    "nav.menu": "Meny",
    "nav.lang": "Språk",
    "hero.title.1": "Läs arabiska berättelser.",
    "hero.title.2": "Lär dig nya ord.",
    "hero.lede": "Illustrerade berättelser. Tryck på ett ord för att spara det. Bemästra det på fem dagar.",
    "hero.badge": "100 platser öppna — första kretsen stänger snart",
    "hero.cta": "Gå med i första kretsen",
    "hero.note": "100 platser tillgängliga.",
    "final.note": "Ingen spam. Ett mejl när du är inne.",
    "final.title.1": "Var bland",
    "final.title.2": "de första.",
    "footer.tag": "lär dig arabiska genom berättelser",
  },

  pl: {
    "nav.method": "Metoda",
    "nav.stories": "Opowieści",
    "nav.origin": "Pochodzenie",
    "nav.cta": "Wczesny dostęp",
    "nav.menu": "Menu",
    "nav.lang": "Język",
    "hero.title.1": "Czytaj opowieści arabskie.",
    "hero.title.2": "Ucz się nowych słów.",
    "hero.lede": "Ilustrowane opowieści. Dotknij słowa, aby je zapisać. Opanuj je w pięć dni.",
    "hero.badge": "100 miejsc otwartych — pierwszy krąg zamyka się wkrótce",
    "hero.cta": "Dołącz do pierwszego kręgu",
    "hero.note": "100 miejsc dostępnych.",
    "final.note": "Bez spamu. Jeden e-mail, gdy wejdziesz.",
    "final.title.1": "Bądź wśród",
    "final.title.2": "pierwszych.",
    "footer.tag": "ucz się arabskiego przez opowieści",
  },

  sw: {
    "nav.method": "Njia",
    "nav.stories": "Hadithi",
    "nav.origin": "Asili",
    "nav.cta": "Upatikane mapema",
    "nav.menu": "Menyu",
    "nav.lang": "Lugha",
    "hero.title.1": "Soma hadithi za Kiarabu.",
    "hero.title.2": "Jifunze maneno mapya.",
    "hero.lede": "Hadithi zenye picha. Gusa neno kulihifadhi. Lijue kwa siku tano.",
    "hero.badge": "Nafasi 100 zimefunguliwa — duru ya kwanza inafungwa hivi karibuni",
    "hero.cta": "Jiunge na duru ya kwanza",
    "hero.note": "Nafasi 100 zinapatikana.",
    "final.note": "Hakuna spam. Barua pepe moja utakapoingia.",
    "final.title.1": "Kuwa miongoni",
    "final.title.2": "mwa wa kwanza.",
    "footer.tag": "jifunze Kiarabu kupitia hadithi",
  },
};

function detectLocale() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved && dict[saved]) return saved;
  } catch {
    /* ignore */
  }
  const nav = (navigator.language || "en").toLowerCase();
  const prefix = nav.split("-")[0];
  if (dict[prefix]) return prefix;
  return "en";
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [locale, setLocaleState] = useState(() => detectLocale());

  const setLocale = useCallback((id) => {
    if (!dict[id]) return;
    setLocaleState(id);
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    const meta = LOCALES.find((l) => l.id === locale) || LOCALES[0];
    document.documentElement.lang = locale;
    document.documentElement.dir = meta.dir;
  }, [locale]);

  const t = useCallback(
    (key, vars) => {
      let s = dict[locale]?.[key] ?? dict.en[key] ?? key;
      if (vars) {
        for (const [k, v] of Object.entries(vars)) {
          s = s.replaceAll(`{${k}}`, String(v));
        }
      }
      return s;
    },
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t, dir: LOCALES.find((l) => l.id === locale)?.dir || "ltr" }),
    [locale, setLocale, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
}
