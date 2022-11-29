import React from 'react';
import styled from 'styled-components';

export const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <div>© Copyright ⓒ 2022 PostOn 프론트:김다혜 유승윤 임성욱 정하늘 / 백엔드: 김재훈 이동규 조유종 </div>
        <p>
          <a target="_blank" href="https://github.com/codestates-seb/seb40_main_034" rel="noreferrer">
            깃헙 바로가기
          </a>
        </p>
      </FooterInner>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  background-color: #cccccc;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 10px;
  width: 100%;
  height: 5rem;
`;
const FooterInner = styled.div`
  color: white;
  margin-top: 10px;
  & p {
    width: 107px;
    margin-top: 10px;
    color: white;
  }
`;
