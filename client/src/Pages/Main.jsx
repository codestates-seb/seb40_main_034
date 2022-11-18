import styled from 'styled-components';
import { List } from '../Components/List/List';
const Main = () => {
	return (
		<>
			<Container>
				<List />
				<List />
				<List />
				<List />
				<List />
			</Container>
		</>
	);
};
const Container = styled.div`
	display: flex;
`;
export default Main;
