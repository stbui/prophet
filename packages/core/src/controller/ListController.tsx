import useListController, { ListProps } from './useListController';

interface Props extends ListProps {
    children(props): any;
}

export const ListController = ({ children, ...props }: Props) => {
    const controllerProps = useListController(props);

    return children({ ...controllerProps });
};

export default ListController;
