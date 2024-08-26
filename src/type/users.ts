export interface IUserModel {
  _id?: string;
  name: string;
  email: string;
  username: string;
  password: string;
  permisstion: any;
  gender: string;
  country: string;
  phone: string;
  is_deleted: boolean;
  super_admin: boolean;
}
