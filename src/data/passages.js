/**
 * Hindi Reading Passage Library
 * 30 curated passages across 12 categories and 3 difficulty levels.
 * Every passage is max 3 lines, natural Hindi, child-friendly.
 */

const passages = [
  // ===================== EASY (10) =====================
  {
    id: "passage_001",
    title: "सुबह की सैर",
    text: "सुबह की ठंडी हवा मन को बहुत अच्छी लगती है। मुझे रोज़ सुबह पार्क में घूमना पसंद है।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "daily_life",
    estimated_reading_time: 12,
    image: "/images/passages/morning_walk.jpg"
  },
  {
    id: "passage_002",
    title: "मेरा विद्यालय",
    text: "मेरा विद्यालय बहुत सुंदर है। मुझे वहाँ अपने दोस्तों के साथ पढ़ना अच्छा लगता है।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "school",
    estimated_reading_time: 10,
    image: "/images/passages/school_building.jpg"
  },
  {
    id: "passage_003",
    title: "मेरा परिवार",
    text: "मेरे परिवार में माँ, पापा, दादी और मेरा छोटा भाई है। हम सब मिलकर खाना खाते हैं।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "family",
    estimated_reading_time: 12,
  },
  {
    id: "passage_004",
    title: "बारिश का मौसम",
    text: "बारिश में भीगना बहुत मज़ेदार होता है। बादल गरजते हैं और बूँदें ज़मीन पर गिरती हैं।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "nature",
    estimated_reading_time: 12,
    image: "/images/passages/rainy_season.jpg"
  },
  {
    id: "passage_005",
    title: "प्यारी बिल्ली",
    text: "मेरे घर में एक प्यारी बिल्ली है। वह दूध पीना और गेंद से खेलना पसंद करती है।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "animals",
    estimated_reading_time: 11,
  },
  {
    id: "passage_006",
    title: "अच्छी आदतें",
    text: "रोज़ सुबह जल्दी उठना चाहिए। दाँत साफ़ करना और नहाना बहुत ज़रूरी है।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "good_habits",
    estimated_reading_time: 10,
  },
  {
    id: "passage_007",
    title: "रंग-बिरंगे फूल",
    text: "बगीचे में कई रंग-बिरंगे फूल खिले हैं। लाल गुलाब और पीले सूरजमुखी बहुत सुंदर दिखते हैं।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "nature",
    estimated_reading_time: 12,
  },
  {
    id: "passage_008",
    title: "मेरा दोस्त",
    text: "राहुल मेरा सबसे अच्छा दोस्त है। हम साथ में खेलते हैं और मिलकर पढ़ाई करते हैं।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "friendship",
    estimated_reading_time: 11,
  },
  {
    id: "passage_009",
    title: "स्वादिष्ट फल",
    text: "आम, केला और सेब मेरे पसंदीदा फल हैं। फल खाने से शरीर स्वस्थ रहता है।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "health",
    estimated_reading_time: 10,
  },
  {
    id: "passage_010",
    title: "चिड़िया रानी",
    text: "सुबह-सुबह चिड़िया गाना गाती है। वह पेड़ पर अपना घोंसला बनाती है।",
    difficulty: "easy",
    age_group: "6-10",
    language: "hi-IN",
    category: "animals",
    estimated_reading_time: 9,
  },

  // ===================== MEDIUM (10) =====================
  {
    id: "passage_011",
    title: "पेड़ों का महत्व",
    text: "पेड़ हमें फल, छाया और स्वच्छ हवा देते हैं। इसलिए हमें अधिक से अधिक पेड़ लगाने चाहिए।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "environment",
    estimated_reading_time: 13,
    image: "/images/passages/tree_importance.jpg"
  },
  {
    id: "passage_012",
    title: "समय का महत्व",
    text: "समय बहुत कीमती होता है। जो समय बीत जाता है वह कभी वापस नहीं आता। इसलिए हमें हर पल का सदुपयोग करना चाहिए।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "good_habits",
    estimated_reading_time: 15,
  },
  {
    id: "passage_013",
    title: "दीपावली का त्योहार",
    text: "दीपावली रोशनी का त्योहार है। इस दिन लोग घर को सजाते हैं, दीपक जलाते हैं और मिठाई बाँटते हैं।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "festivals",
    estimated_reading_time: 14,
    image: "/images/passages/diwali_festival.jpg"
  },
  {
    id: "passage_014",
    title: "पुस्तकालय",
    text: "पुस्तकालय ज्ञान का भंडार होता है। वहाँ तरह-तरह की किताबें मिलती हैं जो हमारी सोच और समझ को बढ़ाती हैं।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "school",
    estimated_reading_time: 14,
  },
  {
    id: "passage_015",
    title: "स्वच्छता",
    text: "स्वच्छता में ही स्वास्थ्य छिपा है। हमें अपने आसपास साफ़-सफ़ाई रखनी चाहिए ताकि बीमारियाँ दूर रहें।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "health",
    estimated_reading_time: 14,
  },
  {
    id: "passage_016",
    title: "होली के रंग",
    text: "होली रंगों का त्योहार है। इस दिन सब एक-दूसरे को रंग लगाते हैं और गुझिया खाते हैं। यह खुशी और भाईचारे का पर्व है।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "festivals",
    estimated_reading_time: 15,
  },
  {
    id: "passage_017",
    title: "मधुमक्खी की मेहनत",
    text: "मधुमक्खी बहुत मेहनती होती है। वह दिनभर फूलों से रस इकट्ठा करती है और उससे शहद बनाती है।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "animals",
    estimated_reading_time: 13,
  },
  {
    id: "passage_018",
    title: "नदी की यात्रा",
    text: "नदी पहाड़ों से निकलकर मैदानों में बहती है। रास्ते में वह खेतों को सींचती है और गाँवों को जीवन देती है।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "nature",
    estimated_reading_time: 14,
  },
  {
    id: "passage_019",
    title: "सच्ची दोस्ती",
    text: "सच्चा दोस्त वह होता है जो मुश्किल समय में साथ दे। दोस्ती में विश्वास और सम्मान सबसे ज़रूरी है।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "friendship",
    estimated_reading_time: 13,
  },
  {
    id: "passage_020",
    title: "खेल और स्वास्थ्य",
    text: "खेलने से शरीर तंदुरुस्त रहता है और मन प्रसन्न रहता है। बच्चों को हर दिन कम से कम एक घंटा खेलना चाहिए।",
    difficulty: "medium",
    age_group: "8-12",
    language: "hi-IN",
    category: "health",
    estimated_reading_time: 14,
  },

  // ===================== ADVANCED (10) =====================
  {
    id: "passage_021",
    title: "मेहनत का फल",
    text: "लगातार अभ्यास करने से कठिन काम भी आसान हो जाता है। हमें अपने लक्ष्य को प्राप्त करने के लिए धैर्य और मेहनत के साथ आगे बढ़ना चाहिए।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "good_habits",
    estimated_reading_time: 16,
  },
  {
    id: "passage_022",
    title: "पर्यावरण की रक्षा",
    text: "पर्यावरण हमारा जीवन आधार है। प्रदूषण और वनों की कटाई से धरती को बहुत नुकसान हो रहा है। हम सबको मिलकर पर्यावरण की रक्षा करनी चाहिए।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "environment",
    estimated_reading_time: 17,
  },
  {
    id: "passage_023",
    title: "भारत की विविधता",
    text: "भारत एक विशाल देश है जहाँ अनेक भाषाएँ बोली जाती हैं और विभिन्न त्योहार मनाए जाते हैं। यह विविधता में एकता ही भारत की सबसे बड़ी ताकत है।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "general_knowledge",
    estimated_reading_time: 18,
  },
  {
    id: "passage_024",
    title: "किताबों की दुनिया",
    text: "किताबें हमारी सबसे अच्छी मित्र होती हैं। वे हमें नई दुनिया से परिचित कराती हैं और हमारी कल्पना शक्ति को विकसित करती हैं।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "school",
    estimated_reading_time: 15,
    image: "/images/passages/world_of_books.jpg"
  },
  {
    id: "passage_025",
    title: "जल संरक्षण",
    text: "पानी प्रकृति का अनमोल उपहार है। बढ़ती जनसंख्या के कारण पानी की कमी होती जा रही है। हमें पानी बचाने के उपाय अपनाने चाहिए।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "environment",
    estimated_reading_time: 16,
  },
  {
    id: "passage_026",
    title: "अनुशासन का महत्व",
    text: "अनुशासन सफलता की नींव है। जो व्यक्ति समय पर अपने काम करता है और नियमों का पालन करता है, वह जीवन में आगे बढ़ता है।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "good_habits",
    estimated_reading_time: 16,
  },
  {
    id: "passage_027",
    title: "प्रकृति का सौंदर्य",
    text: "ऊँचे पहाड़, गहरी नदियाँ और हरे-भरे जंगल प्रकृति की अद्भुत रचनाएँ हैं। प्रकृति का सौंदर्य देखकर मन को शांति और आनंद मिलता है।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "nature",
    estimated_reading_time: 17,
  },
  {
    id: "passage_028",
    title: "गाँधी जी की सीख",
    text: "महात्मा गाँधी ने हमें सत्य और अहिंसा का मार्ग दिखाया। उन्होंने सिखाया कि बुराई का जवाब बुराई से नहीं, बल्कि अच्छाई से देना चाहिए।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "stories",
    estimated_reading_time: 17,
  },
  {
    id: "passage_029",
    title: "तकनीक और शिक्षा",
    text: "आज के समय में तकनीक ने शिक्षा को बहुत आसान बना दिया है। इंटरनेट और कंप्यूटर की मदद से विद्यार्थी घर बैठे दुनियाभर का ज्ञान प्राप्त कर सकते हैं।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "general_knowledge",
    estimated_reading_time: 18,
  },
  {
    id: "passage_030",
    title: "परिवार का साथ",
    text: "परिवार हमारी सबसे बड़ी ताकत होता है। सुख हो या दुख, परिवार हमेशा साथ खड़ा रहता है। हमें अपने परिवार का सम्मान और देखभाल करनी चाहिए।",
    difficulty: "advanced",
    age_group: "10-14",
    language: "hi-IN",
    category: "family",
    estimated_reading_time: 17,
  },
];

