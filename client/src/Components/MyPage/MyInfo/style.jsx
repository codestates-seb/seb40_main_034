import styled from 'styled-components';


export const Container = styled.div`
  padding-top: 4.5rem;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  gap: 0.6rem;
  grid-template-rows: repeat(10, 1fr);
 
    .item:nth-child(1) {
      grid-column: 6 / 8;
      grid-row: 1 / 5;
    }
    .item:nth-child(2) {
      grid-column: 2 / 12;
      grid-row: 5 / 10;
    }

`;


export const ProfileContainer = styled.div`
  display: flex;
  flex-direction:column;
  align-items:center;
  .nickname-text{
    padding-top:0.67rem;
    font-size:2.25rem;
    margin-top:0.5rem;
  }
`;

export const ProfilePic = styled.div`
width: 7.5rem;
height: 7.5rem;
border-radius: 50%;
box-shadow: rgb(0 0 0 / 5%) 0px 10px 24px, rgb(0 0 0 / 5%) 0px 20px 48px,
  rgb(0 0 0 / 10%) 0px 1px 4px;
background-color: black;
@media screen and (max-width: 981px) {

}
@media screen and (max-width: 640px) {

}
`;


export const FollowContainer = styled.div`
  display: flex;
  text-align:center;
  justify-content: space-around;
  margin-top:1.5rem;
  .follow-text{
    font-size:1rem;
  }
`;

export const FollowingList = styled.div`
  display: flex;
`;

export const FollowerList = styled.div`
  display: flex;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top:1rem;
  align-items:center;
`;

export const ShareButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 0px;
  padding: 2px 9px;
  transition: all 0.4s ease 0s;
  font-size: 0.85rem;
  color: white;
  background-color: #379fef;
  width: 3.75rem;
  height: 1.5rem;
  cursor: pointer;
`;

export const EditButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 3px;
  border: 0px;
  padding: 2px 9px;
  transition: all 0.4s ease 0s;
  font-size: 0.85rem;
  color: white;
  background-color: #379fef;
  width: 3.75rem;
  height: 1.5rem;
  cursor: pointer;
`;