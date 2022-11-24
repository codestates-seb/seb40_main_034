import { useState } from 'react';
import styled from 'styled-components';
import { getAllLists } from '../../Api/MainApi';
import { List } from '../List/List';
const ListContainer = () => {
  const [lists, setLists] = useState({});
  setLists(getAllLists);
  return (
    <Container>
      {lists &&
        lists.map((list) => (
          <List key={list.postId} nickname={list.nickname} postId={list.postId} createdAt={list.createdAt} />
        ))}
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
