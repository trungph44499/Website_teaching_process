import {Form, Button, RadioChangeEvent, Input, Rate, message} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {feedbackActions} from '~/redux';
import * as S from './styled';

interface Props {
  sessionId: any;
}
const options = [
  {label: 'Có mặt', value: false},
  {label: 'Vắng mặt', value: true},
];
const FeedbackForm = ({sessionId}: Props) => {
  const navigate = useNavigate();
  const [feedbackForm] = Form.useForm();
  const dispatch = useDispatch<any>();
  const [absent, setAbsent] = useState<boolean>(false);

  const onFinish = async (values: any) => {
    await dispatch(feedbackActions.create({params: {...values, sessionId}}));
    navigate('/schedule');
    message.success('Đã gửi báo cáo');
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  const checkAbsent = ({target: {value}}: RadioChangeEvent) => {
    console.log('radio3 checked', value);
    setAbsent(value);
  };
  useEffect(() => {
    feedbackForm.setFieldValue('absent', absent);
  }, []);
  return (
    <Form
      form={feedbackForm}
      labelAlign='left'
      name='basic'
      labelCol={{span: 4}}
      wrapperCol={{span: 16}}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
      autoComplete='off'
    >
      <Form.Item
        label='Điểm danh'
        name='absent'
        rules={[{required: true, message: 'Vui lòng điểm danh học sinh'}]}
      >
        <S.RadioGroup
          size='middle'
          defaultValue={absent}
          options={options}
          onChange={checkAbsent}
        />
      </Form.Item>
      {!absent && (
        <>
          <Form.Item
            label='Điểm'
            name='rate'
            rules={[{required: true, message: 'Vui lòng cho điểm học sinh'}]}
          >
            <Rate allowHalf />
          </Form.Item>
          <Form.Item
            label='Link bài làm'
            name='project'
            rules={[{required: true, message: 'Vui lòng dẫn link sản phẩm của học sinh'}]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label='Nhận xét'
            name='comment'
            rules={[{required: true, message: 'Vui lòng nhận xét về học sinh'}]}
          >
            <TextArea
              placeholder='Nhận xét về học sinh...'
              allowClear
              showCount
              maxLength={1000}
              autoSize={{minRows: 3, maxRows: 6}}
            />
          </Form.Item>
        </>
      )}
      <Form.Item wrapperCol={{offset: 8, span: 16}}>
        <Button type='primary' htmlType='submit'>
          Gửi báo cáo
        </Button>
      </Form.Item>
    </Form>
  );
};

export default FeedbackForm;
