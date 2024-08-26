import {Button, Col, Form, Input, message, Row, Select} from 'antd';
import TextArea from 'antd/lib/input/TextArea';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useParams} from 'react-router-dom';
import withAuth from '~/helpers/withAuth';
import {coursesActions, coursesSelector, curriculumActions, curriculumSelector} from '~/redux';
import {ICurriculum} from '~/type/curriculum';
import * as S from './styled';

interface PropsType {
  curriculum: ICurriculum;
  handler: () => void;
}

const EditCurriculum = (props: PropsType) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch<any>();
  const datacourse = useSelector(coursesSelector.selectList).result;

  // const init = {
  //   lesson: listone?.lesson,
  //   title: listone?.title,
  //   link: listone?.link,
  //   courses: listone?.courses?._id,
  //   description: listone?.description,
  // };

  const onFinish = async (values: any) => {
    try {
      await new Promise((res: any) => {
        dispatch(
          curriculumActions.update({
            params: {id: props.curriculum._id, data: values},
            onSuccess: res,
          })
        );
      });
      props.handler && props.handler();
      message.success('Edit successfully');
    } catch (error) {
      message.error('Edit Fail');
    }
  };

  const onReset = () => {
    form.resetFields();
  };
  useEffect(() => {
    form.setFieldsValue(props.curriculum);
  }, [props.curriculum]);
  useEffect(() => {
    dispatch(coursesActions.fetch({}));
  }, []);
  return (
    <div>
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
            <Col span={12}>
              <Form.Item name='courses' label='Khóa học' rules={[{required: true}]}>
                <Select
                  size='large'
                  showSearch
                  placeholder='Chọn một khóa học'
                  optionFilterProp='children'
                  filterOption={(input: any, option: any) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {Array.isArray(datacourse) &&
                    datacourse?.map((item: any) => (
                      <Select.Option key={item._id} value={item._id}>
                        {item.courseName}
                      </Select.Option>
                    ))}
                </Select>
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
                Sửa
              </Button>
            </Form.Item>
          </S.Control>
        </Form>
      </S.WrapperForm>
    </div>
  );
};

export default withAuth(EditCurriculum, 'update');
