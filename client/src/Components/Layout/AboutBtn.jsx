import styled from 'styled-components';

const AboutBtn = () => {
  return (
    <a target="_blank" href="https://github.com/codestates-seb/seb40_main_034" rel="noreferrer">
      <Container>?</Container>
    </a>
  );
};
const Container = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 3.5rem;
  height: 3.5rem;
  font-size: 1.5rem;
  border-radius: 50%;
  background-color: white;
  box-shadow: 0 0 5px #ccc;
  cursor: pointer;
  :hover {
    background-color: #eee;
  }
  :active {
    background-color: #ddd;
  }
`;
export default AboutBtn;
