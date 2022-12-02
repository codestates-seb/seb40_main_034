import styled from 'styled-components';
import Ball from '../Assets/img/loading.svg';
const Loading = () => {
  return <Image />;
};
const Image = styled.div`
  background-image: url(${Ball});
  background-size: 1rem;
  background-repeat: no-repeat;
`;
export default Loading;
