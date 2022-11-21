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
import { useState, useEffect, useRef } from 'react';
import { editUserInfo, getFollowInfo } from '../../Api/MyinfoApi';

const EditDetail = () => {
	const photoInput = useRef();
	const [file, setFile] = useState('');
	const [previewURL, setPreviewURL] = useState('');
	const [preview, setPreview] = useState(null);
	const [defaultImg, setDefaultImg] = useState(null);
	const initialInfo = {
		nickname: '',
		password: '',
		profileImg: '',
	};
	const [userInfo, setUserInfo] = useState(initialInfo);

	const handleInput = (e) => {
		//이미지파일 제외 회원정보
		const { name, value } = e.target;
		setUserInfo({ ...userInfo, [name]: value });
	};
	const handleFileOnChange = (fileBlob) => {
		//이미지파일 불러오기
		setFile(fileBlob);
		const fileUrl = URL.createObjectURL(fileBlob);
		setPreviewURL(fileUrl);
	};
	const handleSubmit = () => {
		var data = {
			nickname: userInfo.nickname,
			password: userInfo.password,
			profileImg: previewURL,
		};
		editUserInfo(data).then(() => {
			console.log(data);
			alert('Save Succeess');
			setUserInfo(initialInfo);
		});
	};

	const handleEditBtn = (e) => {
		e.preventDefault();
		photoInput.current.click();
	};

	useEffect(() => {
		if (file !== '') setPreview(<img src={previewURL} alt="preview" />);
		return () => {
			getFollowInfo().then((res) => {
				setDefaultImg(<img src={res[0].profileImg} alt="UserPic" />);
			});
		};
	}, [previewURL]);

	return (
		<div>
			<Header>Edit Profile</Header>
			<EditContainer>
				<form>
					<div>
						<EditText>Photo</EditText>
						<PhotoBox>
							<Photo>
								{file !== '' ? preview : null}
								{file === '' ? defaultImg : null}
							</Photo>
							<PhotoEditBtn>
								<input
									id="file"
									type="file"
									name="profileImg"
									accept="image/*"
									ref={photoInput}
									hidden={true}
									onChange={(e) => {
										handleFileOnChange(e.target.files[0]);
									}}
								/>
								<EditBtn onClick={handleEditBtn}>Edit</EditBtn>
							</PhotoEditBtn>
						</PhotoBox>
					</div>
					<div>
						<EditText>Nickname</EditText>

						<input type="text" name="nickname" value={userInfo.nickname} onChange={handleInput}></input>
					</div>
					<div>
						<EditText>Password</EditText>

						<input type="password" name="password" value={userInfo.password} onChange={handleInput}></input>
					</div>
				</form>
				<BtnContainer>
					<QuitBtn>회원탈퇴</QuitBtn>
					<SubmitBtn onClick={handleSubmit}>Submit</SubmitBtn>
				</BtnContainer>
			</EditContainer>
		</div>
	);
};

export default EditDetail;
