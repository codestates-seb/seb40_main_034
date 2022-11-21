import styled from 'styled-components';
import { List } from '../Components/List/List';
const Main = () => {
  return (
    <>
      <Container>
        <Lists>
          <List />
          <List />
          <List />
          <List />
          <List />
        </Lists>
      </Container>
    </>
  );
};
const Container = styled.div``;
const Lists = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export default Main;
