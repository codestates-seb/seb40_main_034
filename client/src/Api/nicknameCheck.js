import axios from 'axios';

export const nicknameCheck = (nickname) => {
  let return_value;
  axios
    .post('http://ec2-13-125-134-99.ap-northeast-2.compute.amazonaws.com:8080/member/nickname/check', {
      nickname: nickname,
    })
    .then((response) => {
      return_value = response.data;
      if (response.existNickname === false) {
        console.log(response);
      }
    })
    .catch((Error) => {
      console.log(Error);
      return_value = true;
    });
  return return_value;
};
