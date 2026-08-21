/**
 * Daily Tasks Data — PSLE-level Hindi Synonym & Antonym exercises.
 * 
 * Task Types:
 *  1. synonym_mcq   — समानार्थी शब्द MCQ
 *  2. antonym_mcq   — विलोम शब्द MCQ
 *  3. matching      — शब्द मिलान (match pairs)
 *  4. fill_blank    — रिक्त स्थान भरें
 *  5. challenge     — Daily Challenge (harder)
 */

// ─── Question Bank ──────────────────────────────────────────────

export const synonymQuestions = [
  // Easy
  { word: 'खुश', answer: 'प्रसन्न', options: ['प्रसन्न', 'दुखी', 'क्रोधित', 'थका हुआ'], difficulty: 'easy' },
  { word: 'जल', answer: 'पानी', options: ['पानी', 'आग', 'हवा', 'मिट्टी'], difficulty: 'easy' },
  { word: 'सुंदर', answer: 'खूबसूरत', options: ['खूबसूरत', 'बदसूरत', 'मोटा', 'पतला'], difficulty: 'easy' },
  { word: 'घर', answer: 'मकान', options: ['मकान', 'दुकान', 'स्कूल', 'बगीचा'], difficulty: 'easy' },
  { word: 'रास्ता', answer: 'मार्ग', options: ['मार्ग', 'नदी', 'पहाड़', 'जंगल'], difficulty: 'easy' },
  { word: 'गुस्सा', answer: 'क्रोध', options: ['क्रोध', 'खुशी', 'डर', 'प्यार'], difficulty: 'easy' },
  { word: 'आँख', answer: 'नेत्र', options: ['नेत्र', 'कान', 'नाक', 'मुँह'], difficulty: 'easy' },
  { word: 'पत्थर', answer: 'पाषाण', options: ['पाषाण', 'लकड़ी', 'लोहा', 'सोना'], difficulty: 'easy' },
  { word: 'दोस्त', answer: 'मित्र', options: ['मित्र', 'शत्रु', 'पड़ोसी', 'अजनबी'], difficulty: 'easy' },
  { word: 'राजा', answer: 'नरेश', options: ['नरेश', 'रानी', 'सैनिक', 'मंत्री'], difficulty: 'easy' },
  { word: 'किताब', answer: 'पुस्तक', options: ['पुस्तक', 'कलम', 'कॉपी', 'मेज़'], difficulty: 'easy' },
  { word: 'हवा', answer: 'वायु', options: ['वायु', 'पानी', 'आग', 'मिट्टी'], difficulty: 'easy' },
  // Medium
  { word: 'विद्यार्थी', answer: 'छात्र', options: ['छात्र', 'शिक्षक', 'प्रधानाचार्य', 'चपरासी'], difficulty: 'medium' },
  { word: 'अध्यापक', answer: 'शिक्षक', options: ['शिक्षक', 'छात्र', 'डॉक्टर', 'वकील'], difficulty: 'medium' },
  { word: 'समुद्र', answer: 'सागर', options: ['सागर', 'नदी', 'तालाब', 'झील'], difficulty: 'medium' },
  { word: 'आकाश', answer: 'गगन', options: ['गगन', 'धरती', 'पाताल', 'वन'], difficulty: 'medium' },
  { word: 'संसार', answer: 'जगत', options: ['जगत', 'देश', 'गाँव', 'शहर'], difficulty: 'medium' },
  { word: 'प्रसिद्ध', answer: 'विख्यात', options: ['विख्यात', 'अज्ञात', 'साधारण', 'विशेष'], difficulty: 'medium' },
  { word: 'परिश्रम', answer: 'मेहनत', options: ['मेहनत', 'आलस', 'विश्राम', 'नींद'], difficulty: 'medium' },
  { word: 'कठिन', answer: 'मुश्किल', options: ['मुश्किल', 'आसान', 'सरल', 'सहज'], difficulty: 'medium' },
  { word: 'इच्छा', answer: 'कामना', options: ['कामना', 'अनिच्छा', 'विरक्ति', 'उदासी'], difficulty: 'medium' },
  { word: 'सूर्य', answer: 'रवि', options: ['रवि', 'चंद्र', 'तारा', 'ग्रह'], difficulty: 'medium' },
  { word: 'पर्वत', answer: 'पहाड़', options: ['पहाड़', 'मैदान', 'घाटी', 'रेगिस्तान'], difficulty: 'medium' },
  { word: 'वृक्ष', answer: 'पेड़', options: ['पेड़', 'फूल', 'घास', 'बीज'], difficulty: 'medium' },
  // Hard
  { word: 'अनुग्रह', answer: 'कृपा', options: ['कृपा', 'क्रोध', 'दंड', 'उपेक्षा'], difficulty: 'hard' },
  { word: 'विपत्ति', answer: 'आपदा', options: ['आपदा', 'सुख', 'समृद्धि', 'शांति'], difficulty: 'hard' },
  { word: 'उपवन', answer: 'बगीचा', options: ['बगीचा', 'जंगल', 'मरुस्थल', 'खेत'], difficulty: 'hard' },
  { word: 'अमृत', answer: 'सुधा', options: ['सुधा', 'विष', 'जल', 'दूध'], difficulty: 'hard' },
  { word: 'कोलाहल', answer: 'शोर', options: ['शोर', 'शांति', 'मौन', 'एकांत'], difficulty: 'hard' },
  { word: 'निर्भय', answer: 'साहसी', options: ['साहसी', 'कायर', 'डरपोक', 'भीरु'], difficulty: 'hard' },
];

