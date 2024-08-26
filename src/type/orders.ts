export interface IOrderModel {
  _id?: string;
  studentName: string;
  email: string;
  studentGrade: string;
  phone: string;
  schedule: {
    slots: string;
    date: Date;
  };
  status: boolean;
}
