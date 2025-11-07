import React, { useState, useCallback, useMemo } from 'react';
import { INITIALS, FINALS_AND_MEDIALS } from '../constants/bopomofoData';
import { VALID_COMBINATIONS } from '../constants/combinationRules';
import { PINYIN_WITH_TONE_TO_CHAR_MAP } from '../constants/pinyinWithToneToCharMap';
import { VALID_TONES_FOR_PINYIN } from '../constants/toneRules';
import { BopomofoSymbol } from '../types';
import BopomofoGrid from './BopomofoGrid';
import SpeakerButton from './SpeakerButton';
import ToneSelector from './ToneSelector';
import { speak } from '../services/speechService';

const SectionB: React.FC = () => {
    const [selectedInitial, setSelectedInitial] = useState<BopomofoSymbol | null>(null);
    const [selectedFinal, setSelectedFinal] = useState<BopomofoSymbol | null>(null);
    const [selectedTone, setSelectedTone] = useState<string | null>(null);

    const handleInitialSelect = useCallback((symbol: BopomofoSymbol) => {
        setSelectedInitial(symbol);
        setSelectedTone(null); // Reset tone when a new initial is selected
        speak(symbol.symbol);
        
        const validFinalsForNewInitial = VALID_COMBINATIONS[symbol.symbol as keyof typeof VALID_COMBINATIONS];
        if(selectedFinal && !validFinalsForNewInitial?.includes(selectedFinal.symbol)) {
            setSelectedFinal(null);
        }

    }, [selectedFinal]);

    const handleFinalSelect = useCallback((symbol: BopomofoSymbol) => {
        setSelectedFinal(symbol);
        setSelectedTone(null); // Reset tone when a new final is selected
        speak(symbol.symbol);
    }, []);

    const handleToneSelect = (tone: string) => {
        setSelectedTone(tone);
        // Optional: Speak the combined sound with tone immediately upon selection
        if (selectedInitial && selectedFinal) {
            const bopomofoCombination = `${selectedInitial.symbol}${selectedFinal.symbol}${tone}`;
            const pronunciationTarget = PINYIN_WITH_TONE_TO_CHAR_MAP[bopomofoCombination] || '';
            if (pronunciationTarget) {
                 speak(pronunciationTarget);
            }
        }
    };

    const validFinals = useMemo(() => {
        if (!selectedInitial) return null;
        return VALID_COMBINATIONS[selectedInitial.symbol as keyof typeof VALID_COMBINATIONS] || [];
    }, [selectedInitial]);
    
    const pinyinResult = `${selectedInitial?.symbol || '?'}${selectedFinal?.symbol || ''}`;

    const enabledTones = useMemo(() => {
        if (selectedInitial && selectedFinal) {
            const basePinyin = `${selectedInitial.symbol}${selectedFinal.symbol}`;
            return VALID_TONES_FOR_PINYIN[basePinyin] || [];
        }
        return null;
    }, [selectedInitial, selectedFinal]);

    const handleSpeakCombination = () => {
        if (selectedInitial && selectedFinal) {
            const initialSymbol = selectedInitial.symbol;
            const finalSymbol = selectedFinal.symbol;
            let bopomofoCombination = `${initialSymbol}${finalSymbol}`;
            if(selectedTone) {
                bopomofoCombination += selectedTone;
            } else if(enabledTones && enabledTones.length > 0) {
                 bopomofoCombination += enabledTones[0];
            }
            
            const pronunciationTarget = PINYIN_WITH_TONE_TO_CHAR_MAP[bopomofoCombination] 
                || PINYIN_WITH_TONE_TO_CHAR_MAP[`${initialSymbol}${finalSymbol}`] 
                || `${initialSymbol}${finalSymbol}`;

            speak([initialSymbol, finalSymbol, pronunciationTarget]);
        }
    }

    const combination = selectedInitial && selectedFinal;
    const pinyinWithTone = `${pinyinResult}${selectedTone || ''}`;
    const resultChar = PINYIN_WITH_TONE_TO_CHAR_MAP[pinyinWithTone] || '';

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">B. 雙拼練習</h2>
                <SpeakerButton textToSpeak="雙拼練習" />
            </div>
            <p className="flex items-center gap-2 text-lg text-gray-600">
                先選聲母(藍色)，再選韻母(紅色)，最後加上聲調！
                <SpeakerButton textToSpeak="先選聲母，藍色的，再選韻母，紅色的，最後加上聲調！" />
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <h3 className="text-center text-xl font-bold text-blue-700 mb-2">聲母</h3>
                    <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                       <BopomofoGrid
                            symbols={INITIALS}
                            selectedSymbol={selectedInitial}
                            onSelectSymbol={handleInitialSelect}
                            variant="initial"
                        />
                    </div>
                </div>
                 <div>
                    <h3 className="text-center text-xl font-bold text-red-700 mb-2">韻母</h3>
                    <div className="bg-white p-4 rounded-xl shadow-md border border-slate-200">
                       <BopomofoGrid
                            symbols={FINALS_AND_MEDIALS}
                            selectedSymbol={selectedFinal}
                            onSelectSymbol={handleFinalSelect}
                            variant="final"
                            enabledSymbols={validFinals}
                        />
                    </div>
                </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center space-y-4 min-h-[220px]">
                <div className="text-5xl sm:text-6xl font-bold text-gray-700 flex items-center justify-center gap-3 sm:gap-4">
                    <span className="text-blue-600">{selectedInitial?.symbol || '?'}</span>
                    <span>+</span>
                    <span className="text-red-500">{selectedFinal?.symbol || '?'}</span>
                    <span>=</span>
                    <div className="flex items-start">
                        <span>{pinyinResult.replace(/\?/, '')}</span>
                        {selectedTone && <span className="text-3xl sm:text-4xl text-purple-700 font-medium">{selectedTone}</span>}
                    </div>
                </div>
                {combination && (
                    <div className="w-full space-y-4 animate-fade-in">
                        <ToneSelector selectedTone={selectedTone} onToneSelect={handleToneSelect} enabledTones={enabledTones} />
                        <div className="text-center h-10">
                            {resultChar && (
                                <button
                                    onClick={handleSpeakCombination}
                                    className="px-8 py-3 bg-purple-600 text-white font-bold rounded-full shadow-lg hover:bg-purple-700 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300 flex items-center gap-2 mx-auto"
                                >
                                    聽聽看 ({resultChar})
                                    <SpeakerButton textToSpeak={resultChar} style="secondary" />
                                </button>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SectionB;