export const antonymQuestions = [
  // Easy
  { word: 'दिन', answer: 'रात', options: ['रात', 'सुबह', 'शाम', 'दोपहर'], difficulty: 'easy' },
  { word: 'बड़ा', answer: 'छोटा', options: ['छोटा', 'लंबा', 'मोटा', 'पतला'], difficulty: 'easy' },
  { word: 'ऊँचा', answer: 'नीचा', options: ['नीचा', 'चौड़ा', 'लंबा', 'विशाल'], difficulty: 'easy' },
  { word: 'गरम', answer: 'ठंडा', options: ['ठंडा', 'नरम', 'कड़ा', 'मीठा'], difficulty: 'easy' },
  { word: 'अमीर', answer: 'गरीब', options: ['गरीब', 'सुंदर', 'बदसूरत', 'लंबा'], difficulty: 'easy' },
  { word: 'सुख', answer: 'दुख', options: ['दुख', 'आनंद', 'प्रसन्नता', 'हर्ष'], difficulty: 'easy' },
  { word: 'अंदर', answer: 'बाहर', options: ['बाहर', 'ऊपर', 'नीचे', 'पास'], difficulty: 'easy' },
  { word: 'पुराना', answer: 'नया', options: ['नया', 'कच्चा', 'पक्का', 'टूटा'], difficulty: 'easy' },
  { word: 'आना', answer: 'जाना', options: ['जाना', 'रुकना', 'बैठना', 'सोना'], difficulty: 'easy' },
  { word: 'जीत', answer: 'हार', options: ['हार', 'खेल', 'दौड़', 'तैराकी'], difficulty: 'easy' },
  { word: 'सच', answer: 'झूठ', options: ['झूठ', 'कहानी', 'बात', 'सवाल'], difficulty: 'easy' },
  { word: 'मीठा', answer: 'कड़वा', options: ['कड़वा', 'खट्टा', 'नमकीन', 'तीखा'], difficulty: 'easy' },
  // Medium
  { word: 'सफल', answer: 'असफल', options: ['असफल', 'कठिन', 'सरल', 'महान'], difficulty: 'medium' },
  { word: 'प्राचीन', answer: 'आधुनिक', options: ['आधुनिक', 'सुंदर', 'विशाल', 'प्रसिद्ध'], difficulty: 'medium' },
  { word: 'उत्तर', answer: 'दक्षिण', options: ['दक्षिण', 'पूर्व', 'पश्चिम', 'मध्य'], difficulty: 'medium' },
  { word: 'स्वतंत्र', answer: 'परतंत्र', options: ['परतंत्र', 'स्वदेशी', 'विदेशी', 'राष्ट्रीय'], difficulty: 'medium' },
  { word: 'विश्वास', answer: 'अविश्वास', options: ['अविश्वास', 'संदेह', 'प्रेम', 'घृणा'], difficulty: 'medium' },
  { word: 'उन्नति', answer: 'अवनति', options: ['अवनति', 'प्रगति', 'विकास', 'वृद्धि'], difficulty: 'medium' },
  { word: 'निर्दोष', answer: 'दोषी', options: ['दोषी', 'पापी', 'पुण्यात्मा', 'साधु'], difficulty: 'medium' },
  { word: 'साहसी', answer: 'कायर', options: ['कायर', 'बहादुर', 'वीर', 'योद्धा'], difficulty: 'medium' },
  { word: 'लाभ', answer: 'हानि', options: ['हानि', 'धन', 'संपत्ति', 'व्यापार'], difficulty: 'medium' },
  { word: 'उदय', answer: 'अस्त', options: ['अस्त', 'प्रकाश', 'अंधेरा', 'किरण'], difficulty: 'medium' },
  { word: 'निर्माण', answer: 'विनाश', options: ['विनाश', 'विकास', 'प्रगति', 'उत्पादन'], difficulty: 'medium' },
  { word: 'आदर', answer: 'अनादर', options: ['अनादर', 'प्रेम', 'स्नेह', 'सम्मान'], difficulty: 'medium' },
  // Hard
  { word: 'सार्थक', answer: 'निरर्थक', options: ['निरर्थक', 'महत्वपूर्ण', 'उपयोगी', 'लाभदायक'], difficulty: 'hard' },
  { word: 'कृतज्ञ', answer: 'कृतघ्न', options: ['कृतघ्न', 'दयालु', 'उदार', 'स्वार्थी'], difficulty: 'hard' },
  { word: 'सजीव', answer: 'निर्जीव', options: ['निर्जीव', 'चेतन', 'जागृत', 'सक्रिय'], difficulty: 'hard' },
  { word: 'अनुकूल', answer: 'प्रतिकूल', options: ['प्रतिकूल', 'उचित', 'अनुचित', 'समान'], difficulty: 'hard' },
  { word: 'स्थायी', answer: 'अस्थायी', options: ['अस्थायी', 'शाश्वत', 'चिरस्थायी', 'सनातन'], difficulty: 'hard' },
  { word: 'सभ्य', answer: 'असभ्य', options: ['असभ्य', 'शिष्ट', 'विनम्र', 'सुसंस्कृत'], difficulty: 'hard' },
];

