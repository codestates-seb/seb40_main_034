import axios from 'axios';

export const nicknameCheck = (nickname) => {
  if (nickname !== undefined && nickname !== '') {
    axios
      .post('http://ec2-3-34-198-63.ap-northeast-2.compute.amazonaws.com:8080/member/nickname/check', {
        nickname: nickname,
      })
      .then((res) => {
        if (res.data.existNickname === false) {
          console.log(res);
          alert('가능한 닉네임입니다');
          return false;
          //setNicknamedouble(false);
        } else {
          console.log(res);
          alert('사용중인 닉네임입니다');
          //setNickname('');
        }
      })
      .catch((error) => {
        console.log(error);
      });
  } else if (nickname === '') {
    alert('닉네임을 입력해주세요');
  }
};
