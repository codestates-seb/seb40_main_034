import { useState } from 'react';
import styled from 'styled-components';

function DetailModal({ setIsEdit }) {
  const [cancel, setCancel] = useState(false);

  return (
    <DialogContainer>
      <Dialog>
        <Dialog_Inner>
          <CloseBtn onClick={() => setCancel(true)}>╳</CloseBtn>
          {cancel && (
            <C_Body>
              <C_Container>
                <C_Header>
                  <h1>저장되지 않은 변경 사항</h1>
                  <CloseBtn onClick={() => setCancel(false)}>╳</CloseBtn>
                </C_Header>
                <C_Inner>
                  <h2>변경 사항이 저장되지 않습니다.</h2>
                  <C_Footer>
                    <C_Continue onClick={() => setCancel(false)}>계속 수정</C_Continue>
                    <C_Quite onClick={() => setIsEdit(false)}>확인</C_Quite>
                  </C_Footer>
                </C_Inner>
              </C_Container>
            </C_Body>
          )}
          <Dialog_Form>
            <Dialog_From_Footer>
              <CompleteBtn>저장</CompleteBtn>
            </Dialog_From_Footer>
          </Dialog_Form>
        </Dialog_Inner>
      </Dialog>
    </DialogContainer>
  );
}

const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dialog = styled.div`
  width: 30rem;
  background-color: rgb(255, 255, 255);

  padding: 0;
  border: none;
  border-radius: 6px;
  -webkit-animation: appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation: appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  box-shadow: 0 25px 40px -20px #3c4a56;
  @-webkit-keyframes appear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Dialog_Inner = styled.div`
  display: flex;
  flex-direction: column;
  color: #838282;
`;

const CloseBtn = styled.button`
  padding: 10px;
  align-self: flex-end;
  color: #838282;
  border-radius: 6px;
  cursor: pointer;
  background-color: #fff;
`;

const Dialog_Form = styled.form`
  padding: 1rem;
`;

const Dialog_From_Footer = styled.footer``;

const CompleteBtn = styled.button`
  width: 100%;
  border-radius: 6px;
  font-weight: 600;
  padding: 0.5rem 0;
  background-color: #91f841;
  cursor: pointer;
`;

// 삭제확인 모달
const C_Body = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const C_Container = styled.div`
  width: 30rem;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  box-shadow: 0 25px 40px -20px #3c4a56;
`;

const C_Header = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
    text-align: center;
    flex-basis: 100%;
  }
  border-bottom: 1px solid #dadde1;
`;

const C_Inner = styled.div`
  padding: 1rem;
`;

const C_Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const C_Continue = styled.button`
  color: #91f841;
  font-weight: 400;
  cursor: pointer;
  background-color: #fff;
`;

const C_Quite = styled(C_Continue)`
  margin-left: 1rem;
  font-weight: 600;
  padding: 0.3rem 2rem;
  border-radius: 6px;
  background-color: #91f841;
  color: black;
`;

export default DetailModal;
