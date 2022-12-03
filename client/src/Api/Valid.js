export const validNickname = (nickname) => {
  const regex = /^[a-z0-9]{8,15}$/g;
  if (nickname.length > 0 && regex.test(nickname)) {
    return true;
  } else {
    return false;
  }
};
export const validEmail = (email) => {
  let regex = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;

  if (email.length > 0 && regex.test(email)) {
    return true;
  } else {
    return false;
  }
};
export const validPw = (pw) => {
  let regex = /^(?=.*[a-zA-Z])(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{7,24}$/;
  if (pw.length > 0 && regex.test(pw)) {
    return true;
  } else {
    return false;
  }
};
