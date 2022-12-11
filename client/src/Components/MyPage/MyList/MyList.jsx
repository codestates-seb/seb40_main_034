import {
  Container,
  Article,
  Bookmark,
  ToggleBtn,
  TogglebtnContainer,
  ListContainer,
  Location,
  Thumbnail,
  InfoContainer,
  BookmarkContainer,
} from './style';
import { useState, useCallback, useEffect } from 'react';
import { BlackBtn, GreenBtn } from '../../Common/Btn';
import Tag from '../../Common/Tag';
import MiniProfile from '../../Common/MiniProfile';
import { useSelector } from 'react-redux';
import customAlert from '../../../Utils/customAlert';
import { bookmark } from '../../../Api/MainApi';
import { getAllBookmarks } from '../../../Api/MyinfoApi';
import { Link } from 'react-router-dom';
import { MyBookmark } from '../Mybookmark/MyBookmark';

const MyList = () => {
  const [choice, setChoice] = useState('article');
  const handleChoice = (e) => {
    setChoice(e.target.value);
  };
  const state = useSelector((state) => state.user);
  const { authenticated, refreshToken, memberId } = state;
  const [postList, setPostList] = useState([]);

  useEffect(() => {
    getAllBookmarks(memberId).then((res) => {
      console.log(res);
      setPostList(res);
    });
  }, []);

  return (
    <Container>
      <TogglebtnContainer className="subitem">
        <ToggleBtn onClick={handleChoice} value="article" choice={choice}>
          Created
        </ToggleBtn>
        <ToggleBtn onClick={handleChoice} value="bookmark" choice={choice}>
          Saved
        </ToggleBtn>
      </TogglebtnContainer>

      <ListContainer>
        {choice === 'article' ? (
          <Article>article</Article>
        ) : (
          <Bookmark>
            {postList.length !== 0 &&
              postList.map((post) => {
                return (
                  <MyBookmark
                    key={post.postId}
                    image={post.image}
                    bookmarkId={post.bookmarkId}
                    nickname={post.nickname}
                    postId={post.postId}
                    gpsY={post.gpsY}
                  />
                );
              })}
          </Bookmark>
        )}
      </ListContainer>
    </Container>
  );
};

export default MyList;
