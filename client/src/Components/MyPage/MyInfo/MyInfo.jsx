import React from 'react';
import {Container, ProfileContainer, ProfilePic, FollowContainer, FollowerList, FollowingList, InfoContainer, ShareButton, EditButton} from './style'


const MyInfo = () => {
  return (
    <Container>
      <ProfileContainer>
        <ProfilePic />
        <div className='nickname-text'>임시닉네임</div>
      </ProfileContainer>
      <FollowContainer>
        <FollowingList>
          <div className='follow-text'>0 following</div>
        </FollowingList>
        <FollowerList>
          <div className='follow-text'>0 follower</div>
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
    </Container>
  )
}

export default MyInfo;