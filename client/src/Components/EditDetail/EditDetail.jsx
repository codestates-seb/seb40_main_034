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
import customAlert from '../../Utils/customAlert';
import { editUserInfo, getFollowInfo } from '../../Api/MyinfoApi';
import DeleteModal from './DeleteModal/DeleteModal';
import { useSelector } from 'react-redux';

const EditDetail = () => {
  const photoInput = useRef();
  const [modalOpen, setModalOpen] = useState(false);
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
  const state = useSelector((state) => state.user);
  const { refreshToken } = state;

  const handleInput = (e) => {
    //이미지파일 제외 회원정보
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
      setPreviewURL(reader.result);
      setUserInfo({ ...userInfo, profileImg: file });
    };
    if (file) reader.readAsDataURL(file);
  };
  const handleSubmit = () => {
    var data = {
      nickname: file,
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
        if (res[0]?.profileImg !== null) {
          setDefaultImg(<img src={res[0]?.profileImg} alt="UserPic" />);
        }
        setDefaultImg(
          <img src="https://pcmap.place.naver.com/assets/shared/images/icon_default_profile.png" alt="defaultPic" />,
        );
      });
    };
  }, [previewURL]);

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
                  onChange={handleFileOnChange}
                />
                {GreenBtn({ callback: handleEditBtn, text: 'Edit' })}
              </PhotoEditBtn>
            </PhotoBox>
          </div>
          <div>
            <EditText>Nickname</EditText>

            <input type="text" name="nickname" value={userInfo.nickname} onChange={handleInput}></input>
          </div>
          <div>
            <EditText>Password</EditText>

            <input type="password" name="password" value={userInfo.password} onChange={handleInput}></input>
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

export default EditDetail;
