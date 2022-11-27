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

const MyInfo = ({ setUserProfile, userProfile, memberId, authenticated, nickname, id }) => {
  const navigate = useNavigate();
  const [modalOpen, setModalOpen] = useState(false);
  const [shareModal, setShareModal] = useState(false);
  const [select, setSelect] = useState('');
  const [isMyPage, setIsMyPage] = useState(false);
  const url = window.location.href;

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
    navigate('/edit');
  };
  if (memberId === id) {
    setIsMyPage(true);
  }
  return (
    <MyContainer>
      <ProfileContainer>
        <ProfilePic>
          <img src={userProfile} alt="UserPic" />
        </ProfilePic>
        <div className="nickname-text">{nickname}</div>
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
      {isMyPage ? (
        <InfoContainer>
          <ShareBtn onClick={copyUrl}>Share</ShareBtn>
          {shareModal && <ShareModal open={shareModal} close={closeShareModal} header=""></ShareModal>}
          <EditBtn onClick={navigateEdit}>Edit</EditBtn>
        </InfoContainer>
      ) : null}
    </MyContainer>
  );
};

export default MyInfo;
