import React from 'react';
import { PARENT_TIPS } from '../constants/contentData';
import SpeakerButton from './SpeakerButton';

const SectionF: React.FC = () => {
    return (
        <div className="space-y-8 animate-fade-in">
            <div>
                <div className="flex items-center gap-4 mb-4">
                    <h2 className="text-3xl font-bold text-gray-800">給家長與老師的建議</h2>
                    <SpeakerButton textToSpeak="給家長與老師的建議" />
                </div>
                <ul className="space-y-4">
                    {PARENT_TIPS.map((tip, index) => (
                        <li key={index} className="bg-green-50 border border-green-200 p-4 rounded-lg shadow-sm flex items-start gap-4">
                            <span className="text-green-600 font-bold text-2xl pt-1">💡</span>
                            <div className="flex-grow">
                                <h3 className="font-bold text-lg text-gray-800">{tip.title}</h3>
                                <p className="text-gray-600 mt-1">{tip.content}</p>
                            </div>
                            <SpeakerButton textToSpeak={`${tip.title}。${tip.content}`} style="primary" />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default SectionF;