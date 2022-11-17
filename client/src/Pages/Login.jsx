import styled from 'styled-components';
import { useState } from 'react';
import { Link } from 'react-router-dom';

const PageContainer = styled.div`
	width: 100%;
	height: 58rem;
	display: flex;
	align-items: center;
	justify-content: center;
`;
const LoginContainer = styled.div`
	width: 35rem;
	height: 50rem;
	display: flex;
	flex-direction: column;
	border: 0.1rem solid #dddddd;
	border-radius: 1rem 0 0 1rem;
	align-items: center;
	justify-content: center;
`;

const LoginInput = styled.input`
	width: 25rem;
	height: 2.5rem;
	margin-top: 2rem;
	border-radius: 0.5rem;
	outline: solid 0.125rem #dddddd;
	&:focus {
		outline: solid 0.2rem #91f841;
	}
`;
const LoginButton = styled.button`
	width: 6rem;
	height: 2rem;
	background-color: #91f841;
	border-radius: 0.5rem;
	margin: 2rem;
	font-weight: bold;
	&:hover {
		filter: brightness(80%);
	}
`;
const LogoDiv = styled.img.attrs({
	src: 'https://user-images.githubusercontent.com/99412221/202052092-56e52c9b-0654-45e0-9591-3cf9ac047a2a.png',
})`
	width: 15 rem;
	height: 15rem;
`;

const Wrap = styled.div`
	width: 35rem;
	position: relative;
`;

const WelcomeImg = styled.img.attrs({
	src: 'https://picsum.photos/800/800',
})`
	width: 35rem;
	height: 50rem;
	border-radius: 0 1rem 1rem 0;
	display: flex;
	vertical-align: middle;
`;
const WelcomeStr = styled.div`
        position : absolute;
        top : 40%;
        left : 40%
        width : 34rem;
        color : white;
        font-size : 3.7rem;
        text-align : center;
    `;

const Login = () => {
	return (
		<div>
			<PageContainer>
				<LoginContainer>
					<LogoDiv />
					<LoginInput type="email" name="loginEmail" placeholder=" Enter your email"></LoginInput>
					<LoginInput type="password" name="loginPassword" placeholder=" Enter your password"></LoginInput>
					<LoginButton>Log in</LoginButton>
					<div>
						Don’t have an account? <Link to="/signup">Sign up</Link>
					</div>
				</LoginContainer>
				<Wrap>
					<WelcomeImg></WelcomeImg>
					<WelcomeStr>Hello, were PostON!</WelcomeStr>
				</Wrap>
			</PageContainer>
		</div>
	);
};

export default Login;
