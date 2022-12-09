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
import { persistor } from '../../Routes/AppRouter';
import { removeCookieToken } from '../../storage/Cookie';
import customAlert from '../../Utils/customAlert';
import { editUserInfo, getUserInfo, deleteUser } from '../../Api/MyinfoApi';
import DeleteModal from './DeleteModal/DeleteModal';
import { validNickname } from '../../Api/Valid';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

const EditDetail = (state) => {
  const location = useLocation();
  const navigate = useNavigate();
  const defaultImg = location.state.userProfile;
  const defaultName = location.state.userName;
  const accessToken = location.state.accessToken;
  const clientId = process.env.REACT_APP_IMGUR_ID;
  const [nicknameValid, setNicknameValid] = useState(true);
  const [nicknameDouble, setNicknameDouble] = useState(true);
  const photoInput = useRef();
  const [modalOpen, setModalOpen] = useState(false);
  const [file, setFile] = useState('');
  // const [previewURL, setPreviewURL] = useState('');
  const [preview, setPreview] = useState(null);
  // const [defaultImg, setDefaultImg] = useState(null);
  const fileInput = document.getElementById('upload');
  const initialInfo = {
    nickname: defaultName,
    password: '',
    profileImg: defaultImg,
    previewURL: '',
    incodefile: null,
  };
  const [userInfo, setUserInfo] = useState(initialInfo);

  const handleInput = (e) => {
    //이미지파일 제외 회원정보
    if (e.target.value === '') {
      return;
    }
    const { name, value } = e.target;
    setUserInfo({ ...userInfo, [name]: value });
  };
  const handleFileOnChange = (event) => {
    //이미지 URL 삭제
    event.preventDefault();
    let file = event.target.files[0];
    let reader = new FileReader();

    reader.onload = () => {
      setFile(reader.result);
      setUserInfo({ ...userInfo, profileImg: reader.result, previewURL: reader.result, incodefile: reader.result });
    };
    if (file) reader.readAsDataURL(file);
  };

  const handleSubmit = () => {
    let data = {
      profileImg: userInfo.profileImg,
      nickname: userInfo.nickname,
    };
    if (userInfo.nickname === '') {
      data.nickname = defaultName;
    }
    uploadFile();
    // editUserInfo(data, refreshToken).then(() => {
    //   customAlert('변경이 완료되었습니다');
    //   window.location.reload();
    // });
  };
  const handleEditBtn = (e) => {
    e.preventDefault();
    photoInput.current.click();
  };
  const nickNameDoublecheck = () => {
    if (!validNickname(userInfo.nickname)) {
      customAlert('닉네임은 소문자,숫자를 사용해 8~16자리로 만들어 주세요');

      return;
    }
    if (userInfo.nickname !== undefined && userInfo.nickname !== '') {
      axios
        .post('http://ec2-15-164-104-27.ap-northeast-2.compute.amazonaws.com:8080/member/nickname/check', {
          nickname: userInfo.nickname,
        })
        .then((res) => {
          if (res.data.existNickname === false) {
            customAlert('가능한 닉네임입니다');
            setNicknameDouble(false);
          } else {
            customAlert('사용중인 닉네임입니다');
            setNicknameDouble(true);
          }
        })
        .catch((error) => {});
    } else if (userInfo.nickname === '') {
      customAlert('닉네임을 입력해주세요');
    }
  };
  const onBlurNickname = () => {
    if (!validNickname(userInfo.nickname)) {
      setNicknameValid(validNickname(userInfo.nickname));
    } else if (validNickname(userInfo.nickname)) {
      setNicknameValid(validNickname(userInfo.nickname));
    }
  };
  const handleDelete = () => {
    deleteUser(accessToken).then(() => {
      const purge = async () => {
        removeCookieToken();
        await persistor.purge().then(customAlert('탈퇴가 완료되었습니다')); // persistStore의 데이터 전부 날림
        // cookie초기화
      };
    });
  };
  //회원탈퇴 모달
  const openDeleteModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };
  const uploadFile = () => {
    const fileInput = document.getElementById('upload');
    const upload = (file) => {
      if (file && file.size < 5000000) {
        const formData = new FormData();

        formData.append('image', file);
        fetch('https://api.imgur.com/3/image', {
          method: 'POST',
          headers: {
            Authorization: 'Client-ID clientId',
            Accept: 'application/json',
          },
          body: formData,
        })
          .then((response) => response.json())
          .then((response) => {
            console.log(response);
            // do Something
          });
      } else {
        console.error('파일 용량 초과');
      }
    };

    fileInput &&
      fileInput.addEventListener('change', () => {
        upload(fileInput.files[0]);
      });
  };

  useEffect(() => {
    if (userInfo.incodefile !== null) setPreview(<img src={userInfo.previewURL} alt="preview" />);
    return () => {};
  }, [userInfo.previewURL]);

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
                {file === '' ? <img src={userInfo.profileImg} alt="UserPic" /> : null}
              </Photo>
              <PhotoEditBtn>
                <input
                  id="upload"
                  type="file"
                  name="image"
                  accept="image/*"
                  ref={photoInput}
                  hidden={true}
                  onChange={handleFileOnChange}
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

            <input type="password" name="password" value={userInfo.password} onChange={handleInput}></input>
          </div>
        </form>
        <BtnContainer>
          <QuitBtn onClick={handleDelete}>회원탈퇴</QuitBtn>
          {modalOpen && <DeleteModal open={modalOpen} close={closeModal} header=""></DeleteModal>}
          {GreenBtn({ callback: handleSubmit, text: 'Submit', className: 'submitBtn' })}
        </BtnContainer>
      </EditContainer>
    </div>
  );
};

export default EditDetail;
