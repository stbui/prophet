import { ComponentType } from 'react';

export interface ICoreRouterProps {
  children: any;
  customRoutes?: any[];
  dashboard: React.ComponentType;
  catchAll: React.ComponentType;
  Layout: React.ComponentType;
}

export interface ICoreProps extends ICoreRouterProps {
  menu?: React.ComponentType;
  brand?: React.ComponentType;
  login?: React.ComponentType;
  dataProvider?: (type?: any, resource?: any, params?: any) => Promise<any>;
}
