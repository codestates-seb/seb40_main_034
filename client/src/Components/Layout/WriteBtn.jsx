import { Link } from 'react-router-dom';
import styled from 'styled-components';
import post_button from '../../Assets/img/post_button.svg';

const WriteBtn = () => {
  return (
    <Link to="post">
      <Container />
    </Link>
  );
};
const Container = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 6.5rem;
  width: 3.5rem;
  height: 3.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 5px #ccc;
  background-image: url(${post_button});
  background-size: 1.75rem;
  background-repeat: no-repeat;
  background-position: 1rem;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
  :active {
    background-color: #ddd;
  }
`;
export default WriteBtn;
