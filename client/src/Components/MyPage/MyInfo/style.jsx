import styled from 'styled-components';

export const Container = styled.div`
  padding-top: 4.5rem;
  display: grid;
  width: calc(100vw - 14rem);
  grid-template-columns: repeat(11, 1fr);
  gap: 0.6rem;
  grid-template-rows: repeat(9, 1fr);
  .item:nth-child(1) {
    grid-column: 5 / 8;
    grid-row: 1 / 5;
    margin: 2rem;
  }
  .item:nth-child(2) {
    grid-column: 1 / 12;
    grid-row: 5 / 9;
    margin: 2rem;
  }

  .edititem {
    grid-column: 4 / 6;
    grid-row: 1 / 9;
  }
`;

export const MyContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: space-between;
`;

export const ProfileContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  .nickname-text {
    padding-top: 0.2rem;
    font-size: 2.25rem;
    margin-top: 0.1rem;
  }
`;

export const ProfilePic = styled.div`
  img {
    width: 7.5rem;
    height: 7.5rem;
    border-radius: 50%;
    box-shadow: rgb(0 0 0 / 5%) 0px 10px 24px, rgb(0 0 0 / 5%) 0px 20px 48px, rgb(0 0 0 / 10%) 0px 1px 4px;
  }
`;

export const FollowContainer = styled.div`
  display: flex;

  justify-content: center;
  align-items: center;
  margin-top: 1.5rem;
`;

export const InfoContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  align-items: center;
`;

export const ShareBtn = styled.button`
  padding: 0.5rem 1rem 0.5rem 1rem;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.85rem;
  text-align: center;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 5rem;
  border: solid 0.08rem rgb(132, 255, 47);
  color: rgb(31, 31, 31);
  background-color: white;

  span {
    font-size: 0.85rem;
  }
`;

export const EditBtn = styled(ShareBtn)``;
export const FollowingBtn = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  border-radius: 150rem;

  height: 3rem;
  background-color: white;
  cursor: pointer;
  span {
    font-size: 0.9rem;
  }
  span:nth-child(1) {
    color: rgb(132, 255, 47);
    margin-right: 0.4rem;
  }
  span:nth-child(2) {
    color: rgb(31, 31, 31);
  }
`;
export const FollowerBtn = styled(FollowingBtn)`
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  border-radius: 150rem;
  width: 6rem;
  height: 3rem;
  background-color: white;
  cursor: pointer;
  span {
    font-size: 0.9rem;
  }
  span:nth-child(1) {
    color: rgb(132, 255, 47);
    margin-right: 0.4rem;
  }
  span:nth-child(2) {
    color: rgb(31, 31, 31);
  }
`;
