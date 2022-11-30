import styled from 'styled-components';
import FollowList from './FollowList';
import Tag from './Tag';

const Sidebar = ({ followlist }) => {
  return (
    <Container>
      <TagConatiner>
        <h1>Tags</h1>
        <Tag tagName="김재훈" />
        <Tag tagName="aroowsVd" />
        <Tag tagName="dev32user" />
        <Tag tagName="김다혜" />
        <Tag tagName="seung-yoon-yu" />
        <Tag tagName="조유종" />
        <Tag tagName="skynotlimit" />
      </TagConatiner>
      <RankContainer></RankContainer>
      <FollowContainer>
        <h1>Follow</h1>
        <FollowList nickname="aroowsVd" />
        <FollowList nickname="dev32user" />
        <FollowList nickname="김재훈" />
        <FollowList nickname="김다혜" />
        <FollowList nickname="seung-yoon-yu" />
        <FollowList nickname="skynotlimit" />
        <FollowList nickname="조유종" />
      </FollowContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 1rem 0 1rem;
  width: 12rem;
  height: calc(100vh - 5rem);
  h1 {
    font-weight: 500;
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }
`;
const TagConatiner = styled.div`
  width: 100%;
  height: auto;
  margin-bottom: 2rem;
`;
const RankContainer = styled.div`
  width: 100%;
  height: auto;
`;
const FollowContainer = styled.div`
  width: 100%;
  height: auto;
`;

export default Sidebar;
