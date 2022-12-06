import styled from 'styled-components';
import HomeIcon from '../../Assets/img/tab_home.svg';
import FollowedIcon from '../../Assets/img/tab_followed.svg';
import MapIcon from '../../Assets/img/tab_map.svg';
import BookmarkIcon from '../../Assets/img/tab_bookmark.svg';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { GreenBtn, BlackBtn, GreyBtn } from '../Common/Btn';
import { useSelector } from 'react-redux';
import { getProfile } from '../../Api/HeaderApi';

const Tab = () => {
  const state = useSelector((state) => state.user);
  const { authenticated, refreshToken } = state;
  const [userInfo, setUserInfo] = useState([]);
  const [clicked, setClicked] = useState(false);
  const modal = useRef(null);
  const profile = useRef(null);
  const handleClick = () => {
    clicked === false ? setClicked(true) : setClicked(false);
  };
  useEffect(() => {
    getProfile(refreshToken).then((res) => {
      setUserInfo(res);
    });
  }, []);
  useEffect(() => {
    function handleClickOutside(e) {
      if (authenticated) {
        //유저 인포 없을 때, 작동하면 안 됨
        if (profile.current.contains(e.target)) return;
        if (modal.current && !modal.current.contains(e.target)) setClicked(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modal]);

  return (
    <Container>
      {authenticated ? (
        <>
          <CategoryLeft>
            <Link to="/">
              <div className="tabMenu" />
            </Link>
          </CategoryLeft>

          <CategoryMid>
            <div className="tabMenu" />
          </CategoryMid>
          <CategoryMid2>
            <Link to="/map" state={{ gpsX: '서울 중구 한강대로 405', gpsY: '서울역' }}>
              <div className="tabMenu" />
            </Link>
          </CategoryMid2>
          <CategoryRight>
            <Link to={`/profile/${userInfo.memberId}`}>
              <div className="tabMenu" />
            </Link>
          </CategoryRight>
        </>
      ) : (
        <>
          <CategoryMid2>
            <Link to="/map">
              <div className="tabMenu" />
            </Link>
          </CategoryMid2>
          <NotLogin>
            <Link to="/signup">
              <GreenBtn className="signup" text="Sign Up" />
            </Link>
            <Link to="/login">
              <BlackBtn className="login" text="Login" />
            </Link>
            <a target="_blank" href="https://github.com/codestates-seb/seb40_main_034" rel="noreferrer">
              <GreyBtn className="about" text="About" />
            </a>
          </NotLogin>
        </>
      )}
      {/*로그인되어 있으면 프로필에서 모달 메뉴 나오고, 그렇지 않으면 로그인 회원가입 버튼 보여야 함*/}
      {authenticated && (
        <HeaderProfile>
          <Profile onClick={handleClick} ref={profile} />
          <Modal clicked={clicked} ref={modal}>
            <div className="hi">
              <div className="loginconfirm">
                Logged in as <br />
                <span>{userInfo.nickname}</span>
              </div>
            </div>
            <div className="link">
              <Link to={`/profile/${userInfo.memberId}`}>Profile</Link>
            </div>
            <div className="link">
              <Link to="/logout">Sign Out</Link>
            </div>
          </Modal>
        </HeaderProfile>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-width: 19.625rem;
`;

const CategoryLeft = styled.div`
  width: 20%;
  .tabMenu {
    margin-left: calc(50% - 1rem);
    border-radius: 20px;
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(${HomeIcon});
    background-size: 1.75rem;
    background-repeat: no-repeat;
    background-position: center;
    :hover {
      background-color: #eee;
    }
    :active {
      background-color: #ddd;
    }
  }
`;

const CategoryMid = styled.div`
  width: 20%;
  .tabMenu {
    margin-left: calc(50% - 1rem);
    border-radius: 20px;
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(${FollowedIcon});
    background-size: 1.75rem;
    background-repeat: no-repeat;
    background-position: center;
    :hover {
      background-color: #eee;
    }
    :active {
      background-color: #ddd;
    }
  }
`;

const CategoryMid2 = styled.div`
  width: 20%;
  .tabMenu {
    margin-left: calc(50% - 1rem);
    border-radius: 20px;
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(${MapIcon});
    background-size: 1.75rem;
    background-repeat: no-repeat;
    background-position: center;
    :hover {
      background-color: #eee;
    }
    :active {
      background-color: #ddd;
    }
  }
`;

const CategoryRight = styled.div`
  width: 20%;
  .tabMenu {
    margin-left: calc(50% - 1rem);
    border-radius: 20px;
    width: 2.5rem;
    height: 2.5rem;
    background-image: url(${BookmarkIcon});
    background-size: 1.75rem;
    background-repeat: no-repeat;
    background-position: center;
    :hover {
      background-color: #eee;
    }
    :active {
      background-color: #ddd;
    }
  }
`;

const HeaderProfile = styled.div`
  margin-left: 1.5rem;
  width: 40%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Profile = styled.div`
  display: flex;
  align-items: center;
  width: 2rem;
  height: 2rem;
  width: 2rem;
  height: 2rem;
  border-radius: 20px;
  background-image: ${(props) => (props.profileImg === undefined ? 'none' : props.profileImg)};
  border: ${(props) => (props.profileImg === undefined ? '1px solid #eeeeee' : 'none')};
  &:hover {
    filter: brightness(90%);
  }
`;

const Modal = styled.div`
  display: ${(props) => (props.clicked === true ? 'block' : 'none')};
  z-index: 99;
  border: 1px solid #ccc;
  background-color: white;
  border-radius: 1rem;
  width: 12rem;
  height: auto;
  position: absolute;
  text-align: center;
  top: 3rem;
  right: 0.5rem;
  .hi {
    padding: 0.33rem 0 0.33rem 0;
    background-color: #91f841;
    width: 10rem;
    height: 3rem;
    margin: 0.66rem 0 0.33rem 1rem;
    border-radius: 1rem;
    cursor: default;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .loginconfirm {
    font-size: 0.7rem;
  }
  .loginconfirm > span {
    font-weight: 500;
    font-size: 0.9rem;
  }
  .link {
    cursor: pointer;
    padding: 0.33rem;
  }
  .link a {
    font-size: 0.85rem;
  }
  .link:first-child {
    border-top-left-radius: 16px;
    border-top-right-radius: 16px;
  }
  .link:last-child {
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 16px;
  }
  .link:hover {
    background-color: #eee;
  }
`;
const NotLogin = styled.div`
  width: 80%;
  display: flex;
  flex-direction: row;
  .signup,
  .login,
  .about {
    margin-left: 0.25rem;
  }
`;
export default Tab;
