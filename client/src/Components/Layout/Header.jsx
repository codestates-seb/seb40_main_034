import styled from 'styled-components';
import { InputForm } from '../Common/InputForm';
import { Link } from 'react-router-dom';
import Tab from './Tab';
import POSTFAV from '../../Assets/img/POSTFAV.png';
import Icon from '../../Assets/img/search.svg';

const Header = () => {
  return (
    <Container>
      <LeftContainer>
        <Logo>
          <Link to="/">
            <img src={POSTFAV} alt="LOGO" />
          </Link>
        </Logo>
        <InputForm icon={Icon} />
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

const Logo = styled.div`
  img {
    width: 2.75rem;
    margin-top: 0.5rem;
  }
`;

const RightContainer = styled.div`
  display: flex;
  position: absolute;
  right: 0;
  align-items: center;
`;

export default Header;
