import styled from 'styled-components';

export const Container = styled.div`
	padding-top: 4.5rem;
	display: grid;
	grid-template-columns: repeat(12, 1fr);
	gap: 0.6rem;
	grid-template-rows: repeat(10, 1fr);
	.item:nth-child(1) {
		grid-column: 6 / 8;
		grid-row: 1 / 5;
	}
	.item:nth-child(2) {
		grid-column: 2 / 12;
		grid-row: 5 / 10;
	}
	.edititem {
		grid-column: 4 / 6;
		grid-row: 1 / 10;
	}
`;

export const MyContainer = styled.div`
	display: flex;
	margin-bottom: 3.5rem;
	flex-direction: column;
	justify-content: space-around;
`;

export const ProfileContainer = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	.nickname-text {
		padding-top: 0.2rem;
		font-size: 2.25rem;
		margin-top: 0.1rem;
	}
`;

export const ProfilePic = styled.div`
	img {
		width: 7.5rem;
		height: 7.5rem;
		border-radius: 50%;
		box-shadow: rgb(0 0 0 / 5%) 0px 10px 24px, rgb(0 0 0 / 5%) 0px 20px 48px, rgb(0 0 0 / 10%) 0px 1px 4px;
	}
`;

export const FollowContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 1.5rem;
	.follow-text {
		font-size: 1rem;
	}
`;

export const FollowingList = styled.div`
	display: flex;
`;

export const FollowerList = styled.div`
	display: flex;
`;

export const InfoContainer = styled.div`
	display: flex;
	justify-content: space-between;
	margin-top: 1rem;
	align-items: center;
`;

export const ShareButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 150rem;
	border: solid 0.08rem rgb(132, 255, 47);
	color: rgb(31, 31, 31);
	background-color: white;
	width: 6.25rem;
	height: 3.1rem;
	cursor: pointer;
	span {
		font-size: 0.85rem;
	}
`;

export const EditButton = styled(ShareButton)``;
export const FollowButton = styled.button`
	display: flex;
	justify-content: center;
	align-items: center;
	border-radius: 150rem;
	width: 6.25rem;
	height: 3.1rem;
	font-size: 0.85rem;
	background-color: white;
	cursor: pointer;
	span:nth-child(1) {
		color: rgb(132, 255, 47);
		padding-right: 0.4rem;
	}
	span:nth-child(2) {
		color: rgb(31, 31, 31);
	}
`;
