import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GreenBtn } from '../Components/Common/Btn';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { validEmail, validPw } from '../Api/Valid';
import { ReactComponent as Openeye } from '../Assets/img/eye.svg';
import { ReactComponent as Closedeye } from '../Assets/img/eye2.svg';
import { setLoginUserInfo } from '../Store/Auth';
import { setCookieToken } from '../storage/Cookie';

import customAlert from '../Utils/customAlert';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [emailValid, setEmailValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);
  const [showPassword, setShowPassword] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //로그인상태일때 로그인페이지 접근시 메인화면으로 보내기
  const Selector = useSelector((state) => state.user.authenticated);
  useEffect(() => {
    if (Selector === true) {
      return navigate('/');
    }
  }, []);

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePw = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    //email,password 유효성 검사 결과
    setEmailValid(validEmail(email));
    setPwValid(validPw(password));
    //로그인 버튼을 눌렀을 때, email, pw의 입력이 없을때 alert창을 띄우는 기능
    if (!email) {
      return customAlert('email을 입력하세요.');
    } else if (!password) {
      return customAlert('Password를 입력하세요.');
    }
    //로그인 버튼을 눌렀을 때, 제대로 입력이 됐다면 axios를 보내는 기능
    if (emailValid && pwValid) {
      axios
        .post('http://ec2-15-164-104-27.ap-northeast-2.compute.amazonaws.com:8080/member/login', {
          email: email,
          password: password,
        })
        .then((res) => {
          if (res.status === 200) {
            const accessToken = res.data.accessToken;
            setCookieToken(accessToken);

            dispatch(setLoginUserInfo(res.data));
            navigate('/');
          }
        })
        .catch((error) => {
          if (error.response.status === 401) {
            return customAlert('이메일 혹은 비밀번호를 확인해주세요.');
          }
        });
    }
  };
  //비밀번호안보이게하는toggle
  const togglePass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };
  const onBlurEmail = () => {
    if (!validEmail(email)) {
      setEmailValid(validEmail(email));
    } else if (validEmail(email)) {
      setEmailValid(validEmail(email));
    }
  };

  const onBlurPassword = () => {
    if (!validPw(password)) {
      setPwValid(validPw(password));
    } else if (validPw(password)) {
      setPwValid(validPw(password));
    }
  };

  return (
    <div>
      <PageContainer>
        <form onSubmit={handleSubmit}>
          <LoginContainer>
            <LogoDiv />
            <LoginInput
              type="email"
              name="loginEmail"
              value={email}
              onChange={handleEmail}
              placeholder="Enter your email"
              onBlur={onBlurEmail}></LoginInput>
            <div>{!emailValid && email.length > 0 && <ErrorEmail>올바른 이메일을 입력해주세요</ErrorEmail>}</div>
            <Pw>
              <LoginInput
                type={showPassword ? 'password' : 'text'}
                name="loginPassword"
                value={password}
                onChange={handlePw}
                placeholder="Enter your password"
                onBlur={onBlurPassword}></LoginInput>
              {showPassword ? <PwNoshow onClick={togglePass}></PwNoshow> : <PwShow onClick={togglePass}></PwShow>}
            </Pw>
            <div>
              {!pwValid && password.length > 0 && (
                <ErrorPw>8~24자, 하나 이상의 문자, 숫자 및 특수 문자(!@#$%^&*)를 포함합니다</ErrorPw>
              )}
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

const PageContainer = styled.div`
  width: 100%;
  height: 53rem;
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
  border-radius: 1rem;
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
  src: 'https://user-images.githubusercontent.com/99412221/204719891-04be8c01-2c4e-421e-8bc6-d851318ca28d.png',
})`
  width: 20 rem;
  height: 20rem;
  margin-bottom: 2rem;
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
  color: gray;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-right: 15rem;
`;
const ErrorPw = styled(ErrorEmail)`
  margin-right: 0.5rem;
`;
//비밀번호안보이게하는버튼
const Pw = styled.div`
  position: relative;
`;
const PwShow = styled(Openeye)`
  position: absolute;
  top: 2.3rem;
  left: 22.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  fill: #868686;
`;
const PwNoshow = styled(Closedeye)`
  position: absolute;
  top: 2.3rem;
  left: 22.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
  fill: #868686;
`;
export default Login;
