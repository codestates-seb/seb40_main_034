import styled from 'styled-components';

export const BlackBtn = ({ className, text, callback }) => {
  return (
    <BlackBtnStyle onClick={callback} className={className}>
      {text}
    </BlackBtnStyle>
  );
};
export const GreenBtn = ({ className, text, callback }) => {
  return (
    <GreenBtnStyle onClick={callback} className={className}>
      {text}
    </GreenBtnStyle>
  );
};
export const GreyBtn = ({ className, text, callback }) => {
  return (
    <GreyBtnStyle onClick={callback} className={className}>
      {text}
    </GreyBtnStyle>
  );
};

const BlackBtnStyle = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  background-color: #333333;
  color: #91f841;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;
const GreenBtnStyle = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  background-color: #91f841;
  color: #333333;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;

const GreyBtnStyle = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  background-color: #cccccc;
  color: #333333;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;
