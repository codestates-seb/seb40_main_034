import { Container, Box, ListContainer, ListBox, ImageBox, ContentBox, ProfileBox, Profile, Id } from './style';

const MapSide = ({ address }) => {
  const data = [
    {
      address: '서울 중구 남대문로 81 B1',
      nickname: '멈머는멍멍',
      profileImg:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f48_48&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20221021_42%2F1666281429029hD9JW_JPEG%2F10BDA09A-DA00-4F1F-95C3-6062580AE25E.jpeg',
      placeImg: 'https://d12zq4w4guyljn.cloudfront.net/20220806012327_photo1_8128dcfc10ae.jpg',
      contents:
        '너무 아기자기한 디저트 카페입니다😍 다양한 쿠키와 케이크, 알록달록한 내부 인테리어 덕에 동화속 카페에 온 느낌입니다‼️ 크림메론소다는 메론시럽맛 탄산수 같은 느낌입니다',
    },

    {
      address: '서울 중구 남대문로 81 B1',
      nickname: '가난한식객',
      profileImg:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f48_48&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220325_206%2F1648203310461UwEXQ_JPEG%2F18F76CAC-A587-432D-8F89-38CA4E3EFF13.jpeg',
      placeImg: 'https://d12zq4w4guyljn.cloudfront.net/20220726062050_photo1_e711f317be4f.jpg',
      contents: '되게 디저트 종류도 많고 아기자기하고 좋은데 커피가 맛없어요',
    },
    {
      address: '서울 송파구 올림픽로 240',
      nickname: '행복한퀔카',
      profileImg: 'https://pcmap.place.naver.com/assets/shared/images/icon_default_profile.png',
      placeImg: 'https://d12zq4w4guyljn.cloudfront.net/20220806012327_photo3_8128dcfc10ae.jpg',
      contents:
        '굉장히 비비드한 색감이 인상적인 카페! 1층과 2층 그리고 루프탑으로 되어있고,루프탑에는 따로 좌석은 없지만 포토존은 존재합니다.아기자기하고 비비드한 매장과 어울리게 굉장히 유니크하고 귀여운 베이커리들도 준비되어 있고 카운트 오른쪽에는 흑백 레이저(?)사진을 인화해주는 코너도 있었습니다.주말이고 굉장히 인기가 많은 카페여서 그런지 사람들이 좀 많아서 좌석잡기는 살짝 눈치게임을 해야한다는! ',
    },
    {
      address: '서울 중구 남대문로 81 B1',
      nickname: '햇빛야옹이',
      profileImg:
        'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f48_48&src=https%3A%2F%2Fmyplace-phinf.pstatic.net%2F20220909_142%2F1662730772665VrVH0_JPEG%2F20220909_223920.jpg',
      placeImg: 'https://mp-seoul-image-production-s3.mangoplate.com/462974/926205_1644539826949_3934',
      contents:
        '정말 컨셉과 다양한 재미가 있었던 카페였습니다. 정말 어디서 봐도 이 곳이 해피베어데이구나 싶은 건물로 들어가서 느낀 점은 정말 컨셉이 확고한 곳이구나 라는 것이었습니다. 옛날 미국이 느껴지는 인테리어와 독특한 케이크, 영수증종이에 사진이 나오는 사진기까지 정말 컨셉을 확고하게 하기 위해 많은 노력을 했다는 게 느껴지는 곳이었습니다. 그리고 또 다른 장점은 디저트를 꽤 잘 만든다는 것이었습니다. 일단, 매우 달콤한 맛이기는 하지만 제 입맛에는 맛있었습니다. 하지만 커피는 딱 컴포즈커피가 느껴지는 맛이었습니다. 감성과 달콤함이 느껴지는 꽤 좋은 카페였습니다.',
    },
  ];
  const filteredData = data.filter((data) => data.address === address);
  return (
    <Box>
      <ListContainer>
        {filteredData.map((review, idx) => {
          return (
            <ListBox key={idx}>
              <ProfileBox>
                <Profile>
                  <img src={review.profileImg} alt="place" />
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
