import styled from 'styled-components';

const Footer = () => {
  return (
    <FooterContainer>
      <FooterInner>
        <p>
          <a target="_blank" href="https://github.com/codestates-seb/seb40_main_034" rel="noreferrer">
            Project Github
          </a>
        </p>
        <p>Copyright 2022. PostOn All Rights Reserved.</p>
      </FooterInner>
    </FooterContainer>
  );
};

const FooterContainer = styled.div`
  margin-top: 10px;
  width: 100%;
  height: auto;
`;
const FooterInner = styled.div`
  color: black;
  margin-top: 10px;
  p {
    font-size: 0.8rem;
    margin-top: 1rem;
    margin-right: 2rem;
    display: inline;
  }
  a {
    font-size: 0.8rem;
    border: 1px solid #91f841;
    padding: 0.25rem 0.75rem 0.25rem 0.75rem;
    border-radius: 1rem;
  }
  a:hover {
    background-color: #91f841;
  }
`;

export default Footer;
