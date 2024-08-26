import {Button, Col, Form, Input, message, Row, Upload} from 'antd';
import {configConsumerProps} from 'antd/lib/config-provider';

import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {Navigate, useNavigate} from 'react-router-dom';
import {quizessActions} from '~/redux';
// import {selector} from '~/redux/users';
import {LoadingOutlined, PlusOutlined} from '@ant-design/icons';
import './index.css';
import * as S from './styles';

interface Props {}

const AddQuizizz = (props: Props) => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const user = localStorage.getItem('OWS');
  const navigate = useNavigate();
  console.log('user', user);
  const [loading, setLoading] = useState(false);
  const [fileList, setFileList] = useState<any>([]);
  console.log('fileList', fileList);
  const [quizData, setQuizData] = useState({
    name: '',
    creatorName: ``,
    backgroundImage: '',
    description: '',
    pointsPerQuestion: 1,
    isPublic: true,
    tags: [],
    questionList: [],
  });
  const [isQuizPublic, setIsQuizPublic] = useState(true);
  const object = JSON.parse(atob(user?.split('.')[1] as any));
  console.log('object', object);
  const getBase64 = (file: any): Promise<string> =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{marginTop: 8}}>Upload</div>
    </div>
  );
  const handleChange = (info: any) => {
    console.log('Change upload: ', info);
    let fileList = [...info.fileList];
    console.log('ADD product handle change: ', fileList);

    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
  };
  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }

    // setPreviewImage(file.url || (file.preview as string));
    // setPreviewOpen(true);
    // setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const handleRemove = (file: any) => {
    console.log('File Need remove: ', file);
  };
  const propsUpload = {
    beforeUpload: (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error(`${file.name} is not a png file`);
      }

      return false;
    },
    maxCount: 1,
    onChange: handleChange,
    multiple: false,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },

    onRemove: handleRemove,
    UploadFile: (data: any) => {
      console.log('DATA: ', data);
    },
  };

  const idTeacher = object?._id;
  const onFinish = async (inpustData: any) => {
    const newData = {
      ...inpustData,
      isPublic: isQuizPublic,
      creatorId: idTeacher,
      backgroundImage: fileList[0].thumbUrl,
    };
    await new Promise((res: any) => {
      dispatch(quizessActions.createQuiz({params: newData, onSuccess: res}) as any);
     
    });
    navigate(`/quizzes`);
  };
  useEffect(() => {
    dispatch(quizessActions.fetchTeacherQuizes({params: {teacherId: object?._id}}) as any);
  }, []);

  return (
    <div className='bg_img'>
      <S.WrapperQuizess>
        <h2>Thêm Quiz</h2>
        <Form form={form} onFinish={onFinish} layout='vertical'>
          <Form.Item
            label='Name'
            name='name'
            rules={[{required: true, message: 'Please input your name!'}]}
          >
            <Button>
            Công khai
          </Button>
        </Form.Item>

        <Form.Item>
          <Button
            onClick={() => {
              setIsQuizPublic(false);
              setQuizData({...quizData, isPublic: false});
            }}
            style={{
              backgroundColor: isQuizPublic ? 'inherit' : 'rgb(19, 104, 206)',
              color: isQuizPublic ? 'rgb(110, 110, 110)' : 'white',
            }}
          >
            Riêng tư
          </Button>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Thêm qiz mới
          </Button>
        </Form.Item>
      </Form>
      </S.WrapperQuizess>

</div>
      );
     
};

export default AddQuizizz;
