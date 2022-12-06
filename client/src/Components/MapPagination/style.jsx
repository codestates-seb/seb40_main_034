import styled from 'styled-components';

export const PageSection = styled.div``;

export const ButtonWrap = styled.div`
  display: flex;
`;

export const Button = styled.button`
  padding: 0.25rem 0.5rem 0.25rem 0.5rem;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  background-color: transparent;
  color: #333333;

  &:focus {
    color: #91f841;
  }
`;