export const matchingPairs = [
  { pairs: [['खुश', 'प्रसन्न'], ['जल', 'पानी'], ['सुंदर', 'खूबसूरत']], type: 'synonym', difficulty: 'easy' },
  { pairs: [['दिन', 'रात'], ['बड़ा', 'छोटा'], ['ऊँचा', 'नीचा']], type: 'antonym', difficulty: 'easy' },
  { pairs: [['दोस्त', 'मित्र'], ['किताब', 'पुस्तक'], ['हवा', 'वायु']], type: 'synonym', difficulty: 'easy' },
  { pairs: [['सच', 'झूठ'], ['जीत', 'हार'], ['सुख', 'दुख']], type: 'antonym', difficulty: 'easy' },
  { pairs: [['घर', 'मकान'], ['राजा', 'नरेश'], ['आँख', 'नेत्र']], type: 'synonym', difficulty: 'easy' },
  { pairs: [['अमीर', 'गरीब'], ['गरम', 'ठंडा'], ['पुराना', 'नया']], type: 'antonym', difficulty: 'easy' },
  { pairs: [['आकाश', 'गगन'], ['समुद्र', 'सागर'], ['परिश्रम', 'मेहनत']], type: 'synonym', difficulty: 'medium' },
  { pairs: [['सफल', 'असफल'], ['प्राचीन', 'आधुनिक'], ['लाभ', 'हानि']], type: 'antonym', difficulty: 'medium' },
  { pairs: [['सूर्य', 'रवि'], ['पर्वत', 'पहाड़'], ['वृक्ष', 'पेड़']], type: 'synonym', difficulty: 'medium' },
  { pairs: [['उन्नति', 'अवनति'], ['आदर', 'अनादर'], ['उदय', 'अस्त']], type: 'antonym', difficulty: 'medium' },
  { pairs: [['अनुग्रह', 'कृपा'], ['विपत्ति', 'आपदा'], ['अमृत', 'सुधा']], type: 'synonym', difficulty: 'hard' },
  { pairs: [['सार्थक', 'निरर्थक'], ['सजीव', 'निर्जीव'], ['स्थायी', 'अस्थायी']], type: 'antonym', difficulty: 'hard' },
];

