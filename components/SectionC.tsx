import React, { useState, useCallback, useMemo } from 'react';
import { INITIALS, MEDIALS, FINALS } from '../constants/bopomofoData';
import { THREE_PIN_COMBINATIONS, MEDIAL_FINAL_COMBINATIONS } from '../constants/combinationRules';
import { PINYIN_WITH_TONE_TO_CHAR_MAP } from '../constants/pinyinWithToneToCharMap';
import { VALID_TONES_FOR_PINYIN } from '../constants/toneRules';
import { BopomofoSymbol } from '../types';
import BopomofoGrid from './BopomofoGrid';
import SpeakerButton from './SpeakerButton';
import ToneSelector from './ToneSelector';
import { speak } from '../services/speechService';

const SectionC: React.FC = () => {
    const [selectedInitial, setSelectedInitial] = useState<BopomofoSymbol | null>(null);
    const [selectedMedial, setSelectedMedial] = useState<BopomofoSymbol | null>(null);
    const [selectedFinal, setSelectedFinal] = useState<BopomofoSymbol | null>(null);
    const [selectedTone, setSelectedTone] = useState<string | null>(null);

    const resetSelections = (level: 'all' | 'medial' | 'final') => {
        setSelectedTone(null);
        if (level === 'all') {
            setSelectedInitial(null);
            setSelectedMedial(null);
            setSelectedFinal(null);
        } else if (level === 'medial') {
            setSelectedMedial(null);
            setSelectedFinal(null);
        } else {
            setSelectedFinal(null);
        }
    };

    const handleInitialSelect = useCallback((symbol: BopomofoSymbol) => {
        resetSelections('medial');
        setSelectedInitial(symbol);
        speak(symbol.symbol);
    }, []);

    const handleMedialSelect = useCallback((symbol: BopomofoSymbol) => {
        resetSelections('final');
        if (!selectedInitial) {
             setSelectedInitial(null);
        }
        setSelectedMedial(symbol);
        speak(symbol.symbol);
    }, [selectedInitial]);

    const handleFinalSelect = useCallback((symbol: BopomofoSymbol) => {
        setSelectedTone(null);
        setSelectedFinal(symbol);
        speak(symbol.symbol);
    }, []);

    const handleToneSelect = (tone: string) => {
        setSelectedTone(tone);
        const pinyin = `${selectedInitial?.symbol || ''}${selectedMedial?.symbol || ''}${selectedFinal?.symbol || ''}${tone}`;
        const target = PINYIN_WITH_TONE_TO_CHAR_MAP[pinyin];
        if (target) {
            speak(target);
        }
    };

    const enabledInitials = useMemo(() => {
        if (selectedMedial && !selectedInitial) return [];
        return null;
    }, [selectedInitial, selectedMedial]);

    const enabledMedials = useMemo(() => {
        if (!selectedInitial) return null;
        const combinations = THREE_PIN_COMBINATIONS[selectedInitial.symbol as keyof typeof THREE_PIN_COMBINATIONS];
        return combinations ? Object.keys(combinations) : [];
    }, [selectedInitial]);

    const enabledFinals = useMemo(() => {
        if (!selectedMedial) return [];
        if (selectedInitial) {
            const initialCombinations = THREE_PIN_COMBINATIONS[selectedInitial.symbol as keyof typeof THREE_PIN_COMBINATIONS];
            if (!initialCombinations) return [];
            const finalCombinations = initialCombinations[selectedMedial.symbol as keyof typeof initialCombinations];
            return finalCombinations || [];
        } else {
             return MEDIAL_FINAL_COMBINATIONS[selectedMedial.symbol as keyof typeof MEDIAL_FINAL_COMBINATIONS] || [];
        }
    }, [selectedInitial, selectedMedial]);
    
    const pinyinResult = `${selectedInitial?.symbol || ''}${selectedMedial?.symbol || ''}${selectedFinal?.symbol || ''}`;

    const enabledTones = useMemo(() => {
        const isThreePinComplete = selectedInitial && selectedMedial && selectedFinal;
        const isTwoPinComplete = !selectedInitial && selectedMedial && selectedFinal;
        if (isThreePinComplete || isTwoPinComplete) {
            return VALID_TONES_FOR_PINYIN[pinyinResult] || [];
        }
        return null;
    }, [selectedInitial, selectedMedial, selectedFinal, pinyinResult]);

    const isThreePinComplete = selectedInitial && selectedMedial && selectedFinal;
    const isTwoPinComplete = !selectedInitial && selectedMedial && selectedFinal;
    const combinationComplete = isThreePinComplete || isTwoPinComplete;

    const pinyinWithTone = `${pinyinResult}${selectedTone || ''}`;
    const resultChar = PINYIN_WITH_TONE_TO_CHAR_MAP[pinyinWithTone] || '';
    
    const handleSpeakCombination = () => {
        if (!combinationComplete) return;
        
        let bopomofoCombination = pinyinResult;
         if(selectedTone) {
            bopomofoCombination += selectedTone;
        } else if(enabledTones && enabledTones.length > 0) {
            bopomofoCombination += enabledTones[0];
        }

        const pronunciationTarget = PINYIN_WITH_TONE_TO_CHAR_MAP[bopomofoCombination] || pinyinResult;

        const partsToSpeak = [
            selectedInitial?.symbol,
            selectedMedial?.symbol,
            selectedFinal?.symbol,
            pronunciationTarget
        ].filter((p): p is string => !!p);

        speak(partsToSpeak);
    }
    
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">C. 進階拼音練習</h2>
                <SpeakerButton textToSpeak="進階拼音練習" />
            </div>
            <p className="flex items-center gap-2 text-lg text-gray-600">
                可從聲母開始三拼，或從介母開始二拼，最後加上聲調！
                <SpeakerButton textToSpeak="可從聲母開始三拼，或從介母開始二拼，最後加上聲調！" />
            </p>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                <div>
                    <h3 className="text-center text-xl font-bold text-blue-700 mb-2">聲母</h3>
                    <div className="bg-white p-3 rounded-xl shadow-md border border-slate-200">
                       <BopomofoGrid symbols={INITIALS} selectedSymbol={selectedInitial} onSelectSymbol={handleInitialSelect} variant="initial" enabledSymbols={enabledInitials} gridClass="grid-cols-4 sm:grid-cols-5 gap-2" />
                    </div>
                </div>
                 <div>
                    <h3 className="text-center text-xl font-bold text-green-700 mb-2">介母</h3>
                    <div className="bg-white p-3 rounded-xl shadow-md border border-slate-200">
                       <BopomofoGrid symbols={MEDIALS} selectedSymbol={selectedMedial} onSelectSymbol={handleMedialSelect} variant="default" enabledSymbols={enabledMedials} gridClass="grid-cols-3 sm:grid-cols-3 gap-2" />
                    </div>
                </div>
                <div>
                    <h3 className="text-center text-xl font-bold text-red-700 mb-2">韻母</h3>
                    <div className="bg-white p-3 rounded-xl shadow-md border border-slate-200">
                       <BopomofoGrid symbols={FINALS} selectedSymbol={selectedFinal} onSelectSymbol={handleFinalSelect} variant="final" enabledSymbols={enabledFinals} gridClass="grid-cols-4 sm:grid-cols-4 gap-2" />
                    </div>
                </div>
            </div>
            <div className="p-4 rounded-xl bg-slate-100 border border-slate-200 flex flex-col items-center justify-center space-y-4 min-h-[220px]">
                <div className="text-4xl sm:text-5xl font-bold text-gray-700 flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
                    {selectedInitial && <><span className="text-blue-600">{selectedInitial.symbol}</span><span>+</span></>}
                    <span className="text-green-600">{selectedMedial?.symbol || '?'}</span>
                     <span>+</span>
                    <span className="text-red-500">{selectedFinal?.symbol || '?'}</span>
                    <span>=</span>
                    <div className="flex items-start">
                        <span>{pinyinResult.replace(/\?/g, '')}</span>
                        {selectedTone && <span className="text-2xl sm:text-3xl text-purple-700 font-medium">{selectedTone}</span>}
                    </div>
                </div>
                {combinationComplete && (
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

export default SectionC;