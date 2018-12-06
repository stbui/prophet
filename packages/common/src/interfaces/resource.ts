/**
 *
 */

import { ComponentType } from 'react';

export interface ICurdComponetType {
  list?: React.ComponentType;
  edit?: React.ComponentType;
  create?: React.ComponentType;
  show?: React.ComponentType;
}

export interface IResourceProps extends ICurdComponetType {
  catchAll?: React.ComponentType;
  name: string;
  label?: string;
  context?: 'registration';
  match?: any;
  registerResource?: (resource: any) => void;
}

export interface IResourceState {}

export interface IResource extends ICurdComponetType {
  basePath: any;
  resource?: string;
  label?: string;
  hasList: boolean;
  hasEdit: boolean;
  hasCreate: boolean;
  hasShow: boolean;
  name?: string;
  match?: string;
  context?: string;
  catchAll?: any;
}

/**
 *
 */
export interface IListProps {
  children?: React.ComponentType;
  actions?: React.ComponentType;
  basePath?: any;
  name?: string;
  label?: string;
  hasList: boolean;
  hasEdit: boolean;
  hasCreate: boolean;
  hasShow: boolean;
}
