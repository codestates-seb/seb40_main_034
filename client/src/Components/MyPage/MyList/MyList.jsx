import React from 'react';
import { Container, Article, Bookmark, ToggleButton} from './style';

const MyList = () => {
  return (

      <Container>
      <ToggleButton>
      <label for="t1">Created</label>
  <input id="t1" name="food" type="radio" checked></input>
  <label for="t2">Bookmark</label>
  <input id="t2" name="food" type="radio"></input>
  <div className="blob"></div>

    </ToggleButton>
    
      <Article></Article>
      <Bookmark></Bookmark>
      </Container>

  )
}

export default MyList;