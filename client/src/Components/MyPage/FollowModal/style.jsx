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
max-width: 450px;
margin: 0 auto;
border-radius: 0.3rem;
background-color: #fff;

animation: modal-show 0.3s;
overflow: hidden;
}
section > header {
position: relative;
padding: 16px 64px 16px 16px;
background-color: white;
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
background-color: transparent;
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
  margin-top: -50px;
}
to {
  opacity: 1;
  margin-top: 0;
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

export const ToggleBtn = styled.form`
position: relative;
display: flex;
align-items: stretch;
justify-content: center;
color:rgb(31, 31, 31);

label {
  user-select: none;
  padding: 3rem;
  cursor: pointer;
  z-index: 4;
  will-change: transform;
  transform: translateZ(0px);
  transition:
    transform 125ms ease-in-out,
    filter 125ms ease-in-out;

  
  &:hover {
    transform: scale(1.15);

  }
}

input[type="radio"] {
  display: none;


  

  &#t1:checked {
    
    ~ .inblob {
      left:2rem;
      background-color: white;
      animation-name: stretchyRev;
    }
  }
  
  &#t2:checked {
    
    ~ .inblob {
      left:2rem;
      background-color: white;
      animation-name: stretchy;
    }
  }
}

.inblob {
  top: 3rem;
  left:2rem;
  width: 10rem;
  height: 1.6rem;
  position: absolute;
  z-index: 3;
  border-radius: 1.3rem;
  animation-duration: .5s;
  animation-direction: forwards;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  transition:
    transform 150ms ease,
}
}
.outblob {
  top: 2.8rem;
  width: 22rem;
  height: 2rem;
  position: absolute;
  background-color:rgb(132, 255, 47);
  z-index: 2;
  border-radius: 1.3rem;

}
}
@keyframes stretchy {
0% {
  transform: translateX(0.2rem) scaleX(1);
}
50% {
  transform: translateX(0) scaleX(1.2);
}
100% {
  transform: translateX(11.8rem) scaleX(1);
}
}

@keyframes stretchyRev {
0% {
  transform: translateX(11.8rem) scaleX(1);
}
50% {
  transform: translateX(0) scaleX(1.2);
}
100% {
  transform: translateX(0.2rem) scaleX(1);
}
}

`;

export const Following = styled.div`
	display: flex;
	.followimg {
		img {
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 50%;
		}
		.followname {
			font-size: 0.5rem;
		}
	}
`;

export const Follower = styled.div`
	display: flex;
	justify-content: space-around;
	.followimg {
		img {
			width: 2.5rem;
			height: 2.5rem;
			border-radius: 50%;
		}
		.followname {
			font-size: 0.5rem;
		}
	}
`;

export const FollowContainer = styled.div`
	display: flex;
`;
