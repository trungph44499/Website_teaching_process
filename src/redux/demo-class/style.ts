export interface IDemoClassModel {
  _id?: string;
  teacher: string;
  student: string;
  saleman: string;
  status: boolean;
  link: string;
  schedule: {
    slots: string;
    date: Date;
  };
}
