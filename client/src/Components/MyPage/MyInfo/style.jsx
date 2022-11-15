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


export const ProfileContainer = styled.div`
display: flex;
`;

export const ProfilePic = styled.div`
min-width: 128px;
min-height: 128px;
margin-right: 1rem;
border-radius: 5%;
box-shadow: rgb(0 0 0 / 5%) 0px 10px 24px, rgb(0 0 0 / 5%) 0px 20px 48px,
  rgb(0 0 0 / 10%) 0px 1px 4px;
background-color: black;
@media screen and (max-width: 981px) {
  min-width: 96px;
  max-width: 96px;
  min-height: 96px;
  max-height: 96px;
}
@media screen and (max-width: 640px) {
  min-width: 64px;
  max-width: 64px;
  min-height: 64px;
  max-height: 64px;
}
`;


export const FollowContainer = styled.div`
display: flex;
`;

export const FollowingList = styled.div`
display: flex;
`;

export const FollowerList = styled.div`
display: flex;
`;

export const InfoContainer = styled.div`
display: flex;
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
  width: 100%;
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
  width: 100%;
  height: 1.5rem;
  cursor: pointer;
`;