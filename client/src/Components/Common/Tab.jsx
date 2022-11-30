import styled from 'styled-components';
import HomeIcon from '../../Assets/img/tab_home.svg';
import FollowedIcon from '../../Assets/img/tab_followed.svg';
import MapIcon from '../../Assets/img/tab_map.svg';
import BookmarkIcon from '../../Assets/img/tab_bookmark.svg';
import { Link } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { getProfile } from '../../Api/HeaderApi';
import { GreenBtn, BlackBtn, GreyBtn } from '../Common/Btn';

const Tab = () => {
  const [isLogin, setIsLogin] = useState(false);
  const [userInfo, setUserInfo] = useState({});
  const [clicked, setClicked] = useState(false);
  const modal = useRef(null);
  const profile = useRef(null);
  const handleClick = () => {
    clicked === false ? setClicked(true) : setClicked(false);
  };

  useEffect(() => {
    getProfile().then((res) => {
      console.log('TAB', res.data);
      setUserInfo(res.data);
    });
  }, []);

  useEffect(() => {
    function handleClickOutside(e) {
      if (profile.current.contains(e.target)) return;
      if (modal.current && !modal.current.contains(e.target)) setClicked(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [modal]);

  return (
    <Container>
      {userInfo ? (
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
            <Link to="/map">
              <div className="tabMenu" />
            </Link>
          </CategoryMid2>
          <CategoryRight>
            <Link to="/">
              <div className="tabMenu" />
            </Link>
          </CategoryRight>
        </>
      ) : (
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
      )}
      {/*로그인되어 있으면 프로필에서 모달 메뉴 나오고, 그렇지 않으면 로그인 회원가입 버튼 보여야 함*/}
      {userInfo && (
        <HeaderProfile>
          <Profile onClick={handleClick} ref={profile} />
          <Modal clicked={clicked} ref={modal}>
            <div className="link">
              <Link to="/">Profile</Link>
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
  min-width: 250px;
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
  width: 20%;
  display: flex;
  align-items: center;
  cursor: pointer;
`;

const Profile = styled.div`
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
  border: 1px solid #ccc;
  border-radius: 1rem;
  width: 8rem;
  height: auto;
  position: absolute;
  text-align: center;
  top: 3rem;
  right: 0.5rem;
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
  display: flex;
  flex-direction: row;
  .signup,
  .login,
  .about {
    margin-left: 0.25rem;
  }
`;
export default Tab;
