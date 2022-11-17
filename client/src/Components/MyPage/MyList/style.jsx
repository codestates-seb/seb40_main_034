import styled from 'styled-components';

export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
`;

export const Article = styled.div`
	display: flex;
`;

export const Bookmark = styled.div`
	display: flex;
`;

export const ToggleBtn = styled.form`
position: relative;
display: flex;
align-items: stretch;
justify-content: stretch;

label {
  user-select: none;
  padding: 3rem;
  cursor: pointer;
  will-change: transform;
  transform: translateZ(0px);
  transition:
    transform 125ms ease-in-out,
    filter 125ms ease-in-out;
  // filter: blur(.25rem);
  
  &:hover {
    transform: scale(1.15);
    // filter: blur(0px);
  }
}

input[type="radio"] {
  display: none;
  
  // static
  &#t1 ~ .blob {
    transform-origin: right center;
  }
  
  &#t2 ~ .blob {
    transform-origin: left center;
  }
  
  // animated
  &#t1:checked {
    
    ~ .blob {
      background: rgb(132, 255, 47);
      animation-name: stretchyRev;
    }
  }
  
  &#t2:checked {
    
    ~ .blob {
      background-color: rgb(132, 255, 47);
      animation-name: stretchy;
    }
  }
}

.blob {
  top: 4.4rem;
  left: 2.45rem;
  width: 5.2rem;
  height: 0.1rem;
  position: absolute;
  z-index: -1;
  border-radius: 4rem;
  animation-duration: .5s;
  animation-direction: forwards;
  animation-iteration-count: 1;
  animation-fill-mode: forwards;
  transition:
    transform 150ms ease,
    background 150ms ease;
}
}

@keyframes stretchy {
0% {
  transform: translateX(0) scaleX(1);
}
50% {
  transform: translateX(0) scaleX(1.2);
}
100% {
  transform: translateX(9.65rem) scaleX(1);
}
}

@keyframes stretchyRev {
0% {
  transform: translateX(9.65rem) scaleX(1);
}
50% {
  transform: translateX(0) scaleX(1.2);
}
100% {
  transform: translateX(0) scaleX(1);
}
}


`;
export const ListContainer = styled.div`
	display: flex;
`;
