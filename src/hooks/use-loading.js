import { useSelector } from 'react-redux';

export const useLoading = () => {
  const loadingBar = useSelector((states) => states.loadingBar);
  return loadingBar.default === 1;
};
