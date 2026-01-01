
import React, { createContext, useState, useEffect, ReactNode } from 'react';
import { Transaction, UserProfile } from '../types';

interface DataContextType {
  transactions: Transaction[];
  user: UserProfile;
  isLoading: boolean;
  error: string | null;
  customBackgroundUrl: string | null;
  activeIllusion: string | null;
}

export const DataContext = createContext<DataContextType | undefined>(undefined);

export const DataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [user, setUser] = useState<UserProfile>({
    name: "Alex Sterling",
    email: "alex@sovereign.io",
    tier: "Sovereign",
    balance: 145892.42
  });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Simulate initial data fetch
    const mockTransactions: Transaction[] = [
      { id: '1', amount: -1240.00, category: 'Hardware', merchant: 'Quantum Systems', date: '2023-10-24', status: 'completed' },
      { id: '2', amount: 5000.00, category: 'Income', merchant: 'Sovereign Yield', date: '2023-10-23', status: 'completed' },
      { id: '3', amount: -45.20, category: 'Digital Service', merchant: 'NeuroLink', date: '2023-10-22', status: 'completed' },
      { id: '4', amount: -2100.00, category: 'Housing', merchant: 'Skyloft Estates', date: '2023-10-21', status: 'pending' },
    ];

    setTimeout(() => {
      setTransactions(mockTransactions);
      setIsLoading(false);
    }, 1200);
  }, []);

  const value = {
    transactions,
    user,
    isLoading,
    error,
    customBackgroundUrl: null,
    activeIllusion: 'none'
  };

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};
