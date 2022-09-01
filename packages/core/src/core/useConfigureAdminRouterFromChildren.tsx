import React from 'react';
import {
    Children,
    Dispatch,
    Fragment,
    ReactElement,
    ReactNode,
    SetStateAction,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { useLogout, usePermissions, useAuthState } from '../auth';
import { useResourceDefinitionContext } from './useResourceDefinitionContext';

export const useConfigureAdminRouterFromChildren = (
    children: any
): RoutesAndResources & { status: AdminRouterStatus } => {
    const { permissions, isLoading } = usePermissions();

    const [routesAndResources, status] = useRoutesAndResourcesFromChildren(
        children,
        permissions,
        isLoading
    );

    useRegisterResources(routesAndResources.resources, permissions);

    return {
        customRoutesWithLayout: routesAndResources.customRoutesWithLayout,
        customRoutesWithoutLayout: routesAndResources.customRoutesWithoutLayout,
        status,
        resources: routesAndResources.resources,
    };
};

const useRoutesAndResourcesFromChildren = (
    children: ReactNode,
    permissions: any,
    isLoading: boolean
): [RoutesAndResources, AdminRouterStatus] => {
    const doLogout = useLogout();
    const { authenticated } = useAuthState();
    const [routesAndResources, setRoutesAndResources, mergeRoutesAndResources] =
        useRoutesAndResourcesState(getRoutesAndResourceFromNodes(children));

    const [status, setStatus] = useState<AdminRouterStatus>(() =>
        getStatus({
            children,
            ...routesAndResources,
        })
    );

    useEffect(() => {
        const resolveChildFunction = async (childFunc: any) => {
            try {
                const childrenFuncResult = childFunc(permissions);
                if ((childrenFuncResult as Promise<ReactNode>)?.then) {
                    (childrenFuncResult as Promise<ReactNode>).then(
                        resolvedChildren => {
                            mergeRoutesAndResources(
                                getRoutesAndResourceFromNodes(resolvedChildren)
                            );
                            setStatus('ready');
                        }
                    );
                } else {
                    mergeRoutesAndResources(
                        getRoutesAndResourceFromNodes(childrenFuncResult)
                    );
                    setStatus('ready');
                }
            } catch (error) {
                console.error(error);
                doLogout();
            }
        };

        const updateFromChildren = async () => {
            const functionChild = getSingleChildFunction(children);
            const newRoutesAndResources =
                getRoutesAndResourceFromNodes(children);
            setRoutesAndResources(newRoutesAndResources);
            setStatus(
                !!functionChild
                    ? 'loading'
                    : newRoutesAndResources.resources.length > 0
                    ? 'ready'
                    : 'empty'
            );

            if (functionChild) {
                resolveChildFunction(functionChild);
            }
        };
        if (!isLoading) {
            updateFromChildren();
        }
    }, [
        authenticated,
        children,
        doLogout,
        isLoading,
        mergeRoutesAndResources,
        permissions,
        setRoutesAndResources,
        setStatus,
    ]);

    return [routesAndResources, status];
};

const useRoutesAndResourcesState = (
    initialState: RoutesAndResources
): [
    RoutesAndResources,
    Dispatch<SetStateAction<RoutesAndResources>>,
    (newRoutesAndResources: RoutesAndResources) => void
] => {
    const [routesAndResources, setRoutesAndResources] = useState(initialState);

    const mergeRoutesAndResources = useCallback(
        (newRoutesAndResources: RoutesAndResources) => {
            setRoutesAndResources(previous => ({
                customRoutesWithLayout: previous.customRoutesWithLayout.concat(
                    newRoutesAndResources.customRoutesWithLayout
                ),
                customRoutesWithoutLayout:
                    previous.customRoutesWithoutLayout.concat(
                        newRoutesAndResources.customRoutesWithoutLayout
                    ),
                resources: previous.resources.concat(
                    newRoutesAndResources.resources
                ),
            }));
        },
        []
    );

    return [routesAndResources, setRoutesAndResources, mergeRoutesAndResources];
};

const useRegisterResources = (
    resources: (ReactElement<any> & ResourceWithRegisterFunction)[],
    permissions: any
) => {
    const { register, unregister } = useResourceDefinitionContext();

    useEffect(() => {
        resources.forEach(resource => {
            if (
                typeof (
                    resource.type as unknown as ResourceWithRegisterFunction
                ).registerResource === 'function'
            ) {
                const definition = (
                    resource.type as unknown as ResourceWithRegisterFunction
                ).registerResource(resource.props, permissions);
                register(definition);
            } else {
                throw new Error(
                    'When using a custom Resource element, it must have a static registerResource method accepting its props and returning a ResourceDefinition'
                );
            }
        });
        return () => {
            resources.forEach(resource => {
                if (
                    typeof (
                        resource.type as unknown as ResourceWithRegisterFunction
                    ).registerResource === 'function'
                ) {
                    const definition = (
                        resource.type as unknown as ResourceWithRegisterFunction
                    ).registerResource(resource.props, permissions);
                    unregister(definition);
                } else {
                    throw new Error(
                        'When using a custom Resource element, it must have a static registerResource method accepting its props and returning a ResourceDefinition'
                    );
                }
            });
        };
    }, [permissions, register, resources, unregister]);
};

const getStatus = ({
    children,
    resources,
    customRoutesWithLayout,
    customRoutesWithoutLayout,
}: {
    children: ReactNode;
    resources: ReactElement<any>[];
    customRoutesWithLayout: ReactElement<any>[];
    customRoutesWithoutLayout: ReactElement<any>[];
}) => {
    return getSingleChildFunction(children)
        ? 'loading'
        : resources.length > 0 ||
          customRoutesWithLayout.length > 0 ||
          customRoutesWithoutLayout.length > 0
        ? 'ready'
        : 'empty';
};

const getSingleChildFunction = (children: ReactNode): any | null => {
    const childrenArray = Array.isArray(children) ? children : [children];

    const functionChildren = childrenArray.filter(
        child => typeof child === 'function'
    );

    if (functionChildren.length > 1) {
        throw new Error(
            'You can only provide one function child to AdminRouter'
        );
    }

    if (functionChildren.length === 0) {
        return null;
    }

    return functionChildren[0] as any;
};

const getRoutesAndResourceFromNodes = (
    children: ReactNode
): RoutesAndResources => {
    const customRoutesWithLayout: any = [];
    const customRoutesWithoutLayout: any = [];
    const resources: any = [];
    Children.forEach(children, element => {
        if (!React.isValidElement(element)) {
            return;
        }
        if (element.type === Fragment) {
            const customRoutesFromFragment = getRoutesAndResourceFromNodes(
                element.props.children
            );
            customRoutesWithLayout.push(
                ...customRoutesFromFragment.customRoutesWithLayout
            );
            customRoutesWithoutLayout.push(
                ...customRoutesFromFragment.customRoutesWithoutLayout
            );
            resources.push(...customRoutesFromFragment.resources);
        }

        if ((element.type as any).raName === 'CustomRoutes') {
            const customRoutesElement = element as ReactElement<any>;

            if (customRoutesElement.props.noLayout) {
                customRoutesWithoutLayout.push(
                    customRoutesElement.props.children
                );
            } else {
                customRoutesWithLayout.push(customRoutesElement.props.children);
            }
        } else if ((element.type as any).raName === 'Resource') {
            resources.push(element as ReactElement<any>);
        }
    });

    return {
        customRoutesWithLayout,
        customRoutesWithoutLayout,
        resources,
    };
};

type RoutesAndResources = {
    customRoutesWithLayout: ReactElement<any>[];
    customRoutesWithoutLayout: ReactElement<any>[];
    resources: (ReactElement<any> & ResourceWithRegisterFunction)[];
};

type ResourceWithRegisterFunction = {
    registerResource: (props: any, permissions: any) => any;
};

type AdminRouterStatus = 'loading' | 'empty' | 'ready';
