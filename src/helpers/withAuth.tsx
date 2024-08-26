import {Empty, Skeleton} from 'antd';
import React from 'react';
import {useSelector} from 'react-redux';
import NotFoundPage from '~/components/NotFoundPage';
import {TPermisstion} from '~/models/Auth.model';
import {selector} from '~/redux/auth';
import {FcLock} from 'react-icons/fc';
import api from '~/api';

export type PropertyKeyType = 'create' | 'update' | 'delete' | 'readonly' | '';

type Props<T> = T & {
  models?: string;
};

export default function withAuth<T>(
  Component: React.ComponentType<Props<T>>,
  propertyKey: PropertyKeyType = ''
) {
  function FuncComponent(props: Props<T>) {
    const myAccount = useSelector(selector.user);

    if (!api.getToken() && !myAccount) {
      return <NotFoundPage />;
    }

    if (!props.models) {
      return <Component {...props} />;
    }

    if (!myAccount) {
      return <Skeleton active />;
    }

    const modelsExist = myAccount && myAccount.permisstion && myAccount.permisstion[props.models];
    const iSuperAdmin = myAccount && myAccount.super_admin;
    const modelsExistUse = modelsExist && modelsExist.use;
    const useField = propertyKey && modelsExistUse && modelsExist.field[propertyKey];
    const propertyUsing = propertyKey ? useField : modelsExistUse;

    if (api.getToken() && (iSuperAdmin || propertyUsing)) {
      return <Component {...props} permisstion={modelsExist as TPermisstion} />;
    }

    return (
      <Empty
        style={{
          backgroundColor: '#ffffff',
          borderRadius: '8px',
          padding: '1rem',
        }}
        image={<FcLock size={100} />}
        description='Access Denied'
      />
    );
  }
  return FuncComponent;
}
