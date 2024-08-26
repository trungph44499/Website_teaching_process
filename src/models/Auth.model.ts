import {IUserModel} from '~/type/users';

export type TPermissionField = {
  [key: string]: boolean;
};

export type TPermisstion = {
  use: boolean;
  field: TPermissionField;
};

export type TRole = {
  [key: string]: TPermisstion;
};

export type TUserResponse = {
  email: string;
  name: string;
  rule: string;
  permisstion: {
    [x: string]: TPermisstion;
  };
} & IUserModel;

export type TAuthResponse = {
  user: TUserResponse;
  permisstion: {
    [x: string]: TPermisstion;
  };
};
