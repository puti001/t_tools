import React, { useState, useCallback, useMemo } from 'react';
import { BOPOMOFO_DATA } from '../constants/bopomofoData';
import { MNEMONICS } from '../constants/contentData';
import { BopomofoSymbol } from '../types';
import BopomofoGrid from './BopomofoGrid';
import SpeakerButton from './SpeakerButton';
import { speak } from '../services/speechService';

const SectionA: React.FC = () => {
  const [selectedSymbol, setSelectedSymbol] = useState<BopomofoSymbol | null>(null);
  const [gameQuestion, setGameQuestion] = useState<string | null>(null);
  const mnemonicsMap = useMemo(() => new Map(MNEMONICS.map(m => [m.symbol, m.phrase])), []);

  const handleSymbolSelect = useCallback((symbol: BopomofoSymbol) => {
    setSelectedSymbol(symbol);
    const phrase = mnemonicsMap.get(symbol.symbol) || symbol.symbol;
    speak(phrase);
  }, [mnemonicsMap]);

  const handleStartGame = useCallback(() => {
    const randomSymbol = BOPOMOFO_DATA[Math.floor(Math.random() * BOPOMOFO_DATA.length)];
    const question = `請找出「${randomSymbol.symbol}」在哪裡？`;
    setGameQuestion(question);
    speak(question);
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex items-center gap-4">
        <h2 className="text-3xl font-bold text-gray-800">A. 認識注音符號</h2>
        <SpeakerButton textToSpeak="認識注音符號" />
      </div>
      <p className="flex items-center gap-2 text-lg text-gray-600">
        點點看下面的符號，聽聽它是怎麼發音的喔！
        <SpeakerButton textToSpeak="點點看下面的符號，聽聽它是怎麼發音的喔！" />
      </p>
      <div className="bg-white p-4 sm:p-6 rounded-xl shadow-md border border-slate-200">
        <BopomofoGrid
            symbols={BOPOMOFO_DATA}
            selectedSymbol={selectedSymbol}
            onSelectSymbol={handleSymbolSelect}
            gridClass="grid-cols-6 sm:grid-cols-8 md:grid-cols-10 lg:grid-cols-10 xl:grid-cols-11 gap-2 sm:gap-3"
        />
      </div>
      <div className="h-20 p-4 rounded-xl bg-yellow-100 border border-yellow-200 flex items-center justify-center transition-all duration-300">
        {selectedSymbol ? (
            <div className="flex items-center gap-4 animate-fade-in">
                <span className="text-3xl font-bold text-yellow-800">{mnemonicsMap.get(selectedSymbol.symbol)}</span>
                <SpeakerButton textToSpeak={mnemonicsMap.get(selectedSymbol.symbol) || ''} />
            </div>
        ) : (
            <span className="text-gray-500">請選擇一個符號</span>
        )}
      </div>
       <div className="space-y-3">
        <h3 className="flex items-center gap-2 text-xl font-semibold text-gray-700">
          小遊戲：聽音找一找
          <SpeakerButton textToSpeak="小遊戲：聽音找一找" />
        </h3>
        <button 
          onClick={handleStartGame}
          className="px-6 py-3 bg-yellow-400 text-yellow-900 font-bold rounded-lg shadow-md hover:bg-yellow-500 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-yellow-300 flex items-center gap-2"
        >
          按這裡開始遊戲
          <SpeakerButton textToSpeak="按這裡開始遊戲" style="secondary" />
        </button>
        {gameQuestion && (
            <div className="mt-4 p-4 rounded-xl bg-yellow-100 border border-yellow-200 flex items-center justify-center transition-all duration-300 animate-fade-in">
                <div className="flex items-center gap-2">
                    <span className="text-xl font-bold text-yellow-800">{gameQuestion}</span>
                    <SpeakerButton textToSpeak={gameQuestion} />
                </div>
            </div>
        )}
      </div>
    </div>
  );
};

export default SectionA;