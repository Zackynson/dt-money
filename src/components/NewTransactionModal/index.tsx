import {
  useCallback, useState, FormEvent, 
} from 'react';
import Modal from 'react-modal';

import IncomeImg from '../../assets/income.svg';
import OutcomeImg from '../../assets/outcome.svg';
import CloseImg from '../../assets/close.svg';

import { Container, TransactionTypeContainer, TransactionTypeButton } from './styles';
import { useTransactions } from '../../contexts/transactions';

Modal.setAppElement('#root');

export function AddTransactionModal()  {
  const { createTransaction } = useTransactions()

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [title, setTitle] = useState<string>('');
  const [amount, setAmount] = useState<number>(0);
  const [type, setType] = useState<'deposit'|'withdraw'>('deposit');
  const [category, setCategory] = useState<string>('');

  const openModal = useCallback(() => {
    setIsModalOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setType('deposit')
    setTitle('')
    setCategory('')
    setAmount(0)
    setIsModalOpen(false);
  }, []);

  const handleCreateNewTransaction = useCallback(async (event: FormEvent) => {
    event.preventDefault();

    const data = {
      title, 
      type,
      amount,
      category,
    };

    await createTransaction(data)

    closeModal()

  }, [title, type, amount, category, createTransaction, closeModal]);

  const ModalNewTransaction = (
    <Modal
      isOpen={isModalOpen}
      onRequestClose={closeModal}
      contentLabel="Example Modal"
      overlayClassName="react-modal-overlay"
      className="react-modal-content"
    >
      <button type="button" onClick={closeModal} className="react-modal-close">
        <img src={CloseImg} alt="Fechar" />
      </button>

      <Container>
        <h2>Cadastrar transação</h2>
        <input type="text" value={title} placeholder="Titulo" onChange={(event) => setTitle(event.target.value)} />
        <input type="text" value={amount} placeholder="Valor" onChange={(event) => setAmount(Number(event.target.value) || 0)} />
        <TransactionTypeContainer>
          <TransactionTypeButton
            isActive={type === 'deposit'}
            activeColor="green"
            type="button"
            onClick={() => setType('deposit')}
          >
            <img src={IncomeImg} alt="Entrada" />
            <span>Entrada</span>
          </TransactionTypeButton>
          <TransactionTypeButton
            isActive={type === 'withdraw'}
            activeColor="red"
            type="button"
            onClick={() => setType('withdraw')}
          >
            <img src={OutcomeImg} alt="Saída" />
            <span>Saída</span>
          </TransactionTypeButton>
        </TransactionTypeContainer>

        <input type="text" value={category} placeholder="Categoria" onChange={(event) => setCategory(event.target.value)} />
        <button type="submit" onClick={handleCreateNewTransaction}>Cadastrar</button>
      </Container>
    </Modal>
  );

  return { ModalNewTransaction, openModal };
};

export default AddTransactionModal;
