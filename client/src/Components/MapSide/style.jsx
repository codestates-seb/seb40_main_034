import styled from 'styled-components';
export const Box = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: white;
`;
export const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
`;
export const MapContainer = styled.div`
  display: flex;
  width: calc(100vw - 10rem);
  z-index: 1;
`;

export const Container = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(100vw);
  height: calc(100vh - 4rem);
  overflow: hidden;
  z-index: 2;
`;

export const ListBox = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 10px;
  padding-bottom: 10px;
  padding-top: 10px;
  border-bottom: 0.8px solid rgb(215, 215, 215);
`;

export const ImageBox = styled.div`
  img {
    width: 12rem;
    height: 8rem;
  }
`;

export const ContentBox = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-size: 0.8rem;
  height: 30px;
  width: 250px;
`;
export const ProfileBox = styled.div`
  padding: 0 0 0.75rem 0;
  width: 250px;
  display: flex;
  align-items: center;
`;
export const Profile = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 1.75rem;
    height: 1.75rem;
    margin-right: 0.5rem;
    border-radius: 50%;
  }
`;
export const Id = styled.div`
  font-size: 0.8rem;
  :hover {
    text-decoration: underline;
  }
`;

export const ReviewContainer = styled.div`
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
  width: 370px;
  align-items: center;
`;
