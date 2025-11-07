import React from 'react';
import { speak } from '../services/speechService';

interface SpeakerButtonProps {
  textToSpeak: string;
  style?: 'primary' | 'secondary';
  className?: string;
}

const SpeakerIcon: React.FC<{className?: string}> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className || "h-6 w-6"} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
    </svg>
);


const SpeakerButton: React.FC<SpeakerButtonProps> = ({ textToSpeak, style = 'primary', className = '' }) => {
    const styleClasses = {
        primary: 'p-2 rounded-full bg-green-100 text-green-600 hover:bg-green-200 transition-colors',
        secondary: 'text-inherit opacity-70 hover:opacity-100',
    }
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    speak(textToSpeak);
  };

  return (
    <button
      onClick={handleClick}
      className={`${styleClasses[style]} ${className}`}
      aria-label={`朗讀: ${textToSpeak}`}
    >
      <SpeakerIcon className={style === 'primary' ? 'h-5 w-5' : 'h-4 w-4'}/>
    </button>
  );
};

export default SpeakerButton;
