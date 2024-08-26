import { TMenu } from '~/models/Menu.model';
import {
  AiOutlineSchedule,
  AiOutlineFund,
  AiOutlineCalendar,
  AiOutlineClockCircle,
  AiOutlineFolderOpen,
  AiOutlineRobot,
  AiOutlineCodeSandbox,
  AiOutlineGroup,
} from 'react-icons/ai';
import { FaHistory, FaUserGraduate, FaUsersCog, FaUserTie } from 'react-icons/fa';

const appmenu: TMenu = {
  student: [
    {
      key: '',
      icon: <AiOutlineFund />,
      label: 'Bảng điều khiển',
      src: '/',
    },
    {
      key: 'schedule',
      icon: <AiOutlineCalendar />,
      label: 'Lịch học',
      src: '/schedule',
    },
    {
      key: 'history',
      icon: <FaHistory />,
      label: 'Lịch sử học',
      src: '/history',
    },

  ],
  teacher: [
    {
      key: '',
      icon: <AiOutlineFund />,
      label: 'Bảng điều khiển',
      src: '/',
    },
    {
      key: 'schedule',
      icon: <AiOutlineCalendar />,
      label: 'Lịch dạy',
      src: '/schedule',
    },
    {
      key: 'Quizzes',
      icon: <AiOutlineRobot />,
      label: 'Quizzes',
      src: '/quizzes',
    },
  ],
  admin: [
    {
      key: '',
      icon: <AiOutlineFund />,
      label: 'Bảng điều khiển',
      src: '/',
    },
    {
      key: 'users',
      icon: <FaUsersCog />,
      label: 'Người dùng',
      src: '/users',
    },
    {
      key: 'teachers',
      icon: <FaUserTie />,
      label: 'Giáo viên',
      src: '/teachers',
    },
    {
      key: 'students',
      icon: <FaUserGraduate />,
      label: 'Học sinh',
      src: '/students',
    },
    {
      key: 'slots',
      icon: <AiOutlineClockCircle />,
      label: 'Ca học',
      role: 'slots',
      src: '/slots',
    },
    {
      key: 'courses',
      icon: <AiOutlineFolderOpen />,
      label: 'Khóa học',
      role: 'course',
      src: '/courses',
    },
  ],
  employee: [
    {
      key: 'dashboard',
      icon: <AiOutlineFund />,
      label: 'Bảng điều khiển',
      role: 'dashboard',
      src: '/dashboard',
    },
    {
      key: 'orders',
      icon: <AiOutlineSchedule />,
      label: 'Đơn đăng ký',
      role: 'orders',
      src: '/orders',
    },
    {
      key: 'demo-class',
      icon: <AiOutlineCodeSandbox />,
      label: 'Lớp học thử',
      role: 'demoClass',
      src: '/demo-class',
    },
    {
      key: 'paidmanager',
      icon: <AiOutlineGroup />,
      label: 'Lớp chính thức',
      role: 'paidClass',
      src: '/paid-class',
    },
  ],
};

export default appmenu;
