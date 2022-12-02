import { useState } from 'react';
import styled from 'styled-components';
import { locationSearch } from '../../Api/PostApi';
import { BlackBtn, GreenBtn } from '../Common/Btn';
const PlaceSearchModal = ({ callback }) => {
  const [locationsList, setLocationsList] = useState([]);
  const [value, setValue] = useState('');
  const handleChange = (e) => {
    setValue(e.target.value);
  };
  const handleClick = () => {
    locationSearch(value).then((res) => {
      setLocationsList(res.documents);
    });
  };
  const handleCancel = () => {
    callback([], null, false);
  };
  return (
    <Background>
      <Container>
        <InputContainer>
          <SearchInput id="placesearch" placeholder="장소가 어디인가요?" onChange={handleChange} />
          <GreenBtn text="검색" className="searchBtn" callback={handleClick} />
        </InputContainer>
        <Results>
          {locationsList.length !== 0 &&
            locationsList.map((list, idx) => (
              <button key={idx} onClick={() => callback(list, value, false)}>
                {`${list.place_name} ${list.road_address_name}(${list.address_name})`}
              </button>
            ))}
        </Results>
      </Container>
      <BlackBtn text="닫기" className="cancel" callback={handleCancel} />
    </Background>
  );
};

const Background = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(200, 200, 200, 0.7);
  position: fixed;
  top: 0;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  .cancel {
    margin-top: 1rem;
  }
`;
const Container = styled.div`
  width: 500px;
  height: 500px;
  background-color: white;
  border-radius: 16px;
  overflow: auto;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(500px - 4rem);
  align-items: center;
  border-radius: 20px;
  margin: 1.5rem 0 0 2rem;
  padding: 0;
  font-size: 0.9rem;
  height: 2.5rem;
  background-color: #eeeeee;
  position: relative;
  .searchBtn {
    position: absolute;
    right: 0;
  }
`;
const SearchInput = styled.input`
  width: 80%;
  border-radius: 1rem;
  font-size: 1rem;
  padding: 0 1rem 0 1rem;
  height: 2rem;
  background: none;
  :focus {
    outline: none;
    border-color: #91f841;
  }
`;
const Results = styled.div`
  position: relative;

  margin-top: 1rem;
  margin-left: 3rem;
  button {
    background-color: white;
    display: block;
    cursor: pointer;
    margin-bottom: 0.5rem;
  }
  button:hover {
    text-decoration: underline;
  }
`;
export default PlaceSearchModal;
