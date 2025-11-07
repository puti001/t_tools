import { PINYIN_WITH_TONE_TO_CHAR_MAP } from './pinyinWithToneToCharMap';

const TONES = ['ˉ', 'ˊ', 'ˇ', 'ˋ', '˙'];

/**
 * Pre-computes a map where the key is a base Bopomofo pinyin combination
 * (e.g., 'ㄅㄚ') and the value is an array of valid tones for that combination
 * (e.g., ['ˉ', 'ˊ', 'ˇ', 'ˋ']).
 * This is generated from the comprehensive pinyinWithToneToCharMap for performance.
 */
const computeValidTones = (): Record<string, string[]> => {
  const toneMap: Record<string, string[]> = {};
  
  for (const pinyinWithTone in PINYIN_WITH_TONE_TO_CHAR_MAP) {
    const lastChar = pinyinWithTone.slice(-1);
    let basePinyin = pinyinWithTone;
    let tone = '';

    if (TONES.includes(lastChar)) {
      basePinyin = pinyinWithTone.slice(0, -1);
      tone = lastChar;
    } else {
      // For combinations without a tone in the map, assume first tone 'ˉ'
      tone = 'ˉ';
    }

    if (!toneMap[basePinyin]) {
      toneMap[basePinyin] = [];
    }
    
    // Add the tone if it's not already present
    if (!toneMap[basePinyin].includes(tone)) {
      toneMap[basePinyin].push(tone);
    }
  }
  return toneMap;
};

export const VALID_TONES_FOR_PINYIN = computeValidTones();
