import styled from 'styled-components';
import { GreyBtn } from '../Common/Btn';

export const List = ({ img, creator, location, profileImg, nickname }) => {
	return (
		<Container>
			<Thumbnail img={img} creator={creator}>
				<div className="placeholder" />
				{/* <div className="overlay" /> */}
				<div className="thumbnailHover">
					<div className="overlay" />
					<GreyBtn text="Bookmark" className="GrBtn" />
				</div>
				<img src={img} alt={location} />
			</Thumbnail>
			<InfoContainer>
				<Location location={location}>location</Location>
				<Nickname nickname={nickname}>
					<img src={profileImg} alt={nickname} />
					nickname
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
	:hover img {
		filter: brightness(85%);
	}
	:hover .thumbnailHover {
		position: absolute;
		display: block;
		right: 0.5rem;
		top: 0.5rem;
	}
	:hover .GrBtn {
		color: white;
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
`;
const InfoContainer = styled.div`
	margin-top: 0.5rem;
	margin-bottom: 2.5rem;
`;
const Location = styled.div`
	font-size: 0.85rem;
	line-height: 1;
`;
const Nickname = styled.div`
	font-size: 0.85rem;
`;
