import styled from 'styled-components';
import { GreenBtn } from '../Common/Btn';
import FollowList from '../Common/FollowList';

export const List = ({ img, creator, location, profileImg, nickname }) => {
  return (
    <Container>
      <Thumbnail img={img} creator={creator}>
        <div className="placeholder" />
        <div className="thumbnailHover">
          <GreenBtn text="Bookmark" />
        </div>
        <img src={img} alt={location} />
      </Thumbnail>
      <InfoContainer>
        <Location location={location}>location</Location>
        <FollowList nickname={nickname} profileImg={profileImg} />
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
