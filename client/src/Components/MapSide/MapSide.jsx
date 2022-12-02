import { Container, Box, ListContainer, ListBox, ImageBox, ContentBox, ProfileBox, Profile, Id } from './style';
import { useState, useEffect } from 'react';
import { handlePostInfo } from '../../Api/MapApi';
const MapSide = ({ posts }) => {
  return (
    <Box>
      <ListContainer>
        {posts.map((review, idx) => {
          return (
            <ListBox key={idx}>
              <ProfileBox>
                <Profile>
                  {review.profileImg ? (
                    <img src={review.profileImg} alt="place" />
                  ) : (
                    <img
                      src="https://pcmap.place.naver.com/assets/shared/images/icon_default_profile.png"
                      alt="place"
                    />
                  )}
                </Profile>
                <Id>{review.nickname}</Id>
              </ProfileBox>
              <ImageBox>
                <img src={review.placeImg} alt="reviewphoto" />
              </ImageBox>
              <ContentBox>{review.contents}</ContentBox>
            </ListBox>
          );
        })}
      </ListContainer>
    </Box>
  );
};

export default MapSide;
