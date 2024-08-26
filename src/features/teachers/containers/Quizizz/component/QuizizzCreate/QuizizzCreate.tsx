import { Button, Col, Form, Input, message, Modal, Row, Select, Upload, UploadProps } from 'antd';
import { Option } from 'antd/lib/mentions';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Navigate, useNavigate, useParams } from 'react-router-dom';
import QuestionListItem from '~/features/teachers/components/QuestionListItem/QuestionListItem';
import { quizessActions, quizessSelector, uploadiActions } from '~/redux';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';

import './index.css';
import * as S from './styles';
import { updateQuiz } from '~/redux/quizess/actions';
import getEnvVars from '~/helpers/environment';
import { async } from '@firebase/util';
import { spawn } from 'child_process';
interface Props { }

const getBase64 = (file: any): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

const QuizizzCreate = (props: Props) => {
  const [isQuestionDataSave, setIsQuestionDataSave] = useState(false);
  const [isQuizOptionsVisible, setIsQuizOptionsVisible] = useState(false);
  console.log('isQuizOptionsVisible', isQuizOptionsVisible);
  const [isQuestionTrueFalse, setIsQuestionTrueFalse] = useState(false);
  console.log('isQuestionTrueFalse', isQuestionTrueFalse);
  const [maxCorrectAnswerCount, setMaxCorrectAnswerCount] = useState(1);
  const [correctAnswerCount, setCorrectAnswerCount] = useState(0);
  const [quizImage, setQuizImage] = useState('');
  const [isTime, SetIsTime] = useState<any>();
  const [isQuizPublic, setIsQuizPublic] = useState(true);
  const [isPoint, setIsPoint] = useState<any>();
  const [fileList, setFileList] = useState<any>([]);
  const [fileLists, setFileLists] = useState<any>([]);
  console.log('fileList', fileList);
  console.log('fileLists', fileLists);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');
  const navigate = useNavigate();
  const quiz = useSelector(quizessSelector.selectList);
  const quizItem = quiz?.quiz;
  console.log('quizItem', quizItem);
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const [valueType, setValueType] = useState('');
  const params = useParams();
  console.log('params', params);
  const CONFIGS = getEnvVars();
  const [questionImage, setQuestionImage] = useState('');
  const [quizData, setQuizData] = useState({
    name: '',
    creatorName: `vanThanh`,
    backgroundImage: '',
    description: '',
    pointsPerQuestion: 1,
    numberOfQuestions: 0,
    isPublic: true,
    tags: [],
    questionList: [] as any,
  });
  console.log('quizData', quizData);
  const [questionData, setQuestionData] = useState<any>({
    questionType: 'Quiz',
    pointType: 'Standard',
    answerTime: 5,
    backgroundImage: '',
    question: '',
    answerList: [
      { name: 'a', body: '', isCorrect: false },
      { name: 'b', body: '', isCorrect: false },
      { name: 'c', body: '', isCorrect: false },
      { name: 'd', body: '', isCorrect: false },
    ],
    questionIndex: 1,
  });

  console.log('questionData', questionData);
  const chanePointType = (inputPoint: any) => {
    setQuestionData({ ...questionData, inputPoint: inputPoint });
  };

  const chaneAnswer = () => { };
  // const submitadd = async () => {
  //   await new Promise((res: any) => {
  //     dispatch(
  //       quizessActions.updateQuiz({ params: { id: params.id, data: quizData }, onSuccess: res }) as any
  //     );
  //     // dispatch(quizessActions.getQuiz({ params: params.id, onSuccess: res }) as any);
  //   });
  //   navigate('/quizzes');
  // };

  useEffect(() => {
    if (quiz) {
      setQuizData(quizItem);
    }
  }, [quiz]);

  useEffect(() => {
    const readonequiz = async () => {
      await new Promise((res: any) => {
        dispatch(quizessActions.getQuiz({ params: params.id, onSuccess: res }) as any);
      });
    };
    readonequiz();
  }, []);

  const clear = () => {
    setQuestionData({
      questionType: 'Quiz',
      pointType: 'Standard',
      answerTime: 5,
      backgroundImage: '',
      question: '',
      answerList: [
        { name: 'a', body: '', isCorrect: false },
        { name: 'b', body: '', isCorrect: false },
        { name: 'c', body: '', isCorrect: false },
        { name: 'd', body: '', isCorrect: false },
      ],
      questionIndex: quizData.questionList.length + 1,
    });
    setQuestionImage('');
  };

  const handleQuizSubmit = async (inputsubmit: any) => {
    console.log('inputsubmit', inputsubmit);
    const quizSub = {
      ...quizData,
      name: inputsubmit.name,
      description: inputsubmit.description,
      pointsPerQuestion: inputsubmit.pointsPerQuestion,
      tags: inputsubmit.tags,
      backgroundImage: fileLists?.[0]?.thumbUrl,

      questionList: [
        ...quizData.questionList.slice(0, questionData.questionIndex - 1),
        questionData,
        ...quizData.questionList.slice(questionData.questionIndex, quizData.questionList.length),
      ],
    };
    console.log('quizSub', quizSub);

    await new Promise((res: any) => {
      dispatch(updateQuiz({ params: { id: params.id, data: quizSub } }) as any);
      navigate('/quizzes');
    });
  };

  const showQuestion = (index: any) => {
    var question = quizData.questionList.find((question: any) => question.questionIndex === index);
    setQuestionData(question);
    setQuestionImage(question.backgroundImage);
    question.questionType === 'True/False'
      ? setIsQuestionTrueFalse(true)
      : setIsQuestionTrueFalse(false);
  };

  const handleQuestionRemove = () => {
    let index = questionData.questionIndex;
    setQuizData((prevState) => ({
      ...prevState,

      questionList: [
        ...prevState.questionList.slice(0, index - 1),
        ...prevState.questionList.slice(index, prevState.questionList.length),
      ],
    }));
    //update indexes
    quizData.questionList.forEach((question: any) => {
      if (question.questionIndex > index) {
        question.questionIndex -= 1;
      }
    });
    //display previous question or new first one if first was deleted
    if (quizData.questionList.length > 1 && index > 1) {
      showQuestion(index - 1);
    } else if (quizData.questionList.length > 1 && index === 1) {
      showQuestion(1);
    } else {
      clear();
    }
    setCorrectAnswerCount(0);
  };
  const changeQuestionType = (valuechangeType: any) => {
    console.log('valuechangeType', valuechangeType);
    setIsQuestionTrueFalse((prevState: any) => !prevState);
    if (!isQuestionTrueFalse) {
      questionData.answerList.splice(2, 2);
      // setValueType("True/False")
    } else {
      questionData.answerList.push({ name: 'c', body: '', isCorrect: false });
      questionData.answerList.push({ name: 'd', body: '', isCorrect: false });
      // setValueType("Quiz")
    }
    questionData.answerList[0].body = 'True';
    questionData.answerList[1].body = 'False';
    setMaxCorrectAnswerCount(1);
    questionData.answerList.forEach((answer: any) => (answer.isCorrect = false));

    setCorrectAnswerCount(0);

    setQuestionData({ ...questionData, questionType: valuechangeType });
  };
  const showQuizOptions = () => {
    setIsQuizOptionsVisible((prevIsQuizOptionsVisible) => !prevIsQuizOptionsVisible);
  };

  const addNewQuestion = () => {
    setIsQuestionDataSave(false);
    clear();
    setIsQuestionTrueFalse(false);
    setCorrectAnswerCount(0);
  };

  const changeAnswerTime = (value: any) => {
    console.log('valueTimeanwer', value);
    setQuestionData({ ...questionData, answerTime: value });
  };
  const validateAnswerFields = () => {
    return questionData?.answerList.every((answer: any) => answer.body !== '');
  };
  const validateCorrectAnswer = () => {
    return questionData?.answerList.some((answer: any) => answer.isCorrect === true);
  };
  const handleQuestionChange = (e: any) => {
    setQuestionData({ ...questionData, question: e.target.value });
  };

  const handlePreview = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const handlePreviewQuestion = async (file: any) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as any);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };
  const handleCancel = () => setPreviewOpen(false);
  const handleChange = (info: any) => {
    console.log('Change upload: ', info);
    let fileList = [...info.fileList];
    console.log('ADD product handle change: ', fileList);

    fileList = fileList.slice(-1);

    // 2. Read from response and show file link
    fileList = fileList.map((file) => {
      if (file.response) {
        // Component will show file.url as link
        file.url = file.response.url;
      }
      return file;
    });

    setFileList(fileList);
    setQuestionData({ ...questionData, backgroundImage: fileList });
    setQuestionImage(fileList?.[0]?.thumbUrl);
  };

  const handleRemoveQuestion = (file: any) => {
    console.log('File Need remove: ', file);
  };
  // const uploadImage = async () => {
  //   let formData = new FormData();
  //   formData.append("", fileList)
  //   const endpoint = `${CONFIGS.API_URL}/v1/upload`

  // };
  // const handleChangeQuestion = (info: any) => {

  //   setFileLists(fileList);
  //   setQuestionData({ ...questionData, backgroundImage: fileLists });
  //   // setQuestionImage(fileList?.[0]?.thumbUrl);
  // };
  const handleChangeQuestion: UploadProps['onChange'] = ({ fileList: newFileList }: any) => {
    setFileLists(newFileList);
    setQuestionData({ ...questionData, backgroundImage: fileList[0]?.thumbUrl });
  };

  const handleRemove = (file: any) => {
    console.log('File Need remove: ', file);
  };
  const propsUploadquestion = {
    beforeUpload: (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error(`${file.name} is not a png file`);
      }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   message.error('Image must smaller than 2MB!');
      // }
      return false;
    },
    maxCount: 1,
    onChange: handleChangeQuestion,
    multiple: false,
    progress: {
      strokeColor: {
        '0%': '#108ee9',
        '100%': '#87d068',
      },
      strokeWidth: 3,
      format: (percent: any) => `${parseFloat(percent.toFixed(2))}%`,
    },

    // customRequest: () => {
    //   return true
    // },
    onRemove: handleRemoveQuestion,
  };
  const propsUpload = {
    // action: `${CONFIGS.API_URL}/v1/upload`,
    beforeUpload: (file: any) => {
      const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
      if (!isJpgOrPng) {
        message.error(`${file.name} is not a png file`);
      }
      // const isLt2M = file.size / 1024 / 1024 < 2;
      // if (!isLt2M) {
      //   message.error('Image must smaller than 2MB!');
      // }
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

    // customRequest: () => {
    //   return true
    // },
    onRemove: handleRemove,
    UploadFile: (data: any) => {
      console.log('DATA: ', data);
    },
  };

  const handleQuestionSubmit = (inputAdd: any) => {
    console.log('inputAdd', inputAdd);

    if (questionData.question === '') {
      alert('Ban chua nhap cau hoi');
    } else if (!validateAnswerFields()) {
      alert('Ban chua nhap dap an cau hoi');
    } else if (!validateCorrectAnswer()) {
      alert('Ban chua chon cau tra loi dung');
    } else {
      setIsQuestionDataSave(true);

      if (
        quizData.questionList.filter(
          (question: any) => question.questionIndex === questionData.questionIndex
        )
      ) {
        //update list of questions in quizData
        // const newQuestion = {
        //   ...quizData,
        //   answerTime: inputAdd?.answerTime,
        //   pointType: inputAdd?.pointType,
        //   questionType: inputAdd.questionType,

        //   questionList: [
        //     ...quizData.questionList.slice(0, questionData.questionIndex - 1),
        //     questionData,
        //     ...quizData.questionList.slice(
        //       questionData.questionIndex,
        //       quizData.questionList.length
        //     ),
        //   ],
        // }
        // setQuestionData(newQuestion)
        // console.log("newQuestion", newQuestion)
        setQuizData((prevState: any) => ({
          ...prevState,
          answerTime: inputAdd?.answerTime,
          pointType: inputAdd?.pointType,
          questionType: inputAdd.questionType,
          backgroundImage: fileList?.[0]?.thumbUrl,

          questionList: [
            ...prevState.questionList.slice(0, questionData.questionIndex - 1),
            questionData,
            ...prevState.questionList.slice(
              questionData.questionIndex,
              prevState.questionList.length
            ),
          ],
        }));

      } else {
        setQuizData({
          ...quizData,
          questionList: [...quizData.questionList, questionData],
        });
      }
    }
  };

  const setCorrectAnswer = (index: any) => {
    setQuestionData((prevState: any) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: prevState.answerList[index].name,
          body: prevState.answerList[index].body,
          isCorrect: !prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }));

    questionData.answerList[index].isCorrect
      ? setCorrectAnswerCount((prevState) => prevState - 1)
      : setCorrectAnswerCount((prevState) => prevState + 1);
  };

  const updateAnswer = (name: any, body: any, index: any) => {
    console.log('name', name);
    console.log('VAN BODY', body);

    console.log('index', index);
    setQuestionData((prevState: any) => ({
      ...prevState,
      answerList: [
        ...prevState.answerList.slice(0, index),
        {
          name: name,
          body: body,
          isCorrect: prevState.answerList[index].isCorrect,
        },
        ...prevState.answerList.slice(index + 1, prevState.answerList.length),
      ],
    }));
  };
  const uploadButton = (
    <div>
      {loading ? <LoadingOutlined /> : <PlusOutlined />}
      <div style={{ marginTop: 8 }}>Upload</div>
    </div>
  );

  return (
    <>
      <Form form={form} layout='vertical' onFinish={handleQuizSubmit}>
        <div className='session'>
          <div>
            <>
              {quizData?.questionList?.length > 0 &&
                quizData?.questionList?.map((question: any) => (
                  <QuestionListItem
                    onClick={() => showQuestion(question?.questionIndex)}
                    key={question?.questionIndex}
                    number={question?.questionIndex}
                    type={question?.questionType}
                    name={question?.question}
                    time={question?.answerTime}
                    image={question?.backgroundImage}
                  />
                ))}
            </>
            <div></div>

            <Row gutter={8}>
              <Col span={12}>
                {quizData?.questionList?.length > 0 ? (
                  <S.Buttons
                    onClick={() => {
                      isQuestionDataSave
                        ? addNewQuestion()
                        : alert('Save changes in question data first');
                    }}
                    type='primary'
                  >
                    Add question
                  </S.Buttons>
                ) : (
                  <span>Set Quiz</span>
                )}
              </Col>
              <Col span={12}>
                <S.Buttons onClick={showQuizOptions}>Settings</S.Buttons>
              </Col>
            </Row>
          </div>

          <div>
            <Form.Item name='question'>
              <S.InputQuestion
                size='large'
                type='text'
                defaultValue={questionData?.question}
                placeholder='Write your question here'
                onChange={handleQuestionChange}
              />
            </Form.Item>

            <Form.Item name='backgroundImage'>
              <S.UploadDiv>
                <h3 className='avatar-uploader'>Find and upload an image</h3>
                <Upload
                  {...propsUpload}
                  fileList={fileList}
                  listType='picture-card'
                  onPreview={handlePreview}
                >

                  {uploadButton}
                </Upload>
              </S.UploadDiv>
              <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <img alt='example' style={{ width: '100%' }} src={previewImage} />
              </Modal>
            </Form.Item>
            <div>
              <Row gutter={[8, 8]}>
                <Col span={12}>
                  <Form.Item name='a'>
                    <S.WrapperInput1
                      value={questionData?.answerList?.[0].body}
                      type='text'
                      onChange={(e) => {
                        isQuestionTrueFalse
                          ? updateAnswer(e.target.name, 'True', 0)
                          : updateAnswer(e.target.name, e.target.value, 0);
                      }}
                    />
                    {/* <S.WrapperCheck> */}
                    <S.WrapperCheck
                      onClick={() => {
                        correctAnswerCount < maxCorrectAnswerCount ||
                          questionData?.answerList?.[0].isCorrect
                          ? setCorrectAnswer(0)
                          : alert('You already choose the correct answer');
                      }}
                    >
                      <img
                        style={{
                          visibility: questionData?.answerList?.[0]?.isCorrect
                            ? 'visible'
                            : 'hidden',
                        }}
                        src='https://cdn1.vectorstock.com/i/1000x1000/50/45/check-icon-icon-flat-design-vector-29235045.jpg'
                        width={50}
                        height={50}
                        alt=''
                      />
                    </S.WrapperCheck>
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item name='b'>
                    <S.WrapperInput2
                      value={questionData?.answerList?.[1].body}
                      type='text'
                      onChange={(e) => {
                        isQuestionTrueFalse
                          ? updateAnswer(e.target.name, 'False', 1)
                          : updateAnswer(e.target.name, e.target.value, 1);
                      }}
                    />
                    {/* <S.WrapperCheck> */}
                    <S.WrapperCheck
                      onClick={() => {
                        correctAnswerCount < maxCorrectAnswerCount ||
                          questionData?.answerList?.[1].isCorrect
                          ? setCorrectAnswer(1)
                          : alert('You already choose the correct answer');
                      }}
                    >
                      <img
                        style={{
                          visibility: questionData?.answerList?.[1]?.isCorrect
                            ? 'visible'
                            : 'hidden',
                        }}
                        src='https://cdn1.vectorstock.com/i/1000x1000/50/45/check-icon-icon-flat-design-vector-29235045.jpg'
                        width={50}
                        height={50}
                        alt=''
                      />
                    </S.WrapperCheck>
                  </Form.Item>
                </Col>
              </Row>

              {!isQuestionTrueFalse && (
                <>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <Form.Item name='c'>
                        <S.WrapperInput3
                          value={questionData?.answerList?.[2]?.body}
                          type='text'
                          onChange={(e) => {
                            updateAnswer(e.target.name, e.target.value, 2);
                          }}
                        />
                        {/* <S.WrapperCheck> */}
                        <S.WrapperCheck
                          onClick={() => {
                            correctAnswerCount < maxCorrectAnswerCount ||
                              questionData?.answerList?.[2]?.isCorrect
                              ? setCorrectAnswer(2)
                              : alert('You already choose the correct answer');
                          }}
                        >
                          <img
                            style={{
                              visibility: questionData?.answerList?.[2]?.isCorrect
                                ? 'visible'
                                : 'hidden',
                            }}
                            src='https://cdn1.vectorstock.com/i/1000x1000/50/45/check-icon-icon-flat-design-vector-29235045.jpg'
                            width={50}
                            height={50}
                            alt=''
                          />
                        </S.WrapperCheck>
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item name='d'>
                        <S.WrapperInput4
                          value={questionData?.answerList?.[3]?.body}
                          type='text'
                          onChange={(e) => {
                            updateAnswer(e.target.name, e.target.value, 3);
                          }}
                        />
                        {/* <S.WrapperCheck> */}
                        <S.WrapperCheck
                          onClick={() => {
                            correctAnswerCount < maxCorrectAnswerCount ||
                              questionData.answerList[3].isCorrect
                              ? setCorrectAnswer(3)
                              : alert('You already choose the correct answer');
                          }}
                        >
                          <img
                            style={{
                              visibility: questionData?.answerList?.[3]?.isCorrect
                                ? 'visible'
                                : 'hidden',
                            }}
                            src='https://cdn1.vectorstock.com/i/1000x1000/50/45/check-icon-icon-flat-design-vector-29235045.jpg'
                            width={50}
                            height={50}
                            alt=''
                          />
                        </S.WrapperCheck>
                      </Form.Item>
                    </Col>
                  </Row>
                </>
              )}
            </div>
          </div>

          <div>
            <div style={{ display: isQuizOptionsVisible ? 'none' : 'block' }}>
              <>
                <Form.Item label='Question type' name='questionType'>
                  <Select
                    showSearch
                    size='large'
                    placeholder='Select question type'
                    optionFilterProp='children'
                    // defaultValue={questionData?.questionType}
                    onChange={changeQuestionType}
                    filterOption={(input: any, option: any) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option value='Quiz'>Quiz</Option>
                    <Option value='True/False'>True/False</Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Time limit' name='answerTime'>
                  <Select
                    showSearch
                    size='large'
                    placeholder='Select times'
                    optionFilterProp='children'
                    defaultValue={questionData?.answerTime}
                    onChange={changeAnswerTime}
                    filterOption={(input: any, option: any) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option value='5'>5 seconds</Option>
                    <Option value='10'>10 seconds</Option>
                    <Option value='20'>20 seconds</Option>
                    <Option value='30'>30 seconds</Option>
                    <Option value='60'>60 minute</Option>
                    <Option value='90'>90 minute</Option>
                  </Select>
                </Form.Item>
                <Form.Item label='Points' name='pointType'>
                  <Select
                    showSearch
                    size='large'
                    placeholder='Set points type'
                    optionFilterProp='children'
                    defaultValue={questionData.pointType}
                    // onChange={onchangeStart}
                    onChange={chanePointType}
                    filterOption={(input: any, option: any) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    <Option value='Standard'>Standard</Option>
                    <Option value='Double'>Double</Option>
                    <Option value='BasedOnTime'>Based on Time</Option>
                  </Select>
                </Form.Item>

                <Form.Item>
                  <Row gutter={[8, 8]}>
                    <Col span={12}>
                      <S.Buttons
                        type='primary'
                        style={{ marginRight: 20 }}
                        onClick={handleQuestionSubmit}
                      >
                        Save
                      </S.Buttons>
                    </Col>

                    <Col span={12}>
                      <Button onClick={handleQuestionRemove} danger>
                        Delete
                      </Button>
                    </Col>
                  </Row>
                </Form.Item>
              </>
            </div>

            <div style={{ display: isQuizOptionsVisible ? 'block' : 'none' }}>
              {/* <Form onFinish={handleQuizSubmit} layout="vertical" form={form}> */}
              <Form.Item name='name' label='name'>
                <Input defaultValue={quizItem?.name} />
              </Form.Item>
              <Form.Item name='description' label='description'>
                <Input defaultValue={quizItem?.description} />
              </Form.Item>
              <Form.Item name='pointsPerQuestion' label='pointsPerQuestion'>
                <Input type='number' min={1} />
              </Form.Item>
              <Form.Item>
                <Button
                  onClick={() => {
                    setIsQuizPublic(true);
                    setQuizData({ ...quizData, isPublic: true });
                  }}
                  style={{
                    backgroundColor: isQuizPublic ? 'rgb(19, 104, 206)' : 'inherit',
                    color: isQuizPublic ? 'white' : 'rgb(110, 110, 110)',
                  }}
                  defaultValue={quizItem?.isPublic}
                >
                  Public
                </Button>
                <Button
                  onClick={() => {
                    setIsQuizPublic(false);
                    setQuizData({ ...quizData, isPublic: false });
                  }}
                  style={{
                    backgroundColor: isQuizPublic ? 'inherit' : 'rgb(19, 104, 206)',
                    color: isQuizPublic ? 'rgb(110, 110, 110)' : 'white',
                  }}
                  defaultValue={quizItem?.isPublic}
                >
                  Private
                </Button>
              </Form.Item>
              <Form.Item label='file upload' name='backgroundImage'>
                <Upload
                  {...propsUploadquestion}
                  fileList={fileLists}
                  listType='picture-card'
                  onPreview={handlePreviewQuestion}
                >

                  {uploadButton}
                </Upload>
              </Form.Item>
              <Form.Item label='Tags (comma separated)' name='tags'>
                <Input />
              </Form.Item>
              <Form.Item>
                <Button htmlType='submit'>Submit</Button>
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </>
  );
};

export default QuizizzCreate;
