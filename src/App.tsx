import { Dashboard } from './components/Dashboard';
import { Header } from './components/Header';
import { GlobalStyle } from './styles/global';
import Contexts from './contexts';

export function App() {
  return (
    <Contexts>
      <GlobalStyle />
      <Header  />
      <Dashboard />
    </Contexts>
  );
}
