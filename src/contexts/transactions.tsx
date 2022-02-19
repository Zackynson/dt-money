/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-no-constructed-context-values */
import {
  createContext, ReactNode, useCallback, useContext, useState,
} from 'react';
import { Transaction } from '../@types';
import { api } from '../services/api';

type TranscationsProviderProps = {
  children: ReactNode
}
type TransactionDTO = {
  title: string,
  type: 'deposit' | 'withdraw',
  amount: number,
  category: string,
}


type TransactionsProviderResult = {
  getTransactions: () => Promise<void>,
  createTransaction: (data: TransactionDTO) => Promise<void>,
  transactions: Transaction[]
}

const TransactionsContext = createContext<TransactionsProviderResult>({} as TransactionsProviderResult);

export function TransactionsProvider({ children }:TranscationsProviderProps) {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  const getTransactions = useCallback(async () => {
    const response = await api.get('/transactions');

    setTransactions(response?.data?.transactions || []);
  }, []);
  
  const createTransaction = useCallback(async (data:TransactionDTO) => {
    await api.post('/transactions', data);
    await getTransactions()
  }, [getTransactions]);
  

  return (
    <TransactionsContext.Provider value={{ transactions, getTransactions, createTransaction }}>
      {children}
    </TransactionsContext.Provider>
  );
}

export const useTransactions = () => {
  const context = useContext(TransactionsContext)
  return context;
 }
 
