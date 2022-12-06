import styled from 'styled-components';
import Ball from '../Assets/img/loading.svg';
const Loading = () => {
  return (
    <>
      <LoadingContainer>
        <Image />
        <LoadingStr>Loading...</LoadingStr>
      </LoadingContainer>
    </>
  );
};
const Image = styled.div`
  background-image: url(${Ball});
  width: 10rem;
  height: 10rem;
  background-size: 10rem;
  background-repeat: no-repeat;
  margin-bottom: 2rem;
`;
const LoadingContainer = styled.div`
  padding-top: 10rem;
`;
const LoadingStr = styled.h1`
  margin-left: 3rem;
`;
export default Loading;
