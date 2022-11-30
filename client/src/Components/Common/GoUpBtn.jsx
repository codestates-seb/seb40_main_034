import styled from 'styled-components';
import go_up from '../../Assets/img/go_up.svg';
import scrollToTop from '../../Utils/scrollToTop';

const GoUpBtn = () => {
  return <Container onClick={scrollToTop} />;
};
const Container = styled.button`
  position: fixed;
  bottom: 6.25rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 5px #ccc;
  background-image: url(${go_up});
  background-size: 1.75rem;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
  :active {
    background-color: #ddd;
  }
`;
export default GoUpBtn;
