import { Container, Box, ListContainer, ListBox, ImageBox, ContentBox, ProfileBox, Profile, Id } from './style';
import { useState, useEffect } from 'react';
import { handlePostInfo } from '../../Api/MapApi';
import axios from 'axios';

const MapSide = ({ posts }) => {
  const [postList, setPostList] = useState([]);

  axios
    .get('http://ec2-15-164-104-27.ap-northeast-2.compute.amazonaws.com:8080/main/list?page=1&size=5')
    .then((res) => setPostList(res.data.data));

  return (
    <Box>
      <ListContainer>
        {postList.map((review, idx) => {
          return (
            <ListBox key={idx}>
              <ProfileBox>
                <Profile>
                  {review.image ? (
                    <img src={review.image} alt="place" />
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
                <img src={review.image} alt="reviewphoto" />
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
