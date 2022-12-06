/*global kakao */

import { Container, ReviewContainer } from '../Components/MapSide/style';
import MapSide from '../Components/MapSide/MapSide';
import MapView from '../Components/MapView/MapView';
import MapPagination from '../Components/MapPagination/MapPagination';
import { useEffect, useState } from 'react';
import { handlePostInfo } from '../Api/MapApi';
import { useLocation } from 'react-router-dom';
const { kakao } = window;

const Map = (state) => {
  const location = useLocation();
  const gpsX = location.state.gpsX;
  const gpsY = location.state.gpsY;
  const [contentInfo, setContentInfo] = useState([]);
  const [page, setPage] = useState(1); //페이지
  const limit = 5; // posts가 보일 최대한의 갯수
  const offset = (page - 1) * limit; // 시작점과 끝점을 구하는 offset

  const postsData = (posts) => {
    if (posts) {
      let result = posts.slice(offset, offset + limit);
      return result;
    }
  };

  useEffect(() => {
    handlePostInfo().then((res) => setContentInfo(res.reverse()));
  }, []);
  return (
    <Container>
      <MapView address={gpsX} storename={gpsY} />
      <ReviewContainer>
        <MapSide address={gpsX} posts={postsData(contentInfo)} />
        <MapPagination limit={limit} page={page} totalPosts={contentInfo.length} setPage={setPage} />
      </ReviewContainer>
    </Container>
  );
};

export default Map;
