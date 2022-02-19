import {
   useEffect,
} from 'react';
import { Transaction } from '../../@types';

import {  useTransactions } from '../../contexts/transactions';
import { Container } from './styles';

export function TransactionsTable() {
  const { getTransactions, transactions, createTransaction } = useTransactions()

  useEffect(() => {
    getTransactions();
  }, [getTransactions,createTransaction]);

  return (
    <Container>
      <table>
        <thead>
          <tr>
            <th>Titulo</th>
            <th>Valor</th>
            <th>Categoria</th>
            <th>Data</th>
          </tr>
        </thead>
        <tbody>
          {transactions?.map((transaction:Transaction) => (
            <tr key={transaction.id}>
              <td>
                {transaction.title}
              </td>
              <td className={transaction.type}>
                {
                  new Intl.NumberFormat('pt-BR', {
                    style: 'currency',
                    currency: 'BRL',
                  }).format(transaction?.amount || 0)
                }

              </td>
              <td>
                {transaction.category}
              </td>
              <td>
                {
                  new Intl.DateTimeFormat('pt-BR', {
                    dateStyle: 'long',
                  }).format(new Date(transaction?.createdAt))
                }
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Container>
  );
}
