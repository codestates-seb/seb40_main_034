import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
	MyContainer,
	ProfileContainer,
	ProfilePic,
	FollowContainer,
	FollowerList,
	FollowingList,
	InfoContainer,
	ShareBtn,
	EditBtn,
	FollowBtn,
} from './style';
import FollowModal from '../FollowModal/FollowModal';
import ShareModal from '../ShareModal/ShareModal';
import { getFollowInfo } from '../../../Api/MyinfoApi';

const MyInfo = () => {
	const navigate = useNavigate();
	const [modalOpen, setModalOpen] = useState(false);
	const [shareModal, setShareModal] = useState(false);
	const [select, setSelect] = useState('');
	const [userName, setUserName] = useState('');
	const [userProfile, setUserProfile] = useState('');
	const url = window.location.href;

	// follow 모달
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

	const copyUrl = () => {
		navigator.clipboard.writeText(url).then(() => {
			setShareModal(true);
		});
	};

	const closeShareModal = () => {
		setShareModal(false);
	};

	const navigateEdit = () => {
		// edit 화면 이동
		navigate('/edit');
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
					<FollowBtn onClick={openModalFollowing}>
						<span>0</span>
						<span>following</span>
					</FollowBtn>
				</FollowingList>
				<FollowerList className="follow-text">
					<FollowBtn onClick={openModalFollower}>
						<span>0</span>
						<span>follower</span>
					</FollowBtn>
				</FollowerList>
				{modalOpen && <FollowModal open={modalOpen} close={closeModal} header="" select={select}></FollowModal>}
			</FollowContainer>
			<InfoContainer>
				<ShareBtn onClick={copyUrl}>Share</ShareBtn>
				{shareModal && <ShareModal open={shareModal} close={closeShareModal} header=""></ShareModal>}
				<EditBtn onClick={navigateEdit}>Edit</EditBtn>
			</InfoContainer>
		</MyContainer>
	);
};

export default MyInfo;
