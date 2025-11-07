
import React from 'react';
import type { BopomofoSymbol } from '../types';
import { speak } from '../services/speechService';

interface InfoPanelProps {
  symbol: BopomofoSymbol | null;
}

const SpeakerIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
  </svg>
);


const InfoPanel: React.FC<InfoPanelProps> = ({ symbol }) => {
  return (
    <div className="sticky top-8 bg-white dark:bg-slate-800 p-6 sm:p-8 rounded-xl shadow-lg border border-slate-200 dark:border-slate-700 h-full min-h-[300px] flex flex-col justify-center">
      {symbol ? (
        <div className="animate-fade-in space-y-4">
          <div className="flex items-center gap-4">
            <h2 className="text-8xl font-bold text-blue-600 dark:text-blue-400">{symbol.symbol}</h2>
            <div>
              <p className="text-2xl text-slate-500 dark:text-slate-400">{symbol.pinyin}</p>
              <button 
                onClick={() => speak(symbol.symbol)} 
                className="mt-1 flex items-center gap-2 text-sm text-blue-500 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                aria-label="Play symbol sound"
              >
                <SpeakerIcon className="h-5 w-5" />
                <span>發音</span>
              </button>
            </div>
          </div>
          <div className="border-t border-slate-200 dark:border-slate-600 pt-4 space-y-2">
            <p className="text-slate-500 dark:text-slate-400">範例:</p>
            {/* Fix: Conditionally render the example section if exampleWord exists. This resolves type errors and handles missing data gracefully. */}
            {symbol.exampleWord ? (
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-4xl font-semibold">{symbol.exampleWord}</p>
                  <p className="text-slate-500 dark:text-slate-400">{symbol.examplePinyin}</p>
                   <p className="text-slate-600 dark:text-slate-300 font-medium">{symbol.translation}</p>
                </div>
                <button 
                  onClick={() => speak(symbol.exampleWord)}
                  className="p-3 rounded-full bg-slate-100 hover:bg-blue-100 dark:bg-slate-700 dark:hover:bg-slate-600 text-blue-500 transition-colors"
                  aria-label="Play example word sound"
                >
                  <SpeakerIcon />
                </button>
              </div>
            ) : (
              <p className="text-slate-500 dark:text-slate-400 italic">暫無範例。</p>
            )}
          </div>
        </div>
      ) : (
        <div className="text-center text-slate-500 dark:text-slate-400">
          <p className="text-2xl font-semibold mb-2">歡迎！</p>
          <p>請從左邊選擇一個注音符號開始學習。</p>
        </div>
      )}
      <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default InfoPanel;
