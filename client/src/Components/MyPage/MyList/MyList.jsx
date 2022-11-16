

import { Container, Article, Bookmark, ToggleBtn} from './style';

const MyList = () => {
  const [choice, setChoice] = useState(false);
  const handleChoice = (e) => {
    setChoice(e.target.value);
  };

  return (

      <Container>
      <ToggleBtn>
      <label for="t1">Created</label>
  <input id="t1" name="choice" type="radio" value="article" onclick={ handleChoice } checked={choice === "article"} ></input>
  <label for="t2">Bookmark</label>
  <input id="t2" name="choice" type="radio" value="bookmark" onclick={ handleChoice } checked={choice === "bookmark"}></input>
  <div className="blob"></div>

    </ToggleBtn>
    
      <Article></Article>
      <Bookmark></Bookmark>
      </Container>

  )
}

export default MyList;