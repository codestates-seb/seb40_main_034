import { Modal } from "./style";
import { ToggleBtn } from "./style";
import { useState } from "react";
const FollowModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;
  const [choice, setChoice] = useState("article");
  const handleChoice = (e) => {
    setChoice(e.target.value);
  };

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <Modal popup={open ? "popup" : ""}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <ToggleBtn>
              <label for="t1">Following</label>
              <input
                id="t1"
                name="choice"
                type="radio"
                value="article"
                onChange={handleChoice}
                checked={choice === "article"}
              ></input>
              <label for="t2">Follower</label>
              <input
                id="t2"
                name="choice"
                type="radio"
                value="bookmark"
                onChange={handleChoice}
                checked={choice === "bookmark"}
              ></input>
              <div className="outblob"></div>
              <div className="inblob"></div>
            </ToggleBtn>
          </main>
          <footer>
            <button className="close" onClick={close}>
              close
            </button>
          </footer>
        </section>
      ) : null}
    </Modal>
  );
};

export default FollowModal;
