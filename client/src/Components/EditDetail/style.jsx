import styled from 'styled-components';

export const Header = styled.div`
  display: flex;
  font-size: 2rem;
`;

export const EditContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 18rem;
  margin-top: 2.3rem;
  div {
    margin-bottom: 1rem;
  }
  input {
    border-radius: 20px;
    margin-left: 1rem;
    padding: 0 0 0 1rem;
    width: 100%;
    font-size: 0.9rem;
    height: 2.5rem;
    background-color: #eeeeee;
    :focus {
      outline-color: #91f841;
    }
  }

  input[type='text'] {
    min-width: 18rem;
    min-height: 2rem;
  }
  input[type='password'] {
    min-width: 18rem;
    min-height: 2rem;
  }

  input[name='about'] {
    min-width: 18rem;
    min-height: 7rem;
  }
`;

export const PhotoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

export const Photo = styled.div`
  display: flex;
  padding-right: 2rem;
  img {
    width: 5rem;
    height: 5rem;
    border-radius: 50%;
  }
`;

export const PhotoEditBtn = styled.div`
  display: flex;
`;

export const BtnContainer = styled.div`
  display: flex;
  margin-top: 3.5rem;
  flex-direction: column;
  .submitBtn {
    width: 6rem;
  }
`;
export const EditText = styled.div`
  display: flex;
  font-size: 0.9rem;
  margin: 0 0 0.4rem 0;
`;

export const EditName = styled.div`
  display: flex;
  input {
    border-radius: 22px;
    border-color: rgb(31, 31, 31);
    color: rgb(31, 31, 31);
  }
`;

export const EditPassword = styled.div`
  display: flex;
`;

export const EditAbout = styled.div`
  display: flex;
`;

export const QuitBtn = styled.button`
  padding: 0.3rem 1rem 0.3rem 1rem;
  border-radius: 22px;
  font-weight: 500;
  height: 2rem;
  text-align: center;
  cursor: pointer;
  background-color: white;
  width: 6rem;
  font-size: 0.8rem;
  color: rgb(230, 58, 33);
  margin-bottom: 4rem;
  text-align: start;
  &:hover {
    color: rgb(253, 58, 33);
  }
`;

export const NicknameWrap = styled.div`
  position: relative;
`;
export const DoubleCheck = styled.div`
  position: absolute;
  top: 2.35rem;
  left: 15.5rem;
  border-radius: 0 2rem 2rem 0;
  cursor: pointer;
  height: 2.5rem;
  width: 4.5rem;

  line-height: 2.55rem;
  text-align: center;

  font-weight: 500;
  font-size: 0.85rem;
  background-color: #91f841;
  color: #333333;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;
export const ErrorNickname = styled.div`
  color: gray;
  width: 20rem;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
`;
