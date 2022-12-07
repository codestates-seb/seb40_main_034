import { useEffect, useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import { BlackBtn, GreenBtn } from '../Components/Common/Btn';
import CommentList from '../Components/Detail/CommentList';
import InputEmoji from 'react-input-emoji';
import {
  useDeletePost,
  useGetComment,
  useGetDetail,
  useGetFollow,
  useGetLike,
  usePostComment,
  usePostFollow,
  usePostLike,
} from '../Api/DetailApi';
import DetailModal from '../Components/Detail/DetailModal';
import { useSelector } from 'react-redux';
import { throttle } from 'lodash';
import Swal from 'sweetalert2';
import { deleteAlert } from '../Utils/customAlert';

function Detail() {
  // 이미지 더미 데이터
  let images = [
    'https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=788&q=80',
    'https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    'https://images.unsplash.com/photo-1503001831666-8f3cf3a24544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
    'https://images.unsplash.com/photo-1526306063970-d5498ad00f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
    'https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
  ];
  // id 불러오기(완)
  const { postId } = useParams();

  // redux state 불러오기(완)
  const { refreshToken, memberId } = useSelector((state) => state.user);

  // idx 이미지 순서
  const [imgIdx, setImgIdx] = useState(0);
  // fetching img 데이터
  const [imgS, setImgS] = useState('');
  // 구독 버튼 state (나중에 삭제할거)
  const [subColor, setSubColor] = useState(false);
  // 더보기 열기/닫기 스위치(완)
  const [isShowMore, setIsShowMore] = useState(false);
  // contents(완)
  const [bodyText, setBodyText] = useState('');
  // comment data
  const [commentData, setCommentData] = useState([]);
  // comment state
  const [comment, setComment] = useState('');
  // 좋아요에 따른 하트색상
  // 데이터 get해올때 좋아요가 눌러진 상태면 그 상태에 따라 default value를 바꿔줘야할 것 같음
  const [isLike, setIsLike] = useState(false);
  // edit modal(완)
  const [isEdit, setIsEdit] = useState(false);
  // 닉네임(완)
  const [nickname, setNickname] = useState('');
  // 상호명
  const [mapLocation, setMapLocation] = useState('');
  // 도로묭
  const [myGpsX, setMyGpsX] = useState('');
  // post한 memberId
  const [postMemberId, setPostMemberId] = useState('');
  const myPageUrl = `/profile/${postMemberId}`;
  // 태그
  const [myTag, setMyTag] = useState('');

  const navigate = useNavigate();

  // customHook 삭제하기 버튼 확인 modal
  const deleteConfirm = () => {
    deleteAlert('글을 정말 삭제하시겠습니까? 삭제한 글은 되돌릴 수 없습니다.', '삭제가 완료되었습니다.').then(
      (result) => {
        if (result.isConfirmed) {
          useDeletePost(postId, refreshToken).then(() => {
            navigate('/');
          });
        }
      },
    );
  };

  // 글자수 제한(완)
  const textLimit = useRef(200);

  // 이미지 뒤로가기 앞으로 가기 버튼
  const prevImg = () => {
    setImgIdx(imgIdx === 0 ? imgS.length - 1 : imgIdx - 1);
  };
  const nextImg = () => {
    setImgIdx(imgIdx === imgS.length - 1 ? 0 : imgIdx + 1);
  };

  // 썸네일 이미지 idx 순서 조절 onclick 이벤트
  const thumbnailImg = (idx) => {
    setImgIdx(idx);
  };

  // 구독 버튼 post onclick
  const subscribe = () => {
    if (memberId === null) {
      alert('로그인 후 이용해주세요');
    } else {
      setSubColor(!subColor);
      usePostFollow(subColor);
    }
  };

  // 좋아요 클릭 axios
  const clickLike = () => {
    if (memberId === null) {
      alert('로그인 후 이용해주세요');
    } else {
      setIsLike(!isLike);
      usePostLike(postId, refreshToken);
    }
  };

  // 댓글 Post axios(완)
  const postComment = throttle(() => {
    usePostComment(postId, comment, refreshToken).then(() => location.reload());
  }, 300);

  // 댓글 Post 엔터(완)
  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && comment.length > 0) {
      postComment();
    }
  };

  // detail 조회(완)
  useEffect(() => {
    useGetDetail(postId).then((res) => {
      setNickname(res.nickname);
      setBodyText(res.contents);
      setMapLocation(res.gpsY);
      setMyGpsX(res.gpsX);
      setPostMemberId(res.memberId);
      setImgS(res.image);
      setMyTag(res.tag);
    });
    useGetComment(postId).then((res) => {
      setCommentData(res.data);
    });
    useGetLike(postId, refreshToken).then((res) => {
      setIsLike(res.postLiked);
    });
    useGetFollow().then((res) => {
      setSubColor(res.follow);
    });
  }, []);

  // 조건부 게시글(완)
  const textViewer = useMemo(() => {
    const shortReview = bodyText.slice(0, textLimit.current);
    if (bodyText.length > textLimit.current) {
      if (isShowMore) {
        return bodyText;
      }
      return shortReview;
    }
    return bodyText;
  }, [isShowMore, bodyText]);

  return (
    <>
      <Container>
        <D_Detail_box>
          <D_Img_Slider>
            <D_Images>
              {/* {imgS.map((img, index) => (
                <img src={img} className={index === imgIdx ? 'active' : ''} key={index} alt="" />
              ))} */}
              <img src={imgS} alt={mapLocation} />
            </D_Images>
            <D_Thumbnails>
              {/* {imgS.map((img, index) => (
                <img
                  src={img}
                  role="presentation"
                  className={index === imgIdx ? 'active' : ''}
                  onClick={() => thumbnailImg(index)}
                  key={index}
                  alt=""
                />
              ))} */}
            </D_Thumbnails>
            <D_BackBtn onClick={prevImg}>
              <svg
                fill="none"
                height="24"
                stroke="white"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <polyline points="15 18 9 12 15 6" />
              </svg>
            </D_BackBtn>
            <D_NextBtn onClick={nextImg}>
              <svg
                fill="none"
                height="24"
                stroke="white"
                viewBox="0 0 24 24"
                width="24"
                xmlns="http://www.w3.org/2000/svg">
                <polyline points="9 18 15 12 9 6" />
              </svg>
            </D_NextBtn>
          </D_Img_Slider>
          <D_BodySection>
            <D_TopDesc>
              <D_ProSum>
                <D_TopProfile>
                  <Link to={myPageUrl}>
                    <img
                      src="https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
                      alt="profile"
                    />
                  </Link>
                </D_TopProfile>
                <D_TopName>
                  <Link to={myPageUrl}>{nickname}</Link>
                </D_TopName>
              </D_ProSum>
              {subColor ? (
                <BlackBtn text="UNSUBSCRIBE" callback={subscribe} />
              ) : (
                <GreenBtn text="SUBSCRIBE" callback={subscribe} />
              )}
            </D_TopDesc>
            <D_LocateDesc>
              <Link to="/map" state={{ gpsX: myGpsX, gpsY: mapLocation }}>
                <svg
                  width="35"
                  height="35"
                  version="1.1"
                  viewBox="0 0 91 91"
                  fill="#173D21"
                  xmlns="http://www.w3.org/2000/svg">
                  <path d="M66.9,41.8c0-11.3-9.1-20.4-20.4-20.4c-11.3,0-20.4,9.1-20.4,20.4c0,11.3,20.4,32.4,20.4,32.4S66.9,53.1,66.9,41.8z    M37,41.4c0-5.2,4.3-9.5,9.5-9.5c5.2,0,9.5,4.2,9.5,9.5c0,5.2-4.2,9.5-9.5,9.5C41.3,50.9,37,46.6,37,41.4z" />
                </svg>
              </Link>
              <Link to="/map" state={{ gpsX: myGpsX, gpsY: mapLocation }}>
                {mapLocation}
              </Link>
              <D_LikeBookmark>
                <D_likeButton className={isLike ? 'like-block__like-icon--is-visible' : ''} onClick={clickLike}>
                  <svg
                    fill={isLike ? 'red' : 'white'}
                    stroke={isLike ? 'none' : 'black'}
                    height="22"
                    viewBox="0 0 16 16"
                    width="22"
                    xmlns="http://www.w3.org/2000/svg">
                    <path d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z" />
                  </svg>
                </D_likeButton>
              </D_LikeBookmark>
            </D_LocateDesc>
            <D_BodyDesc>
              <p>{textViewer}</p>
              <button onClick={() => setIsShowMore(!isShowMore)}>
                {bodyText.length > textLimit.current && (isShowMore ? '닫기' : '더보기')}
              </button>
            </D_BodyDesc>
            <D_CommentBottomDesc>
              <D_CommentDesc>
                <h2>댓글 {commentData.length}개</h2>
                <D_CommentListContainer>
                  {commentData.map((data, idx) => (
                    <CommentList
                      comment={data}
                      memberId={memberId}
                      refreshToken={refreshToken}
                      postId={postId}
                      myPageUrl={myPageUrl}
                      key={idx}
                    />
                  ))}
                </D_CommentListContainer>
                {memberId !== null && (
                  <form>
                    <InputEmoji
                      value={comment}
                      onChange={setComment}
                      onKeyDown={(e) => handleKeyPress(e)}
                      borderRadius={10}
                      borderColor="#b8b8b8"
                      placeholder="comment here..."
                    />
                    <button onClick={postComment}>
                      <svg fill="#8e8e8e" height="33" viewBox="0 0 16 16" width="33" xmlns="http://www.w3.org/2000/svg">
                        <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 1.59 2.498C8 14 8 13 8 12.5a4.5 4.5 0 0 1 5.026-4.47L15.964.686Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                        <path d="M16 12.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Zm-1.993-1.679a.5.5 0 0 0-.686.172l-1.17 1.95-.547-.547a.5.5 0 0 0-.708.708l.774.773a.75.75 0 0 0 1.174-.144l1.335-2.226a.5.5 0 0 0-.172-.686Z" />
                      </svg>
                    </button>
                  </form>
                )}
              </D_CommentDesc>
              <D_BottomDesc>
                {`${memberId}` === `${postMemberId}` && (
                  <>
                    <button onClick={deleteConfirm} className="delete">
                      <span>삭제</span>
                    </button>
                    <button onClick={() => setIsEdit(true)}>
                      <span>수정</span>
                    </button>
                  </>
                )}
                {isEdit && (
                  <DetailModal
                    myGpsX={myGpsX}
                    mapLocation={mapLocation}
                    setIsEdit={setIsEdit}
                    nickname={nickname}
                    postMemberId={postMemberId}
                    imgS={imgS}
                    bodyText={bodyText}
                    myTag={myTag}
                    refreshToken={refreshToken}
                  />
                )}
              </D_BottomDesc>
            </D_CommentBottomDesc>
          </D_BodySection>
        </D_Detail_box>
      </Container>
    </>
  );
}

