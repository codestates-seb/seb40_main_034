import axios from 'axios';

export const nicknameCheck = async (nickname) => {
  let return_value;
  await axios
    .get('http://ec2-13-125-134-99.ap-northeast-2.compute.amazonaws.com:8080/member/nickname/check', {
      nickname: nickname,
    })
    .then((response) => {
      return_value = response.data;
    })
    .catch(function (error) {
      console.log(error);
      return_value = true;
    });
  return return_value;
};
