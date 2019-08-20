import { useSelector } from 'react-redux';

export const useVersion = () => useSelector((state: any) => state.refresh);

export default useVersion;
