import { Modal, Follow, FollowContainer, Container, FollowBtn } from './style';

const DeleteModal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open, close, header } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <Modal popup={open ? 'popup' : ''} onClick={close}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <Container onClick={(e) => e.stopPropagation()}>
              <FollowContainer>
                <div>탈퇴하시겠습니까?</div>
                <Follow>
                  <FollowBtn>확인</FollowBtn>

                  <FollowBtn>취소</FollowBtn>
                </Follow>
              </FollowContainer>
            </Container>
          </main>
          <footer></footer>
        </section>
      ) : null}
    </Modal>
  );
};

export default DeleteModal;
