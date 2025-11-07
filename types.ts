export type SymbolType = 'initial' | 'medial' | 'final';
export type SectionId = 'A' | 'B' | 'C' | 'D' | 'E' | 'F' | 'GREETING';

export interface BopomofoSymbol {
  symbol: string;
  pinyin: string;
  type: SymbolType;
  // Fix: Add optional properties to support example words in the InfoPanel component.
  exampleWord?: string;
  examplePinyin?: string;
  translation?: string;
}

export interface Mnemonic {
  symbol: string;
  phrase: string;
}

export interface Combination {
  formula: string[];
  result: string;
  emoji: string;
  word: string;
}

export interface Sentence {
  bopomofo: string;
  chinese: string;
  emoji?: string;
}

export interface QuizQuestion {
  word: string;
  options: string[];
  answer: string;
}

export interface ParentTip {
  title: string;
  content: string;
}
