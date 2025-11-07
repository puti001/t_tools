import React from 'react';
import { SENTENCES } from '../constants/contentData';
import SpeakerButton from './SpeakerButton';

const SectionD: React.FC = () => {
    return (
        <div className="space-y-6 animate-fade-in">
            <div className="flex items-center gap-4">
                <h2 className="text-3xl font-bold text-gray-800">D. 整合應用與生活詞語</h2>
                <SpeakerButton textToSpeak="整合應用與生活詞語" />
            </div>
            <p className="flex items-center gap-2 text-lg text-gray-600">
                我們來念念看，這些是什麼意思呢？
                <SpeakerButton textToSpeak="我們來念念看，這些是什麼意思呢？" />
            </p>
            <div className="space-y-4">
                {SENTENCES.map((item, index) => (
                    <div key={index} className="bg-orange-50 border border-orange-200 p-6 rounded-xl shadow-sm space-y-2">
                        <div className="flex items-center justify-between">
                            <p className="text-2xl font-semibold tracking-widest text-gray-800">{item.bopomofo}</p>
                            <SpeakerButton textToSpeak={item.bopomofo} />
                        </div>
                        <div className="flex items-center justify-between">
                            <p className="text-lg text-gray-600">
                                {item.chinese} {item.emoji}
                            </p>
                             <SpeakerButton textToSpeak={item.chinese.replace(/[()]/g, '')} />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default SectionD;
