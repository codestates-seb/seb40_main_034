import { useMemo, useRef, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { BlackBtn, GreenBtn } from '../Components/Common/Btn';

// container영역
const Container = styled.div`
	width: 1000px;
	margin: 2rem auto;
`;

const D_Detail_box = styled.div`
	display: flex;
	flex-direction: row;

	border-radius: 5px;
	box-shadow: 0px 0px 100px rgba(0, 0, 0, 0.4);
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
		opacity: 0;
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
	h2 {
		font-size: 1.2rem;
		font-weight: 500;
	}
`;

const D_CommentInput = styled.input`
	padding: 0.4rem 1rem;
	background-color: #b8b8b8;
	border-radius: 8px;
`;

const D_BottomDesc = styled.div``;

function Detail() {
	// 이미지 더미 데이터
	let images = [
		'https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=788&q=80',
		'https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		'https://images.unsplash.com/photo-1503001831666-8f3cf3a24544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
		'https://images.unsplash.com/photo-1526306063970-d5498ad00f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		'https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
	];
	let DetailText =
		'abcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijklmnopqrstuvwxyabcdefghijkl';

	// idx 이미지 순서
	const [imgIdx, setImgIdx] = useState(0);
	// fetching img 데이터
	const [imgS, setImgS] = useState(images);
	// 구독 버튼 state (나중에 삭제할거)
	const [subColor, setSubColor] = useState(false);
	// 더보기 열기/닫기 스위치
	const [isShowMore, setIsShowMore] = useState(false);
	// fetching text 데이터
	const [bodyText, setBodyText] = useState(DetailText);

	// 글자수 제한
	const textLimit = useRef(200);

	// 뒤로가기 앞으로 가기 버튼
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
		axios
			.post('/follow/add')
			.then((res) => {
				setSubColor(!subColor);
				console.log(res);
			})
			.catch((err) => console.log(err));
	};

	// 조건부 게시글
	const textViewer = useMemo(() => {
		const shortReview = bodyText.slice(0, textLimit.current);
		if (bodyText.length > textLimit.current) {
			if (isShowMore) {
				return bodyText;
			}
			return shortReview;
		}
		return bodyText;
	}, [isShowMore]);

	return (
		<>
			<Container>
				<D_Detail_box>
					<D_Img_Slider>
						<D_Images>
							{imgS.map((img, index) => (
								<img src={img} className={index === imgIdx ? 'active' : ''} key={index} alt="" />
							))}
						</D_Images>
						<D_Thumbnails>
							{imgS.map((img, index) => (
								<img
									src={img}
									role="presentation"
									className={index === imgIdx ? 'active' : ''}
									onClick={() => thumbnailImg(index)}
									key={index}
									alt=""
								/>
							))}
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
									<Link to="/">
										<img
											src="https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80"
											alt="profile"
										/>
									</Link>
								</D_TopProfile>
								<D_TopName>
									<Link to="/">arrowsVd</Link>
								</D_TopName>
							</D_ProSum>
							{subColor ? (
								<BlackBtn text="UNSUBSCRIBE" onClick={subscribe} />
							) : (
								<GreenBtn text="SUBSCRIBE" onClick={subscribe} />
							)}
						</D_TopDesc>
						<D_LocateDesc>
							<Link to="/">
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
							<Link to="/">롤링핀 오산점</Link>
						</D_LocateDesc>
						<D_BodyDesc>
							<p>{textViewer}</p>
							<button onClick={() => setIsShowMore(!isShowMore)}>
								{bodyText.length > textLimit.current && (isShowMore ? '닫기' : '더보기')}
							</button>
						</D_BodyDesc>
						<D_CommentBottomDesc>
							<D_CommentDesc>
								<h2>댓글 11개</h2>
								<form>
									<D_CommentInput placeholder="comment here..."></D_CommentInput>
								</form>
							</D_CommentDesc>
							<D_BottomDesc>ㅇㅇ</D_BottomDesc>
						</D_CommentBottomDesc>
					</D_BodySection>
				</D_Detail_box>
			</Container>
		</>
	);
}

export default Detail;
