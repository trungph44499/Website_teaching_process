import {reducer as paidmanagerReducer} from './paidmanager';
import {reducer as coursesReducer} from './courses';
import {reducer as orderReducer} from './orders';
import {reducer as slotsReducer} from './slot';
import {reducer as schedulePaidReducer} from './schedule/paid';
import {reducer as studentReducer} from './student';
import {reducer as teacherReducer} from './teacher';
import {reducer as demoClassReducer} from './demo-class';
import {reducer as authReducer} from './auth';
import {reducer as userReducer} from './users';
import {reducer as permissionReducer} from './permission';
import appReducer from './app.reducer';
import {reducer as curriculumReducer} from './curriculum';
import {reducer as quizessReducer} from './quizess';
import {reducer as uploadReducer} from './upload';
import {reducer as feedbackReducer} from './feedback';
import {reducer as loaderboardReducer} from './Loaderboard';
import {reducer as socketReducer} from './socket';
import { reducer as gameReducer } from './game';
import {reducer as playerResultReducer} from './playerResult';


export const reducer = {
  app: appReducer,
  paidmanager: paidmanagerReducer,
  courses: coursesReducer,
  order: orderReducer,
  student: studentReducer,
  teacher: teacherReducer,
  slots: slotsReducer,
  schedulePaid: schedulePaidReducer,
  demoClass: demoClassReducer,
  auth: authReducer,
  user: userReducer,
  permission: permissionReducer,
  curriculum: curriculumReducer,
  quizess: quizessReducer,
  upload: uploadReducer,
  feedback: feedbackReducer,
  loaderboard: loaderboardReducer,
  socket: socketReducer,
  game: gameReducer,
  playerresult: playerResultReducer,
};
