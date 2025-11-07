import React from 'react';

interface ToneSelectorProps {
  selectedTone: string | null;
  onToneSelect: (tone: string) => void;
  className?: string;
  enabledTones?: readonly string[] | null;
}

const TONES = [
  { symbol: 'ˉ', label: '一声' },
  { symbol: 'ˊ', label: '二声' },
  { symbol: 'ˇ', label: '三声' },
  { symbol: 'ˋ', label: '四声' },
  { symbol: '˙', label: '轻声' },
];

const ToneSelector: React.FC<ToneSelectorProps> = ({ selectedTone, onToneSelect, className = '', enabledTones = null }) => {
  return (
    <div className={`flex items-center justify-center gap-2 sm:gap-3 ${className}`}>
      {TONES.map(tone => {
        const isEnabled = enabledTones === null || enabledTones.includes(tone.symbol);
        const disabledClasses = !isEnabled ? 'opacity-20 cursor-not-allowed' : 'hover:bg-purple-50 hover:border-purple-400 hover:scale-105';

        return (
          <button
            key={tone.label}
            onClick={() => onToneSelect(tone.symbol)}
            aria-label={tone.label}
            disabled={!isEnabled}
            className={`
              w-12 h-12 sm:w-14 sm:h-14 rounded-full border-2 
              font-bold text-2xl flex items-center justify-center 
              transition-all duration-200 transform
              ${selectedTone === tone.symbol
                ? 'bg-purple-600 text-white border-purple-700 scale-110 shadow-lg'
                : `bg-white border-slate-300 text-slate-600 ${disabledClasses}`
              }
            `}
          >
            {tone.symbol}
          </button>
        );
      })}
    </div>
  );
};

export default ToneSelector;
