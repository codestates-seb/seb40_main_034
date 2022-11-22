import styled from 'styled-components';
import { List } from '../List/List';
const Post = () => {
  return (
    <Container>
      <List />
      <List />
      <List />
      <List />
      <List />
      <List />
    </Container>
  );
};
const Container = styled.div`
  width: calc(100vw - 14rem);
  display: flex;
  flex-wrap: wrap;
`;

export default Post;
