/* eslint-disable react/jsx-no-constructed-context-values */
import { ReactNode } from 'react';
import { TransactionsProvider } from './transactions';

const contexts = ({ children }:{ children: ReactNode }) => (
  <TransactionsProvider>
    {children}
  </TransactionsProvider>
);

export default contexts;
