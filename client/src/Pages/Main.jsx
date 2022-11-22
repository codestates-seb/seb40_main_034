import styled from 'styled-components';
import GoUpBtn from '../Components/Common/GoUpBtn';
import Post from '../Components/Main/Post';
const Main = () => {
  return (
    <>
      <Container>
        <Post />
      </Container>
      <GoUpBtn />
    </>
  );
};
const Container = styled.div``;
export default Main;
