import styled from 'styled-components';
import { AppRouter } from './Routes/AppRouter';

function App() {
  return (
    <Main_container>
      <AppRouter />
    </Main_container>
  );
}

const Main_container = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
`;

export default App;
