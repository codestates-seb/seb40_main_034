import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GreenBtn } from '../Components/Common/Btn';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { InputForm } from '../Components/Common/InputForm';

import { loginUser } from '../Api/LoginApi';
import { setRefreshToken } from '../storage/Cookie';
import { SET_TOKEN } from '../Store/Auth';

const Login = () => {
  const [email, setEmail] = useState('');
  const [pw, setPw] = useState('');

  const [emailValid, setEmailValid] = useState(false);
  const [pwValid, setPwValid] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // email 유효성 검사 결과
  const handleEmail = (e) => {
    setEmail(e.target.value);
    const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
    if (regex.test(email)) {
      setEmailValid(true);
    } else {
      setEmailValid(false);
    }
  };
  // password 유효성 검사 결과
  const handlePw = (e) => {
    setPw(e.target.value);
    const regex = /^[a-zA-Z\\d`~!@#$%^&*()-_=+]{8,24}$/;
    if (regex.test(pw)) {
      return setPwValid(true);
    } else {
      return setPwValid(false);
    }
  };

  const handleSubmit = () => {
    console.log(localStorage.length);

    //로그인 버튼을 눌렀을 때, email, pw의 입력이 없을때 alert창을 띄우는 기능
    if (!email) {
      return alert('email을 입력하세요.');
    } else if (!pw) {
      return alert('Password를 입력하세요.');
    }
    //로그인 버튼을 눌렀을 때, 제대로 입력이 됐다면 axios를 보내는 기능
    if (emailValid && pwValid) {
      axios.post('http://localhost:8080/login', { email, pw }).then((res) => {
        if (res.status === 201) {
          navigate('/');
          console.log(res.data);
        }
      });
    }
  };
  return (
    <div>
      <PageContainer>
        <form action="login_process" method="post" onSubmit={handleSubmit}>
          <LoginContainer>
            <LogoDiv />
            <LoginInput
              type="email"
              name="loginEmail"
              value={email}
              onChange={handleEmail}
              placeholder="Enter your email"></LoginInput>
            <div>{!emailValid && email.length > 0 && <ErrorEmail>올바른 이메일을 입력해주세요</ErrorEmail>}</div>
            <LoginInput
              type="password"
              name="loginPassword"
              value={pw}
              onChange={handlePw}
              placeholder="Enter your password"></LoginInput>
            <div>
              {!pwValid && pw.length > 0 && <ErrorPw>8~24자, 하나 이상의 문자, 숫자 및 특수 문자를 포함합니다</ErrorPw>}
            </div>
            <LoginButton text="Log in" type="submit" />
            <div>
              Don’t have an account? <Link to="/signup">Sign up</Link>
            </div>
          </LoginContainer>
        </form>
        <Wrap>
          <WelcomeImg></WelcomeImg>
          <WelcomeStr>Hello, we are PostON!</WelcomeStr>
        </Wrap>
      </PageContainer>
    </div>
  );
};
const Newinput = styled(InputForm)`
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

const PageContainer = styled.div`
  width: 100%;
  height: 54rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;
const LoginContainer = styled.div`
  width: 35rem;
  height: 50rem;
  display: flex;
  flex-direction: column;
  border: 0.1rem solid #dddddd;
  border-radius: 1rem 0 0 1rem;
  align-items: center;
  justify-content: center;
`;

const LoginInput = styled.input`
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
const LoginButton = styled(GreenBtn)`
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
const ErrorPw = styled.div`
  color: red;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-right: 4rem;
`;

export default Login;
