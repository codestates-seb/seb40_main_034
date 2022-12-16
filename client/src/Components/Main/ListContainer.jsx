import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllLists, getAllLists_Login } from '../../Api/MainApi';
import Loading from '../../Pages/Loading';
import { List } from './List';
import { useSelector } from 'react-redux';
import { set, throttle } from 'lodash';

const ListContainer = () => {
  const state = useSelector((state) => state.user);
  const { authenticated, accessToken } = state;

  const inlinesize = Math.floor((window.innerWidth - 14 * 16) / 235);
  const pagesize = Math.floor(((window.innerWidth - 14 * 16) * 4) / 235);

  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const fetchList = useCallback(async () => {
    const fetchData = authenticated
      ? await getAllLists_Login({ page, size: pagesize }, accessToken)
      : await getAllLists({ page, size: pagesize });
    setPostList(postList.concat(fetchData.data));

    setPage(fetchData.pageInfo.page + 1);
    setNextPage(!(fetchData.pageInfo.page === fetchData.pageInfo.totalPages));
    setFetching(false);
  });
  // 데이터에 파라미터로 page, size 넣어서 요청한 후
  // 받아온 데이터로 postlist, page, 다음 페이지 유무, 로딩 중인지의 여부를 세팅함

  useEffect(() => {
    const handleScroll = throttle(() => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
    }, 300);
    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) fetchList();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  const [alignedPostList, setAlignedPostList] = useState({});
  const [currentColumn, setCurrentColumn] = useState(1);
  const [windowWidth, setWindowWidth] = useState(window.inndrWidth);

  useEffect(() => {
    function handleResize() {
      setWindowWidth(window.innerWidth);
    }
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  useEffect(() => {
    if (postList.length !== 0) {
      postList.map((post, idx) => {
        let key = (idx + 1) % inlinesize;

        if (currentColumn <= inlinesize) {
          setAlignedPostList((alignedPostList[key] = [post]));
          setCurrentColumn(currentColumn + 1);
          console.log(key);
          console.log(alignedPostList);
        } else {
          setAlignedPostList(alignedPostList[key]?.push(post));
          setCurrentColumn(currentColumn + 1);
          console.log(alignedPostList);
        }
      });
    }
  }, [windowWidth]);

  return (
    <Container>
      {alignedPostList &&
        postList.map((post, idx) => {
          return (
            <List
              key={post.postId}
              img={post.image}
              creatorId={post.memberId}
              nickname={post.nickname}
              postId={post.postId}
              gpsY={post.gpsY}
              creaedAt={post.createdAt}
              bookmarked={post.bookmarked}
              tag={post.tag}
            />
          );
        })}
      {isFetching && <Loading />}
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw - 14rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;
const GridColumn = styled.div`
  height: 100vh;
`;
export default ListContainer;
