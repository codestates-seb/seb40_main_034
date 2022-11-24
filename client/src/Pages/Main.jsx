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
const Container = styled.div``;
export default Main;
