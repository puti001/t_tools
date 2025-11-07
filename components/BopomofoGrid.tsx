import React from 'react';
import type { BopomofoSymbol } from '../types';
import BopomofoCard from './BopomofoCard';

interface BopomofoGridProps {
  symbols: BopomofoSymbol[];
  selectedSymbol: BopomofoSymbol | null;
  onSelectSymbol: (symbol: BopomofoSymbol) => void;
  variant?: 'default' | 'initial' | 'final';
  gridClass?: string;
  enabledSymbols?: readonly string[] | null;
}

const BopomofoGrid: React.FC<BopomofoGridProps> = ({ symbols, selectedSymbol, onSelectSymbol, variant = 'default', gridClass="", enabledSymbols = null }) => {
  return (
    <div className={`grid ${gridClass || 'grid-cols-5 sm:grid-cols-6 md:grid-cols-7 lg:grid-cols-8 gap-2 sm:gap-3'}`}>
      {symbols.map((symbolData) => {
        const isEnabled = enabledSymbols === null || enabledSymbols.includes(symbolData.symbol);
        return (
          <BopomofoCard
            key={symbolData.symbol}
            symbolData={symbolData}
            isSelected={selectedSymbol?.symbol === symbolData.symbol}
            onSelect={onSelectSymbol}
            variant={variant}
            isEnabled={isEnabled}
          />
        )
      })}
    </div>
  );
};

export default BopomofoGrid;