// container영역
const Container = styled.div`
  width: 1000px;
  margin: 5rem auto;
`;

const D_Detail_box = styled.div`
  display: flex;
  flex-direction: row;

  border-radius: 1rem;
  box-shadow: 0px 0px 50px rgba(0, 0, 0, 0.4);
  overflow: hidden;
`;

// D_Detail_box 좌측 영역 (img)
const D_Img_Slider = styled.div`
  flex-basis: 50%;

  height: 40rem;
  position: relative;
`;

const D_Images = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  img {
    position: absolute;
    width: 100%;
    height: 100%;
    object-fit: cover;
    /* opacity: 0; */
    transition: all 500ms ease-in-out;
    &.active {
      opacity: 1;
    }
  }
`;

const D_Thumbnails = styled.div`
  position: absolute;
  bottom: 5px;
  width: 100%;
  height: 40px;
  display: flex;
  justify-content: center;
  gap: 5px;
  img {
    width: 60px;
    cursor: pointer;
    border: 2px solid transparent;
    &.active {
      border: 2px solid #fff;
    }
  }
`;

const D_BackBtn = styled.div`
  position: absolute;
  top: 0;
  width: 2rem;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  background: rgba(0, 0, 0, 0.2);
  transition: all 300ms ease-in-out;
  &:hover {
    background: rgba(0, 0, 0, 0.5);
  }
