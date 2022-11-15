import styled from 'styled-components';


export const Container = styled.div`
  box-sizing: border-box;
  padding: 1rem;
  width: auto; 
  margin-left: 11rem;
  padding-top: 4.5rem;
  display: flex;
  justify-content: space-between;
  @media screen and (max-width: 981px) {
    box-sizing: border-box;
  }
  @media screen and (max-width: 817px) {
  }
  @media screen and (max-width: 640px) {
    box-sizing: border-box;
    margin-left: 0em;
    padding-top: 4em;
  }
  @media screen and (max-width: 565px) {
  }
`;


export const Article = styled.div`
display: flex;
`;


export const Bookmark = styled.div`
display: flex;
`;