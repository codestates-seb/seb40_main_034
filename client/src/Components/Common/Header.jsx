import styled from 'styled-components';
import searchIcon from '../../Assets/img/search.svg';
export const Header = () => {
	return (
		<Container>
			<LeftContainer>
				<Logo>LOGO</Logo>
				<SearchForm>
					<div />
					<SearchInput placeholder="검색" />
				</SearchForm>
			</LeftContainer>
			<TabContainer>
				<Tab>TAB</Tab>
			</TabContainer>
			<RightContainer>Profile/Menu</RightContainer>
		</Container>
	);
};

const Container = styled.header`
	display: flex;
	align-items: center;
	width: calc (100vw - 1rem);
	height: 3rem;
	padding: 0.5rem 1rem 0.5rem 1rem;
`;

const LeftContainer = styled.div`
	display: flex;
	align-items: center;
`;

const Logo = styled.div``;

const SearchForm = styled.div`
	display: flex;
	align-items: center;
	border-radius: 20px;
	margin-left: 1rem;
	padding: 0 1rem 0 1rem;
	font-size: 0.9rem;
	width: 20%;
	min-width: 10rem;
	max-width: 25rem;
	height: 2.5rem;
	background-color: #eeeeee;
	div {
		width: 1.5rem;
		height: 1.3rem;
		background-image: url(${searchIcon});
		background-size: 1.3rem;
		background-repeat: no-repeat;
	}
`;

const SearchInput = styled.input`
	width: 100%;
	font-size: 0.9rem;
	padding: 0 0.5rem 0 0.5rem;
	height: 2rem;
	background: none;
	:focus {
		outline: none;
		border-color: #91f841;
	}
`;

const TabContainer = styled.nav`
	display: flex;
`;

const Tab = styled.div``;

const RightContainer = styled.div`
	display: flex;
`;
