import MyInfo from '../Components/MyPage/MyInfo/MyInfo';
import MyList from '../Components/MyPage/MyList/MyList';
import { Container } from '../Components/MyPage/MyInfo/style';
import { useSelector, shallowEqual } from 'react-redux';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { getUserInfo } from '../Api/MyinfoApi';
const Mypage = () => {
  const { authenticated, memberId, nickname } = useSelector(
    (state) => ({
      authenticated: state.user.authenticated,
      memberId: state.user.memberId,
      nickname: state.user.nickname,
    }),
    shallowEqual,
  );
  const [userProfile, setUserProfile] = useState('');
  let { id } = useParams;

  useEffect(() => {
    getUserInfo(id).then((res) => {
      setUserProfile(res?.profileImg);
    });
  });
  return (
    <Container>
      <div className="item">
        <MyInfo
          setUserProfile={setUserProfile}
          userProfile={userProfile}
          memberId={memberId}
          authenticated={authenticated}
          nickname={nickname}
          id={id}
        />
      </div>
      <div className="item">
        <MyList id={id} memberId={memberId} />
      </div>
    </Container>
  );
};

export default Mypage;
