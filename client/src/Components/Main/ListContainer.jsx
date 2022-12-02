import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllLists } from '../../Api/MainApi';
import { List } from './List';

const ListContainer = () => {
  const pagesize = Math.floor((window.innerWidth - 14 * 16) / 235);
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(1);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);
  const fetchList = useCallback(async () => {
    const fetchData = await getAllLists({ page, size: pagesize });
    setPostList(postList.concat(fetchData.data));
    console.log('fetched', fetchData);
    setPage(fetchData.pageInfo.page + 1);
    setNextPage(!(fetchData.pageInfo.page === fetchData.pageInfo.totalPages));
    setFetching(false);
  });
  // 데이터에 파라미터로 page, size 넣어서 요청한 후
  // 받아온 데이터로 postlist, page, 다음 페이지 유무, 로딩 중인지의 여부를 세팅함

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop === offsetHeight) {
        setFetching(true);
        console.log('scroll-fetched');
      }
      console.log(scrollTop, '+', window.innerHeight, '===', offsetHeight, '일 때 fetch됩니다');
    };
    setFetching(true);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (isFetching && hasNextPage) fetchList();
    else if (!hasNextPage) setFetching(false);
  }, [isFetching]);

  return (
    <Container>
      {postList.length !== 0 &&
        postList.map((post) => {
          return <List key={post.postId} nickname={post.nickname} postId={post.postId} createdAt={post.createdAt} />;
        })}
      {isFetching && <Loading>Loading...</Loading>}
    </Container>
  );
};

const Container = styled.div`
  width: calc(100vw - 14rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const Loading = styled.div``;
export default ListContainer;
