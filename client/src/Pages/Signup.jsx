import styled from 'styled-components';
import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ReactComponent as Openeye } from '../Assets/img/eye.svg';
import { ReactComponent as Closedeye } from '../Assets/img/eye2.svg';
import { GreenBtn } from '../Components/Common/Btn';
import axios from 'axios';
import { validEmail, validNickname, validPw } from '../Api/Valid';
import Swal from 'sweetalert2';

const Signup = () => {
  const [nickname, setNickname] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [nicknameValid, setNicknameValid] = useState(true);
  const [emailValid, setEmailValid] = useState(true);
  const [pwValid, setPwValid] = useState(true);

  const [showPassword, setShowPassword] = useState(true);
  const [nicknameDouble, setNicknameDouble] = useState(true);

  const navigate = useNavigate();

  const handleNickname = (e) => {
    setNickname(e.target.value);

    if (nickname.search(/\s/) != -1) {
      Swal.fire({ icon: 'warning', text: '닉네임은 빈 칸을 포함 할 수 없습니다.' });
      setNickname('');
    }
  };
  //닉네임중복확인기능
  const nickNameDoublecheck = () => {
    if (!validNickname(nickname)) {
      Swal.fire({ icon: 'info', text: '닉네임은 소문자,숫자를 사용해 8~16자리로 만들어 주세요' });
      setNickname('');
      return;
    }
    if (nickname !== undefined && nickname !== '') {
      axios
        .post('http://ec2-3-34-198-63.ap-northeast-2.compute.amazonaws.com:8080/member/nickname/check', {
          nickname: nickname,
        })
        .then((res) => {
          if (res.data.existNickname === false) {
            console.log(res);
            Swal.fire({
              icon: 'success',
              text: '가능한 닉네임입니다',
              confirmButtonColor: '#91f841',
              border: 0,
              outline: 0,
            });
            setNicknameDouble(false);
          } else {
            console.log(res);
            Swal.fire({ icon: 'warning', text: '사용중인 닉네임입니다' });

            setNickname('');
          }
        })
        .catch((error) => {
          console.log(error);
        });
    } else if (nickname === '') {
      Swal.fire({ icon: 'warning', text: '닉네임을 입력해주세요' });
    }
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
      return Swal.fire({ icon: 'warning', text: 'Nickname을 입력하세요' });
    } else if (!email) {
      return Swal.fire({ icon: 'warning', text: 'Email을 입력하세요.' });
    } else if (!password) {
      return Swal.fire({ icon: 'warning', text: 'Password를 입력하세요.' });
    } else if (nicknameDouble) {
      return Swal.fire({ icon: 'question', text: '닉네임 중복을 확인해주세요' });
    }

    //모두 valid하다면 axios.post를 보낸다
    if (!nicknameDouble && nicknameValid && emailValid && pwValid) {
      const registerBody = {
        email: email,
        password: password,
        nickname: nickname,
      };
      axios
        .post('http://ec2-3-34-198-63.ap-northeast-2.compute.amazonaws.com:8080/member/signup', registerBody)
        .then((res) => {
          if (res.status === 200 || res.status === 201) {
            Swal.fire({ icon: 'success', text: '회원가입에 성공했습니다. 로그인 해 주세요.' });
            navigate('/login');
            console.log(res.data);
          }
        })
        .catch((Error) => {
          if (Error.response.status === 500) {
            Swal.fire({ icon: 'warning', text: '이미 가입된 이메일입니다. 로그인 해 주세요.' });
            navigate('/login');
          } else {
            Swal.fire({ icon: 'error', text: '회원가입에 실패했습니다.' });
            console.log(Error);
          }
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
            <NicknameWrap>
              <SignupInput
                type="text"
                name="nickname"
                value={nickname}
                onChange={handleNickname}
                placeholder="Enter your Nickname"></SignupInput>
              <DoubleCheck onClick={nickNameDoublecheck}>Check</DoubleCheck>
              <div>
                {!nicknameValid && nickname.length > 0 && (
                  <ErrorNickname>닉네임은 소문자,숫자를 사용해 8~16자리로 만들어 주세요</ErrorNickname>
                )}
              </div>
            </NicknameWrap>
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
              {showPassword ? <PwNoshow onClick={togglePass}></PwNoshow> : <PwShow onClick={togglePass}></PwShow>}
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
  height: 53rem;
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
  border-radius: 1rem;
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
  src: 'https://user-images.githubusercontent.com/99412221/204719891-04be8c01-2c4e-421e-8bc6-d851318ca28d.png',
})`
  width: 20 rem;
  height: 20rem;
  margin-bottom: 1rem;
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
  margin-right: 15rem;
`;
const ErrorPw = styled(ErrorEmail)`
  margin-right: 0.5rem;
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
const NicknameWrap = styled.div`
  position: relative;
`;
const DoubleCheck = styled.div`
  position: absolute;
  top: 1.88rem;
  left: 20.625rem;
  border-radius: 0 1rem 1rem 0;
  cursor: pointer;
  height: 2.73rem;
  width: 4.5rem;

  line-height: 2.55rem;
  text-align: center;

  font-weight: 500;
  font-size: 0.85rem;
  background-color: #91f841;
  color: #333333;

  &:hover {
    filter: brightness(90%);
  }
  &:active {
    filter: brightness(80%);
  }
`;

export default Signup;
