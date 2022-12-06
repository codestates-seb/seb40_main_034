import {
  Header,
  EditContainer,
  Photo,
  PhotoEditBtn,
  EditText,
  EditBtn,
  PhotoBox,
  QuitBtn,
  SubmitBtn,
  BtnContainer,
  NicknameWrap,
  DoubleCheck,
  ErrorNickname,
} from './style';
import { GreenBtn } from '../Common/Btn';
import { InputForm } from '../Common/InputForm';
import { useState, useEffect, useRef } from 'react';
import { editUserInfo, getFollowInfo } from '../../Api/MyinfoApi';

import { useSelector } from 'react-redux';
import customAlert from '../../Utils/customAlert';
import { validNickname } from '../../Api/Valid';
import axios from 'axios';
import styled from 'styled-components';

const EditDetail = () => {
  const photoInput = useRef();

  const [file, setFile] = useState('');
  const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  const state = useSelector((state) => state.user);
  const { refreshToken } = state;
  const [defaultImg, setDefaultImg] = useState(null);
  const initialInfo = {
    nickname: '',
    password: '',
    profileImg: '',
  };
  const [userInfo, setUserInfo] = useState(initialInfo);
  const [nickname, setNickname] = useState('');
  const [nicknameValid, setNicknameValid] = useState(true);
  const [nicknameDouble, setNicknameDouble] = useState(true);

  const handleInput = (e) => {
    const photoInput = useRef();
    const [file, setFile] = useState('');
    const [previewURL, setPreviewURL] = useState('');
    const [preview, setPreview] = useState(null);
    const [defaultImg, setDefaultImg] = useState(null);
    const initialInfo = {
      nickname: '',
      password: '',
      profileImg: '',
    };
    const [userInfo, setUserInfo] = useState(initialInfo);

    const handleInput = (e) => {
      //이미지파일 제외 회원정보
      const { name, value } = e.target;
      setUserInfo({ ...userInfo, [name]: value });
    };
    const handleFileOnChange = (event) => {
      //이미지파일 불러오기
      event.preventDefault();
      let file = event.target.files[0];
      let reader = new FileReader();

      reader.onload = () => {
        setFile(file);
        setPreviewURL(reader.result);
        setUserInfo({ ...userInfo, profileImg: file });
      };
      if (file) reader.readAsDataURL(file);
    };
    const handleSubmit = () => {
      var data = {
        nickname: userInfo.profileImg,
      };
      editUserInfo(data, refreshToken).then(() => {
        console.log(data);
        customAlert('변경이 완료되었습니다');
        setUserInfo(initialInfo);
      });
    };

    const handleEditBtn = (e) => {
      e.preventDefault();
      photoInput.current.click();
    };
    const nickNameDoublecheck = () => {
      if (!validNickname(userInfo.nickname)) {
        customAlert('닉네임은 소문자,숫자를 사용해 8~16자리로 만들어 주세요');
        setNickname('');
        return;
      }
      if (userInfo.nickname !== undefined && userInfo.nickname !== '') {
        axios
          .post('http://ec2-15-164-104-27.ap-northeast-2.compute.amazonaws.com:8080/member/nickname/check', {
            nickname: userInfo.nickname,
          })
          .then((res) => {
            if (res.data.existNickname === false) {
              console.log(res);
              customAlert('가능한 닉네임입니다');
              setNicknameDouble(false);
            } else {
              console.log(res);
              customAlert('사용중인 닉네임입니다');
              setNicknameDouble(true);
            }
          })
          .catch((error) => {
            console.log(error);
          });
      } else if (userInfo.nickname === '') {
        customAlert('닉네임을 입력해주세요');
      }
    };
    const onBlurNickname = () => {
      if (!validNickname(userInfo.nickname)) {
        console.log(validNickname);
        setNicknameValid(validNickname(userInfo.nickname));
      } else if (validNickname(userInfo.nickname)) {
        setNicknameValid(validNickname(userInfo.nickname));
      }
    };

    useEffect(() => {
      if (file !== '') setPreview(<img src={previewURL} alt="preview" />);
      return () => {
        getFollowInfo().then((res) => {
          if (res?.profileImg !== '') {
            setDefaultImg(<img src={res?.profileImg} alt="UserPic" />);
          }
          setDefaultImg(
            <img src="https://pcmap.place.naver.com/assets/shared/images/icondefaultprofile.png" alt="UserPic" />,
          );
        });
      };
    }, [previewURL]);

    //닉네임중복확인기능

    return (
      <div>
        <Header>Edit Profile</Header>
        <EditContainer>
          <form>
            <div>
              <EditText>Photo</EditText>
              <PhotoBox>
                <Photo>
                  {file !== '' ? preview : null}
                  {file === '' ? defaultImg : null}
                </Photo>
                <PhotoEditBtn>
                  <input
                    id="file"
                    type="file"
                    name="profileImg"
                    accept="image/*"
                    ref={photoInput}
                    hidden={true}
                    onChange={(e) => {
                      handleFileOnChange(e.target.files[0]);
                    }}
                  />
                  {GreenBtn({ callback: handleEditBtn, text: 'Edit' })}
                </PhotoEditBtn>
              </PhotoBox>
            </div>
            <div>
              <NicknameWrap>
                <EditText>Nickname</EditText>
                <input
                  type="text"
                  name="nickname"
                  value={userInfo.nickname}
                  onBlur={onBlurNickname}
                  onChange={handleInput}></input>
                <DoubleCheck onClick={nickNameDoublecheck}>Check</DoubleCheck>
                <div>
                  {!validNickname(userInfo.nickname) && userInfo.nickname.length > 0 && (
                    <ErrorNickname>닉네임은 소문자,숫자를 사용해 8~16자리로 만들어 주세요</ErrorNickname>
                  )}
                </div>
              </NicknameWrap>
            </div>
            <div>
              <EditText>Password</EditText>

              <input
                type="password"
                name="password"
                value={userInfo.password}
                onChange={handleInput}
                onBlur={onBlurNickname}></input>
            </div>
          </form>
          <BtnContainer>
            <QuitBtn>회원탈퇴</QuitBtn>
            {GreenBtn({ callback: handleSubmit, text: 'Submit', className: 'submitBtn' })}
          </BtnContainer>
        </EditContainer>
      </div>
    );
  };
};

export default EditDetail;
