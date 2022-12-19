import React from 'react';
import styled from 'styled-components';
import { ISlideConfig, PageSlides, SlideParallaxType } from '@re_point/re-react-page-slides';
import { GreenBtn } from '../Components/Common/Btn';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const toHome = () => {
    return navigate('/');
  };
  const slides = [
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://user-images.githubusercontent.com/99412221/208310599-5e31f16a-aaf8-47ab-a717-1dc42fe64f70.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://user-images.githubusercontent.com/99412221/208310671-d751a469-504b-4378-abfc-6448f7e366b3.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://user-images.githubusercontent.com/99412221/208310947-082012ad-3696-4702-8492-1bdb7b253124.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://user-images.githubusercontent.com/99412221/208310792-3c117838-af46-4384-9af8-cc55db51c746.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://user-images.githubusercontent.com/99412221/208310776-5fa2808d-4a35-4cf2-aa44-3f8d292a6eb4.png")',
      },
    },
    {
      content: <div className="image"></div>,
      style: {
        backgroundImage:
          'url("https://user-images.githubusercontent.com/99412221/208305365-d8d6feec-d9fb-4f6a-90a1-93af30afa544.png")',
      },
    },
  ];

  return (
    <PageContainer>
      <PageSlides
        enableAutoScroll={true}
        transitionSpeed={1200}
        slides={slides}
        parallax={{
          offset: 0.6,
          type: SlideParallaxType.reveal,
        }}
      />
      <HomeButton text="Start Now" callback={toHome}></HomeButton>
    </PageContainer>
  );
};
export default LandingPage;
const PageContainer = styled.div`
  width: 100%;
  height: 53rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  .rps-slide-background {
    background-size: 100% !important;
    background-repeat: no-repeat;
    background-position: center center;
  }
  .image {
    width: 100vw;
  }
`;

const HomeButton = styled(GreenBtn)`
  margin: 2rem;
  font-size: 1.2rem;
  position: absolute;
  top: 47rem;
  right: 3rem;
`;
