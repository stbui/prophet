import { useSelector } from 'react-redux';

export default () =>
    useSelector((state: any) => state.loading > 0);
