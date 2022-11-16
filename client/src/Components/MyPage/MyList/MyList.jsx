import {
  Container,
  Article,
  Bookmark,
  ToggleBtn,
  ListContainer,
} from "./style";
import { useState } from "react";

const MyList = () => {
  const [choice, setChoice] = useState(false);
  const handleChoice = (e) => {
    setChoice(e.target.value);
  };

  return (
    <Container>
      <ToggleBtn>
        <label for="t1">Created</label>
        <input
          id="t1"
          name="choice"
          type="radio"
          value="article"
          onChange={handleChoice}
          checked={choice === "article"}
        ></input>
        <label for="t2">Saved</label>
        <input
          id="t2"
          name="choice"
          type="radio"
          value="bookmark"
          onChange={handleChoice}
          checked={choice === "bookmark"}
        ></input>
        <div className="blob"></div>
      </ToggleBtn>
      <ListContainer>
        {choice === "article" ? (
          <Article>article</Article>
        ) : (
          <Bookmark>bookmark</Bookmark>
        )}
      </ListContainer>
    </Container>
  );
};

export default MyList;
