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
} from './style';
import { GreenBtn } from '../Common/Btn';
import { InputForm } from '../Common/InputForm';
import { useState, useEffect, useRef } from 'react';
import { editUserInfo, getFollowInfo } from '../../Api/MyinfoApi';
import DeleteModal from './DeleteModal/DeleteModal';
import { useSelector } from 'react-redux';
import customAlert from '../../Utils/customAlert';
import { validNickname } from '../../Api/Valid';
import axios from 'axios';
import styled from 'styled-components';

const EditDetail = () => {
  const photoInput = useRef();
  const [modalOpen, setModalOpen] = useState(false);
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
    //이미지파일 제외 회원정보
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleFileOnChange = (fileBlob) => {
    //이미지 URL 삭제
    if (previewURL) URL.revokeObjectURL(previewURL);
    //이미지파일 불러오기
    setFile(fileBlob);
    const fileUrl = URL.createObjectURL(fileBlob);
    setPreviewURL(fileUrl);
  };
  const handleSubmit = () => {
    var data = {
      nickname: userInfo.nickname,
      password: userInfo.password,
      profileImg: previewURL,
    };
    editUserInfo(data, refreshToken).then(() => {
      console.log(data);
      alert('Save Succeess');
      setUserInfo(initialInfo);
    });
  };
  const handleEditBtn = (e) => {
    e.preventDefault();
    photoInput.current.click();
  };
  //회원탈퇴 모달
  const openDeleteModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  useEffect(() => {
    if (file !== '') setPreview(<img src={previewURL} alt="preview" />);
    return () => {
      getFollowInfo().then((res) => {
        if (res.profileImg) {
          setDefaultImg(<img src={res.profileImg} alt="UserPic" />);
        }
        setDefaultImg(
          <img src="https://pcmap.place.naver.com/assets/shared/images/icondefaultprofile.png" alt="UserPic" />,
        );
      });
    };
  }, [previewURL]);

  //닉네임중복확인기능
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

            setUserInfo.nickname('');
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
          <QuitBtn onClick={openDeleteModal}>회원탈퇴</QuitBtn>
          {modalOpen && <DeleteModal open={modalOpen} close={closeModal} header=""></DeleteModal>}
          {GreenBtn({ callback: handleSubmit, text: 'Submit', className: 'submitBtn' })}
        </BtnContainer>
      </EditContainer>
    </div>
  );
};

const NicknameWrap = styled.div`
  position: relative;
`;
const DoubleCheck = styled.div`
  position: absolute;
  top: 2.35rem;
  left: 15.5rem;
  border-radius: 0 2rem 2rem 0;
  cursor: pointer;
  height: 2.5rem;
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
const ErrorNickname = styled.div`
  color: gray;
  width: 20rem;
  font-size: 0.8rem;
  margin-top: 0.5rem;
  margin-left: 1rem;
`;

export default EditDetail;
