import { Modal, ToggleBtn, Following, Follower, FollowContainer } from './style';
import { getFollowInfo } from '../../../Api/MyinfoApi';
import { useState, useEffect } from 'react';
const FollowModal = (props) => {
	// 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
	const { open, close, header, select } = props;
	const [choice, setChoice] = useState(select);
	const handleChoice = (e) => {
		setChoice(e.target.value);
	};
	const [userList, setUserList] = useState([]);

	useEffect(() => {
		getFollowInfo().then((res) => {
			setUserList(res);
			console.log(userList);
		});
	}, []);

	return (
		// 모달이 열릴때 openModal 클래스가 생성된다.
		<Modal popup={open ? 'popup' : ''}>
			{open ? (
				<section>
					<header>
						{header}
						<button className="close" onClick={close}>
							&times;
						</button>
					</header>
					<main>
						<ToggleBtn>
							<label htmlFor="t1">Following</label>
							<input
								id="t1"
								name="choice"
								type="radio"
								value="following"
								onChange={handleChoice}
								checked={choice === 'following'}></input>
							<label htmlFor="t2">Follower</label>
							<input
								id="t2"
								name="choice"
								type="radio"
								value="follower"
								onChange={handleChoice}
								checked={choice === 'follower'}></input>
							<div className="outblob"></div>
							<div className="inblob"></div>
						</ToggleBtn>
						<FollowContainer>
							{choice === 'following' ? <Following>following </Following> : <Follower>follower</Follower>}
						</FollowContainer>
					</main>
					<footer>
						<button className="close" onClick={close}>
							close
						</button>
					</footer>
				</section>
			) : null}
		</Modal>
	);
};

export default FollowModal;
