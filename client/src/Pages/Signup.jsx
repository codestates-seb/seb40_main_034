import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Openeye } from '../Assets/img/eye.svg';
import { ReactComponent as Closedeye } from '../Assets/img/eye2.svg';
import { GreenBtn } from '../Components/Common/Btn';
import { setRefreshToken } from '../storage/Cookie';

import { useDispatch } from 'react-redux';
import axios from 'axios';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [nicknameValid, setNicknameValid] = useState(false);
  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNickname = (e) => {
    let regex = /^[a-z0-9]{7,15}$/g;
    setNickname(e.target.value);

    if (nickname.search(/\s/) != -1) {
      alert('닉네임은 빈 칸을 포함 할 수 없습니다.');
    }
    if (regex.test(nickname)) {
      setNicknameValid(true);
    } else {
      setNicknameValid(false);
    }
  };

  // email 유효성 검사 결과
  const handleEmail = (e) => {
    let regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    setEmail(e.target.value);
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // password 유효성 검사 결과
  const handlePw = (e) => {
    let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,24}$/;
    setPw(e.target.value);
    if (regex.test(pw)) {
      setPwValid(true);
    } else {
      setPwValid(false);
    }
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log(nicknameValid);
    //로그인 버튼을 눌렀을 때, nickname, email, pw의 입력이 없을때 alert창을 띄우는 기능
    if (!nickname) {
      return alert('Nickname을 입력하세요');
    } else if (!email) {
      return alert('Email을 입력하세요.');
    } else if (!pw) {
      return alert('Password를 입력하세요.');
    }

    //모두 valid하다면 axios.post를 보낸다
    if (nicknameValid && emailValid && pwValid) {
      const registerBody = {
        email,
        pw,
        nickname,
      };
      console.log(registerBody);
      axios
        .post('http://ec2-13-125-134-99.ap-northeast-2.compute.amazonaws.com:8080/member/signup', registerBody)
        .then((res) => {
          alert('회원가입에 성공했습니다.');
          navigate('/login');
        })
        .catch((Error) => {
          alert('작성하신 아이디, 비밀번호, 이메일, 닉네임을 하단 설명에 맞추어 작성해 주시기 바랍니다.');
        });
      console.log(Error);
    }
  };

  return (
    <div>
      <PageContainer>
        <form onSubmit={handleSignup}>
          <SignupContainer>
            <LogoDiv />
            <SignupInput
              type="text"
              name="nickname"
              value={nickname}
              onChange={handleNickname}
              placeholder="Enter your Nickname"></SignupInput>
            <div>
              {!nicknameValid && nickname.length > 0 && (
                <ErrorNickname>닉네임은 소문자,숫자를 사용해 8~16자리로 만들어 주세요</ErrorNickname>
              )}
            </div>
            <SignupInput
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Enter your email"></SignupInput>
            <div>{!emailValid && email.length > 0 && <ErrorEmail>올바른 이메일을 입력해주세요</ErrorEmail>}</div>
            <SignupInput
              type="password"
              name="password"
              value={pw}
              onChange={handlePw}
              placeholder="Enter your password"></SignupInput>
            <div>
              {!pwValid && pw.length > 0 && <ErrorPw>8~24자, 하나 이상의 문자, 숫자 및 특수 문자를 포함합니다</ErrorPw>}
            </div>
            <SignupButton type="submit" text="Sign up" />
            <div>
              Already have an account? <Link to="/login">Login</Link>
            </div>
          </SignupContainer>
        </form>
        <Wrap>
          <WelcomeImg></WelcomeImg>
          <WelcomeStr>Hello, we are PostON!</WelcomeStr>
        </Wrap>
      </PageContainer>
    </div>
  );
};
const PageContainer = styled.div`
  width: 100%;
  height: 54rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const SignupContainer = styled.div`
  width: 35rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #dddddd;
  border-radius: 1rem 0 0 1rem;
  align-items: center;
  justify-content: center;
`;

const SignupInput = styled.input`
  width: 25rem;
  height: 2.5rem;
  margin-top: 2rem;
  border-radius: 0.5rem;
  text-indent: 10px;
  outline: solid 0.125rem #dddddd;
  &:focus {
    outline: solid 0.2rem #91f841;
  }
`;

const SignupButton = styled(GreenBtn)`
  margin: 1rem;
`;

const LogoDiv = styled.img.attrs({
  src: 'https://user-images.githubusercontent.com/99412221/202052092-56e52c9b-0654-45e0-9591-3cf9ac047a2a.png',
})`
  width: 15 rem;
  height: 15rem;
`;

const Wrap = styled.div`
  width: 35rem;
  position: relative;
`;

const WelcomeImg = styled.img.attrs({
  src: 'https://picsum.photos/600/800',
})`
  width: 35rem;
  height: 50rem;
  border-radius: 0 1rem 1rem 0;
  display: flex;
  vertical-align: middle;
`;
//오른쪽 이미지 위에 문자열
const WelcomeStr = styled.div`
  position: absolute;
  top: 40%;
  width: 35rem;
  color: white;
  font-size: 3.22rem;
  text-align: center;
  font-weight: 700;
`;
const ErrorEmail = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-right: 14rem;
`;
const ErrorPw = styled(ErrorEmail)`
  margin-right: 4rem;
`;
const ErrorNickname = styled(ErrorEmail)`
  margin-right: 5rem;
`;

export default Signup;
