import React, { useState, useCallback } from 'react';
import { speak } from './services/speechService';
import { SectionId } from './types';
import SectionA from './components/SectionA';
import SectionB from './components/SectionB';
import SectionC from './components/SectionC';
import SectionD from './components/SectionD';
import SectionE from './components/SectionE';
import SectionF from './components/SectionF';
import SpeakerButton from './components/SpeakerButton';

const SECTIONS: { id: SectionId; label: string; icon?: React.ReactNode }[] = [
  { id: 'GREETING', label: '嗨！你好👋' },
  { id: 'A', label: 'A. 認識注音' },
  { id: 'B', label: 'B. 雙拼練習' },
  { id: 'C', label: 'C. 介音練習' },
  { id: 'D', label: 'D. 句子應用' },
  { id: 'E', label: 'E. 檢核測驗' },
  { id: 'F', label: 'F. 家長/老師', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor"><path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" /></svg> },
];

const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState<SectionId>('A');

  const renderSection = () => {
    switch (activeSection) {
      case 'A': return <SectionA />;
      case 'B': return <SectionB />;
      case 'C': return <SectionC />;
      case 'D': return <SectionD />;
      case 'E': return <SectionE />;
      case 'F': return <SectionF />;
      default: return <SectionA />;
    }
  };

  const handleNavClick = useCallback((id: SectionId, label: string) => {
    setActiveSection(id);
    speak(label.replace(/[A-F]. /, ''));
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 flex justify-center p-2 sm:p-4">
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-2xl overflow-hidden flex flex-col">
        <header className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-md">
          <h1 className="text-2xl sm:text-3xl font-bold">Puti-AI 注音小老師</h1>
          <SpeakerButton textToSpeak="Puti AI 注音小老師，歡迎你！" style="secondary" className="text-white" />
        </header>

        <nav className="bg-white/80 backdrop-blur-sm border-b-2 border-slate-200 p-2">
          <ul className="flex flex-wrap justify-center gap-2">
            {SECTIONS.map(({ id, label, icon }) => (
              <li key={id}>
                <button
                  onClick={() => handleNavClick(id, label)}
                  className={`px-3 py-2 text-sm sm:text-base font-semibold rounded-lg flex items-center gap-2 transition-all duration-200 ${
                    activeSection === id
                      ? 'bg-blue-500 text-white shadow-md'
                      : 'bg-slate-100 text-slate-600 hover:bg-blue-100 hover:text-blue-700'
                  }`}
                >
                  {icon}
                  <span>{label}</span>
                   <SpeakerButton textToSpeak={label.replace(/[A-F]. /, '')} style="secondary" />
                </button>
              </li>
            ))}
          </ul>
        </nav>
        
        <main className="flex-1 p-4 sm:p-6 lg:p-8 overflow-y-auto">
          {renderSection()}
        </main>
        
        <footer className="bg-slate-50 text-slate-600 text-sm p-4 sm:p-6 border-t border-slate-200">
          <div className="space-y-2 max-w-prose mx-auto">
            <p className="flex items-center gap-2">
              <span role="img" aria-label="teacher">👨‍🏫</span>
              <span>作者為 Puti-AI黃朝榮老師</span>
            </p>
            <p className="flex items-start gap-2">
              <span role="img" aria-label="copyright">©️</span>
              <span>請尊重著作權，延伸改做先徵詢同意，發布時標註原作者。</span>
            </p>
            <p className="flex items-center gap-2">
              <span role="img" aria-label="no commercial use">🚫</span>
              <span>不得商用。</span>
            </p>
            <p className="flex items-start gap-2">
              <span role="img" aria-label="link">🔗</span>
              <span>
                請點我看更多: 
                <a 
                  href="https://padlet.com/clongwh/puti_ai_tools" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  Puti-AI教學工具庫
                </a>
              </span>
            </p>
          </div>
        </footer>
      </div>
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

export default App;