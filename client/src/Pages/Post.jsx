import { useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import { postArticle } from '../Api/PostApi';
import { getProfile } from '../Api/HeaderApi';
import { BlackBtn, GreenBtn, GreyBtn } from '../Components/Common/Btn';
import MiniProfile from '../Components/Common/MiniProfile';
import { useNavigate } from 'react-router-dom';
import Tagform from '../Components/Post/Tagform';
import customAlert from '../Utils/customAlert';
import PlaceSearchModal from '../Components/Post/PlaceSearchModal';
import { useSelector } from 'react-redux';
import grammarCheck from '../Utils/grammarCheck';

const Post = () => {
  const state = useSelector((state) => state.user);
  const { memberId, authenticated, nickname, refreshToken } = state;
  const [userInfo, setUserInfo] = useState({});
  const [location, setLocation] = useState('');
  const [locationDetail, setLocationDetail] = useState('');
  const [isSearching, setIsSearching] = useState(false);
  const [body, setBody] = useState('');
  const [imgs, setImgs] = useState([]);
  const [base64Imgs, setBase64Img] = useState('');
  const [tags, setTags] = useState([]);
  const [tagSelected, setTagSelected] = useState(false);
  const [maintext, setMaintext] = useState(0);

  useEffect(() => {
    getProfile().then((res) => {
      setUserInfo(res.data);
    });
  }, []);

  const navigate = useNavigate();

  const handlePlaceSearch = () => {
    setIsSearching(!isSearching);
  };
  const handleSearchResult = (arr, str, boolean) => {
    setLocation(arr.address_name);
    setLocationDetail(arr.place_name);
    setIsSearching(boolean);
  };
  const remain = maintext ? 500 - maintext.length : 500;
  const handleMaintext = (e) => {
    setBody(e.target.value);
    setMaintext(e.target.value);

    if (maintext.length > 500) {
      e.target.value = maintext.substring(0, 500);
      setMaintext(maintext.substring(0, 500));
    }
  };

  const handleBody = (e) => {
    setBody(e.target.value);
  };

  const fileInput = useRef(null);
  // const handleFileInput = () => {
  //   fileInput.current?.click();
  // };
  const processImg = (file) => {
    return new Promise((res, rej) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => res(e.target.result);
      reader.onerror = (err) => rej(err);
    });
  };
  const uploadImage = (e) => {
    const fileList = e.target.files;
    const url = URL.createObjectURL(fileList[0]); //임시로 파일 1개만 가능하도록 했음
    setImgs([
      {
        file: fileList[0],
        thumbnail: url,
      },
    ]);
    processImg(fileList[0]).then((data) => {
      setBase64Img(data);
    });
  };
  const deleteImg = () => {
    setImgs([]);
    setBase64Img([]);
  };
  const showPreviewImg = useMemo(() => {
    if (imgs[0]) {
      return (
        <div className="preview">
          <img src={imgs[0]?.thumbnail} alt={'image for' + location} />
          <GreyBtn text="이미지 삭제" className="deleteImg" callback={deleteImg} />
        </div>
      );
    } else return;
  });

  const handleTags = (idx, selected) => {
    if (tags === idx) {
      setTags('');
      setTagSelected(selected);
    } else {
      setTags(idx + 1);
      setTagSelected(selected);
    }
  };

  const handleSubmit = () => {
    const data = {
      gpsX: location,
      gpsY: locationDetail,
      contents: body,
      image: base64Imgs,
      tag: tags,
      creatorId: memberId,
    };

    if (!authenticated) {
      customAlert('로그인이 정상적으로 되어있지 않습니다.');
      throw new Error('글 작성에 실패했습니다.');
    }
    if (data.gpsX === '' || data.gpsY === '') {
      customAlert('위치를 지정해야 합니다.');
      return;
    }
    if (data.image.length === 0) {
      customAlert('사진을 넣어주세요.');
      return;
    }
    if (data.contents.length <= 10) {
      customAlert('리뷰는 최소 10자 이상 작성하세요.');
      return;
    }
    if (data.tag === '') {
      customAlert('한 개의 태그를 고르세요.');
      return;
    }
    if (grammarCheck(body)) {
      postArticle(data, refreshToken).then((res) => {
        if (res.postId) {
          navigate(`/post/${res.postId}/detail`);
        } else {
          customAlert(`글 작성에 실패했습니다. ${res}`);
        }
      });
    }
  };

  return (
    <Background>
      <Container>
        <Header>
          {authenticated && (
            <MiniProfile nickname={nickname} className="user" memberId={memberId} profileImg={userInfo?.profileImg} />
          )}
          <GreenBtn text="저장" className="post" callback={handleSubmit} />
        </Header>
        <Body>
          <ImageContainer>
            <div>
              {!imgs[0] && (
                <>
                  <label htmlFor="imgUpload">{imgs.length ? '클릭하여 이미지 추가' : '클릭하여 이미지 업로드'}</label>
                  <input
                    id="imgUpload"
                    type="file"
                    accept="image/jpg, image/jpeg, image/png"
                    ref={fileInput}
                    onChange={uploadImage}
                  />
                </>
              )}
              {imgs.length !== 0 && showPreviewImg}
            </div>
          </ImageContainer>
          <Description>
            <div className="placeSearch">
              <Place placeholder="어디에 계신가요?" value={locationDetail} readOnly />
              <BlackBtn text="장소 검색" className="placeSearchBtn" callback={handlePlaceSearch} />
            </div>
            <Maintext placeholder="리뷰를 입력하세요." value={body} onChange={handleMaintext} />
            <MaintxtValidator>{remain}</MaintxtValidator>
            <Tagform callback={handleTags} tags={tags} />
          </Description>
        </Body>
      </Container>
      {isSearching && <PlaceSearchModal callback={handleSearchResult} />}
    </Background>
  );
};

