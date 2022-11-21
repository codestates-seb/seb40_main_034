import styled from 'styled-components';
import HomeIcon from '../../Assets/img/tab_home.svg';
import FollowedIcon from '../../Assets/img/tab_followed.svg';
import MapIcon from '../../Assets/img/tab_map.svg';
import BookmarkIcon from '../../Assets/img/tab_bookmark.svg';

const Tab = () => {
  return (
    <Container>
      <CategoryLeft>
        <div />
      </CategoryLeft>
      <CategoryMid>
        <div />
      </CategoryMid>
      <CategoryMid2>
        <div />
      </CategoryMid2>
      <CategoryRight>
        <div />
      </CategoryRight>
      <HeaderProfile>
        <Profile />
      </HeaderProfile>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  min-width: 250px;
`;

const CategoryLeft = styled.div`
  width: 20%;
  div {
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
  }
`;

const CategoryMid = styled.div`
  width: 20%;
  div {
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
  }
`;

const CategoryMid2 = styled.div`
  width: 20%;
  div {
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
  }
`;

const CategoryRight = styled.div`
  width: 20%;
  div {
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
  }
`;

const HeaderProfile = styled.div`
  margin-left: 1.5rem;
  width: 20%;
  display: flex;
  align-items: center;
  cursor: pointer;
  & :hover {
    filter: brightness(90%);
  }
`;

const Profile = styled.div`
  width: 2rem;
  height: 2rem;
  border-radius: 20px;
  background-image: ${(props) => (props.profileImg === undefined ? 'none' : props.profileImg)};
  border: ${(props) => (props.profileImg === undefined ? '1px solid #eeeeee' : 'none')};
`;

export default Tab;
