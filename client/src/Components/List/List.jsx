import styled from 'styled-components';
import { GreenBtn } from '../Common/Btn';

export const List = ({ img, creator, location, profileImg, nickname }) => {
	return (
		<Container>
			<Thumbnail img={img} creator={creator}>
				<div className="placeholder" />
				{/* <div className="overlay" /> */}
				<div className="thumbnailHover">
					<div className="overlay" />
					<GreenBtn text="Bookmark" />
				</div>
				<img src={img} alt={location} />
			</Thumbnail>
			<InfoContainer>
				<Location location={location}>location</Location>
				<Nickname nickname={nickname}>
					<img src={profileImg} alt={nickname} /> nickname
				</Nickname>
			</InfoContainer>
		</Container>
	);
};

const Container = styled.div`
	width: 225px;
`;
const Thumbnail = styled.div`
	position: relative;
	border-radius: 16px;
	img {
		display: ${(props) => (props.img === undefined ? 'none' : 'block')};
	}
	.placeholder {
		border: 1px solid #dddddd;
		color: #bbbbbb;
		text-align: center;
		vertical-align: middle;
		border-radius: 16px;
		height: 330px;
		display: ${(props) => (props.img === undefined ? 'block' : 'none')};
	}
	.thumbnailHover {
		display: none;
	}
	:hover {
		.thumbnailHover {
			position: absolute;
			border-radius: 16px;
			top: 0;
			left: 0;
			display: block;
			width: 225px;
			height: 330px;
		}
		.overlay {
			position: absolute;
			border-radius: 16px;
			top: 0;
			left: 0;
			background-color: black;
			opacity: 0.5;
			width: 100%;
			height: 100%;
		}
	}
`;
const InfoContainer = styled.div``;
const Location = styled.div``;
const Nickname = styled.div``;
