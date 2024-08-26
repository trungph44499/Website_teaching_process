import { Route, Routes } from 'react-router-dom';
import Layouts from '~/layouts';
import OrderPage from '~/features/employee/containers/OrderPage';
import OrderList from '~/features/employee/containers/OrderPage/components/List';
import EmployeeHome from '~/features/employee/containers/Home';
import SlotPage from '~/features/employee/containers/SlotPage';
import Welcome from '~/features/landing-page/Welcome';
import CreateDemoClass from '~/features/employee/containers/DemoClassPage/component/Create';
import DemoClassPage from '~/features/employee/containers/DemoClassPage';
import Courses from '~/features/employee/containers/courses';
import CreateCourses from '~/features/employee/containers/courses/component/Create';
import DetailCourses from '~/features/employee/containers/courses/component/Detail';
import PaidManager from '~/features/employee/containers/PaidManagerPage';
import PaidManagerAdd from '~/features/employee/containers/PaidManagerPage/components/Add';
import TeacherHome from '~/features/teachers/containers/Home';
import TeacherSchedule from '~/features/teachers/containers/Schedule';
import StudentHome from '~/features/students/containers/Home';
import NotFoundPage from '~/components/NotFoundPage';
import Login from '~/features/auth/Login';
import EditPaidManager from '~/features/employee/containers/PaidManagerPage/components/Edit/EditPaidManger';
import LoginAdmin from '~/features/auth/LoginAdmin';
import AdminHome from '~/features/admin/AdminHome';
import UserPage from '~/features/admin/UserPage';
import Dashboard from '~/features/employee/containers/dashboard';
import TeacherPage from '~/features/admin/TeacherPage';
import StudentSchedule from '~/features/students/containers/Schedule';
import MyQuizizz from '~/features/teachers/containers/Quizizz';
import AddQuizizz from '~/features/teachers/containers/Quizizz/component/Add/AddQuizizz';
import QuizizzCreate from '~/features/teachers/containers/Quizizz/component/QuizizzCreate/QuizizzCreate';
import HostScreen from '~/features/teachers/containers/Game/component/HostScreem/HostScreen';

import StudentPage from '~/features/admin/StudentPage';
import History from '~/features/students/containers/History';
import FeedBackPage from '~/features/teachers/containers/Feedback';
// import { io } from 'socket.io-client';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';
// import { io } from 'socket.io-client';
// import { useEffect } from 'react';
// import { useDispatch } from 'react-redux';

import { socketdActions } from '~/redux';
import QuizizzEdit from '~/features/teachers/containers/Quizizz/component/QuizizzEdit/QuizizzEdit';



export const MainRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Welcome />} />
      <Route path='/demo-register' element={<OrderPage />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export const EmployeeRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Layouts use='employee' />}>
        <Route index element={<EmployeeHome />} />
        <Route path='dashboard' element={<Dashboard models='dashboard' />} />
        <Route path='orders'>
          <Route index element={<OrderList models='orders' />} />
          <Route path='create-demo-class/:id' element={<CreateDemoClass models='demoClass' />} />
        </Route>
        <Route path='demo-class'>
          <Route index element={<DemoClassPage models='demoClass' />} />
          <Route
            path='create-demo-class/:id'
            element={<CreateDemoClass models='demoClass' isListDemoPage={true} />}
          />
        </Route>
        <Route path='paid-class'>
          <Route index element={<PaidManager models='paidClass' />} />
          <Route path='add' element={<PaidManagerAdd models='paidClass' />} />
          <Route path='edit/:id' element={<EditPaidManager models='paidClass' />} />
        </Route>
      </Route>
      <Route path='/login' element={<Login use='users' />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export const TeacherRouter = () => {


  return (
    <Routes>
      <Route path='/' element={<Layouts use='teacher' />}>
        <Route index element={<TeacherHome />} />
        <Route path='schedule' element={<TeacherSchedule />} />
        <Route path='quizzes'>
          <Route index element={<MyQuizizz />} />
          <Route path='add' element={<AddQuizizz />} />
          <Route path='addquestion/:id' element={<QuizizzCreate />} />
          {/* <Route path='edit/:id' element={<EditQuiz />} /> */}
        </Route>
        <Route path='/game'>
          <Route index element={<HostScreen />} />
          <Route path='host/:id' element={<HostScreen />} />
          <Route path='add' element={<AddQuizizz />} />
          <Route path='addquestion/:id' element={<QuizizzCreate />} />
          <Route path='edit/:id' element={<QuizizzEdit />} />
        </Route>
        <Route path=':id/feedback/:sessionId' element={<FeedBackPage />} />
      </Route>
      <Route path='/login' element={<Login use='teachers' />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export const StudentRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Layouts use='student' />}>
        <Route index element={<StudentHome />} />
        <Route path='schedule' element={<StudentSchedule />} />
        <Route path='history' element={<History />} />
        {/* <Route path='quizzes'>
          <Route index element={<QuizStudent />} />

          <Route path='games/joingame' element={<JoinGame />} />
          <Route path='games/player/:id' element={<PlayerScreen />} />

        </Route> */}
      </Route>

      <Route path='/login' element={<Login use='students' />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};

export const AdminRouter = () => {
  return (
    <Routes>
      <Route path='/' element={<Layouts use='admin' />}>
        <Route index element={<AdminHome />} />
        <Route path='users' element={<UserPage />} />
        <Route path='teachers' element={<TeacherPage />} />
        <Route path='students' element={<StudentPage />} />
        <Route path='slots' element={<SlotPage models='slots' />} />
        <Route path='courses'>
          <Route index element={<Courses models='course' />} />
          <Route path='new' element={<CreateCourses models='course' />} />
          <Route path=':id' element={<DetailCourses />} />
        </Route>
      </Route>
      <Route path='/login' element={<LoginAdmin />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
};
