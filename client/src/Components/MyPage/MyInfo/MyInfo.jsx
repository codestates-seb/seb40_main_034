import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  MyContainer,
  ProfileContainer,
  ProfilePic,
  FollowContainer,
  InfoContainer,
  ShareBtn,
  EditBtn,
  FollowingBtn,
  FollowerBtn,
} from './style';
import FollowModal from '../FollowModal/FollowModal';
import ShareModal from '../ShareModal/ShareModal';
import { getFollowing } from '../../../Api/MyinfoApi';
import { useSelector } from 'react-redux';

const MyInfo = () => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [select, setSelect] = useState('');
  const [userName, setUserName] = useState('');
  const [userProfile, setUserProfile] = useState('');
  const url = window.location.href;
  const state = useSelector((state) => state.user);
  const { memberId } = state;

  // follow 모달
  const openModalFollowing = () => {
    setModalOpen(true);
    setSelect('following');
  };
  const openModalFollower = () => {
    setModalOpen(true);
    setSelect('follower');
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const copyUrl = () => {
    navigator.clipboard.writeText(url).then(() => {
      setShareModal(true);
    });
  };

  const closeShareModal = () => {
    setShareModal(false);
  };

  const navigateEdit = () => {
    // edit 화면 이동
    navigate(`/profile/${memberId}/edit`);
  };

  useEffect(() => {
    getFollowing().then((res) => {
      console.log(res);
      setUserName(res[0].nickname);
      setUserProfile(res[0].profileImg);
    });
  }, []);

  return (
    <MyContainer>
      <ProfileContainer>
        <ProfilePic>
          {userProfile ? (
            <img src={userProfile} alt="UserPic" />
          ) : (
            <img src="https://pcmap.place.naver.com/assets/shared/images/icondefaultprofile.png" alt="UserPic" />
          )}
        </ProfilePic>
        <div className="nickname-text">{userName}</div>
      </ProfileContainer>
      <FollowContainer>
        <FollowingBtn onClick={openModalFollowing}>
          <span className="ingSpan">0</span>
          <span>following</span>
        </FollowingBtn>
        <FollowerBtn onClick={openModalFollower}>
          <span className="erSpan">0</span>
          <span>follower</span>
        </FollowerBtn>

        {modalOpen && <FollowModal open={modalOpen} close={closeModal} header="" select={select}></FollowModal>}
      </FollowContainer>
      <InfoContainer>
        <ShareBtn onClick={copyUrl}>Share</ShareBtn>
        {shareModal && <ShareModal open={shareModal} close={closeShareModal} header=""></ShareModal>}
        <EditBtn onClick={navigateEdit}>Edit</EditBtn>
      </InfoContainer>
    </MyContainer>
  );
};

export default MyInfo;
