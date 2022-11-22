import MyInfo from '../Components/MyPage/MyInfo/MyInfo';
import MyList from '../Components/MyPage/MyList/MyList';
import { Container } from '../Components/MyPage/MyInfo/style';
const Mypage = () => {
  return (
    <Container>
      <div className="item">
        <MyInfo />
      </div>
      <div className="item">
        <MyList />
      </div>
    </Container>
  );
};

export default Mypage;
