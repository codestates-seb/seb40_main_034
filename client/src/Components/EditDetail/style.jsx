import styled from 'styled-components';

export const Header = styled.div`
	display: flex;
	font-size: 2rem;
`;

export const EditContainer = styled.div`
	display: flex;
	flex-direction: column;
	margin-top: 2.3rem;
	div {
		margin-bottom: 1rem;
	}
	input {
		border: 2px solid rgb(219, 219, 219);
		border-radius: 22px;
		color: rgb(31, 31, 31);
		&:hover {
			border: 2px solid rgb(133, 133, 133);
		}
	}

	input[type='text'] {
		min-width: 18rem;
		min-height: 2rem;
	}
	input[type='password'] {
		min-width: 18rem;
		min-height: 2rem;
	}

	input[name='about'] {
		min-width: 18rem;
		min-height: 7rem;
	}
`;

export const PhotoBox = styled.div`
	display: flex;
	flex-direction: row;
	align-items: center;
`;

export const Photo = styled.div`
	display: flex;
	padding-right: 2rem;
	img {
		width: 5rem;
		height: 5rem;
		border-radius: 50%;
	}
`;

export const PhotoEditBtn = styled.div`
	display: flex;
`;
export const EditBtn = styled.button`
	padding: 0.3rem 1rem 0.3rem 1rem;
	border-radius: 22px;
	font-weight: 500;
	height: 2rem;
	font-size: 0.85rem;
	text-align: center;
	cursor: pointer;
	background-color: rgb(235, 235, 235);
	color: rgb(31, 31, 31);

	&:hover {
		filter: brightness(90%);
	}
	&:active {
		filter: brightness(80%);
	}
`;

export const BtnContainer = styled.div`
	display: flex;
	width: 18rem;
	margin-top: 3.5rem;
	flex-direction: column;
`;
export const EditText = styled.div`
	display: flex;
	font-size: 0.9rem;
	margin: 0 0 0.4rem 0;
`;

export const EditName = styled.div`
	display: flex;
	input {
		border-radius: 22px;
		border-color: rgb(31, 31, 31);
		color: rgb(31, 31, 31);
	}
`;

export const EditPassword = styled.div`
	display: flex;
`;

export const EditAbout = styled.div`
	display: flex;
`;

export const QuitBtn = styled.button`
	padding: 0.3rem 1rem 0.3rem 1rem;
	border-radius: 22px;
	font-weight: 500;
	height: 2rem;
	text-align: center;
	cursor: pointer;
	background-color: white;
	width: 6rem;
	font-size: 0.8rem;
	color: rgb(230, 58, 33);
	margin-bottom: 4rem;
	text-align: start;
	&:hover {
		color: rgb(253, 58, 33);
	}
`;
export const SubmitBtn = styled(EditBtn)`
	width: 6rem;
`;
