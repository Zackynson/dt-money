import logo from '../../assets/logo.svg';
import { Container, Content } from './styles';
import useNewTransactionModal from '../NewTransactionModal';


export function Header() {
  const { ModalNewTransaction, openModal: openNewTransactionModal } = useNewTransactionModal();

  return (
    <>
      {ModalNewTransaction}
      <Container>
        <Content>
          <img src={logo} alt="dt money" />
          <button type="button" onClick={openNewTransactionModal}>Nova transação</button>
        </Content>
      </Container>
    </>
  );
}