export const fillBlankQuestions = [
  { sentence: 'आज मौसम बहुत ______ है।', answer: 'अच्छा', options: ['अच्छा', 'बुरा', 'काला', 'लाल'], hint: '"अच्छा" का समानार्थी', difficulty: 'easy' },
  { sentence: 'सूरज ______ में निकलता है।', answer: 'सुबह', options: ['सुबह', 'रात', 'शाम', 'दोपहर'], hint: '"रात" का विलोम', difficulty: 'easy' },
  { sentence: 'हमें हमेशा ______ बोलना चाहिए।', answer: 'सच', options: ['सच', 'झूठ', 'कहानी', 'गाना'], hint: '"झूठ" का विलोम', difficulty: 'easy' },
  { sentence: 'वह बहुत ______ लड़की है।', answer: 'सुंदर', options: ['सुंदर', 'मोटी', 'लंबी', 'छोटी'], hint: '"खूबसूरत" का समानार्थी', difficulty: 'easy' },
  { sentence: '______ में तारे चमकते हैं।', answer: 'रात', options: ['रात', 'सुबह', 'दोपहर', 'शाम'], hint: '"दिन" का विलोम', difficulty: 'easy' },
  { sentence: 'बच्चे बगीचे में ______ खेल रहे हैं।', answer: 'खुशी', options: ['खुशी', 'गुस्से', 'डर', 'थकान'], hint: '"प्रसन्नता" का समानार्थी', difficulty: 'easy' },
  { sentence: 'भारत एक ______ देश है।', answer: 'प्राचीन', options: ['प्राचीन', 'आधुनिक', 'छोटा', 'गरीब'], hint: '"पुराना" का समानार्थी', difficulty: 'medium' },
  { sentence: 'परिश्रम से ही ______ मिलती है।', answer: 'सफलता', options: ['सफलता', 'असफलता', 'थकान', 'नींद'], hint: '"असफलता" का विलोम', difficulty: 'medium' },
  { sentence: '______ के बिना जीवन संभव नहीं है।', answer: 'जल', options: ['जल', 'सोना', 'हीरा', 'चाँदी'], hint: '"पानी" का समानार्थी', difficulty: 'medium' },
  { sentence: 'सैनिक बहुत ______ होते हैं।', answer: 'साहसी', options: ['साहसी', 'कायर', 'डरपोक', 'आलसी'], hint: '"बहादुर" का समानार्थी', difficulty: 'medium' },
  { sentence: 'हमें अपने ______ का सम्मान करना चाहिए।', answer: 'अध्यापक', options: ['अध्यापक', 'शत्रु', 'अजनबी', 'दुश्मन'], hint: '"शिक्षक" का समानार्थी', difficulty: 'medium' },
  { sentence: 'इस कार्य में बहुत ______ लगी।', answer: 'मेहनत', options: ['मेहनत', 'आलस', 'नींद', 'खुशी'], hint: '"परिश्रम" का समानार्थी', difficulty: 'medium' },
  { sentence: 'उसने सभी ______ पर विजय पाई।', answer: 'विपत्तियों', options: ['विपत्तियों', 'सुखों', 'खुशियों', 'उत्सवों'], hint: '"आपदाओं" का समानार्थी', difficulty: 'hard' },
  { sentence: 'यह एक ______ निर्णय था।', answer: 'सार्थक', options: ['सार्थक', 'निरर्थक', 'व्यर्थ', 'बेकार'], hint: '"निरर्थक" का विलोम', difficulty: 'hard' },
  { sentence: 'उसका व्यवहार बहुत ______ था।', answer: 'सभ्य', options: ['सभ्य', 'असभ्य', 'क्रूर', 'कठोर'], hint: '"शिष्ट" का समानार्थी', difficulty: 'hard' },
];

