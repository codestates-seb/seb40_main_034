import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { getAllLists } from '../../Api/MainApi';
import { List } from '../List/List';
const ListContainer = () => {
  const [postList, setPostList] = useState([]);
  useEffect(() => {
    getAllLists().then((res) => {
      setPostList(res.data);
    });
  }, []);
  return (
    <Container>
      {postList &&
        postList.map((post) => {
          <List key={post.postId} nickname={post.nickname} postId={post.postId} createdAt={post.createdAt} />;
        })}
    </Container>
  );
};
const Container = styled.div`
  width: calc(100vw - 14rem);
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export default ListContainer;
