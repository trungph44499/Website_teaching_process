import {Button, Card, Form, Modal, Row, Select, Table, TreeSelect, Typography} from 'antd';
import './index.css';
import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {selector} from '~/redux/auth';
import moment from 'moment';
import {Link} from 'react-router-dom';
import ScheduleIcon from '~/assets/schedule';
import {
  paidmanagerActions,
  paidmanagerSelector,
  studentActions,
  studentSelector,
  teacherActions,
  teacherSelector,
} from '~/redux';
import {capitalizeFirstLetter, formatTime, groupDayOfWeek} from '~/helpers';
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
interface ParamProps {
  _id?: string;
  sessionId?: string;
  content?: {
    date?: string;
    slot?: string;
  };
}
const StudentSchedule = () => {
  const [form] = Form.useForm();

  const dispatch = useDispatch()<any>;
  const user: any = useSelector(selector.user);
  const schedule = useSelector(studentSelector.selectSchedule);
  const listSlots = useSelector(teacherSelector.selectList);
  const {listStart} = useSelector(paidmanagerSelector.selectList);

  const [open, setOpen] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);
  const [treeData, setTreeData] = useState([]);
  const [startDate, setStartDate] = useState<string>();
  const [formData, setFormData] = useState<ParamProps>();
  const [infoTeacher, setInfoTeacher] = useState<any>();
  const [course, setCourse] = useState<any>();

  const setValueTreeData = () => {
    if (!listSlots.listSlot.schedule) return;
    const data = listSlots.listSlot.schedule.filter((item: any) => item.is_booked == false);
    let schedule = groupDayOfWeek(data);

    schedule = schedule.map((item: any, i: number) => {
      return {
        title: capitalizeFirstLetter(WEEKENDS[i]),
        value: capitalizeFirstLetter(WEEKENDS[i]),
        selectable: false,
        children: item.map((itm: any) => {
          return {
            title: capitalizeFirstLetter(WEEKENDS[i]) + ' ' + itm.slot.text,
            value: itm._id,
          };
        }),
      };
    });
    schedule = schedule.filter((item: any) => item);
    setTreeData(schedule);
  };
  const onChangeSelect = (value: string, label: any) => {
    const data = listSlots.listSlot.schedule.find((item: any) => item._id == value);
    setStartDate(data.day);
    setFormData({...formData, content: {...formData?.content, slot: value}});
  };
  const tProps = {
    treeData,
    allowClear: true,
    onChange: onChangeSelect,
    placeholder: 'Vui lòng chọn',
    style: {
      width: '100%',
    },
  };
  const openModal = (value: any) => {
    setCourse(value.course);
    setOpen(true);
    setInfoTeacher(value.teacher);
    setFormData({...formData, _id: value.idClass, sessionId: value._id});
  };
  const handleSubmit = async () => {
    setConfirmLoading(true);
    await dispatch(paidmanagerActions.updateSchedule({params: formData})).then((res: any) => {
      if (res.payload.status == 'success') {
        dispatch(studentActions.readSchedule({params: {id: user?._id}}));
        setOpen(false);
        form.resetFields();
      }
    });
    setConfirmLoading(false);
  };
  const handleOk = () => {
    form.validateFields().then(() => {
      Modal.confirm({
        content: 'Xác nhận đổi lịch học ?',
        onOk: handleSubmit,
        centered: true,
      });
    });
  };
  const handleChange = (value: any) => {
    if (user) dispatch(studentActions.readSchedule({params: {id: user?._id, date: value}}));
  };
  const handleCancel = () => {
    setOpen(false);
    form.resetFields();
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
      title: 'Ngày học',
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
      title: 'Giờ học',
      key: 'time',
      align: 'center',
      render: (_: any, record: any) => {
        return <span>{record.slot.text}</span>;
      },
    },
    {
      title: 'Tên khóa học',
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
      title: 'Giáo viên',
      key: 'teacher',
      align: 'center',
      render: (_: any, record: any) => {
        return <span>{record.teacher.name}</span>;
      },
    },
    {
      title: 'Hoạt động',
      align: 'center',
      render: (_: any) => {
        return (
          <Button type='primary' onClick={() => openModal(_)}>
            Đổi lịch
          </Button>
        );
      },
    },
  ];
  useEffect(() => {
    setValueTreeData();
  }, [listSlots]);
  useEffect(() => {
    if (user) dispatch(studentActions.readSchedule({params: {id: user?._id}}));
  }, [dispatch, user]);
  useEffect(() => {
    infoTeacher && dispatch(teacherActions.readSlots({params: infoTeacher._id}));
  }, [infoTeacher]);
  useEffect(() => {
    startDate && dispatch(paidmanagerActions.getDateStart({params: {day: startDate}}));
  }, [startDate]);
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
          <Title level={5}>Lịch học</Title>
        </Row>
        <Table
          bordered
          loading={schedule.loading}
          columns={columns}
          dataSource={schedule.result}
          rowKey='_id'
        />
      </Card>
      <Modal
        title='Đổi lịch học'
        open={open}
        confirmLoading={confirmLoading}
        centered
        onCancel={handleCancel}
        footer={[
          <Button key='back' onClick={handleCancel}>
            Thoát
          </Button>,
          <Button key='submit' type='primary' onClick={handleOk}>
            Đổi lịch
          </Button>,
        ]}
      >
        <div className='info-wrapper'>
          <div className='info-class'>
            Môn học: <span>{course?.courseName}</span>
          </div>
          <div className='info-class'>
            Giáo viên: <span>{infoTeacher?.name}</span>
          </div>
        </div>
        <Form form={form} layout={'vertical'} scrollToFirstError>
          <Form.Item
            label='Ca học có thể đổi đến:'
            name='schedule'
            rules={[
              {
                required: true,
                message: 'Bắt buộc chọn !',
              },
            ]}
          >
            <TreeSelect {...tProps} size='large' />
          </Form.Item>
          {formData?.content?.slot && (
            <Form.Item
              label='Đổi đến ngày:'
              name='start_date'
              rules={[
                {
                  required: true,
                  message: 'Bắt buộc chọn !',
                },
              ]}
            >
              <Select
                showSearch
                size='large'
                placeholder=''
                onChange={(item: any) =>
                  setFormData({
                    ...formData,
                    content: {...formData?.content, date: formatTime(item)},
                  })
                }
                optionFilterProp='children'
                filterOption={(input: any, option: any) =>
                  (option!.children as unknown as string)
                    .toLowerCase()
                    .includes(input.toLowerCase())
                }
              >
                {Array.isArray(listStart) &&
                  listStart?.map((item: any) => (
                    <Select.Option key={item} value={item}>
                      {formatTime(item)}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default StudentSchedule;
