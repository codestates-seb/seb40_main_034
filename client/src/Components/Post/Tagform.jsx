import { useEffect } from 'react';
import styled from 'styled-components';
import useInput from '../../Hooks/useInput';
import useTag from '../../Hooks/useTag';

const TagForm = ({ callback }) => {
  const [tags, setTags, handleRemoveTag] = useTag();
  const [value, setValue, onChangeValue] = useInput();

  const handleEditTag = (e) => {
    if (e.keyCode === 8 && value === '' && tags.length > 0) {
      const editTag = tags.pop();
      const newTags = [...tags];
      setTags(newTags);
      setValue(editTag + ' ');
    }
  };

  const handleAddTag = (e) => {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    else {
      setValue(value.trim().toLowerCase());
    }
    if (!value.trim()) return;
    if (tags.includes(value) || tags.length > 4) {
      setValue('');
      return;
    } else {
      setTags([...tags, value]);
      setValue('');
    }
  };

  useEffect(() => {
    callback(tags);
  }, [tags]);

  return (
    <Style>
      <div className="container">
        <div className="tagContainer">
          {tags.map((tag, idx) => (
            <div className="tag" key={idx}>
              <span>{tag}</span>
              <button onClick={() => handleRemoveTag(idx)}>&times;</button>
            </div>
          ))}
        </div>
        <input
          type="text"
          placeholder="태그를 입력하고 엔터를 누르세요."
          value={value}
          onKeyDown={(e) => {
            handleAddTag(e);
            handleEditTag(e);
          }}
          onChange={onChangeValue}
        />
      </div>
    </Style>
  );
};

const Style = styled.div`
  .container {
    display: flex;
    flex-direction: column;
    input {
      display: inline-flex;
      flex-direction: row;
      flex-wrap: wrap;
      padding: 0.5rem;
      border-bottom: 2px solid #ddd;
      font-size: 1rem;
      font-weight: 400;
      height: 1.6rem;
      &:focus {
        outline: none;
        border-bottom: 2px solid #91f841;
      }
    }
  }
  .tagContainer {
    height: 2rem;
  }
  .tag {
    display: inline;
    padding: 0.25rem 0.75rem 0.25rem 0.75rem;
    margin: 0 0.25rem 0.25rem 0;
    border-radius: 22px;
    font-weight: 500;
    font-size: 0.8rem;
    text-align: center;
    border: 1px solid #91f841;
    color: #333333;
  }
  .tag span {
    font-size: 0.8rem;
  }
  .tag button {
    font-size: 0.8rem;
    padding: 0 0.2rem;
    margin-left: 0.3rem;
    font-weight: 700;
    border-radius: 16px;
    background-color: white;
  }
  .tag button:hover {
    color: #91f841;
  }
`;

export default TagForm;