export const challengeQuestions = [
  { question: 'नीचे दिए गए शब्दों में से कौन-सा शब्द "प्रसन्न" का विलोम है?', answer: 'उदास', options: ['उदास', 'खुश', 'हर्षित', 'प्रफुल्लित'], difficulty: 'easy' },
  { question: '"विद्वान" का समानार्थी शब्द चुनिए:', answer: 'पंडित', options: ['पंडित', 'मूर्ख', 'अज्ञानी', 'निरक्षर'], difficulty: 'medium' },
  { question: '"अंधकार" का विलोम शब्द क्या है?', answer: 'प्रकाश', options: ['प्रकाश', 'अंधेरा', 'छाया', 'रात'], difficulty: 'easy' },
  { question: 'इनमें से कौन-सा शब्द "क्रोध" का समानार्थी नहीं है?', answer: 'शांति', options: ['शांति', 'गुस्सा', 'कोप', 'रोष'], difficulty: 'medium' },
  { question: '"निर्दयी" का विलोम शब्द बताइए:', answer: 'दयालु', options: ['दयालु', 'क्रूर', 'कठोर', 'निष्ठुर'], difficulty: 'medium' },
  { question: '"पराजय" का विलोम शब्द क्या होगा?', answer: 'विजय', options: ['विजय', 'हार', 'पतन', 'नाश'], difficulty: 'medium' },
  { question: '"अज्ञानी" का विलोम शब्द चुनिए:', answer: 'ज्ञानी', options: ['ज्ञानी', 'मूर्ख', 'नादान', 'अनपढ़'], difficulty: 'hard' },
  { question: '"यशस्वी" का समानार्थी शब्द क्या है?', answer: 'प्रसिद्ध', options: ['प्रसिद्ध', 'अज्ञात', 'गुमनाम', 'साधारण'], difficulty: 'hard' },
  { question: '"अनंत" का विलोम शब्द बताइए:', answer: 'सान्त', options: ['सान्त', 'अमर', 'शाश्वत', 'चिरस्थायी'], difficulty: 'hard' },
  { question: '"स्वदेश" का विलोम शब्द चुनिए:', answer: 'विदेश', options: ['विदेश', 'देश', 'राष्ट्र', 'प्रदेश'], difficulty: 'medium' },
  { question: '"उदार" का विलोम शब्द क्या है?', answer: 'कंजूस', options: ['कंजूस', 'दानी', 'दयालु', 'परोपकारी'], difficulty: 'hard' },
  { question: '"सम्मान" शब्द का समानार्थी बताइए:', answer: 'आदर', options: ['आदर', 'अपमान', 'तिरस्कार', 'उपेक्षा'], difficulty: 'medium' },
];

// ─── Task type metadata ─────────────────────────────────────────

export const TASK_TYPES = [
  { id: 'synonym_mcq', label: 'समानार्थी शब्द', labelEn: 'Synonyms', icon: '📖', description: '5 प्रश्न' },
  { id: 'antonym_mcq', label: 'विलोम शब्द', labelEn: 'Antonyms', icon: '🔄', description: '5 प्रश्न' },
  { id: 'matching', label: 'शब्द मिलान', labelEn: 'Match Words', icon: '🔗', description: '3 जोड़ियाँ' },
  { id: 'fill_blank', label: 'रिक्त स्थान', labelEn: 'Fill Blanks', icon: '✏️', description: '5 प्रश्न' },
  { id: 'challenge', label: 'Daily Challenge', labelEn: 'Challenge', icon: '⭐', description: '1 कठिन प्रश्न' },
];

// ─── Learning path modules ──────────────────────────────────────

export const LEARNING_MODULES = [
  { id: 'reading', label: 'Reading Practice', labelHi: 'पठन अभ्यास', icon: '📖', description: 'Read Hindi passages aloud', href: '/reading' },
  { id: 'picture', label: 'Picture Learning', labelHi: 'चित्र शिक्षा', icon: '🖼️', description: 'Learn words from images', href: '/learn' },
  { id: 'shabd', label: 'शब्द शक्ति', labelHi: 'शब्द शक्ति', icon: '📝', description: 'Test word meaning knowledge', href: '/dashboard' },
  { id: 'game', label: 'Word Game', labelHi: 'शब्द खेल', icon: '🎮', description: 'Vocabulary games & challenges', href: '/dashboard' },
];

