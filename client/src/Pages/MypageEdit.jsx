import { Container } from '../Components/MyPage/MyInfo/style';
import EditDetail from '../Components/EditDetail/EditDetail';
import { useSelector, shallowEqual } from 'react-redux';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../Api/MyinfoApi';
const MypageEdit = () => {
  const { memberId, nickname } = useSelector(
    (state) => ({
      memberId: state.user.memberId,
      nickname: state.user.nickname,
    }),
    shallowEqual,
  );

  const [profileImg, setProfileImg] = useState('');
  useEffect(() => {
    getUserInfo(memberId).then((res) => {
      setProfileImg(res?.profileImg);
    });
  });
  return (
    <Container>
      <div className="edititem">
        <EditDetail memberId={memberId} profileImg={profileImg} />
      </div>
    </Container>
  );
};

export default MypageEdit;
