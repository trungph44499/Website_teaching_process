import React, {useEffect} from 'react';
import withAuth from '~/helpers/withAuth';
import {Button, Col, Form, Input, message, Row} from 'antd';
import * as S from './styled';
import TextArea from 'antd/lib/input/TextArea';
import {useDispatch, useSelector} from 'react-redux';
import {coursesActions, coursesSelector, curriculumActions} from '~/redux';
import {useParams} from 'react-router-dom';

interface Props {
  handler: () => void;
}

const CurriculumAdd = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();
  const {id} = useParams();

  const onFinish = async (values: any) => {
    try {
      await new Promise((res: any) => {
        dispatch(
          curriculumActions.create({
            params: {...values, courses: id},
            onSuccess: res,
          })
        );
      });
      props.handler && props.handler();
      message.success('Thêm thành công');
      dispatch(coursesActions.read({params: id}));
      dispatch(curriculumActions.fetch({params: id}));
    } catch (error) {
      message.error('Thêm thất bại!');
    }
  };

  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    dispatch(coursesActions.fetch({}));
  }, [dispatch]);

  return (
    <S.WrapperForm>
      <Form form={form} name='control-hooks' onFinish={onFinish} layout='vertical'>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name='lesson' label='Bài học' rules={[{required: true}]}>
              <Input size='large' />
            </Form.Item>
          </Col>
          <Col span={12}>
            <Form.Item name='title' label='Tiêu đề' rules={[{required: true}]}>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={12}>
          <Col span={12}>
            <Form.Item name='link' label='Link' rules={[{required: true}]}>
              <Input size='large' />
            </Form.Item>
          </Col>
        </Row>
        <Form.Item name='description' label='Mô tả' rules={[{required: true}]}>
          <TextArea size='large' rows={6} />
        </Form.Item>

        <S.Control>
          <Form.Item>
            <Button htmlType='button' onClick={onReset} style={{marginRight: 10}}>
              Làm mới
            </Button>
            <Button type='primary' htmlType='submit'>
              Thêm
            </Button>
          </Form.Item>
        </S.Control>
      </Form>
    </S.WrapperForm>
  );
};

export default withAuth(CurriculumAdd, 'create');
