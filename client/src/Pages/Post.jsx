import { useState } from 'react';
import styled from 'styled-components';
import { postArticle } from '../Api/PostApi';
import { GreenBtn } from '../Components/Common/Btn';
import FollowList from '../Components/Common/FollowList';
import { useNavigate } from 'react-router-dom';
import Tagform from '../Components/Post/Tagform';

const Post = () => {
  const [body, setBody] = useState('');
  const [imgs, setImgs] = useState([]);
  const [tags, setTags] = useState([]);
  const [maintext, setMaintext] = useState(0);
  const navigate = useNavigate();
  const remain = maintext ? 500 - maintext.length : 500;
  const handleMaintext = (e) => {
    setMaintext(e.target.value);
    if (maintext.length > 500) {
      e.target.value = maintext.substring(0, 5);
      setMaintext(maintext.substring(0, 5));
    }
  };
  const handleBody = (e) => {
    setBody(e.target.value);
  };
  const handleImgs = (arr) => {
    setImgs(arr);
  };
  const handleTags = (arr) => {
    setTags(arr);
  };
  const handleSubmit = () => {
    const data = {
      gpsX: 'string',
      gpsY: 'string',
      contents: body,
      imageURL: imgs,
      tag: tags,
    };
    if (body.length <= 10) {
      alert('리뷰는 최소 10자 이상 작성하세요.');
      return;
    }
    if (tags.length === 0) {
      alert('최소 하나 이상의 태그를 선택하세요.');
      return;
    } else {
      postArticle(data).then((res) => {
        if (res.id) {
          navigate(`/post/${res.id}/detail`);
        } else {
          alert(`글 작성에 실패했습니다. ${res}`);
        }
      });
    }
  };

  return (
    <Background>
      <Container>
        <Header>
          <FollowList nickname="nickname" className="user" />
          <GreenBtn text="저장" className="post" callback={handleSubmit} />
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
            <Maintext placeholder="리뷰를 입력하세요." onChange={handleMaintext} onKeyDown={handleBody} />
            <MaintxtValidator>{remain}</MaintxtValidator>
            <Tagform callback={handleTags} />
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
  font-size: 0.9rem;
  font-family: inherit;
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

export default Post;