// ─── Date-based task generation ─────────────────────────────────

function seededRandom(seed) {
  let s = seed;
  return function() {
    s = (s * 16807) % 2147483647;
    return (s - 1) / 2147483646;
  };
}

function getDifficultyForDate(dateStr) {
  const startDate = new Date('2026-08-01');
  const current = new Date(dateStr);
  const daysDiff = Math.floor((current - startDate) / (1000 * 60 * 60 * 24));
  const week = Math.floor(daysDiff / 7);
  if (week <= 1) return 'easy';
  if (week <= 3) return 'medium';
  return 'hard';
}

function selectQuestions(bank, n, rng, difficulty) {
  const preferred = bank.filter(q => q.difficulty === difficulty);
  const pool = preferred.length >= n ? preferred : bank;
  const shuffled = [...pool].sort(() => rng() - 0.5);
  return shuffled.slice(0, n);
}

export function getDailyTasks(dateStr) {
  const dateSeed = dateStr.split('-').join('');
  const rng = seededRandom(parseInt(dateSeed, 10));
  const difficulty = getDifficultyForDate(dateStr);

  const synonymQs = selectQuestions(synonymQuestions, 5, rng, difficulty);
  const antonymQs = selectQuestions(antonymQuestions, 5, rng, difficulty);
  const matchSet = selectQuestions(matchingPairs, 1, rng, difficulty)[0] || matchingPairs[0];
  const fillQs = selectQuestions(fillBlankQuestions, 5, rng, difficulty);
  const challengeQ = selectQuestions(challengeQuestions, 1, rng, difficulty)[0] || challengeQuestions[0];

  return [
    { ...TASK_TYPES[0], questions: synonymQs },
    { ...TASK_TYPES[1], questions: antonymQs },
    { ...TASK_TYPES[2], questions: [matchSet] },
    { ...TASK_TYPES[3], questions: fillQs },
    { ...TASK_TYPES[4], questions: [challengeQ] },
  ];
}

// ─── LocalStorage helpers ───────────────────────────────────────

const STORAGE_KEY = 'hindilab_progress';

export function getProgress() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : { completedTasks: {}, streak: 0, bestStreak: 0, moduleProgress: {} };
  } catch {
    return { completedTasks: {}, streak: 0, bestStreak: 0, moduleProgress: {} };
  }
}

export function saveProgress(progress) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(progress));
  } catch { /* silently fail */ }
}

export function markTaskCompleted(dateStr, taskId) {
  const progress = getProgress();
  if (!progress.completedTasks[dateStr]) {
    progress.completedTasks[dateStr] = [];
  }
  if (!progress.completedTasks[dateStr].includes(taskId)) {
    progress.completedTasks[dateStr].push(taskId);
  }
  if (progress.completedTasks[dateStr].length >= 5) {
    updateStreak(progress, dateStr);
  }
  saveProgress(progress);
  return progress;
}

export function getCompletedCount(dateStr) {
  const progress = getProgress();
  return (progress.completedTasks[dateStr] || []).length;
}

export function isTaskCompleted(dateStr, taskId) {
  const progress = getProgress();
  return (progress.completedTasks[dateStr] || []).includes(taskId);
}

function updateStreak(progress, dateStr) {
  const today = new Date(dateStr);
  let streak = 1;
  for (let i = 1; i < 365; i++) {
    const prev = new Date(today);
    prev.setDate(prev.getDate() - i);
    const prevStr = prev.toISOString().split('T')[0];
    if ((progress.completedTasks[prevStr] || []).length >= 5) {
      streak++;
    } else {
      break;
    }
  }
  progress.streak = streak;
  if (streak > (progress.bestStreak || 0)) {
    progress.bestStreak = streak;
  }
}

export function getCurrentStreak() {
  const progress = getProgress();
  return { current: progress.streak || 0, best: progress.bestStreak || 0 };
}
