import { useState } from 'react';
import styled from 'styled-components';

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
	display: flex;
	flex-direction: column;
	padding: 1rem;
`;

const D_TopDesc = styled.div``;

const D_ProSum = styled.div``;

function Detail() {
	// 이미지 더미 데이터
	let images = [
		'https://images.unsplash.com/photo-1496440543089-3d0eb669f6f6?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=788&q=80',
		'https://images.unsplash.com/photo-1619961310056-1f5c8df685d8?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		'https://images.unsplash.com/photo-1503001831666-8f3cf3a24544?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=750&q=80',
		'https://images.unsplash.com/photo-1526306063970-d5498ad00f1c?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
		'https://images.unsplash.com/photo-1552694477-2a18dd7d4de0?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=750&q=80',
	];

	// idx 이미지 순서
	const [imgIdx, setImgIdx] = useState(0);
	// fetching img 데이터
	const [imgS, setImgS] = useState(images);

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
							<D_ProSum></D_ProSum>
						</D_TopDesc>
						<h1>dd</h1>
					</D_BodySection>
				</D_Detail_box>
			</Container>
		</>
	);
}

export default Detail;
