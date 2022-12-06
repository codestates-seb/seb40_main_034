import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { getFollowList, getInitialTags } from '../../Api/SidebarApi';
import MiniProfile from '../Common/MiniProfile';
import Tagform from '../Post/Tagform';

const Sidebar = () => {
  const [initialTags, setInitialTags] = useState([]);
  const [followList, setFollowList] = useState([]);

  useEffect(() => {
    getInitialTags((res) => {
      setFollowList(res.data);
    });
  }, []);

  useEffect(() => {
    getFollowList((res) => {
      setFollowList(res.data);
    });
  }, []);

  return (
    <Container>
      <TagConatiner>
        <h1>Tags</h1>
        {/* {initialTags &&
          initialTags.map((tag) => {
            <Tag key={tag.tagId} tagName={tag.tagName} />;
          })} */}
        <Tagform />
      </TagConatiner>
      <RankContainer></RankContainer>
      <FollowContainer>
        <h1>Follow</h1>
        {followList &&
          followList.map((list) => {
            <MiniProfile key={list.id} nickname={list.nickname} memberId={list.memberId} />;
          })}
      </FollowContainer>
    </Container>
  );
};

const Container = styled.div`
  padding: 1rem 1rem 0 1rem;
  width: 12rem;
  height: calc(100vh - 5rem);
  h1 {
    cursor: default;
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
