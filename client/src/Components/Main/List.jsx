import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { GreenBtn } from '../Common/Btn';
import MiniProfile from '../Common/MiniProfile';

export const List = ({ img, location, profileImg, nickname, createdAt, postId }) => {
  const detailurl = `/post/${postId}/detail`;
  return (
    <Container>
      <Thumbnail img={img} nickname={nickname}>
        <div className="thumbnailHover">
          <GreenBtn text="Bookmark" />
        </div>
        <Link to={detailurl} state={{ postId: postId }}>
          <div className="placeholder" />
          <img src={img} alt={location} />
        </Link>
      </Thumbnail>
      <InfoContainer>
        <Location location={location}>location</Location>
        <MiniProfile nickname={nickname} profileImg={profileImg} />
      </InfoContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 225px;
  margin-right: 0.5rem;
`;
const Thumbnail = styled.div`
  position: relative;
  border-radius: 16px;
  img {
    display: ${(props) => (props.img === undefined ? 'none' : 'block')};
    cursor: zoom-in;
  }
  :hover img {
    filter: brightness(85%);
  }
  :hover .thumbnailHover {
    position: absolute;
    display: block;
    right: 0.5rem;
    top: 0.5rem;
  }
  .placeholder {
    border: 1px solid #dddddd;
    color: #bbbbbb;
    text-align: center;
    vertical-align: middle;
    border-radius: 16px;
    height: 330px;
    display: ${(props) => (props.img === undefined ? 'block' : 'none')};
  }
  .thumbnailHover {
    display: none;
  }
`;
const InfoContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;
const Location = styled.div`
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 20px;
  color: #333333;
  background-color: #eeeeee;
  font-size: 0.85rem;
  line-height: 1;
`;
