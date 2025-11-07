import React from 'react';
import type { BopomofoSymbol } from '../types';

interface BopomofoCardProps {
  symbolData: BopomofoSymbol;
  isSelected: boolean;
  onSelect: (symbol: BopomofoSymbol) => void;
  variant?: 'default' | 'initial' | 'final';
  className?: string;
  isEnabled?: boolean;
}

const BopomofoCard: React.FC<BopomofoCardProps> = ({ symbolData, isSelected, onSelect, variant = 'default', className = '', isEnabled = true }) => {
  const baseClasses = "aspect-square w-full flex items-center justify-center rounded-lg text-3xl font-bold border-2 transition-all duration-200 ease-in-out transform focus:outline-none focus:ring-4 focus:ring-opacity-50";
  
  const variantClasses = {
    default: {
      selected: "bg-blue-500 text-white border-blue-600 scale-110 shadow-lg",
      unselected: "bg-white border-slate-200 hover:bg-blue-50 hover:border-blue-300 hover:scale-105 focus:ring-blue-400"
    },
    initial: {
      selected: "bg-blue-600 text-white border-blue-700 scale-110 shadow-lg",
      unselected: "bg-white border-blue-400 text-blue-800 hover:bg-blue-100 hover:border-blue-500 hover:scale-105 focus:ring-blue-400"
    },
    final: {
      selected: "bg-red-500 text-white border-red-600 scale-110 shadow-lg",
      unselected: "bg-white border-red-400 text-red-800 hover:bg-red-100 hover:border-red-500 hover:scale-105 focus:ring-red-400"
    }
  };

  const currentVariant = variantClasses[variant];
  const disabledClasses = !isEnabled ? 'opacity-30 cursor-not-allowed' : '';

  return (
    <button
      onClick={() => onSelect(symbolData)}
      className={`${baseClasses} ${isSelected ? currentVariant.selected : currentVariant.unselected} ${disabledClasses} ${className}`}
      aria-label={`選擇符號 ${symbolData.pinyin}`}
      aria-pressed={isSelected}
      disabled={!isEnabled}
    >
      {symbolData.symbol}
    </button>
  );
};

export default React.memo(BopomofoCard);