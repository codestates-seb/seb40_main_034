import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Openeye } from '../Assets/img/eye.svg';
import { ReactComponent as Closedeye } from '../Assets/img/eye2.svg';
import { GreenBtn } from '../Components/Common/Btn';
import { useDispatch } from 'react-redux';
import axios from 'axios';
import { validEmail, validNickname, validPw } from '../Api/Valid';
import { nicknameCheck } from '../Api/nicknameCheck';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nicknameValid, setNicknameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);

  const [showPassword, setShowPassword] = useState(false);
  const [nickNamedouble, setNicknamedouble] = useState(true);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleNickname = (e) => {
    setNickname(e.target.value);

    if (nickname.search(/\s/) != -1) {
      alert('닉네임은 빈 칸을 포함 할 수 없습니다.');
    }
  };
  const nickNameDoublecheck = () => {
    nicknameCheck(nickname);
  };
  const handleEmail = (e) => {
    setEmail(e.target.value);
  };
  const handlePw = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = (e) => {
    e.preventDefault();

    //nickname, email,password 유효성 검사 결과
    setNicknameValid(validNickname(nickname));
    setEmailValid(validEmail(email));
    setPwValid(validPw(password));
    //로그인 버튼을 눌렀을 때, nickname, email, pw의 입력이 없을때 alert창을 띄우는 기능
    if (!nickname) {
      return alert('Nickname을 입력하세요');
    } else if (!email) {
      return alert('Email을 입력하세요.');
    } else if (!password) {
      return alert('Password를 입력하세요.');
    }

    //모두 valid하다면 axios.post를 보낸다
    if (nicknameValid && emailValid && pwValid) {
      const registerBody = {
        email: email,
        password: password,
        nickname: nickname,
      };
      axios
        .post('http://ec2-13-125-134-99.ap-northeast-2.compute.amazonaws.com:8080/member/signup', registerBody)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            alert('회원가입에 성공했습니다. 로그인 해 주세요.');
            navigate('/login');
            console.log(res.data);
          }
        })
        .catch((Error) => {
          alert('회원가입에 실패했습니다.');
          console.log(Error);
        });
    }
  };
  //비밀번호안보이게하는toggle
  const togglePass = (e) => {
    e.preventDefault();
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <PageContainer>
        <form onSubmit={handleSignup}>
          <SignupContainer>
            <LogoDiv />
            <div>
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
              <div>
                {!nickNamedouble && nicknameValid && nickname.length > 0 && (
                  <ErrorNickname>닉네임 중복입니다</ErrorNickname>
                )}
              </div>
            </div>
            <SignupInput
              type="email"
              name="email"
              value={email}
              onChange={handleEmail}
              placeholder="Enter your email"></SignupInput>
            <div>{!emailValid && email.length > 0 && <ErrorEmail>올바른 이메일을 입력해주세요</ErrorEmail>}</div>
            <Pw>
              <SignupInput
                type={showPassword ? 'password' : 'text'}
                name="password"
                value={password}
                onChange={handlePw}
                placeholder="Enter your password"></SignupInput>
              {showPassword ? <PwShow onClick={togglePass}></PwShow> : <PwNoshow onClick={togglePass}></PwNoshow>}
            </Pw>
            <div>
              {!pwValid && password.length > 0 && (
                <ErrorPw>8~24자, 하나 이상의 문자, 숫자 및 특수 문자(!@#$%^&*)를 포함합니다</ErrorPw>
              )}
            </div>
            <SignupButton type="submit" text="Sign up" />
            <div>
              Already have an account? <Link to="/login">Login</Link>
            </div>
            <DoubleCheck type="submit" onClick={nickNameDoublecheck}>
              닉네임중복
            </DoubleCheck>
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

//styledComponent
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
  color: gray;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-right: 14rem;
`;
const ErrorPw = styled(ErrorEmail)`
  margin-right: -1rem;
`;
const ErrorNickname = styled(ErrorEmail)`
  margin-right: 5rem;
`;
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
`;
const PwNoshow = styled(Closedeye)`
  position: absolute;
  top: 2.3rem;
  left: 22.5rem;
  cursor: pointer;
  width: 2rem;
  height: 2rem;
`;
const DoubleCheck = styled.button`
  position: absolute;
  top: 30.5rem;
  left: 25rem;
  cursor: pointer;
  width: 3rem;
  height: 1rem;
`;
export default Signup;
