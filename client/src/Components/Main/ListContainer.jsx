import { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllLists } from '../../Api/MainApi';
import { List } from '../List/List';

const ListContainer = () => {
  const [postList, setPostList] = useState([]);
  const [page, setPage] = useState(0);
  const [isFetching, setFetching] = useState(false);
  const [hasNextPage, setNextPage] = useState(true);

  const fetchList = useCallback(async () => {
    const { data } = await getAllLists({ page, size: 10 });
    setPostList(postList.concat(data.data));
    setPage(data.pageInfo.page + 1);
    setNextPage(!(data.pageInfo.page === data.pageInfo.totalPages));
    setFetching(false);
    console.log('fetched');
  });

  useEffect(() => {
    const handleScroll = () => {
      const { scrollTop, offsetHeight } = document.documentElement;
      if (window.innerHeight + scrollTop >= offsetHeight) {
        setFetching(true);
      }
      console.log('scrolled');
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
      {postList &&
        postList.map((post) => {
          <List key={post.postId} nickname={post.nickname} postId={post.postId} createdAt={post.createdAt} />;
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
