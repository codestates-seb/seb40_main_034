import styled from 'styled-components';
export const ListContainer = styled.div`
  display: flex;
`;

export const BookmarkContainer = styled.div`
  width: 225px;
  margin-right: 0.5rem;
`;
export const Thumbnail = styled.div`
  position: relative;
  border-radius: 16px;
  img {
    display: ${(props) => (props.img === undefined ? 'none' : 'block')};
    cursor: zoom-in;
    width: 100%;
    border-radius: 16px;
  }
  :hover img {
    filter: brightness(75%);
  }
  a {
    cursor: zoom-in;
  }
  :hover .thumbnailHover {
    position: absolute;
    z-index: 9;
    display: block;
    right: 0.5rem;
    top: 0.5rem;
  }
  .placeholder {
    border: 1px solid #dddddd;
    color: #bbbbbb;
    text-align: center;
    vertical-align: middle;
    border-radius: 16px;
    height: 330px;
    display: ${(props) => (props.img === undefined ? 'block' : 'none')};
  }
  .thumbnailHover {
    display: none;
  }
  .tagbtn {
    z-index: 9;
    position: absolute;
    bottom: 1rem;
    right: 1rem;
  }
`;
export const InfoContainer = styled.div`
  margin-top: 0.5rem;
  margin-bottom: 1.5rem;
`;
export const Location = styled.div`
  padding: 0.5rem 0.75rem 0.5rem 0.75rem;
  margin-bottom: 0.5rem;
  border-radius: 20px;
  color: #333333;
  background-color: #eeeeee;
  font-size: 0.85rem;
  line-height: 1;
`;
