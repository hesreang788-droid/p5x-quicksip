import React, { createContext, useContext, useState, useEffect } from 'react';

export type CurrencyType = 'USD' | 'KHR';

export interface CurrencyContextType {
  currency: CurrencyType;
  setCurrency: (c: CurrencyType) => void;
  exchangeRate: number; // 1 USD = 4100 KHR
  formatPrice: (usdAmount: number, hideSymbol?: boolean) => string;
  formatKHR: (usdAmount: number) => string;
  formatUSD: (usdAmount: number) => string;
  formatDual: (usdAmount: number) => string;
  getRawPrice: (usdAmount: number) => number;
}

const USD_TO_KHR_RATE = 4100;

const CurrencyContext = createContext<CurrencyContextType>({
  currency: 'USD',
  setCurrency: () => {},
  exchangeRate: USD_TO_KHR_RATE,
  formatPrice: (amount) => `$${amount.toFixed(2)}`,
  formatKHR: (amount) => `៛${Math.round(amount * USD_TO_KHR_RATE).toLocaleString()}`,
  formatUSD: (amount) => `$${amount.toFixed(2)}`,
  formatDual: (amount) => `$${amount.toFixed(2)} (៛${Math.round(amount * USD_TO_KHR_RATE).toLocaleString()})`,
  getRawPrice: (amount) => amount,
});

export const CurrencyProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currency, setCurrencyState] = useState<CurrencyType>(() => {
    const saved = localStorage.getItem('quicksip_currency');
    return (saved === 'KHR' || saved === 'USD') ? saved : 'USD';
  });

  const setCurrency = (c: CurrencyType) => {
    setCurrencyState(c);
    localStorage.setItem('quicksip_currency', c);
  };

  const formatUSD = (amount: number) => {
    return `$${amount.toFixed(2)}`;
  };

  const formatKHR = (amount: number) => {
    const khrAmount = Math.round(amount * USD_TO_KHR_RATE);
    // Round to nearest 100 for clean Cambodian currency representation
    const rounded = Math.round(khrAmount / 100) * 100;
    return `៛${rounded.toLocaleString()}`;
  };

  const formatPrice = (usdAmount: number, hideSymbol = false): string => {
    if (currency === 'KHR') {
      const khrAmount = Math.round(usdAmount * USD_TO_KHR_RATE / 100) * 100;
      return hideSymbol ? khrAmount.toLocaleString() : `៛${khrAmount.toLocaleString()}`;
    }
    return hideSymbol ? usdAmount.toFixed(2) : `$${usdAmount.toFixed(2)}`;
  };

  const formatDual = (usdAmount: number): string => {
    if (currency === 'KHR') {
      return `${formatKHR(usdAmount)} (${formatUSD(usdAmount)})`;
    }
    return `${formatUSD(usdAmount)} (${formatKHR(usdAmount)})`;
  };

  const getRawPrice = (usdAmount: number): number => {
    if (currency === 'KHR') {
      return Math.round(usdAmount * USD_TO_KHR_RATE / 100) * 100;
    }
    return usdAmount;
  };

  return (
    <CurrencyContext.Provider
      value={{
        currency,
        setCurrency,
        exchangeRate: USD_TO_KHR_RATE,
        formatPrice,
        formatKHR,
        formatUSD,
        formatDual,
        getRawPrice,
      }}
    >
      {children}
    </CurrencyContext.Provider>
  );
};

export const useCurrency = () => useContext(CurrencyContext);
