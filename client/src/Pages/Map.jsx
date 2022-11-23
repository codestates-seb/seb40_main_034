/*global kakao */
import { useRef, useEffect } from 'react';
import { MapContainer } from '../Components/MapSide/style';
const { kakao } = window;

const Map = () => {
  const container = useRef(null);
  const options = {
    center: new kakao.maps.LatLng(35.12, 129.1),
    level: 3,
  };
  useEffect(() => {
    const map = new kakao.maps.Map(container.current, options);
    // 주소-좌표 변환 객체
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표 검색
    //useEffect에 주소 객체 받아올 예정
    geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우
        var infowindow = new kakao.maps.InfoWindow({
          content: '<div style="width:150px;color:red;text-align:center;padding:6px 0;">테스트주소</div>',
        });
        infowindow.open(map, marker);
        //Components/MapSide 컴포넌트를 import해서 커스텀오버레이로 넣을 예정
        // 지도의 중심을 결과값위치로 이동
        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <div>
      <MapContainer ref={container} />
    </div>
  );
};

export default Map;
