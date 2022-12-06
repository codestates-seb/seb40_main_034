import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useState } from 'react';
const Tag = ({ className, tagName, type, callback }) => {
  const tagType = type;
  const [selected, setSelected] = useState(false);
  const handleTagClick = (str) => {
    setSelected(!selected);
    callback(str, selected);
  };
  return (
    <>
      {tagType === 'post' ? (
        <TagStyle className="selected" selected={selected} onClick={() => handleTagClick(tagName)}>
          {tagName}
        </TagStyle>
      ) : (
        <Link to="/">
          <TagStyle className={className}>{tagName}</TagStyle>
        </Link>
      )}
    </>
  );
};
// 태그 선택 여부(정렬)을 redux로 전역 상태로 올려볼까... 고민임
const TagStyle = styled.button`
  padding: 0.25rem 0.75rem 0.25rem 0.75rem;
  margin: 0 0.25rem 0.25rem 0;
  border-radius: 22px;
  font-weight: 500;
  font-size: 0.8rem;
  text-align: center;
  cursor: pointer;
  border: 1px solid #91f841;
  background-color: ${(props) => (props.selected === true ? '#91f841' : 'white')};
  color: #333333;
  &:hover {
    background-color: #91f841;
  }
  &:active {
    filter: brightness(90%);
  }
`;

export default Tag;
