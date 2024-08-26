import {Form, Button, Typography} from 'antd';
import {useNavigate} from 'react-router-dom';
import {ICoursesModel} from '~/type/courses';
import {coursesActions, useAppDispatch} from '~/redux';
import * as S from './style';
import withAuth from '~/helpers/withAuth';

interface PropsType {
  handler?: () => void;
}
const CreateCourses = (props: PropsType) => {
  const dispatch = useAppDispatch();
  const onFinish = (value: ICoursesModel) => {
    dispatch(coursesActions.create({params: value}));
    props.handler && props.handler();
  };
  return (
    <div>
      <Form onFinish={onFinish} layout='vertical' autoComplete='off'>
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
            Tạo Khóa học
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default withAuth(CreateCourses, 'create');
