import { Modal, ToggleBtn, Follow, FollowContainer, TogglebtnContainer, Container, FollowBtn } from './style';
import { getFollowInfo, addFollow } from '../../../Api/MyinfoApi';
import { useState, useEffect } from 'react';
const FollowModal = (props) => {
	// 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
	const { open, close, header, select } = props;
	const [choice, setChoice] = useState(select);
	const [userList, setUserList] = useState([]);

	const handleChoice = (e) => {
		setChoice(e.target.value);
	};
	const removeFollowing = (id) => {
		setUserList(userList.filter((user) => user.id !== id));
		addFollow(id).then((res) => {
			console.log(res);
		});
	};

	useEffect(() => {
		getFollowInfo().then((res) => {
			console.log(res);
			console.log(res[0].nickname);
			setUserList(res);
		});
	}, []);

	return (
		// 모달이 열릴때 openModal 클래스가 생성된다.
		<Modal popup={open ? 'popup' : ''} onClick={close}>
			{open ? (
				<section>
					<header>
						{header}
						<button className="close" onClick={close}>
							&times;
						</button>
					</header>
					<main>
						<Container onClick={(e) => e.stopPropagation()}>
							<TogglebtnContainer>
								<ToggleBtn onClick={handleChoice} value="following" choice={choice}>
									Following
								</ToggleBtn>
								<ToggleBtn onClick={handleChoice} value="follower" choice={choice}>
									Follower
								</ToggleBtn>
							</TogglebtnContainer>

							<FollowContainer>
								<Follow>
									{choice === 'following'
										? userList.map((follow, idx) => {
												return (
													<div className="follow-item" key={idx}>
														<div className="follow-img">
															<img src={follow.profileImg} alt="UserPic" />
														</div>
														<div className="follow-name">{follow.nickname}</div>
														<FollowBtn
															key={follow.id}
															onClick={() => {
																removeFollowing(follow.id);
															}}>
															Unfollow
														</FollowBtn>
													</div>
												);
										  })
										: userList.map((follow, idx) => {
												return (
													<div className="follow-item" key={idx}>
														<div className="follow-img">
															<img src={follow.profileImg} alt="UserPic" />
														</div>
														<div className="follow-name">{follow.nickname}</div>
														<FollowBtn>follow</FollowBtn>
													</div>
												);
										  })}
								</Follow>
							</FollowContainer>
						</Container>
					</main>
					<footer></footer>
				</section>
			) : null}
		</Modal>
	);
};

export default FollowModal;