`;
const D_NextBtn = styled(D_BackBtn)`
  right: 0;
`;

// 우측 영역
const D_BodySection = styled.div`
  flex-basis: 50%;
  display: flex;
  flex-direction: column;
  padding: 1.2rem 1rem;
  > div {
    margin-bottom: 0.5rem;
    &:last-child {
      margin-bottom: 0;
    }
  }
`;

const D_TopDesc = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  button {
    height: 36px;
    font-weight: 700;
  }
`;

const D_ProSum = styled.div`
  display: flex;
  align-items: center;
`;

const D_TopProfile = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

const D_TopName = styled.strong`
  margin-left: 0.5rem;
  a {
    color: #000;
  }
`;

const D_LocateDesc = styled.div`
  display: flex;
  align-items: center;
  a {
    color: #173d21;
    font-weight: 500;
  }
`;

const D_BodyDesc = styled.div`
  word-break: break-all;
  button {
    cursor: pointer;
    color: #8e8e8e;
    background-color: #fff;
  }
`;

// 댓글 영역 + 수정 삭제 영역
const D_CommentBottomDesc = styled.div`
  flex-grow: 1;
  margin-top: 1rem;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

const D_CommentDesc = styled.div`
  flex-grow: 1;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  h2 {
    font-size: 1.2rem;
    font-weight: 500;
  }
  form {
    display: flex;

    // 이모지 라이브러리 start
    .react-input-emoji--container {
      position: relative;
      margin: 0;
      &:focus {
        outline: #91f841;
      }
    }

    .react-input-emoji--input {
      padding: 9px 34px 11px 12px;
      word-break: break-all;
    }

    .react-input-emoji--button {
      position: absolute;
      top: 10px;
      right: 0;
      z-index: 10;
    }
    // 이모지 라이브러지 end

    > button {
      margin-left: 1rem;
      cursor: pointer;
      background-color: #fff;
    }
  }
