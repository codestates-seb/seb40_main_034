import { useState } from 'react';
import styled from 'styled-components';
import { locationSearch } from '../../Api/PostApi';
import { BlackBtn, GreenBtn } from '../Common/Btn';
const PlaceSearchModal = ({ className, callback }) => {
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
    <Background className={className}>
      <Container>
        <InputContainer>
          <SearchInput id="placesearch" placeholder="장소가 어디인가요?" onChange={handleChange} />
          <GreenBtn text="검색" className="searchBtn" callback={handleClick} />
        </InputContainer>
        <Results>
          {locationsList.length !== 0 &&
            locationsList.map((list, idx) => (
              <button key={idx} onClick={() => callback(list, value, false)}>
                {`${list.place_name} : ${list.road_address_name}`}
                <br />
                {`(${list.address_name})`}
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
  &.edit {
    width: 100%;
    height: 100%;
    background-color: white;
    border-radius: 1rem;
  }
`;
const Container = styled.div`
  width: 50vw;
  height: 60vh;
  background-color: white;
  border-radius: 16px;
  overflow: auto;
`;
const InputContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: calc(50vw - 4rem);
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
  &:focus {
    outline: none;
    border-color: #91f841;
    background-color: none;
  }
  :-webkit-autofill {
    -webkit-box-shadow: 0 0 0 30px #eee inset;
    -webkit-text-fill-color: #000;
  }
`;
const Results = styled.div`
  position: relative;
  padding: 1rem 3rem 0 3rem;
  button {
    text-align: left;
    background-color: white;
    display: block;
    cursor: pointer;
    margin-bottom: 1rem;
  }
  button:hover {
    color: #aaa;
  }
`;
export default PlaceSearchModal;
