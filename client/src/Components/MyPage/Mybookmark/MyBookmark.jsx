import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import MiniProfile from '../../Common/MiniProfile';

import { ListContainer, Location, Thumbnail, InfoContainer, BookmarkContainer } from './style';

export const MyBookmark = ({ image, bookmarkId, nickname, postId, gpsY }) => {
  const state = useSelector((state) => state.user);
  const { authenticated, refreshToken } = state;

  return (
    <BookmarkContainer>
      <Thumbnail img={image ? image : undefined} nickname={nickname}>
        <div className="thumbnailHover">
          {/* {authenticated &&
      (bookmarkDisplay ? (
        <GreenBtn text="북마크됨" callback={handleBookmark} />
      ) : (
        <BlackBtn text="북마크" callback={handleBookmark} />
      ))} */}
        </div>
        <div className="tagbtn"></div>
        <Link to={`/post/${postId}/detail`} state={{ postId: postId }}>
          <div className="placeholder" />
          <img src={image} alt={gpsY} />
        </Link>
      </Thumbnail>

      <InfoContainer>
        <Location gpsY={gpsY}>{gpsY ? gpsY : ''}</Location>
        <MiniProfile memberId={bookmarkId} nickname={nickname} />
      </InfoContainer>
    </BookmarkContainer>
  );
};
