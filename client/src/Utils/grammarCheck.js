import customAlert from './customAlert';
const grammarCheck = (str) => {
  if (str.indexOf('됬') !== -1) {
    customAlert(`'됬'은 부적절한 단어입니다.`);
    throw new Error(`'됬'은 부적절한 말입니다.`);
  }
  if (str.indexOf('되서') !== -1) {
    customAlert(`'되서'는 부적절한 단어입니다.`);
    throw new Error(`'되서'는 부적절한 말입니다.`);
  }
  if (str.indexOf('됌') !== -1) {
    customAlert(`'됌'은 부적절한 단어입니다.`);
    throw new Error(`'됌'은 부적절한 말입니다.`);
  }
  return true;
};
export default grammarCheck;
