import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

const MiniProfile = ({ memberId, nickname, profileImg, className }) => {
  const link = memberId ? `/profile/${memberId}` : '/';
  return (
    <Link to={link}>
      <Conatiner className={className}>
        <Profile />
        <Id>{nickname ? nickname : 'load failed'}</Id>
      </Conatiner>
    </Link>
  );
};

const Conatiner = styled.div`
  padding: 0 0 0.75rem 0;
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
  font-size: 0.9rem;
  :hover {
    text-decoration: underline;
  }
`;

export default MiniProfile;
