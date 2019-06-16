/**
 * @license
 * Copyright Stbui All Rights Reserved.
 * https://github.com/stbui
 */

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

export interface ICrud {
  readonly GET_LIST?: string;
  readonly CREATE?: string;
  readonly UPDATE?: string;
  readonly DELETE?: string;
}
