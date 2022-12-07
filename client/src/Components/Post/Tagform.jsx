import styled from 'styled-components';
import { useState } from 'react';
import Tag from '../Common/Tag';

const tagsArr = ['관광명소', '문화시설', '음식점/주점', '카페', '공원', '쇼핑몰', '레저/스포츠', '캠핑장'];
const Tagform = ({ callback, tags, myTag }) => {
  const [selectedtag, setSelectedTag] = useState('');
  const [selected, setSelected] = useState(false);
  return (
    <Container>
      {tagsArr.map((tag, idx) => {
        const display = selected && (selectedtag === idx ? 'inline' : 'none');
        return (
          <Tag
            key={idx}
            tagName={tagsArr[idx]}
            type="post"
            callback={callback}
            selected={selected}
            setSelected={setSelected}
            selectedtag={selectedtag}
            setSelectedTag={setSelectedTag}
            tags={tags}
            idx={idx}
            display={display}
          />
        );
      })}
    </Container>
  );
};

const Container = styled.div`
  min-height: 4rem;
`;

export default Tagform;
