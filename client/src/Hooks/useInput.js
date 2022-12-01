import { useState } from 'react';

const useInput = (initialValue = '') => {
  const [value, setValue] = useState(initialValue);

  function handleChangeValue(e) {
    let value = e.target.value;
    setValue(value);
  }

  return [value, setValue, handleChangeValue];
};

export default useInput;
