import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import InputEmoji from 'react-input-emoji';
import { useDeleteComment, useEditComment } from '../../Api/DetailApi';

function CommentList({ comment, memberId, postId, refreshToken, myPageUrl }) {
  const [openMore, setOpenMore] = useState(false);
  const [stateModify, setStateModify] = useState(false);
  const [newComment, setNewComment] = useState('');

  const openClickMore = () => {
    setOpenMore(!openMore);
  };

  const modifyClick = () => {
    setStateModify(true);
  };

  const cancelModifyClick = () => {
    setStateModify(false);
  };

  const deleteComment = () => {
    useDeleteComment(postId, comment.commentId, refreshToken).then(() => location.reload());
  };

  const newCommentSubmit = (e) => {
    if (e.key === 'Enter' && newComment.length > 0) {
      useEditComment(postId, comment.commentId, newComment, refreshToken).then(() => location.reload());
    }
  };

  return (
    <CommentContainer>
      <Link to={myPageUrl}>
        <strong>{comment.nickname}</strong>
      </Link>
      {stateModify ? (
        <>
          <InputEmoji
            value={newComment}
            onChange={setNewComment}
            onKeyDown={(e) => newCommentSubmit(e)}
            borderRadius={10}
            borderColor="#b8b8b8"
            placeholder="comment here..."
          />
          <button onClick={cancelModifyClick}>취소</button>
        </>
      ) : (
        <p>{comment.contents}</p>
      )}
      {`${comment.memberId}` === `${memberId}` && !stateModify && (
        <More onClick={openClickMore}>
          <svg width="20" height="20" version="1.1" viewBox="0 0 1200 1200" xmlns="http://www.w3.org/2000/svg">
            <g>
              <path d="m600 112.5c-129.29 0-253.29 51.363-344.71 142.79-91.422 91.426-142.79 215.42-142.79 344.71s51.363 253.29 142.79 344.71c91.426 91.422 215.42 142.79 344.71 142.79s253.29-51.363 344.71-142.79c91.422-91.426 142.79-215.42 142.79-344.71-0.14844-129.25-51.559-253.16-142.95-344.55s-215.3-142.8-344.55-142.95zm0 900c-109.4 0-214.32-43.461-291.68-120.82-77.359-77.355-120.82-182.28-120.82-291.68s43.461-214.32 120.82-291.68c77.355-77.359 182.28-120.82 291.68-120.82s214.32 43.461 291.68 120.82c77.359 77.355 120.82 182.28 120.82 291.68-0.12891 109.36-43.629 214.21-120.96 291.54-77.332 77.332-182.18 120.83-291.54 120.96z" />
              <path d="m450 600c0 41.422-33.578 75-75 75s-75-33.578-75-75 33.578-75 75-75 75 33.578 75 75" />
              <path d="m675 600c0 41.422-33.578 75-75 75s-75-33.578-75-75 33.578-75 75-75 75 33.578 75 75" />
              <path d="m900 600c0 41.422-33.578 75-75 75s-75-33.578-75-75 33.578-75 75-75 75 33.578 75 75" />
            </g>
          </svg>
          {openMore && (
            <Tooltip>
              <Button onClick={modifyClick}>수정</Button>
              <Button onClick={deleteComment}>삭제</Button>
            </Tooltip>
          )}
        </More>
      )}
    </CommentContainer>
  );
}

const CommentContainer = styled.div`
  display: flex;
  position: relative;
  p {
    margin-left: 0.5rem;
  }
  .react-emoji {
    margin-bottom: 0.9rem;
  }
  .react-input-emoji--container {
    position: relative;
    margin: 0 0 0 1rem;
    &:focus {
      outline: #91f841;
    }
  }
  .react-input-emoji--input {
    word-break: break-all;
    padding: 0 12px 0;
  }
  .react-input-emoji--button {
    padding-top: 7px;
  }
  .react-emoji-picker--wrapper {
    position: fixed;
    top: 29.6rem;
    right: 1rem;
  }
  > button {
    position: absolute;
    right: 2.8rem;
    top: 2rem;
    font-size: 14px;
    color: #1876f2;
    background-color: #fff;
    cursor: pointer;
  }
`;

const More = styled.div`
  margin-left: 0.5rem;
  position: relative;
  cursor: pointer;
  svg {
    padding-top: 0.1rem;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  top: 2rem;
  left: -4.8rem;
  width: 6rem;
  background-color: #fff;
  border-radius: 0.5rem;
  display: flex;
  flex-direction: column;
  padding: 0.4rem;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.4);
  z-index: 10;
  &:after {
    position: absolute;
    left: 70%;
    bottom: 100%;
    width: 0;
    height: 0;
    border: solid transparent;
    border-color: rgba(51, 51, 51, 0);
    border-bottom-color: #fff;
    border-width: 10px;
    content: '';
    display: block;
  }
`;

const Button = styled.button`
  cursor: pointer;
  border-radius: 0.3rem;
  background-color: #fff;
  &:hover {
    background-color: #ededed;
  }
`;

export default CommentList;
