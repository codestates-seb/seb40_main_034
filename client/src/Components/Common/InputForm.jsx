import styled from 'styled-components';
import { GreyBtn } from './Btn';

export const InputForm = ({ placeholder, type, callback, icon, className, ...props }) => {
  return (
    <Container className={className} icon={icon} {...props}>
      {icon && <div />}
      <Input placeholder={placeholder} type={type} onChange={callback}></Input>
      <GreyBtn text="Search" />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
  border-radius: 20px;
  margin-left: 1rem;
  padding: 0 0 0 1rem;
  font-size: 0.9rem;
  width: ${(props) => (props.width ? props.width : 'calc(100vw - 26.175rem)')};
  min-width: ${(props) => (props.minWidth ? props.minWidth : '5rem')};
  max-width: ${(props) => (props.maxWidth ? props.maxWidth : 'calc(100vw - 26.175rem)')};
  height: 2.5rem;
  background-color: #eeeeee;
  div {
    width: 1.5rem;
    height: 1.3rem;
    background-image: url(${(props) => (props.icon ? props.icon : 'none')});
    background-size: 1.3rem;
    background-repeat: no-repeat;
  }
`;

const Input = styled.input`
  width: 100%;
  font-size: 0.9rem;
  padding: 0 0.5rem 0 0.5rem;
  height: 2rem;
  background: none;
  :focus {
    outline: none;
    border-color: #91f841;
  }
`;
