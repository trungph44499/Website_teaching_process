import {Card, Row, Select, Tag, Typography} from 'antd';
import './index.css';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {teacherActions, teacherSelector} from '~/redux';
import {selector} from '~/redux/auth';
import moment from 'moment';
import {Link} from 'react-router-dom';
import ScheduleIcon from '~/assets/schedule';
import {Table} from './styled';
import {formatTime} from '~/helpers';
import {WEEKENDS} from '~/constants';

const {Title} = Typography;

const optionSchedule = [
  {
    value: '7',
    label: '7 ngày tới',
  },
  {
    value: '14',
    label: '14 ngày tới',
  },
  {
    value: '30',
    label: '30 ngày tới',
  },
  {
    value: '60',
    label: '60 ngày tới',
  },
  {
    value: '90',
    label: '90 ngày tới',
  },
  {
    value: '-7',
    label: '7 ngày trước',
  },
  {
    value: '-14',
    label: '14 ngày trước',
  },
  {
    value: '-30',
    label: '30 ngày trước',
  },
  {
    value: '-60',
    label: '60 ngày trước',
  },
  {
    value: '-90',
    label: '90 ngày trước',
  },
];

const ClassCalendar = () => {
  const schedule = useSelector(teacherSelector.selectSchedule);
  const dispatch = useDispatch()<any>;
  const user: any = useSelector(selector.user);
  const handleChange = (value: any) => {
    dispatch(teacherActions.readSchedule({params: {id: user._id, date: value}}));
  };

  const columns: any = [
    {
      title: 'STT',
      key: 'index',
      render: (_: unknown, record: unknown, index: number) => {
        return <span>{index + 1}</span>;
      },
      align: 'center',
      width: '5%',
    },
    {
      title: 'Ngày',
      key: 'date',
      align: 'center',
      render: (_: any, record: any) => {
        const date = formatTime(record.date);
        const day = WEEKENDS[moment(record.date).day()];
        return (
          <div>
            <span>{day}</span>
            <br />
            <span>{date}</span>
          </div>
        );
      },
    },
    {
      title: 'Ca học',
      key: 'time',
      align: 'center',
      render: (_: any, record: any) => {
        return <span>{record.slot.text}</span>;
      },
    },
    {
      title: 'Học sinh',
      key: 'student',
      align: 'center',
      render: (_: any, record: any) => {
        return <span>{record.students[0].name}</span>;
      },
    },
    {
      title: 'Khóa học',
      key: 'coursesName',
      align: 'center',
      render: (_: any, record: any) => {
        return <span>{record.course.courseName}</span>;
      },
    },
    {
      title: 'Link',
      key: 'link',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <Link to={record.link} target='_blank'>
            {record.link}
          </Link>
        );
      },
    },
    {
      title: 'Trạng thái',
      key: 'status',
      align: 'center',
      render: (_: any, record: any) => {
        return (
          <span>
            {record.status == 0
              ? 'Chưa học'
              : record.status == 1
              ? 'Đã hoàn thành'
              : record.status == 2
              ? 'Vắng mặt'
              : 'Đã hủy'}
          </span>
        );
      },
    },
    {
      title: 'Hành động',
      align: 'center',
      render: (_: any, record: any) => {
        if (
          moment(record.date).date() <= moment().date() &&
          moment(record.date).month() <= moment().date() &&
          moment(record.date).year() <= moment().year() &&
          moment(record.slot.start).hour() <= moment().hour() &&
          moment(record.slot.start).minute() <= moment().minute()
        ) {
          return record.feedback ? (
            <Tag color='#108ee9'>Đã báo cáo</Tag>
          ) : (
            <Link to={`/${record.idClass}/feedback/${record._id}`}>
              <Tag color='#ffc069'>Gửi báo cáo</Tag>
            </Link>
          );
        }
        return <Tag color='red'>Đang chờ</Tag>;
      },
    },
  ];
  useEffect(() => {
    dispatch(teacherActions.readSchedule({params: {id: user._id}}));
  }, [dispatch, user._id]);
  return (
    <div>
      <Card className='timeCalender'>
        <Title level={5}>Thời gian</Title>
        <Select
          defaultValue='30'
          style={{width: '100%'}}
          onChange={handleChange}
          options={optionSchedule}
        />
      </Card>
      <Card className='calendar'>
        <Row className='title'>
          <ScheduleIcon />
          <Title level={5}>Lịch dạy</Title>
        </Row>
        <Table
          loading={schedule.loading}
          bordered
          columns={columns}
          dataSource={schedule.result}
          rowKey={'_id'}
        />
      </Card>
    </div>
  );
};

export default ClassCalendar;
