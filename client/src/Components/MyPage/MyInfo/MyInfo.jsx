import { useState, useEffect } from 'react';
import {
	MyContainer,
	ProfileContainer,
	ProfilePic,
	FollowContainer,
	FollowerList,
	FollowingList,
	InfoContainer,
	ShareButton,
	EditButton,
	FollowButton,
} from './style';
import FollowModal from '../FollowModal/FollowModal';
import { getFollowInfo } from '../../../Api/MyinfoApi';

const MyInfo = () => {
	const [modalOpen, setModalOpen] = useState(false);
	const [select, setSelect] = useState('');
	const [userName, setUserName] = useState('');
	const [userProfile, setUserProfile] = useState('');

	const openModalFollowing = () => {
		setModalOpen(true);
		setSelect('following');
	};
	const openModalFollower = () => {
		setModalOpen(true);
		setSelect('follower');
	};
	const closeModal = () => {
		setModalOpen(false);
	};

	useEffect(() => {
		getFollowInfo().then((res) => {
			console.log(res);
			setUserName(res[0].nickname);
			setUserProfile(res[0].profileImg);
		});
	}, []);
	return (
		<MyContainer>
			<ProfileContainer>
				<ProfilePic>
					<img src={userProfile} alt="UserPic" />
				</ProfilePic>
				<div className="nickname-text">{userName}</div>
			</ProfileContainer>
			<FollowContainer>
				<FollowingList className="follow-text">
					<FollowButton onClick={openModalFollowing}>
						<span>0</span>
						<span>following</span>
					</FollowButton>
				</FollowingList>
				<FollowerList className="follow-text">
					<FollowButton onClick={openModalFollower}>
						<span>0</span>
						<span>follower</span>
					</FollowButton>
				</FollowerList>
				{modalOpen && <FollowModal open={modalOpen} close={closeModal} header="" select={select}></FollowModal>}
			</FollowContainer>
			<InfoContainer>
				<ShareButton>
					<span>Share</span>
				</ShareButton>
				<EditButton>
					<span>Edit</span>
				</EditButton>
			</InfoContainer>
		</MyContainer>
	);
};

export default MyInfo;
