export interface ITeacherModel {
  _id?: string;
  name: string;
  fullname?: string;
  email: string;
  languages: string;
  permisstion: any;
  gender: string;
  country: string;
  phone: string;
  is_deleted: boolean;
  link?: string;
  demoBookedSlots: object[];
  paidBookedSlots: object[];
}
