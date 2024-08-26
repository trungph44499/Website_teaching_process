import * as S from './styled';
import {useEffect, useState} from 'react';
import './index.css';
import {Col, Form, message, Radio, Row, Select} from 'antd';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '~/redux/store';
import moment from 'moment';
import {useNavigate, useParams} from 'react-router-dom';
import {
  demoClassActions,
  ordersActions,
  slotAction,
  slotSelector,
  teacherActions,
  teacherSelector,
} from '~/redux';
import withAuth from '~/helpers/withAuth';
import {RangePickerProps} from 'antd/lib/date-picker';
import HeaderPage from '~/components/common/HeaderPage';
import ListTeacherApply from '../ListTeacherApply';
import {selector} from '~/redux/auth';
import Loading from '~/components/common/Loading';

type Props = {
  isListDemoPage?: boolean;
};
const CreateDemoClass = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();
  const slotStore = useAppSelector(slotSelector.selectList);
  const listTeacher = useAppSelector(teacherSelector.selectList);
  const [loading, setLoading] = useState(false);
  const [listApply, setListApply] = useState([]);
  const idTeacher = Form.useWatch('teacher', form);
  const user = useAppSelector(selector.user);

  const {id}: any = useParams();
  const navigate = useNavigate();
  const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current && current < moment().endOf('day');
  };
  const onFinish = (values: any) => {
    if (props.isListDemoPage) {
      dispatch(demoClassActions.update({params: {...values, _id: id}})).then(() => {
        message.success('Tạo lớp học thành công');
        navigate('/demo-class');
      });
    } else {
      dispatch(
        demoClassActions.create({
          params: {...values, saleman: user?._id, student: id},
        })
      ).then(({payload}: any) => {
        if (payload.status == 'success') {
          message.success('Tạo lớp học thành công');
          navigate('/demo-class');
        }
      });
    }
  };

  const onchangeTeacher = (id: string) => {
    const teacher = listTeacher.result.find((item: any) => item._id == id);
    form.setFieldsValue({
      link: teacher.link,
    });
  };

  const applyTeacher = (value: any) => {
    form.setFieldsValue({
      teacher: value._id,
      link: value.link,
    });
  };

  const setValueListApply = (input: any) => {
    const dataListApply = input.map((item: any) => {
      return {
        ...item,
        title: item.name,
      };
    });
    setListApply(dataListApply);
  };

  useEffect(() => {
    (async () => {
      if (props.isListDemoPage) {
        setLoading(true);
        const {payload} = await dispatch(demoClassActions.read({params: id}));
        form.setFieldsValue({
          ...payload.student,
          schedule: {
            slot: payload.schedule[0].slot._id,
            date: moment(payload.student.schedule.date),
          },
          teacher: payload.teacher?._id,
          link: payload.teacher?.link,
        });
        setValueListApply(payload.student.listApply);
        setLoading(false);
      } else {
        setLoading(true);
        const {payload} = await dispatch(ordersActions.read({params: id}));
        form.setFieldsValue({
          ...payload,
          schedule: {
            slot: payload.schedule.slots._id,
            date: moment(payload.schedule.date),
          },
        });
        setValueListApply(payload.listApply);
        setLoading(false);
      }
    })();
    dispatch(slotAction.fetch({}));
    dispatch(teacherActions.fetch({}));
  }, [dispatch, form, id]);
  return (
    <S.Wrapper>
      <HeaderPage
        title='Tạo lớp học thử'
        breadcrumb={[{text: 'Danh sách yêu cầu', link: '/orders'}, {text: 'Tạo lớp học thử'}]}
      />
      {slotStore.loading ? (
        <Loading />
      ) : (
        <Row gutter={16}>
          <Col span={16}>
            <Form onFinish={onFinish} form={form}>
              <Col>
                <S.LabelCustom>Email</S.LabelCustom>
                <S.FormCustom
                  name='email'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập Email!',
                    },
                    {
                      type: 'email',
                      message: 'Vui lòng nhập đúng định dạng email!',
                    },
                  ]}
                >
                  <S.InputCustom disabled />
                </S.FormCustom>
              </Col>
              <Col>
                <S.LabelCustom>Tên học sinh</S.LabelCustom>
                <S.FormCustom
                  name='studentName'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng nhập tên học sinh!',
                    },
                  ]}
                >
                  <S.InputCustom placeholder='VD: Nguyen Van A' disabled />
                </S.FormCustom>
              </Col>
              <Col>
                <S.LabelCustom htmlFor=''>Số điện thoại của Ba mẹ</S.LabelCustom>
                <S.FormCustom
                  name='phone'
                  rules={[
                    () => ({
                      validator(_, value) {
                        if (value == '') {
                          return Promise.reject('Vui lòng nhập số điện thoại Ba mẹ!');
                        }
                        if (isNaN(value)) {
                          return Promise.reject('Số điện thoại phải là số!.');
                        }
                        if (value.length > 11) {
                          return Promise.reject('Số điện thoại phải dưới 11 kí tự!');
                        }
                        if (value.length < 10) {
                          return Promise.reject('Số điện thoại phải trên 10 kí tự!');
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <S.InputCustom disabled />
                </S.FormCustom>
              </Col>
              <Col>
                <S.LabelCustom>Trẻ học lớp</S.LabelCustom>
                <S.FormCustom
                  name='studentGrade'
                  rules={[
                    {
                      required: true,
                      message: 'Vui lòng chọn độ cấp độ học của trẻ',
                    },
                  ]}
                >
                  <Radio.Group disabled>
                    <Radio.Button value='lớp 1'>Lớp 1</Radio.Button>
                    <Radio.Button value='lớp 2-3'>Lớp 2-3</Radio.Button>
                    <Radio.Button value='lớp 4-6'>Lớp 4-6</Radio.Button>
                    <Radio.Button value='lớp 7-9'>Lớp 7-9</Radio.Button>
                    <Radio.Button value='lớp 10-12'>Lớp 10-12</Radio.Button>
                  </Radio.Group>
                </S.FormCustom>
              </Col>

              <Row gutter={16}>
                <Col span={12}>
                  <S.LabelCustom>Chọn giáo viên</S.LabelCustom>
                  <Form.Item name='teacher'>
                    <Select
                      loading={listTeacher.loading}
                      showSearch
                      size='large'
                      placeholder='Select a teacher'
                      optionFilterProp='children'
                      onChange={onchangeTeacher}
                      filterOption={(input: any, option: any) =>
                        (option!.children as unknown as string)
                          .toLowerCase()
                          .includes(input.toLowerCase())
                      }
                    >
                      {Array.isArray(listTeacher.result) &&
                        listTeacher.result?.map((item: any) => (
                          <Select.Option key={item._id} value={item._id}>
                            {item.name}
                          </Select.Option>
                        ))}
                    </Select>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <S.LabelCustom>Link lớp học</S.LabelCustom>
                  <S.FormCustom
                    name='link'
                    rules={[
                      {
                        type: 'url',
                        message: 'Sai định dạng link học!',
                      },
                    ]}
                  >
                    <S.InputCustom placeholder='https://....' />
                  </S.FormCustom>
                </Col>
              </Row>
              <Row gutter={16}>
                <Col span={12}>
                  <S.LabelCustom>Khung giờ</S.LabelCustom>
                  <S.FormCustom
                    name={['schedule', 'slot']}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn khung giờ học!',
                      },
                    ]}
                  >
                    <S.SelectCustom
                      loading={slotStore.loading}
                      className='select-slots'
                      options={slotStore?.result}
                      fieldNames={{
                        label: 'text',
                        value: '_id',
                      }}
                    ></S.SelectCustom>
                  </S.FormCustom>
                </Col>
                <Col span={12}>
                  <S.LabelCustom>Ngày học</S.LabelCustom>
                  <S.FormCustom
                    name={['schedule', 'date']}
                    rules={[
                      {
                        required: true,
                        message: 'Vui lòng chọn ngày học!',
                      },
                    ]}
                  >
                    <S.DatePickerCustom format='DD-MM-YYYY' disabledDate={disabledDate} />
                  </S.FormCustom>
                </Col>
              </Row>
              <S.ButtonCustom htmlType='submit'>Tạo lớp Demo</S.ButtonCustom>
            </Form>
          </Col>
          <Col span={8}>
            <ListTeacherApply
              idSelected={idTeacher}
              loading={loading}
              data={listApply}
              clickApply={applyTeacher}
            />
          </Col>
        </Row>
      )}
    </S.Wrapper>
  );
};

export default withAuth(CreateDemoClass, 'create');
