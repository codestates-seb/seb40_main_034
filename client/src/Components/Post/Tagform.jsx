import styled from 'styled-components';
import { useState } from 'react';
import Tag from '../Common/Tag';

const Tagform = ({ callback }) => {
  return (
    <div>
      <Tag tagName="관광명소" type="post" callback={callback} />
      <Tag tagName="문화시설" type="post" callback={callback} />
      <Tag tagName="음식점/주점" type="post" callback={callback} />
      <Tag tagName="카페" type="post" callback={callback} />
      <Tag tagName="공원" type="post" callback={callback} />
      <Tag tagName="쇼핑몰" type="post" callback={callback} />
      <Tag tagName="레저/스포츠" type="post" callback={callback} />
      <Tag tagName="캠핑장" type="post" callback={callback} />
    </div>
  );
};
export default Tagform;
