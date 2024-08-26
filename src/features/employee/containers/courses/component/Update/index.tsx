import {Form, Button} from 'antd';
import {ICoursesModel} from '~/type/courses';
import {coursesActions, useAppDispatch} from '~/redux';
import * as S from './style';
import withAuth from '~/helpers/withAuth';
import {useParams} from 'react-router-dom';
import {useEffect} from 'react';

interface PropType {
  course: ICoursesModel;
  handler?: () => void;
}
const UpdateCourses = (props: PropType) => {
  const dispatch = useAppDispatch();
  const [form] = Form.useForm();
  const {id} = useParams();
  const onFinish = (value: ICoursesModel) => {
    dispatch(coursesActions.update({params: {...value, _id: id}}));
    props.handler && props.handler();
  };
  useEffect(() => {
    form.setFieldsValue(props.course);
  }, [props.course]);
  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' autoComplete='off' form={form}>
        <Form.Item
          label='Tên khóa học'
          name='courseName'
          rules={[{required: true, message: 'Vui lòng nhập tên khóa học!'}]}
        >
          <S.InputCustom placeholder='VD: C#, Javascript, Python,...' />
        </Form.Item>

        <Form.Item
          label='Học phí'
          name='fee'
          rules={[
            {required: true, message: 'Vui lòng nhập học phí!'},
            {type: 'number', message: 'Học phí phải là số!'},
          ]}
        >
          <S.InputNBCustom placeholder='Phí khóa học.' />
        </Form.Item>

        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Sửa khóa học
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withAuth(UpdateCourses, 'update');
