import {Breadcrumb, Button, Form, Input, Select} from 'antd';
import React from 'react';
import {HomeOutlined} from '@ant-design/icons';
import {
  coursesActions,
  coursesSelector,
  paidmanagerActions,
  paidmanagerSelector,
  studentActions,
  studentSelector,
  teacherActions,
  teacherSelector,
} from '~/redux';
import * as S from './style';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate, useParams} from 'react-router-dom';
import withAuth from '~/helpers/withAuth';
import HeaderPage from '~/components/common/HeaderPage';

const EditPaidManager = () => {
  const [form] = Form.useForm();
  const {Option} = Select;
  const _idpaid = useParams();

  const navigate = useNavigate();
  const listTeacher = useSelector(teacherSelector.selectList);
  const newlistteacher = listTeacher?.result;
  const dispatch = useDispatch<any>();
  const list = useSelector(studentSelector.selectList);

  const newdata = list?.result;
  const listcoures = useSelector(coursesSelector.selectList);
  const newlistcoures = listcoures?.result;
  const [datacores, setDatacoures] = useState(newlistcoures);
  const getone = useSelector(paidmanagerSelector.selectList);
  const dataone = getone?.listone;

  const init = {
    teacher: dataone?.teacher?.name,
    student: dataone?.student?.[0]?.name,
    course: dataone?.course?.courseName,
  };
  const onFinish = (inputData: any) => {
    dispatch(paidmanagerActions.update({params: {id: _idpaid?.id, data: inputData}}));

    navigate(-1);
  };
  const onChangeTeacher = () => {};
  const onSearchTeacher = () => {};
  const onCancel = () => {
    navigate(-1);
  };
  useEffect(() => {
    dispatch(studentActions.fetch({}));
  }, []);
  useEffect(() => {
    const readonepaid = async () => {
      await new Promise((res: any) => {
        dispatch(paidmanagerActions.readone({params: {id: _idpaid?.id}, onSuccess: res}));
      });
      form.setFieldsValue(init);
    };
    readonepaid();
  }, [form]);

  useEffect(() => {
    dispatch(coursesActions.fetch({}));
  }, []);
  useEffect(() => {
    dispatch(teacherActions.fetch({}));
  }, []);
  return (
    <>
      <S.WrapperEdit>
        <HeaderPage
          title='Chỉnh sửa'
          breadcrumb={[{text: 'Lớp học chính thức', link: '/paid-class'}, {text: 'Chỉnh sửa'}]}
        />
        <Form
          form={form}
          name='control-hooks'
          onFinish={onFinish}
          layout='vertical'
          initialValues={init}
        >
          <Form.Item
            label='Giáo viên'
            name='teacher'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn 1 giáo viên',
              },
            ]}
          >
            <Select
              showSearch
              size='large'
              // defaultValue={dataone?.teacher?.name}
              placeholder='Chọn 1 giáo viên'
              optionFilterProp='children'
              onChange={onChangeTeacher}
              onSearch={onSearchTeacher}
              filterOption={(input: any, option: any) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {Array.isArray(newlistteacher) &&
                newlistteacher?.map((item: any) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Học sinh'
            name='student'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn 1 học sinh',
              },
            ]}
          >
            <Select
              showSearch
              size='large'
              placeholder='Chọn 1 học sinh'
              optionFilterProp='children'
              onChange={onChangeTeacher}
              onSearch={onSearchTeacher}
              filterOption={(input: any, option: any) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {Array.isArray(newdata) &&
                newdata?.map((item: any) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.name}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>
          <Form.Item
            label='Khóa học'
            name='course'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn khóa học',
              },
            ]}
          >
            <Select
              size='large'
              showSearch
              placeholder='Chọn 1 khóa học'
              optionFilterProp='children'
              // onChange={onChangeTeacher}
              // onSearch={onSearchTeacher}
              filterOption={(input: any, option: any) =>
                (option!.children as unknown as string).toLowerCase().includes(input.toLowerCase())
              }
            >
              {Array.isArray(datacores) &&
                datacores?.map((item: any) => (
                  <Select.Option key={item._id} value={item._id}>
                    {item.courseName}
                  </Select.Option>
                ))}
            </Select>
          </Form.Item>

          <S.PostionBtn>
            <div className='ps-wrap'>
              <S.ButtonCancel onClick={() => onCancel()}>Cancel</S.ButtonCancel>
              <S.ButtonSubmit htmlType='submit'>Edit</S.ButtonSubmit>
            </div>
          </S.PostionBtn>
        </Form>
      </S.WrapperEdit>
    </>
  );
};

export default withAuth(EditPaidManager, 'update');
