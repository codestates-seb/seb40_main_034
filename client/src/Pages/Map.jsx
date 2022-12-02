/*global kakao */

import { Container, ReviewContainer } from '../Components/MapSide/style';
import MapSide from '../Components/MapSide/MapSide';
import MapView from '../Components/MapView/MapView';
import MapPagination from '../Components/MapPagination/MapPagination';
import { useEffect, useState } from 'react';
import { handlePostInfo } from '../Api/MapApi';
const { kakao } = window;

const Map = () => {
  const address = '서울 중구 남대문로 81 B1';
  const storename = '해피베어데이';
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
      <MapView address={address} storename={storename} />
      <ReviewContainer>
        <MapSide address={address} posts={postsData(contentInfo)} />
        <MapPagination limit={limit} page={page} totalPosts={contentInfo.length} setPage={setPage} />
      </ReviewContainer>
    </Container>
  );
};

export default Map;
