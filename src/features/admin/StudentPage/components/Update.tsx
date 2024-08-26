import {Button, Col, Form, Input, message, Radio, Row, Select, Space} from 'antd';
import {appAction, appSelector} from '~/redux/app.reducer';
import {useAppDispatch} from '~/redux';
import {actions, selector} from '~/redux/student';
import {useEffect} from 'react';
import {useSelector} from 'react-redux';
import {IStudentModel} from '~/type/student';

type Props = {
  onClose: (value: IStudentModel | null) => void;
  studentEdit: IStudentModel;
};

const Update = ({onClose, studentEdit}: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const teachers = useSelector(selector.selectData);
  const countries = useSelector(appSelector).countries;

  useEffect(() => {
    dispatch(appAction.getAllCountry());
  }, [dispatch]);

  useEffect(() => {
    form.setFieldsValue(studentEdit);
  }, [form, studentEdit]);

  useEffect(() => {
    if (teachers.update.success) {
      dispatch(actions.setStatusDefault({key: 'update', action: 'success'}));
      message.success('Updated success');
      onClose(null);
    }
  }, [dispatch, teachers, onClose]);

  const onFinish = (value: any) => {
    value._id = studentEdit._id;
    dispatch(actions.update({params: value}));
  };

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item
        name='name'
        label='Name'
        rules={[
          {
            required: true,
            validator: (...args) => {
              if (args[1] && args[1].trim()) {
                return Promise.resolve();
              } else {
                return Promise.reject('Please enter name');
              }
            },
          },
        ]}
      >
        <Input placeholder='Name' />
      </Form.Item>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item name='email' label='Email'>
            <Input placeholder='Email' disabled />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item name='gender' label='Gender' initialValue='Male'>
        <Radio.Group id='gender'>
          <Radio value='Male'>Male</Radio>
          <Radio value='Female'>Female</Radio>
          <Radio value='Other'>Other</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name='country' label='Country'>
        <Select showSearch={true} options={countries} placeholder='Country' />
      </Form.Item>
      <Form.Item
        name='phone'
        label='Phone'
        rules={[
          {required: true, message: 'Please enter phone'},
          {
            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            message: 'Phone invalid',
          },
        ]}
      >
        <Input placeholder='Phone' />
      </Form.Item>
      <Form.Item name='languages' label='Languages'>
        <Input placeholder='Languages' />
      </Form.Item>
      <Space style={{width: '100%', justifyContent: 'flex-end'}}>
        <Button.Group>
          <Button onClick={() => onClose(null)}>Cancel</Button>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Button.Group>
      </Space>
    </Form>
  );
};

export default Update;
