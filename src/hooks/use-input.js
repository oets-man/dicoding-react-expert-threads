import { useState } from 'react';

function useInput(defaultValue = '') {
  const [value, setValue] = useState(defaultValue);

  const onValueChangeHandler = ({ target }) => {
    setValue(target.value);
  };

  return [value, onValueChangeHandler];
}

export default useInput;
