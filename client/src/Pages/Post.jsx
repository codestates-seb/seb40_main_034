import { useState } from 'react';
import styled from 'styled-components';
import { GreenBtn } from '../Components/Common/Btn';
import FollowList from '../Components/Common/FollowList';

const Post = () => {
  const [maintext, setMaintext] = useState(0);
  const remain = maintext ? 500 - maintext.length : 500;
  const handleMaintext = (e) => {
    setMaintext(e.target.value);
    if (maintext.length > 500) {
      e.target.value = maintext.substring(0, 5);
      setMaintext(maintext.substring(0, 5));
    }
  };
  return (
    <Background>
      <Container>
        <Header>
          <FollowList nickname="nickname" className="user" />
          <GreenBtn text="저장" className="post" />
        </Header>
        <Body>
          <ImageContainer>
            <div>
              클릭하여 업로드
              <br />
              2MB 이하의 이미지
            </div>
          </ImageContainer>
          <Description>
            <Place placeholder="장소" />
            <Maintext placeholder="리뷰를 입력하세요." onChange={handleMaintext} />
            <MaintxtValidator>{remain}</MaintxtValidator>
            <TagForm placeholder="최소 한 개의 태그를 선택하세요." />
          </Description>
        </Body>
      </Container>
    </Background>
  );
};
const Background = styled.div`
  background-color: #eee;
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 50rem;
  height: 38rem;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  position: relative;
  .user {
    position: absolute;
    top: 2rem;
    left: 2rem;
  }
  .post {
    position: absolute;
    top: 2rem;
    right: 2rem;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
`;
const ImageContainer = styled.div`
  width: 50%;
  height: 31rem;
  margin: 5rem 1rem 2rem 2rem;
  background-color: #eee;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
`;
const Description = styled.article`
  width: 50%;
  height: 31rem;
  margin: 5rem 2rem 2rem 1rem;
  display: flex;
  flex-direction: column;
`;
const Place = styled.input`
  padding: 0.5rem;
  height: 2rem;
  border-bottom: 2px solid #ddd;
  &:focus {
    border-bottom: 2px solid #91f841;
    outline: none;
  }
`;
const Maintext = styled.textarea`
  font-size: 1rem;
  height: 24rem;
  overflow: visible;
  margin: 1.5rem 0 0 0;
  padding: 0.325rem;
  border: 2px solid #fff;
  border-bottom: 2px solid #ddd;
  &:focus {
    border: 2px solid #91f841;
    outline: none;
  }
`;
const MaintxtValidator = styled.div`
  font-size: 0.85rem;
  text-align: right;
  margin-bottom: 1.5rem;
`;
const TagForm = styled.input`
  padding: 0.5rem;
  height: 2rem;
  border-bottom: 2px solid #ddd;
  &:focus {
    border-bottom: 2px solid #91f841;
    outline: none;
  }
`;
export default Post;
