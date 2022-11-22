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

export const ToggleBtn = styled.button`
  margin: 0.4rem;
  padding: 0.5rem 1rem 0.5rem 1rem;
  width: 6rem;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  background-color: ${(props) => (props.choice === props.value ? '#91f841' : 'white')};
  color: #333333;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;

export const TogglebtnContainer = styled.div`
  display: flex;

  margin-bottom: 2rem;
  justify-content: space-between;
  align-items: center;
`;
export const ListContainer = styled.div`
  display: flex;
`;
