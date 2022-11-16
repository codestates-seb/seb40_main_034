import React from 'react';
import { ProfileContainer, ProfilePic, FollowContainer, FollowerList, FollowingList, InfoContainer, ShareButton, EditButton} from './style'


const MyInfo = () => {
  return (
    <div>
      <div>
      <ProfileContainer>
        <ProfilePic />
        <div className='nickname-text'>임시닉네임</div>
      </ProfileContainer>
      <FollowContainer>
        <FollowingList className='follow-text'>0 following
        </FollowingList>
        <FollowerList className='follow-text'>0 follower
        </FollowerList>
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
  )
}

export default MyInfo;