/** Category labels for display */
export const PASSAGE_CATEGORIES = {
  daily_life: { label: "दैनिक जीवन", labelEn: "Daily Life", emoji: "🌅" },
  school: { label: "विद्यालय", labelEn: "School", emoji: "🏫" },
  family: { label: "परिवार", labelEn: "Family", emoji: "👨‍👩‍👧‍👦" },
  nature: { label: "प्रकृति", labelEn: "Nature", emoji: "🌿" },
  animals: { label: "जीव-जंतु", labelEn: "Animals", emoji: "🐾" },
  environment: { label: "पर्यावरण", labelEn: "Environment", emoji: "🌍" },
  friendship: { label: "दोस्ती", labelEn: "Friendship", emoji: "🤝" },
  good_habits: { label: "अच्छी आदतें", labelEn: "Good Habits", emoji: "⭐" },
  stories: { label: "कहानियाँ", labelEn: "Stories", emoji: "📖" },
  festivals: { label: "त्योहार", labelEn: "Festivals", emoji: "🎉" },
  health: { label: "स्वास्थ्य", labelEn: "Health", emoji: "💪" },
  general_knowledge: { label: "सामान्य ज्ञान", labelEn: "General Knowledge", emoji: "🧠" },
};

/** Difficulty metadata */
export const READING_DIFFICULTY = {
  easy: { label: "आसान", labelEn: "Easy", color: "#4CAF50", emoji: "🟢" },
  medium: { label: "मध्यम", labelEn: "Medium", color: "#FF9800", emoji: "🟡" },
  advanced: { label: "कठिन", labelEn: "Advanced", color: "#F44336", emoji: "🔴" },
};

/**
 * Get all passages, optionally filtered by difficulty.
 */
export function getPassagesByDifficulty(difficulty) {
  if (!difficulty || difficulty === "all") return passages;
  return passages.filter((p) => p.difficulty === difficulty);
}

/**
 * Get a random passage, optionally filtered by difficulty.
 */
export function getRandomPassage(difficulty) {
  const filtered = getPassagesByDifficulty(difficulty);
  return filtered[Math.floor(Math.random() * filtered.length)];
}

/**
 * Get a deterministic "passage of the day" based on the current date.
 */
export function getPassageOfTheDay() {
  const today = new Date();
  const dayOfYear = Math.floor(
    (today - new Date(today.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24)
  );
  const index = dayOfYear % passages.length;
  return { passage: passages[index], dayNumber: dayOfYear };
}

/**
 * Get a passage by its ID.
 */
export function getPassageById(id) {
  return passages.find((p) => p.id === id) || null;
}

/**
 * Get unique categories present in the library.
 */
export function getAvailableCategories() {
  const cats = new Set(passages.map((p) => p.category));
  return [...cats];
}

/**
 * Get 6 featured passages with background images.
 */
export function getFeaturedPassages() {
  return passages.filter(p => p.image).slice(0, 6);
}

export default passages;