`;

const D_CommentListContainer = styled.div`
  flex-grow: 1;
  flex-basis: 242px;
  overflow-y: scroll;
  -ms-overflow-style: none; /* 인터넷 익스플로러 */
  scrollbar-width: none; /* 파이어폭스 */
  &::-webkit-scrollbar {
    display: none;
  }
`;

const D_BottomDesc = styled.div`
  margin-top: 8px;
  > button {
    float: right;
    cursor: pointer;
    background-color: #fff;
    &.delete {
      color: red;
    }
    &.modify {
      color: blue;
    }
    span {
      margin-left: 1.2rem;
    }
  }
`;

const D_LikeBookmark = styled.div`
  flex-grow: 1;
`;

const D_likeButton = styled.button`
  cursor: pointer;
  float: right;
  position: relative;
  background-color: #fff;
  &.like-block__like-icon--is-visible::after {
    z-index: auto;
    position: absolute;
    top: 35.5%;
    left: 50%;
    width: 50px;
    height: 50px;
    content: ' ';
    transform: translate(-50%, -50%);
    animation-name: b;
    animation-duration: 0.5s;
    animation-timing-function: ease-in-out;
    border-radius: 50%;
    background: rgba(255, 0, 0, 0.3);
    box-shadow: 0 0 30px 0 rgba(255, 0, 0, 0.7), 0 0 30px 0 rgba(255, 0, 0, 0.3);
    animation-fill-mode: forwards;
  }
  @keyframes b {
    0% {
      width: 0;
      height: 0;
      background: rgba(255, 0, 0, 0);
      box-shadow: 0 0 30px 0 rgba(255, 0, 0, 0), 0 0 30px 0 rgba(255, 0, 0, 0);
    }
    25% {
      width: 35px;
      height: 35px;
      background: rgba(255, 0, 0, 0.4);
      box-shadow: 0 0 30px 0 rgba(255, 0, 0, 0.7), 0 0 30px 0 rgba(255, 0, 0, 0.3);
    }
    to {
      width: 55px;
      height: 55px;
      background: rgba(255, 0, 0, 0);
      box-shadow: 0 0 30px 0 rgba(255, 0, 0, 0), 0 0 30px 0 rgba(255, 0, 0, 0);
    }
  }
  svg {
    position: relative;
    transition: all 0.5s ease-in-out;
  }
  &:hover svg {
    fill: red;
    stroke: none;
    transition: all 0.2s ease-in-out;
  }
`;

export default Detail;
