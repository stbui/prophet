export interface Pagination {
    page: number;
    perPage: number;
}

export interface Sort {
    field: string;
    order: string;
}

export interface SortPayload {
    field: string;
    order: string;
}

export interface FilterPayload {
    [k: string]: any;
}

export interface DataAction {
    readonly type: any;
    readonly payload: object;
    readonly meta: object;
}

export interface ResourceDefinition {
    readonly name: string;
    readonly label?: string;
    readonly hasList?: boolean;
    readonly hasEdit?: boolean;
    readonly hasShow?: boolean;
    readonly hasCreate?: boolean;
}

/**
 * Redux
 */

export interface ReduxState {}

/**
 * i18nProvider
 */

export type Translate = (key: string, options?: any) => string;

export type I18nProvider = {
    translate: Translate;
    changeLocale: (locale: string, options?: any) => Promise<void>;
    getLocale: () => string;
    [key: string]: any;
};

/**
 * authProvider
 */

export type AuthProvider = {
    login: (params: any) => Promise<any>;
    logout: (params: any) => Promise<void | false | string>;
    checkAuth: (params: any) => Promise<void>;
    checkError: (error: any) => Promise<void>;
    getPermissions: (params: any) => Promise<any>;
    getIdentity?: () => Promise<any>;
    [key: string]: any;
};

export interface UserIdentity {
    id: number | string;
    fullName?: string;
    avatar?: string;
    [key: string]: any;
}
