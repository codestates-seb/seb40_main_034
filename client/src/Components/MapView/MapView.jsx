/*global kakao */
import { useRef, useEffect } from 'react';
import { MapContainer, Container } from '../MapSide/style';

const { kakao } = window;

export const MapView = ({ address, storename }) => {
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
    geocoder.addressSearch(address, function (result, status) {
      if (status === kakao.maps.services.Status.OK) {
        var coords = new kakao.maps.LatLng(result[0].y, result[0].x);

        // 마커
        var marker = new kakao.maps.Marker({
          map: map,
          position: coords,
        });

        // 인포윈도우
        var infowindow = new kakao.maps.InfoWindow({
          content: `<div style="padding: 10px 10px 10px 10px;text-align:center;width:150px;
           border-radius: 5px; background-color: rgb(255, 255, 255);
          color: rgb(34, 34, 34);
          font-size: 14px;
          font-weight: 880;">${storename}</div>`,
        });
        infowindow.open(map, marker);

        let zoomControl = new kakao.maps.ZoomControl();
        map.addControl(zoomControl, kakao.maps.ControlPosition.RIGHT);
        // 지도의 중심을 결과값위치로 이동
        map.setCenter(coords);
      }
    });
  }, []);

  return (
    <>
      <MapContainer ref={container} />
    </>
  );
};

export default MapView;