const Background = styled.div`
  background-color: #eee;
  width: 100%;
  height: calc(100vh - 4rem);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  background-color: white;
  border-radius: 1rem;
  width: 50rem;
  height: 38rem;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  position: relative;
  .user {
    position: absolute;
    top: 1.5rem;
    left: 2rem;
  }
  .post {
    position: absolute;
    top: 1.5rem;
    right: 2rem;
  }
`;
const Body = styled.div`
  display: flex;
  flex-direction: row;
`;
const ImageContainer = styled.div`
  width: 50%;
  height: 31rem;
  margin: 5rem 1rem 2rem 2rem;
  background-color: #eee;
  border-radius: 0.5rem;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  input[type='file'] {
    display: none;
  }
  label {
    cursor: pointer;
  }
  .preview {
    width: 100%;
  }
  .preview img {
    max-width: 95%;
    max-height: 90%;
  }
  .deleteImg {
    margin-top: 0.5rem;
  }
`;
const Description = styled.article`
  width: 50%;
  height: 31rem;
  margin: 5rem 2rem 2rem 1rem;
  display: flex;
  flex-direction: column;
  position: relative;
  .placeSearch {
    display: flex;
    flex-direction: row;
  }
  .placeSearchBtn {
    position: absolute;
    right: 0;
  }
`;
const Place = styled.input`
  cursor: pointer;
  padding: 0.5rem;
  width: 15rem;
  border: none;
  &:focus {
    outline: none;
    border: none;
  }
`;
const Maintext = styled.textarea`
  font-size: 0.9rem;
  font-family: inherit;
  height: 24rem;
  overflow: visible;
  margin: 1.5rem 0 0 0;
  padding: 0.325rem;
  border: 2px solid #fff;
  border-bottom: 2px solid #ddd;
  &:focus {
    border: 2px solid #91f841;
    outline: none;
  }
`;
const MaintxtValidator = styled.div`
  font-size: 0.85rem;
  text-align: right;
  margin-bottom: 1.5rem;
`;

export default Post;
