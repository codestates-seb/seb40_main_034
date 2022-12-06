import { Modal, Container, GridContainer } from './style';

const ShareModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <Modal popup={open ? 'popup' : ''} onClick={close}>
      {open ? (
        <GridContainer>
          <section className="item">
            <header>
              {header}
              <button className="close" onClick={close}>
                &times;
              </button>
            </header>
            <main>
              <Container onClick={(e) => e.stopPropagation()}>
                <span>링크가 복사되었습니다.</span>
              </Container>
            </main>
            <footer></footer>
          </section>
        </GridContainer>
      ) : null}
    </Modal>
  );
};

export default ShareModal;
