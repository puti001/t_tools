import type { Mnemonic, Combination, Sentence, QuizQuestion, ParentTip } from '../types';

export const MNEMONICS: Mnemonic[] = [
  { symbol: 'ㄅ', phrase: 'ㄅ，背包包，去上學' },
  { symbol: 'ㄆ', phrase: 'ㄆ，潑盆水，真好玩' },
  { symbol: 'ㄇ', phrase: 'ㄇ，小貓咪，喵喵叫' },
  { symbol: 'ㄈ', phrase: 'ㄈ，小蜜蜂，飛飛飛' },
  { symbol: 'ㄉ', phrase: 'ㄉ，小刀子，切水果' },
  { symbol: 'ㄊ', phrase: 'ㄊ，小白兔，跳跳跳' },
  { symbol: 'ㄋ', phrase: 'ㄋ，小蝸牛，慢慢爬' },
  { symbol: 'ㄌ', phrase: 'ㄌ，小犁刀，在耕田' },
  { symbol: 'ㄍ', phrase: 'ㄍ，鴿子飛，咕咕咕' },
  { symbol: 'ㄎ', phrase: 'ㄎ，小蝌蚪，水中游' },
  { symbol: 'ㄏ', phrase: 'ㄏ，小花貓，喝牛奶' },
  { symbol: 'ㄐ', phrase: 'ㄐ，小雞，嘰嘰叫' },
  { symbol: 'ㄑ', phrase: 'ㄑ，氣球飛，飛上天' },
  { symbol: 'ㄒ', phrase: 'ㄒ，西瓜甜，笑嘻嘻' },
  { symbol: 'ㄓ', phrase: 'ㄓ，小蜘蛛，在織網' },
  { symbol: 'ㄔ', phrase: 'ㄔ，小火車，轟隆隆' },
  { symbol: 'ㄕ', phrase: 'ㄕ，小獅子，好威風' },
  { symbol: 'ㄖ', phrase: 'ㄖ，太陽，圓又圓' },
  { symbol: 'ㄗ', phrase: 'ㄗ，寫字，要用心' },
  { symbol: 'ㄘ', phrase: 'ㄘ，小刺蝟，真可愛' },
  { symbol: 'ㄙ', phrase: 'ㄙ，蠶寶寶，在吐絲' },
  { symbol: 'ㄚ', phrase: 'ㄚ，張大嘴，ㄚㄚㄚ' },
  { symbol: 'ㄛ', phrase: 'ㄛ，大公雞，喔喔啼' },
  { symbol: 'ㄜ', phrase: 'ㄜ，大白鵝，脖子長' },
  { symbol: 'ㄝ', phrase: 'ㄝ，小羊，咩咩叫' },
  { symbol: 'ㄞ', phrase: 'ㄞ，老爺爺，唉唉唉' },
  { symbol: 'ㄟ', phrase: 'ㄟ，駝著背，嘿嘿嘿' },
  { symbol: 'ㄠ', phrase: 'ㄠ，小寶寶，哈哈笑' },
  { symbol: 'ㄡ', phrase: 'ㄡ，小海鷗，愛飛翔' },
  { symbol: 'ㄢ', phrase: 'ㄢ，撐著傘，去遊玩' },
  { symbol: 'ㄣ', phrase: 'ㄣ，按門鈴，請問誰' },
  { symbol: 'ㄤ', phrase: 'ㄤ，小娃娃，髒兮兮' },
  { symbol: 'ㄥ', phrase: 'ㄥ，小蜜蜂，嗡嗡嗡' },
  { symbol: 'ㄦ', phrase: 'ㄦ，小耳朵，聽聲音' },
  { symbol: 'ㄧ', phrase: 'ㄧ，穿新衣，笑咪咪' },
  { symbol: 'ㄨ', phrase: 'ㄨ，大烏鴉，黑漆漆' },
  { symbol: 'ㄩ', phrase: 'ㄩ，小鯉魚，水中游' },
];

