import {
  Button,
  Checkbox,
  Col,
  Form,
  Input,
  message,
  Radio,
  Row,
  Select,
  Space,
  Typography,
} from 'antd';
import {useEffect, useState} from 'react';
import {IUserModel} from '~/type/users';
import {permissionActions, permissionSelector, useAppDispatch, userActions, userSelector} from '~/redux';
import {useSelector} from 'react-redux';
import {CheckboxChangeEvent} from 'antd/es/checkbox';
import {appSelector} from '~/redux/app.reducer';

type Props = {
  onClose: (value: IUserModel | null) => void;
  userEdit: IUserModel;
};

const Update = ({userEdit, onClose}: Props) => {
  const [form] = Form.useForm();
  const dispatch = useAppDispatch();
  const updateSelector = useSelector(userSelector.selectUpdateTransaction);
  const [superAdmin, setSuperAdmin] = useState<boolean>(userEdit.super_admin);
  const permissions = useSelector(permissionSelector.selectPermissions).result;
  const countries = useSelector(appSelector).countries;
  const [canEdit, setCanEdit] = useState({
    email: true,
    username: true,
  });

  const capitalize = (text: string) => {
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const [permissionsData, setPermissionsData] = useState<any>(() => {
    return permissions.reduce((obj, current) => {
      const modelObj = {...current};
      const currentPerUser = userEdit.permisstion && userEdit.permisstion[current.model];
      const titleObj: any = {};
      const actions: any = {};
      Object.keys(modelObj.field).forEach((item) => {
        titleObj[item] = capitalize(item);
        if (!userEdit.permisstion || !userEdit.permisstion[current.model]) {
          actions[item] = false;
        }
      });
      modelObj.title = capitalize(current.model);
      modelObj.title_field = titleObj;
      modelObj.use = false;
      if (currentPerUser) {
        modelObj.field = {
          ...current.field,
          ...currentPerUser.field,
        };
        modelObj.title = currentPerUser.title || current.title || capitalize(current.model);
        modelObj.title_field = {
          ...titleObj,
          ...currentPerUser.title_field,
        };
        modelObj.use = currentPerUser.use;
      } else {
        modelObj.field = actions;
      }
      return {...obj, [current.model]: modelObj};
    }, {});
  });

  useEffect(() => {
    dispatch(permissionActions.fetch({}));
  }, [dispatch]);

  useEffect(() => {
    const userData = {
      ...userEdit,
      permisstion: permissionsData,
      email: userEdit.email && userEdit.email.includes('@') ? userEdit.email : null,
      username: userEdit.username && !userEdit.username.includes('@') ? userEdit.username : null,
      password: null,
    };
    form.setFieldsValue(userData);
    setCanEdit({
      email: !userData.email,
      username: !userData.username,
    });
  }, [form, userEdit, permissionsData]);

  useEffect(() => {
    if (updateSelector.success) {
      dispatch(
        userActions.setStatusDefault({
          key: 'update',
          action: 'success',
        })
      );
      message.success('Update success');
      onClose(null);
    }
  }, [dispatch, updateSelector, onClose]);

  const onFinish = (value: IUserModel) => {
    if (!value.password) {
      delete (value as {password?: string}).password;
    }

    value._id = userEdit._id;
    value.super_admin = superAdmin;

    if (value.permisstion) {
      const perObj: any = {};
      Object.keys(value.permisstion).forEach((item) => {
        if (value.permisstion[item].use) {
          perObj[item] = value.permisstion[item];
        }
      });
      value.permisstion = perObj;
    }
    dispatch(userActions.update({params: value}));
  };

  const onPermissionUseChange = (e: CheckboxChangeEvent, key: string) => {
    const fields = form.getFieldsValue();
    const permisstion = fields.permisstion;
    permisstion[key].use = e.target.checked;
    Object.keys(permisstion[key].field).forEach((fieldKey) => {
      permisstion[key].field[fieldKey] = e.target.checked;
    });
    setPermissionsData({
      ...permissionsData,
      [key]: permisstion[key],
    });
    form.setFieldsValue({permisstion: permisstion});
  };

  const onPermissionFieldChange = (e: CheckboxChangeEvent, key: string, key2: string) => {
    const fields = form.getFieldsValue();
    const permisstion = fields.permisstion;
    permisstion[key].field[key2] = e.target.checked;
    if (!permisstion[key].use && e.target.checked) {
      permisstion[key].use = true;
    }
    let fieldKeyUsing = 0;
    Object.keys(permisstion[key].field).forEach((fieldKey) => {
      if (permisstion[key].field[fieldKey]) {
        fieldKeyUsing++;
      }
    });
    if (fieldKeyUsing < 1) {
      permisstion[key].use = false;
    }
    setPermissionsData({
      ...permissionsData,
      [key]: permisstion[key],
    });
    form.setFieldsValue({permisstion: permisstion});
  };

  return (
    <Form form={form} layout='vertical' onFinish={onFinish}>
      <Space style={{width: '100%', justifyContent: 'flex-end'}}>
        <Button.Group>
          <Button onClick={() => onClose(null)}>Cannel</Button>
          <Button type='primary' htmlType='submit'>
            Save
          </Button>
        </Button.Group>
      </Space>

      <Form.Item name='super_admin' style={{userSelect: 'none'}}>
        <Checkbox onChange={(e) => setSuperAdmin(e.target.checked)} checked={superAdmin}>
          Super admin
        </Checkbox>
      </Form.Item>
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
        {canEdit.email ? (
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
        ) : (
          <Col span={24}>
            <Form.Item label='Email'>
              <Input placeholder='Email' disabled value={form.getFieldValue('email')} />
            </Form.Item>
          </Col>
        )}
      </Row>

      {superAdmin && canEdit.username ? (
        <Col span={24}>
          <Form.Item
            name='username'
            label='Username'
            rules={[
              {
                required: true,
                validator: (...args) => {
                  if (args[1] && args[1].trim()) {
                    return Promise.resolve();
                  } else {
                    return Promise.reject('Please enter username');
                  }
                },
              },
            ]}
          >
            <Input placeholder='Username' />
          </Form.Item>
        </Col>
      ) : null}
      {superAdmin && !canEdit.username ? (
        <Col span={24}>
          <Form.Item label='Username'>
            <Input placeholder='Username' disabled value={form.getFieldValue('username')} />
          </Form.Item>
        </Col>
      ) : null}
      {superAdmin ? (
        <Form.Item
          name='password'
          label='Password'
          rules={[
            {required: !userEdit.password, message: 'Please enter password'},
            {
              min: 6,
              message: 'Password at least 6 characters',
            },
          ]}
        >
          <Input.Password placeholder='Password' />
        </Form.Item>
      ) : null}
      <Form.Item name='gender' label='Gender' initialValue='Male'>
        <Radio.Group id='gender'>
          <Radio value='Male'>Male</Radio>
          <Radio value='Female'>Female</Radio>
          <Radio value='Other'>Other</Radio>
        </Radio.Group>
      </Form.Item>
      <Form.Item name='country' label='Country'>
        <Select showSearch options={countries} placeholder='Country' />
      </Form.Item>
      <Form.Item name='phone' label='Phone'>
        <Input placeholder='Phone' />
      </Form.Item>

      <Typography.Paragraph style={{fontWeight: 'bold'}}>Permissions</Typography.Paragraph>
      {Object.keys(permissionsData).map((key) => {
        return (
          <div key={key} style={{userSelect: 'none'}}>
            <Row gutter={16}>
              <Col span={10}>
                <Form.Item name={['permisstion', key, 'use']}>
                  <Checkbox
                    onChange={(e) => onPermissionUseChange(e, key)}
                    checked={permissionsData[key].use}
                  >
                    <Form.Item name={['permisstion', key, 'title']}>
                      <Input />
                    </Form.Item>
                  </Checkbox>
                </Form.Item>
              </Col>
              <Col span={14} style={{display: !permissionsData[key].use ? 'none' : 'block'}}>
                {Object.keys(permissionsData[key].field).map((fieldKey) => (
                  <Form.Item key={fieldKey} name={['permisstion', key, 'field', fieldKey]}>
                    <Checkbox
                      onChange={(e) => onPermissionFieldChange(e, key, fieldKey)}
                      checked={permissionsData[key].field[fieldKey]}
                    >
                      <Form.Item
                        name={['permisstion', key, 'title_field', fieldKey]}
                        style={{marginBottom: 0}}
                      >
                        <Input />
                      </Form.Item>
                    </Checkbox>
                  </Form.Item>
                ))}
              </Col>
            </Row>
          </div>
        );
      })}

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
