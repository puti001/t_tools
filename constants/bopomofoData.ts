import type { BopomofoSymbol } from '../types';

export const BOPOMOFO_DATA: BopomofoSymbol[] = [
  // 聲母 (Consonants / Initials)
  { symbol: 'ㄅ', pinyin: 'b', type: 'initial' },
  { symbol: 'ㄆ', pinyin: 'p', type: 'initial' },
  { symbol: 'ㄇ', pinyin: 'm', type: 'initial' },
  { symbol: 'ㄈ', pinyin: 'f', type: 'initial' },
  { symbol: 'ㄉ', pinyin: 'd', type: 'initial' },
  { symbol: 'ㄊ', pinyin: 't', type: 'initial' },
  { symbol: 'ㄋ', pinyin: 'n', type: 'initial' },
  { symbol: 'ㄌ', pinyin: 'l', type: 'initial' },
  { symbol: 'ㄍ', pinyin: 'g', type: 'initial' },
  { symbol: 'ㄎ', pinyin: 'k', type: 'initial' },
  { symbol: 'ㄏ', pinyin: 'h', type: 'initial' },
  { symbol: 'ㄐ', pinyin: 'j', type: 'initial' },
  { symbol: 'ㄑ', pinyin: 'q', type: 'initial' },
  { symbol: 'ㄒ', pinyin: 'x', type: 'initial' },
  { symbol: 'ㄓ', pinyin: 'zh', type: 'initial' },
  { symbol: 'ㄔ', pinyin: 'ch', type: 'initial' },
  { symbol: 'ㄕ', pinyin: 'sh', type: 'initial' },
  { symbol: 'ㄖ', pinyin: 'r', type: 'initial' },
  { symbol: 'ㄗ', pinyin: 'z', type: 'initial' },
  { symbol: 'ㄘ', pinyin: 'c', type: 'initial' },
  { symbol: 'ㄙ', pinyin: 's', type: 'initial' },

  // 介母 (Medials)
  { symbol: 'ㄧ', pinyin: 'i', type: 'medial' },
  { symbol: 'ㄨ', pinyin: 'u', type: 'medial' },
  { symbol: 'ㄩ', pinyin: 'ü', type: 'medial' },
  
  // 韻母 (Vowels / Finals)
  { symbol: 'ㄚ', pinyin: 'a', type: 'final' },
  { symbol: 'ㄛ', pinyin: 'o', type: 'final' },
  { symbol: 'ㄜ', pinyin: 'e', type: 'final' },
  { symbol: 'ㄝ', pinyin: 'ê', type: 'final' },
  { symbol: 'ㄞ', pinyin: 'ai', type: 'final' },
  { symbol: 'ㄟ', pinyin: 'ei', type: 'final' },
  { symbol: 'ㄠ', pinyin: 'ao', type: 'final' },
  { symbol: 'ㄡ', pinyin: 'ou', type: 'final' },
  { symbol: 'ㄢ', pinyin: 'an', type: 'final' },
  { symbol: 'ㄣ', pinyin: 'en', type: 'final' },
  { symbol: 'ㄤ', pinyin: 'ang', type: 'final' },
  { symbol: 'ㄥ', pinyin: 'eng', type: 'final' },
  { symbol: 'ㄦ', pinyin: 'er', type: 'final' },
];

export const INITIALS = BOPOMOFO_DATA.filter(s => s.type === 'initial');
// For pinyin practice, medials can also act as finals.
export const FINALS_AND_MEDIALS = BOPOMOFO_DATA.filter(s => s.type === 'final' || s.type === 'medial');

// For three-symbol combinations
export const MEDIALS = BOPOMOFO_DATA.filter(s => ['ㄧ', 'ㄨ', 'ㄩ'].includes(s.symbol));
export const FINALS = BOPOMOFO_DATA.filter(s => s.type === 'final');
