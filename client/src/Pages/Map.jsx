/*global kakao */
import { useRef, useEffect } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import styled from 'styled-components';
import MapSide from '../Components/MapSide/MapSide';
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
    // 주소-좌표 변환 객체 생성
    const geocoder = new kakao.maps.services.Geocoder();
    // 주소로 좌표 검색
    geocoder.addressSearch('제주특별자치도 제주시 첨단로 242', function (result, status) {
      // 정상적으로 검색 완료
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
