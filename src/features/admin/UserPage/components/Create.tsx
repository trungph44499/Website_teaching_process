import {
  Button,
  Col,
  Form,
  Input,
  Row,
  Space,
  Checkbox,
  message,
  Typography,
  Radio,
  Select,
} from 'antd';
import {useEffect, useMemo, useState} from 'react';
import {permissionSelector, useAppDispatch, userActions, userSelector} from '~/redux';
import {IUserModel} from '~/type/users';
import {useSelector} from 'react-redux';
import {appSelector} from '~/redux/app.reducer';

type Props = {
  onClose: (value: boolean) => void;
};

const Create = ({onClose}: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const createSelector = useSelector(userSelector.selectCreateTransaction);
  const [superAdmin, setSuperAdmin] = useState<boolean>(false);
  const countries = useSelector(appSelector).countries;
  const permissions = useSelector(permissionSelector.selectPermissions).result;
  const [permissionList, permissionOptions] = useMemo(() => {
    const list = permissions.map((item) => {
      return {
        model: item.model,
        value: {
          [item.model]: {
            title: item.title,
            field: item.field,
            use: item.use,
          },
        },
      };
    });
    const selected = permissions.map((item) => ({label: item.title, value: item.model}));
    return [list, selected];
  }, [permissions]);
  const [permissionSelected, setPermissionSelected] = useState<string[]>([]);

  useEffect(() => {
    form.resetFields();
  }, [form]);

  useEffect(() => {
    if (createSelector.success) {
      dispatch(userActions.setStatusDefault({key: 'create', action: 'success'}));
      message.success('Created success');
      onClose(false);
    }
  }, [dispatch, createSelector, onClose]);

  const onFinish = (value: IUserModel) => {
    const perData = permissionList.reduce((stack, current) => {
      if (permissionSelected.includes(current.model)) {
        return {...stack, ...current.value};
      }
      return {...stack};
    }, {});
    if (Object.keys(perData).length > 0) value.permisstion = perData;
    else value.permisstion = null;
    value.super_admin = superAdmin;
    dispatch(userActions.create({params: value}));
  };

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Form.Item name='super_admin' style={{userSelect: 'none'}}>
        <Checkbox onChange={(e) => setSuperAdmin(e.target.checked)} checked={superAdmin}>
          Tài khoản quản trị
        </Checkbox>
      </Form.Item>
      <Form.Item
        name='name'
        label='Họ tên'
        rules={[
          {
            required: true,
            validator: (...args) => {
              if (args[1] && args[1].trim()) {
                return Promise.resolve();
              }
              return Promise.reject('Please enter name');
            },
          },
        ]}
      >
        <Input placeholder='Name' />
      </Form.Item>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            name='email'
            label='Email'
            rules={[
              {required: true, message: 'Please enter email'},
              {
                pattern: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Email invalid',
              },
            ]}
          >
            <Input placeholder='Email' />
          </Form.Item>
        </Col>
        {superAdmin ? (
          <Col span={24}>
            <Typography.Paragraph strong underline type='secondary'>
              Tài khoản quản trị:
            </Typography.Paragraph>
            <Form.Item
              name='username'
              label='Username'
              rules={[
                {
                  required: true,
                  validator: (...args) => {
                    if (args[1] && args[1].trim()) {
                      return Promise.resolve();
                    }
                    return Promise.reject('Please enter username');
                  },
                },
              ]}
            >
              <Input placeholder='Username' />
            </Form.Item>
            <Form.Item
              name='password'
              label='Password'
              rules={[
                {required: true, message: 'Please enter password'},
                {
                  min: 6,
                  message: 'Password at least 6 characters',
                },
              ]}
            >
              <Input.Password placeholder='Password' />
            </Form.Item>
          </Col>
        ) : null}
      </Row>
      <Form.Item name='gender' label='Giới tính' initialValue='Male'>
        <Radio.Group id='gender'>
          <Radio value='Male'>Male</Radio>
          <Radio value='Female'>Female</Radio>
          <Radio value='Other'>Other</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name='country' label='Quốc gia'>
        <Select showSearch options={countries} placeholder='Country' />
      </Form.Item>
      <Form.Item
        name='phone'
        label='Điện thoại'
        rules={[
          {
            pattern: /(84|0[3|5|7|8|9])+([0-9]{8})\b/g,
            message: 'Phone invalid',
          },
        ]}
      >
        <Input placeholder='Phone' />
      </Form.Item>
      {!superAdmin ? (
        <Form.Item
          name='permisstion'
          label='Quyền hạn'
          rules={[{required: true, message: 'Please enter permission'}]}
        >
          <Select
            mode='multiple'
            onChange={(value) => setPermissionSelected(value)}
            options={permissionOptions}
            placeholder='Permission'
          />
        </Form.Item>
      ) : null}
      <Space style={{width: '100%', justifyContent: 'flex-end'}}>
        <Button.Group>
          <Button onClick={() => onClose(false)}>Hủy</Button>
          <Button type='primary' htmlType='submit'>
            Lưu
          </Button>
        </Button.Group>
      </Space>
    </Form>
  );
};

export default Create;
