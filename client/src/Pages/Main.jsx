import styled from 'styled-components';
import GoUpBtn from '../Components/Common/GoUpBtn';
import ListContainer from '../Components/Main/ListContainer';
const Main = () => {
  return (
    <>
      <Container>
        <ListContainer />
      </Container>
      <GoUpBtn />
    </>
  );
};
const Container = styled.div`
  height: 100vh;
`;
export default Main;
