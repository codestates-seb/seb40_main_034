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
width: 100%;
max-width: 330px;
margin: 0 auto;
border-radius: 0.3rem;
background-color: white;
animation: modal-show 0.3s;
overflow: auto;
}

section > header {
position: relative;
padding: 16px;
font-weight: 700;
}
section > header button {
position: absolute;
top: 15px;
right: 15px;
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

  width: calc(100vw - 4rem);
  height: calc(100vh);
  grid-template-columns: repeat(11, 1fr);
  gap: 0.5rem;
  grid-template-rows: repeat(9, 1fr);
  .item:nth-child(1) {
    grid-column: 6 / 9;
    grid-row: 2 / 7;
  }
`;

export const ToggleBtn = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.choice === props.value ? '#91f841' : 'rgb(235, 235, 235)')};
  color: #333333;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;

export const Follow = styled.div`
  display: flex;
  flex-direction: column;
  width: 20rem;
  justify-content: space-between;
  .follow-item {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 1rem 0 0 0;
  }

  .follow-img {
    padding: 0 1rem 0 0;
    img {
      width: 2.5rem;
      height: 2.5rem;
      border-radius: 50%;
    }
  }
  .follow-name {
    display: flex;
    font-size: 0.7rem;
    justify-content: center;
    align-items: center;
  }
`;

export const FollowContainer = styled.div`
  display: flex;
  justify-content: center;
`;

export const TogglebtnContainer = styled.div`
  display: flex;
  justify-content: space-around;
  align-items: center;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export const FollowBtn = styled(ToggleBtn)`
  padding: 0.25rem 0.85rem 0.25rem 0.85rem;
  width: 4.3rem;
  height: 1.8rem;
  font-size: 0.6rem;
  background-color: ${(props) => (props.status === 'following' ? 'rgb(235, 235, 235)' : '#91f841')};
`;
