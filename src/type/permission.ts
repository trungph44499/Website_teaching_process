export interface IPermissionModel {
  _id?: string;
  model: string;
  use: boolean;
  title: string;
  field: {
    [x: string]: boolean;
  };
  title_field: {
    [x: string]: string;
  };
}