export const COMBINATIONS: Combination[] = [
  { formula: ['ㄉ', 'ㄧ', 'ㄚ'], result: 'ㄉㄧㄚ', emoji: '🦐', word: '蝦子' },
  { formula: ['ㄍ', 'ㄨ', 'ㄚ'], result: 'ㄍㄨㄚ', emoji: '🥒', word: '黃瓜' },
  { formula: ['ㄑ', 'ㄧ', 'ㄢ'], result: 'ㄑㄧㄢˊ', emoji: '💰', word: '錢' },
];

export const COMBINATION_SENTENCES: Sentence[] = [
    { bopomofo: '小魚 (ㄒㄧㄠˇ ㄩˊ) 游來游去 (ㄧㄡˊ ㄌㄞˊ ㄧㄡˊ ㄑㄩˋ)。', chinese: '' },
    { bopomofo: '我 (ㄨㄛˇ) 要 (ㄧㄠˋ) 去 (ㄑㄩˋ) 公 (ㄍㄨㄥ) 園 (ㄩㄢˊ)。', chinese: '' }
];

export const SENTENCES: Sentence[] = [
  { bopomofo: 'ㄇㄚ ㄇㄚ˙ ㄗㄞˋ ㄐㄧㄚ', chinese: '(媽媽在家)', emoji: '👩‍👧‍👦' },
  { bopomofo: 'ㄨㄛˇ ㄒㄧˇ ㄏㄨㄢ ㄔ ㄅㄧㄥ ㄑㄧˊ ㄌㄧㄣˊ', chinese: '(我喜歡吃冰淇淋)', emoji: '🍦' },
  { bopomofo: 'ㄒㄧㄠˇ ㄏㄨㄚ ㄇㄠ ㄗㄞˋ ㄕㄨˋ ㄕㄤˋ', chinese: '(小花貓在樹上)', emoji: '🐈' },
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  { word: '西瓜', options: ['ㄒㄧ ㄍㄨㄚ', 'ㄍㄨㄚ ㄒㄧ', 'ㄕ ㄍㄨㄚ'], answer: 'ㄒㄧ ㄍㄨㄚ' },
  { word: '老師', options: ['ㄌㄠˇ ㄕ', 'ㄋㄠˇ ㄕ', 'ㄌㄠˇ ㄙ'], answer: 'ㄌㄠˇ ㄕ' },
  { word: '蘋果', options: ['ㄆㄧㄥˊ ㄍㄨㄛˇ', 'ㄅㄧㄥˇ ㄍㄨㄛˇ', 'ㄆㄧㄥˊ ㄍㄨㄛ'], answer: 'ㄆㄧㄥˊ ㄍㄨㄛˇ' },
  { word: '吃飯', options: ['ㄑ ㄈㄢˋ', 'ㄔ ㄈㄢˋ', 'ㄕ ㄈㄢˋ'], answer: 'ㄔ ㄈㄢˋ' },
];

export const PARENT_TIPS: ParentTip[] = [
  { title: '保持耐心與鼓勵', content: '學習注音需要時間，孩子的速度不一樣。多給予「你好棒！」、「再試一次看看！」的正向回饋。' },
  { title: '融入生活情境', content: '在路上看到招牌、看繪本時，可以指著國字，帶著孩子一起拼拼看注音。例如：「你看，那裡寫著『ㄍㄨㄥ ㄩㄢˊ』，是『公園』耶！」' },
  { title: '利用「聽」學習', content: '小一生的國字認識量還很少，這個工具的「聆聽按鈕」就是關鍵。鼓勵孩子「用聽的」來學習，先辨別聲音，再對應符號。' },
  { title: '有趣的拼音遊戲', content: '可以玩「我說你拼」，家長念一個詞(例如：蘋果)，孩子試著拼出「ㄆㄧㄥˊ ㄍㄨㄛˇ」。或是反過來，家長拼出「ㄇㄠ ㄇㄧ」，孩子猜是什麼動物。' },
];
