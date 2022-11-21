import {
	Header,
	EditContainer,
	Photo,
	PhotoEditBtn,
	EditText,
	EditBtn,
	PhotoBox,
	QuitBtn,
	SubmitBtn,
	BtnContainer,
} from './style';
import { useState, useEffect } from 'react';
import { getFollowing } from '../../Api/MyinfoApi';

const EditDetail = () => {
	const [userProfile, setUserProfile] = useState('');

	useEffect(() => {
		getFollowing().then((res) => {
			console.log(res);
			setUserProfile(res[0].profileImg);
		});
	}, []);
	return (
		<div>
			<Header>Edit Profile</Header>
			<EditContainer>
				<form>
					<div>
						<EditText>Photo</EditText>
						<PhotoBox>
							<Photo>
								<img src={userProfile} alt="UserPic" />
							</Photo>
							<PhotoEditBtn>
								<EditBtn>Edit</EditBtn>
							</PhotoEditBtn>
						</PhotoBox>
					</div>
					<div>
						<EditText>Nickname</EditText>

						<input type="text" name="nickname"></input>
					</div>
					<div>
						<EditText>Password</EditText>

						<input type="password" name="password"></input>
					</div>
					<div>
						<EditText>About</EditText>

						<input type="text" name="about"></input>
					</div>
					<dix></dix>
				</form>
				<BtnContainer>
					<QuitBtn>회원탈퇴</QuitBtn>
					<SubmitBtn>Submit</SubmitBtn>
				</BtnContainer>
			</EditContainer>
		</div>
	);
};

export default EditDetail;
