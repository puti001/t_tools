import React, { useState, useCallback, useMemo } from 'react';
import { QUIZ_QUESTIONS } from '../constants/contentData';
import SpeakerButton from './SpeakerButton';
import { speak } from '../services/speechService';

// Utility to shuffle an array
const shuffleArray = <T,>(array: T[]): T[] => {
  return [...array].sort(() => Math.random() - 0.5);
};

const SectionE: React.FC = () => {
    const [questionIndex, setQuestionIndex] = useState(0);
    const [selectedAnswer, setSelectedAnswer] = useState<string | null>(null);
    const [isCorrect, setIsCorrect] = useState<boolean | null>(null);

    const questions = useMemo(() => shuffleArray(QUIZ_QUESTIONS), []);
    const currentQuestion = questions[questionIndex];

    const handleNextQuestion = useCallback(() => {
        setSelectedAnswer(null);
        setIsCorrect(null);
        setQuestionIndex((prevIndex) => (prevIndex + 1) % questions.length);
    }, [questions.length]);

    const handleAnswerSelect = (option: string) => {
        if (selectedAnswer !== null) return; // Prevent changing answer
        
        setSelectedAnswer(option);
        const correct = option === currentQuestion.answer;
        setIsCorrect(correct);
        speak(correct ? '答對了！' : '不對喔，再試一次！');
    };

    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">E. 檢核與延伸練習</h2>
                <SpeakerButton textToSpeak="檢核與延伸練習" />
            </div>
            <p className="flex items-center gap-2 text-lg text-gray-600">
                來玩個小測驗，挑戰看看吧！
                <SpeakerButton textToSpeak="來玩個小測驗，挑戰看看吧！" />
            </p>
            <div>
                <button
                    onClick={handleNextQuestion}
                    className="px-6 py-2 bg-red-500 text-white font-bold rounded-lg shadow-md hover:bg-red-600 transition-transform transform hover:scale-105 focus:outline-none focus:ring-4 focus:ring-red-300"
                >
                    換下一題
                </button>
            </div>
            <div className="bg-red-50 border-2 border-red-200 p-6 rounded-xl shadow-sm space-y-4">
                <p className="flex items-center gap-2 text-lg text-gray-700 font-semibold">
                    請聽聲音，選出正確的拼音：
                    <SpeakerButton textToSpeak="請聽聲音，選出正確的拼音" />
                </p>
                <div className="flex items-center justify-center py-4">
                     <button
                        onClick={() => speak(currentQuestion.word)}
                        className="p-4 rounded-full bg-white border-2 border-red-300 text-red-500 hover:bg-red-100 transition-colors"
                        aria-label="播放題目聲音"
                    >
                         <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                        </svg>
                    </button>
                </div>
                <div className="flex justify-center items-center gap-4">
                    {currentQuestion.options.map(option => {
                        const isSelected = selectedAnswer === option;
                        let buttonClass = "bg-white border-slate-300 hover:bg-slate-100";
                        if (isSelected) {
                            buttonClass = isCorrect ? "bg-green-200 border-green-400" : "bg-red-200 border-red-400";
                        }
                        return (
                             <button
                                key={option}
                                onClick={() => handleAnswerSelect(option)}
                                disabled={selectedAnswer !== null}
                                className={`px-8 py-4 text-2xl font-bold rounded-lg shadow-sm border-2 transition-colors ${buttonClass}`}
                            >
                                {option}
                            </button>
                        )
                    })}
                </div>
            </div>
        </div>
    );
};

export default SectionE;
