/*global kakao */

import { Container } from '../Components/MapSide/style';
import MapSide from '../Components/MapSide/MapSide';
import MapView from '../Components/MapView/MapView';
const { kakao } = window;

const Map = () => {
  const address = '서울 중구 남대문로 81 B1';
  return (
    <Container>
      <MapView address={address} />
      <MapSide address={address} />
    </Container>
  );
};

export default Map;
