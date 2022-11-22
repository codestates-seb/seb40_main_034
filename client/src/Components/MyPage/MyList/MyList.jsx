import { Container, Article, Bookmark, ToggleBtn, TogglebtnContainer, ListContainer } from './style';
import { useState } from 'react';

const MyList = () => {
  const [choice, setChoice] = useState('article');
  const handleChoice = (e) => {
    setChoice(e.target.value);
  };

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

      <ListContainer>{choice === 'article' ? <Article>article</Article> : <Bookmark>bookmark</Bookmark>}</ListContainer>
    </Container>
  );
};

export default MyList;
