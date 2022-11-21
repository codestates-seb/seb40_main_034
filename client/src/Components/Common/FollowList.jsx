import styled from 'styled-components';
import { Link } from 'react-router-dom';

const FollowList = ({ profileImg, nickname, userId }) => {
  return (
    <Link to="">
      <Conatiner>
        <Profile />
        <Id>{nickname}</Id>
      </Conatiner>
    </Link>
  );
};

const Conatiner = styled.div`
  padding: 0.5rem 0 0.5rem 0;
  width: 12rem;
  display: flex;
  align-items: center;
  cursor: pointer;
  & :hover {
    filter: brightness(90%);
  }
`;
const Profile = styled.div`
  width: 1.75rem;
  height: 1.75rem;
  margin-right: 0.5rem;
  border-radius: 50%;
  background-image: ${(props) => (props.profileImg === undefined ? 'none' : props.profileImg)};
  border: ${(props) => (props.profileImg === undefined ? '1px solid #eeeeee' : 'none')};
`;
const Id = styled.div`
  font-size: 0.85rem;
`;

export default FollowList;
