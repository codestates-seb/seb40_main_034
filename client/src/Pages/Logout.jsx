import styled from 'styled-components';
import { GreenBtn, GreyBtn } from '../Components/Common/Btn';
import { persistor } from '../Routes/AppRouter';
import { removeCookieToken } from '../storage/Cookie';
import { useNavigate } from 'react-router-dom';
function Logout() {
  const navigate = useNavigate();
  //Store내에state초기화, cookie초기화
  const purge = async () => {
    navigate('/');
    location.reload();
    await persistor.purge(); // persistStore의 데이터 전부 날림
    removeCookieToken(); // cookie초기화
  };
  const toHome = () => {
    navigate('/');
  };

  return (
    <PageContainer>
      <LogoutContainer>
        <LogoDiv></LogoDiv>
        <LogoutStr>Want to logout?</LogoutStr>
        <BtnContainer>
          <LogoutButton callback={purge} text="Logout"></LogoutButton>
          <CancelButton callback={toHome} text="Cancel" />
        </BtnContainer>
      </LogoutContainer>
    </PageContainer>
  );
}
const PageContainer = styled.div`
  width: 100%;
  height: 53rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LogoutContainer = styled.div`
  width: 35rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;
const BtnContainer = styled.div``;
const LogoDiv = styled.img.attrs({
  src: 'https://user-images.githubusercontent.com/99412221/205011351-46647908-b990-4166-b7ee-1ab482372a0a.png',
})`
  width: 16 rem;
  height: 16rem;
  margin-bottom: 2rem;
`;
const LogoutStr = styled.div`
  font-weight: 700;
  font-size: 2rem;
  margin: 2rem;
`;
const LogoutButton = styled(GreenBtn)`
  margin: 1rem;
`;
const CancelButton = styled(GreyBtn)`
  margin: 1rem;
`;
export default Logout;
