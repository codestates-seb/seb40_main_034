import styled from 'styled-components';
import { InputForm } from './InputForm';
import Tab from './Tab';
export const Header = () => {
  return (
    <Container>
      <LeftContainer>
        <Logo>LOGO</Logo>
        <InputForm />
      </LeftContainer>
      <RightContainer>
        <Tab />
      </RightContainer>
    </Container>
  );
};

const Container = styled.header`
  display: flex;
  align-items: center;
  width: calc (100vw - 1rem);
  height: 3rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
`;

const LeftContainer = styled.div`
  display: flex;
  align-items: center;
`;

const Logo = styled.div``;

const RightContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  align-items: center;
`;
