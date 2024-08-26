import {AdminRouter, EmployeeRouter, MainRouter, StudentRouter, TeacherRouter} from '~/routes';

export type AppType = {
  subdomain: string;
  router: () => JSX.Element;
  main: boolean;
};

export const APPS: AppType[] = [
  {
    subdomain: 'www',
    router: MainRouter,
    main: true,
  },
  {
    subdomain: 'employee',
    router: EmployeeRouter,
    main: false,
  },
  {
    subdomain: 'teacher',
    router: TeacherRouter,
    main: false,
  },
  {
    subdomain: 'student',
    router: StudentRouter,
    main: false,
  },
  {
    subdomain: 'admin',
    router: AdminRouter,
    main: false,
  },
];
