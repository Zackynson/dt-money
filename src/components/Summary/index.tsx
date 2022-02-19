import { useMemo } from 'react';
import imgIncome from '../../assets/income.svg';
import imgOutcome from '../../assets/outcome.svg';
import imgTotal from '../../assets/total.svg';
import {  useTransactions } from '../../contexts/transactions';
import { Container } from './styles';

export function Summary() {
  const { transactions } = useTransactions();

  const summaryValues = useMemo(() => {
    const depositsValues:number[] = [];
    const withdrawsValues:number[] = [];

    transactions?.forEach((t) => {
      if (t.type === 'deposit' && t.amount > 0) return depositsValues.push(t.amount);
      if (t.type === 'withdraw' && t.amount > 0) return withdrawsValues.push(t.amount);
      return null;
    });

    const deposits = depositsValues.reduce((acc, cur) => acc + cur, 0);
    const withdraws = withdrawsValues.reduce((acc, cur) => acc + cur, 0) * -1;

    return {
      deposits,
      withdraws,
      total: deposits + withdraws,
    };
  }, [transactions]);

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={imgIncome} alt="income" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryValues.deposits)}
        </strong>
      </div>
      <div>
        <header>
          <p>Saídas</p>
          <img src={imgOutcome} alt="outcome" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryValues.withdraws)}
        </strong>
      </div>
      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={imgTotal} alt="total" />
        </header>
        <strong>
          {new Intl.NumberFormat('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          }).format(summaryValues.total)}
        </strong>
      </div>
    </Container>
  );
}
