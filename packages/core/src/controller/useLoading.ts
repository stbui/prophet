import { useSelector } from 'react-redux';

export const useLoading = () => useSelector((state: any) => state.loading > 0);

export default useLoading;
