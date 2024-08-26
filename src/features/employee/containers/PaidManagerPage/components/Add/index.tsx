import React from 'react';
import {useStepsForm} from 'sunflower-antd';
import {Steps, Input, Button, Form, Select, message, TreeSelect} from 'antd';
import * as S from './styled';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {useNavigate} from 'react-router-dom';
import {
  coursesActions,
  coursesSelector,
  paidmanagerActions,
  paidmanagerSelector,
  slotAction,
  slotSelector,
  studentActions,
  studentSelector,
  teacherActions,
  teacherSelector,
} from '~/redux';
import withAuth from '~/helpers/withAuth';
import {capitalizeFirstLetter, formatTime, groupDayOfWeek} from '~/helpers';
import {WEEKENDS, WEEKENDS_EN} from '~/constants';
import Loading from '~/components/common/Loading';

const {Step} = Steps;

const PaidManagerAdd = () => {
  const navigate = useNavigate();
  const {Option} = Select;
  const dispatch = useDispatch<any>();

  const list = useSelector(studentSelector.selectList);

  const newdata = list?.result;

  const listcoures = useSelector(coursesSelector.selectList);
  const newlistcoures = listcoures?.result;
  const [datacores, setDatacoures] = useState(newlistcoures);
  const [isIdTeacher, setIdTeacher] = useState('');
  const [treeData, setTreeData] = useState([]);

  const listSlots = useSelector(teacherSelector.selectList);

  const listTeacher = useSelector(teacherSelector.selectList);
  const newlistteacher = listTeacher?.result;
  const [dataStart, setDataStart] = useState([] as any);

  const [startDate, setStartDate] = useState('');

  const listStart = useSelector(paidmanagerSelector.selectList);

  const newDataListStart = listStart?.listStart;

  const [valueTeacher, setValueTeacher] = useState(true);

  const [valueStart, setValueStart] = useState(false);

  const loadingStep1 = list.loading || listcoures.loading;
  const [loadingStep2, setLoadingStep2] = useState(true);

  const {form, current, gotoStep, stepsProps, formProps, submit, formLoading} = useStepsForm({
    async submit(values) {
      const {student, course, teacher, code, link, start_date, schedule} = values;
      delete values.slot;
      delete values.date;
      values.schedule = value;

      const dataadd = {
        ...values,
      };

      // delete values.slot

      try {
        const {payload} = await dispatch(paidmanagerActions.create({params: dataadd}));
        console.log(payload);
        if (payload.status && payload.status !== 200) {
          return Promise.reject(payload.message);
        }

        message.success('add class succesfully');
        navigate(-1);
      } catch (error: any) {
        message.error(error);
      }

      await new Promise((r) => setTimeout(r, 1000));
      return 'ok';
    },
    total: 2,
  });
  const onChangeTeacher = (value: string) => {
    setIdTeacher(value);
    setValueTeacher(true);
  };

  const onSearchTeacher = (value: string) => {};
  const {SHOW_PARENT} = TreeSelect;

  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [value, setValue] = useState<string[]>([]);

  const onchangeSlots = (valueSlotss: any) => {
    const index = WEEKENDS.findIndex((item: string) => item == valueSlotss);
    setStartDate(WEEKENDS_EN[index]);
    setValueStart(true);
  };
  const onchangeStart = (start: any) => {};

  const onChange = (newValue: string[]) => {
    setValue(newValue);
  };
  const tProps = {
    treeData,
    value,
    onChange,
    treeCheckable: true,
    showCheckedStrategy: SHOW_PARENT,
    placeholder: 'Please select',
    style: {
      width: '100%',
    },
  };
  const setValueTreeData = () => {
    if (!listSlots.listSlot.schedule) return;
    const data = listSlots.listSlot.schedule.filter((item: any) => item.is_booked == false);
    let schedule = groupDayOfWeek(data);

    schedule = schedule.map((item: any, i: number) => {
      return {
        title: capitalizeFirstLetter(WEEKENDS[i]),
        value: capitalizeFirstLetter(WEEKENDS[i]),
        checkable: false,
        children: item.map((itm: any) => {
          return {
            title: capitalizeFirstLetter(WEEKENDS[i]) + ' ' + itm.slot.text,
            value: itm._id,
          };
        }),
      };
    });
    schedule = schedule.filter((item: any) => item);
    setTreeData(schedule);
  };
  useEffect(() => {
    dispatch(studentActions.fetch({}));
  }, []);
  useEffect(() => {
    setValueTreeData();
  }, [listSlots]);

  useEffect(() => {
    const arrayDayStart: any = [];
    value.map((id: any) => {
      treeData.forEach((item: any) => {
        item.children.forEach((itm: any) => {
          if (itm.value == id) {
            arrayDayStart.push(item.value);
          }
        });
      });
    });
    setDataStart(Array.from(new Set(arrayDayStart)));
    form.setFieldsValue({
      date: [],
      start_date: '',
    });
  }, [value]);
  useEffect(() => {
    dispatch(coursesActions.fetch({}));
  }, []);
  useEffect(() => {
    (async () => {
      setLoadingStep2(true);
      await dispatch(teacherActions.fetch({}));
      setLoadingStep2(false);
    })();
  }, []);
  useEffect(() => {
    dispatch(slotAction.fetch({}));
  }, []);
  useEffect(() => {
    newlistcoures ? setDatacoures(newlistcoures) : setDatacoures([]);
  }, [listcoures]);
  useEffect(() => {
    if (!isIdTeacher) return;
    dispatch(teacherActions.readSlots({params: isIdTeacher}));
    const teacher = newlistteacher.find((item: any) => item._id == isIdTeacher);
    form.setFieldsValue({
      link: teacher.link,
      schedule: [],
      date: [],
      start_date: '',
    });
    setValue([]);
  }, [isIdTeacher]);

  useEffect(() => {
    startDate && dispatch(paidmanagerActions.getDateStart({params: {day: startDate}}));
  }, [startDate]);

  const formList = [
    <>
      {loadingStep1 ? (
        <Loading />
      ) : (
        <>
          <Form.Item
            label='Mã lớp'
            name='code'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập mã lớp',
              },
            ]}
          >
            <Input size='large' placeholder='Mã lớp' />
          </Form.Item>

          <Form.Item
            label='Học sinh'
            name='student'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn tìm kiếm học sinh',
              },
            ]}
          >
            <Select
              loading={list.loading}
              size='large'
              showSearch
              placeholder='Chọn 1 người'
              optionFilterProp='children'
              // onChange={onChangeStudent}
              // onSearch={onSearchStudent}
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
                message: 'Vui lòng nhập khóa học',
              },
            ]}
          >
            <Select
              loading={listcoures.loading}
              size='large'
              showSearch
              placeholder='Chọn 1 người'
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
          <Form.Item>
            <S.BtnButton>
              <Button onClick={() => gotoStep(current + 1)}>Next</Button>
            </S.BtnButton>
          </Form.Item>
        </>
      )}
    </>,

    <>
      {loadingStep2 ? (
        <Loading />
      ) : (
        <>
          <Form.Item
            label='Tìm kiếm giáo viên'
            name='teacher'
            rules={[
              {
                required: true,
                message: 'Vui lòng chọn 1 giáo viên',
              },
            ]}
          >
            <Select
              loading={listTeacher.loading}
              showSearch
              size='large'
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
            label='Link lớp học'
            name='link'
            rules={[
              {
                required: true,
                message: 'Vui lòng nhập link lớp học',
              },
            ]}
          >
            <Input size='large' placeholder='Link lớp học...' />
          </Form.Item>
          {valueTeacher && (
            <Form.Item
              label='Ca học'
              name='schedule'
              rules={[
                {
                  required: true,
                  message: 'Vui lòng chọn ca học',
                },
              ]}
            >
              <TreeSelect {...tProps} size='large' />
            </Form.Item>
          )}
          {value.length > 0 && (
            <Form.Item>
              <Form.Item
                style={{display: 'inline-block', width: 'calc(50% - 8px)'}}
                label='Chọn ngày học'
                name='date'
                rules={[
                  {
                    required: true,
                    message: 'Vui lòng chọn ngày bắt đầu lớp học',
                  },
                ]}
              >
                <Select
                  showSearch
                  size='large'
                  placeholder=''
                  optionFilterProp='children'
                  onChange={onchangeSlots}
                  filterOption={(input: any, option: any) =>
                    (option!.children as unknown as string)
                      .toLowerCase()
                      .includes(input.toLowerCase())
                  }
                >
                  {Array.isArray(dataStart) &&
                    dataStart?.map((item: any, index: number) => (
                      <Select.Option key={index} value={item}>
                        {item}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              {valueStart && (
                <Form.Item
                  style={{display: 'inline-block', width: 'calc(50% - 8px)', margin: '0 8px'}}
                  label='Ngày bắt đầu'
                  name='start_date'
                  rules={[
                    {
                      required: true,
                      message: 'Chọn ngày bắt đầu',
                    },
                  ]}
                >
                  <Select
                    showSearch
                    size='large'
                    placeholder=''
                    optionFilterProp='children'
                    onChange={onchangeStart}
                    filterOption={(input: any, option: any) =>
                      (option!.children as unknown as string)
                        .toLowerCase()
                        .includes(input.toLowerCase())
                    }
                  >
                    {Array.isArray(newDataListStart) &&
                      newDataListStart?.map((item: any) => (
                        <Select.Option key={item} value={item}>
                          {formatTime(item)}
                        </Select.Option>
                      ))}
                  </Select>
                </Form.Item>
              )}
            </Form.Item>
          )}
          <Form.Item>
            <S.BtnButton>
              <Button
                style={{marginRight: 10}}
                type='primary'
                loading={formLoading}
                onClick={() => {
                  submit().then((result) => {
                    if (result === 'ok') {
                      gotoStep(current + 1);
                    }
                  });
                }}
              >
                Submit
              </Button>
              <Button onClick={() => gotoStep(current - 1)}>Prev</Button>
            </S.BtnButton>
          </Form.Item>
        </>
      )}
    </>,
  ];

  return (
    <S.WrapperStepForm>
      <Steps {...stepsProps}>
        <Step title='Step 2' />
      </Steps>
      <div style={{marginTop: 60}}>
        <Form {...formProps} layout={'vertical'}>
          {formList[current]}
        </Form>
      </div>
    </S.WrapperStepForm>
  );
};
export default withAuth(PaidManagerAdd, 'create');
