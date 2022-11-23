import {
  GridContainer,
  Modal,
  ToggleBtn,
  Follow,
  FollowContainer,
  TogglebtnContainer,
  Container,
  FollowBtn,
} from './style';

import { useState, useEffect } from 'react';
const MapSide = () => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <Modal>
      <GridContainer>
        <section className="item">
          <header>헤더</header>
          <main>
            <Container>
              <div>사진</div>
              <div>글</div>
            </Container>
          </main>
          <footer></footer>
        </section>
      </GridContainer>
    </Modal>
  );
};

export default MapSide;
