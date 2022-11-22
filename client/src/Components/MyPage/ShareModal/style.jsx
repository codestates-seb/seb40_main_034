import styled from 'styled-components';

export const Modal = styled.div`
display: ${(props) => (props.popup ? 'flex' : 'none')};
position: fixed;
align-items: center;
top: 0;
right: 0;
bottom: 0;
left: 0;
z-index: 99;
background-color: rgba(0, 0, 0, 0.6);
animation: modal-bg-show 0.3s;
}
button {
outline: none;
cursor: pointer;
border: 0;
}
section {
width: 90%;
max-width: 420px;
max-height:250px;
margin: 0 auto;
border-radius: 0.3rem;
background-color: white;
animation: modal-show 0.3s;
overflow: hidden;
}
section > header {
position: relative;
padding: 16px 64px 16px 16px;
font-weight: 700;
}
section > header button {
position: absolute;
top: 17px;
right: 13px;
width: 30px;
font-size: 21px;
font-weight: 700;
text-align: center;
color: #999;
background-color: white;
}
section > main {
padding: 16px;
border-color:none;

}
section > footer {
padding: 12px 16px;
text-align: right;
}
section > footer button {
padding: 6px 12px;
color: #fff;
background-color: #6c757d;
border-radius: 5px;
font-size: 13px;
}
@keyframes modal-show {
from {
  opacity: 0;
  transform: translateY(-30px);
}
to {
  opacity: 1;
  transform: translateY(0);
}
}
@keyframes modal-bg-show {
from {
  opacity: 0;
}
to {
  opacity: 1;
}
`;

export const GridContainer = styled.div`
  padding-top: 4.5rem;
  display: grid;
  width: calc(100vw - 5rem);
  height: calc(100vh);
  grid-template-columns: repeat(11, 1fr);
  gap: 0.6rem;
  grid-template-rows: repeat(8, 1fr);
  .item:nth-child(1) {
    grid-column: 6 / 9;
    grid-row: 3 / 5;
  }
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
