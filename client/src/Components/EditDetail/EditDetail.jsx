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
