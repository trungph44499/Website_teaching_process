import {Col, Form, Radio, Row, Select} from 'antd';
import {useEffect, useState} from 'react';
import {useDispatch} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {ordersActions, slotAction, slotSelector} from '~/redux';
import {useAppSelector} from '~/redux/store';
import {IOrderModel} from '~/type/orders';
import MainWhite from '~/components/common/Logo/MainWhite';
import {AiOutlineLoading3Quarters, AiFillCaretLeft} from 'react-icons/ai';
import {domain} from '~/helpers/get-app';
import './index.css';
import * as S from './styled';
import moment from 'moment';
import {RangePickerProps} from 'antd/lib/date-picker';
import Loading from '~/components/common/Loading';

const {Option} = Select;

const OrderPage = () => {
  const dispatch = useDispatch<any>();
  const slotStore = useAppSelector(slotSelector.selectList);
  const [slots, setSlots] = useState([]);
  const navigate = useNavigate();

  const onFinish = async (values: IOrderModel) => {
    await dispatch(ordersActions.create({params: values}));
    navigate('/');
  };

  const disabledDate: RangePickerProps['disabledDate'] = (current: any) => {
    return current && current < moment().endOf('day');
  };

  useEffect(() => {
    if (slotStore.result) {
      const slots = slotStore.result.map((item: any) => ({
        value: item._id,
        label: item.text,
      }));
      setSlots(slots);
    }
  }, [slotStore.result]);

  useEffect(() => {
    dispatch(slotAction.fetch({}));
  }, [dispatch]);
  return (
    <S.Wraper className='wrap-order'>
      <S.Back>
        <a href={domain()}>
          <AiFillCaretLeft />
          Trang chủ
        </a>
      </S.Back>
      <S.BoxPrimary>
        <MainWhite width='400px' />
        <div className='spiner'>
          <AiOutlineLoading3Quarters />
        </div>
      </S.BoxPrimary>
      <S.RegisterBox>
        <S.TitleReg level={3}>Đăng kí ngay bây giờ và nhận chứng chỉ hoàn thành</S.TitleReg>
        <Col>
          {slotStore.loading ? (
            <Loading />
          ) : (
            <Form onFinish={onFinish}>
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
                  <S.InputCustom placeholder='VD: 123@gmail.com' />
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
                  <S.InputCustom placeholder='VD: Nguyen Van A' />
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
                  <S.InputCustom placeholder='vd:0123...' />
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
                  <Radio.Group>
                    <Radio.Button value='Lớp 1'>Lớp 1</Radio.Button>
                    <Radio.Button value='Lớp 2-3'>Lớp 2-3</Radio.Button>
                    <Radio.Button value='Lớp 4-6'>Lớp 4-6</Radio.Button>
                    <Radio.Button value='Lớp 7-9'>Lớp 7-9</Radio.Button>
                    <Radio.Button value='Lớp 10-12'>Lớp 10-12</Radio.Button>
                  </Radio.Group>
                </S.FormCustom>
              </Col>
              <Row gutter={16}>
                <Col span={7}>
                  <S.LabelCustom>Khung giờ</S.LabelCustom>
                  <S.FormCustom
                    name={['schedule', 'slots']}
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
                      placeholder='01:00'
                      options={slots}
                    ></S.SelectCustom>
                  </S.FormCustom>
                </Col>
                <Col span={7}>
                  <S.LabelCustom>Ngày</S.LabelCustom>
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
              <S.ButtonCustom htmlType='submit'>Đăng ký một buổi học miễn phí</S.ButtonCustom>
            </Form>
          )}
        </Col>
      </S.RegisterBox>
    </S.Wraper>
  );
};

export default OrderPage;
