import styled from 'styled-components';

function CommentList({ comment }) {
	return (
		<CommentContainer>
			<strong>{comment.nickname}</strong>
			<p>{comment.contents}</p>
		</CommentContainer>
	);
}

const CommentContainer = styled.div`
	strong,
	p {
		display: inline;
	}
	p {
		margin-left: 0.5rem;
	}
`;

export default CommentList;
