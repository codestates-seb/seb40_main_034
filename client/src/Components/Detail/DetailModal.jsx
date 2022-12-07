import { useMemo, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { usePutDetail } from '../../Api/DetailApi';
import { BlackBtn, GreenBtn, GreyBtn } from '../Common/Btn';
import MiniProfile from '../Common/MiniProfile';
import PlaceSearchModal from '../Post/PlaceSearchModal';
import Tagform from '../Post/Tagform';

function DetailModal({ myGpsX, mapLocation, setIsEdit, nickname, postMemberId, imgS, bodyText, myTag, refreshToken }) {
  const [cancel, setCancel] = useState(false);
  const [location, setLocation] = useState(myGpsX);
  const [locationDetail, setLocationDetail] = useState(mapLocation);
  const [isSearching, setIsSearching] = useState(false);
  const [body, setBody] = useState(bodyText);
  const [imgs, setImgs] = useState([
    {
      thumbnail: imgS,
    },
  ]);
  const [base64ImgS, setBase64Img] = useState(imgS);
  const [maintext, setMaintext] = useState(0);
  const [tags, setTags] = useState(myTag);
  const [tagSelected, setTagSelected] = useState(false);

  const { postId } = useParams();

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

  const fileInput = useRef(null);

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
          <img src={imgs[0]?.thumbnail} alt={'image for' + mapLocation} />
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
      image: base64ImgS,
    };
    usePutDetail(postId, refreshToken, data).then((res) => {
      navigate(`post/${res.postId}/detail`);
    });
  };

  return (
    <DialogContainer>
      <Dialog>
        <Dialog_Inner>
          <CloseBtn onClick={() => setCancel(true)}>╳</CloseBtn>
          {cancel && (
            <C_Body>
              <C_Container>
                <C_Header>
                  <h1>저장되지 않은 변경 사항</h1>
                  <CloseBtn onClick={() => setCancel(false)}>╳</CloseBtn>
                </C_Header>
                <C_Inner>
                  <h2>변경 사항이 저장되지 않습니다.</h2>
                  <C_Footer>
                    <C_Continue onClick={() => setCancel(false)}>계속 수정</C_Continue>
                    <C_Quite onClick={() => setIsEdit(false)}>확인</C_Quite>
                  </C_Footer>
                </C_Inner>
              </C_Container>
            </C_Body>
          )}
          <Container>
            <Header>
              <MiniProfile nickname={nickname} className="user" memberId={postMemberId}></MiniProfile>
              <GreenBtn text="저장" className="post" callback={handleSubmit} />
            </Header>
            <Body>
              <ImageContainer>
                <div>
                  {!imgs[0] && (
                    <>
                      <label htmlFor="imgUpload">
                        {imgs.length ? '클릭하여 이미지 추가' : '클릭하여 이미지 업로드'}
                      </label>
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
          {/* <Dialog_Form>
            <Dialog_From_Footer>
              <CompleteBtn>저장</CompleteBtn>
            </Dialog_From_Footer>
          </Dialog_Form> */}
          {isSearching && <PlaceSearchModal className="edit" callback={handleSearchResult} />}
        </Dialog_Inner>
      </Dialog>
    </DialogContainer>
  );
}

const DialogContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 11;
`;

const Dialog = styled.div`
  width: 50vw;
  background-color: rgb(255, 255, 255);

  padding: 0;
  border: none;
  border-radius: 6px;
  -webkit-animation: appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  animation: appear 0.8s cubic-bezier(0.77, 0, 0.175, 1) forwards;
  box-shadow: 0 25px 40px -20px #3c4a56;
  @-webkit-keyframes appear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  @keyframes appear {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
`;

const Dialog_Inner = styled.div`
  display: flex;
  flex-direction: column;
  color: #838282;
`;

// 수정 폼
const Container = styled.div`
  height: 60vh;
  border-radius: 1rem;
  background-color: white;
`;

const Header = styled.div`
  position: relative;
  .user {
    position: absolute;
    left: 2rem;
  }
  .post {
    position: absolute;
    right: 2rem;
  }
`;

const Body = styled.div`
  display: flex;
  flex-direction: row;
`;

const ImageContainer = styled.div`
  width: 50%;
  height: 30rem;
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
  height: 30rem;
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

//
const CloseBtn = styled.button`
  padding: 10px;
  align-self: flex-end;
  color: #838282;
  border-radius: 6px;
  cursor: pointer;
  background-color: #fff;
`;

// 삭제확인 모달
const C_Body = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 20;
`;

const C_Container = styled.div`
  width: 30rem;
  background-color: rgb(255, 255, 255);
  border-radius: 6px;
  box-shadow: 0 25px 40px -20px #3c4a56;
`;

const C_Header = styled.div`
  display: flex;
  align-items: center;
  h1 {
    font-size: 1.2rem;
    font-weight: 600;
    color: black;
    text-align: center;
    flex-basis: 100%;
  }
  border-bottom: 1px solid #dadde1;
`;

const C_Inner = styled.div`
  padding: 1rem;
`;

const C_Footer = styled.div`
  margin-top: 1rem;
  display: flex;
  justify-content: flex-end;
`;

const C_Continue = styled.button`
  color: #91f841;
  font-weight: 400;
  cursor: pointer;
  background-color: #fff;
`;

const C_Quite = styled(C_Continue)`
  margin-left: 1rem;
  font-weight: 600;
  padding: 0.3rem 2rem;
  border-radius: 6px;
  background-color: #91f841;
  color: black;
`;

export default DetailModal;
