import { useState } from "react";
import {
  ProfileContainer,
  ProfilePic,
  FollowContainer,
  FollowerList,
  FollowingList,
  InfoContainer,
  ShareButton,
  EditButton,
  FollowButton,
} from "./style";
import FollowModal from "../FollowModal/FollowModal";

const MyInfo = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const openModal = () => {
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  return (
    <div>
      <div>
        <ProfileContainer>
          <ProfilePic />
          <div className="nickname-text">임시닉네임</div>
        </ProfileContainer>
        <FollowContainer>
          <FollowingList className="follow-text">
            <FollowButton onClick={openModal}>0</FollowButton> following
          </FollowingList>
          <FollowerList className="follow-text">
            <FollowButton onClick={openModal}>0</FollowButton> follower
          </FollowerList>
          {modalOpen && (
            <FollowModal
              open={modalOpen}
              close={closeModal}
              header=""
            ></FollowModal>
          )}
        </FollowContainer>
        <InfoContainer>
          <ShareButton>
            <span>Share</span>
          </ShareButton>
          <EditButton>
            <span>Edit</span>
          </EditButton>
        </InfoContainer>
      </div>
    </div>
  );
};

export default MyInfo;
