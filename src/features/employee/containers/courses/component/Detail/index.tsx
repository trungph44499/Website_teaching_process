import {Button, Col, Input, InputRef, message, Row, Space} from 'antd';
import * as S from './style';
import Table from '~/components/common/Table';
import {useEffect, useRef, useState} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {coursesActions, curriculumActions, curriculumSelector, coursesSelector} from '~/redux';
import {ColumnsType} from 'antd/lib/table';
import {useParams} from 'react-router-dom';
import confirm from 'antd/lib/modal/confirm';
import {AiOutlineEdit} from 'react-icons/ai';
import Update from '../Update';
import EditCurriculum from './component/Edit/EditCurriculum';
import CurriculumAdd from './component/Add/CurriculumAdd';
import {selector} from '~/redux/auth';
import HeaderPage from '~/components/common/HeaderPage';
import type {ColumnType} from 'antd/es/table';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {get} from 'lodash';
import {formatTime} from '~/helpers';

const {Search} = Input;
interface DataType {
  key: string;
}
type DataIndex = keyof DataType;
const DetailCourse = (props: any) => {
  const {id} = useParams();
  const dispatch = useDispatch<any>();
  const lists = useSelector(curriculumSelector.selectList);
  const course = useSelector(coursesSelector.selectGetTransaction).result;

  const user = useSelector(selector.user);
  const curriclumPermisstion = user && user.permisstion && user.permisstion['curriculum'];

  const [popup, setPopup] = useState(false);
  const [popupCurriculum, setPopupCurriculum] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const dataSource = Array.isArray(lists?.result) ? lists.result : [];
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  interface DataType {
    key: string;
  }
  const hanldeDelete = async (record: any) => {
    try {
      confirm({
        className: 'table-confirm',
        title: 'Are you sure you want delete?',

        okType: 'danger',
        async onOk() {
          try {
            await new Promise((res: any) => {
              dispatch(curriculumActions.removeMany({params: {id: record}, onSuccess: res}));
            });
            message.success('Delete successfully');
          } catch (error) {
            message.error('update churn fail');
          }
        },
        centered: true,
        okText: 'OK',
        cancelText: 'Cancel',
      });
    } catch (error) {
      message.success('Delete fail');
    }
  };
  const afterUpdate = () => {
    togglePopup();
    dispatch(curriculumActions.fetch({}));
    dispatch(coursesActions.read({params: id}));
  };
  const afterHandlerCurr = () => {
    togglePopupCurriculum();
    dispatch(curriculumActions.fetch({}));
  };
  const handleReadCurriculum = (id: any) => {
    setIsUpdate(true);
    dispatch(curriculumActions.readone({params: {id: id}}));
    togglePopupCurriculum();
  };
  const handleSearch = (
    selectedKeys: string[],
    confirm: (param?: FilterConfirmProps) => void,
    dataIndex: DataIndex
  ) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };

  const handleReset = (clearFilters: () => void) => {
    clearFilters();
    setSearchText('');
  };

  const getColumnSearchProps = (dataIndex: any): ColumnType<DataType> => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={searchInput}
          placeholder='Tìm kiếm'
          value={selectedKeys[0]}
          onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
          onPressEnter={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
          style={{marginBottom: 8, display: 'block'}}
        />
        <Space>
          <Button
            type='primary'
            onClick={() => handleSearch(selectedKeys as string[], confirm, dataIndex)}
            icon={<SearchOutlined />}
            size='small'
            style={{width: 90}}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size='small'
            style={{width: 90}}
          >
            Reset
          </Button>
          <Button
            type='link'
            size='small'
            onClick={() => {
              confirm({closeDropdown: false});
              setSearchText((selectedKeys as string[])[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered: boolean) => (
      <SearchOutlined style={{color: filtered ? '#1890ff' : undefined}} />
    ),
    onFilter: (value, record) => {
      if (!get(record, dataIndex)) return;
      return get(record, dataIndex)
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase());
    },
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{backgroundColor: '#ffc069', padding: 0}}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ''}
        />
      ) : (
        text
      ),
  });
  const columns: ColumnsType<DataType> = [
    {
      title: 'Tiêu đề',
      dataIndex: 'title',
      ...getColumnSearchProps('title'),
    },

    {
      title: 'Tên khóa học',
      dataIndex: ['courses', 'courseName'],
      ...getColumnSearchProps('courses.courseName'),
    },

    {
      title: 'Bài học',
      dataIndex: '',
      key: '',
      render: (record: any) => {
        return (
          <>
            <span>{record?.lesson}</span>
          </>
        );
      },
    },

    {
      title: 'Mô tả',
      dataIndex: '',
      key: '',
      render: (record: any) => {
        return (
          <>
            <span>{record?.description}</span>
          </>
        );
      },
    },

    {
      title: 'Ngày thêm',
      dataIndex: 'createdAt',
      render: (record: any) => formatTime(record),
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      },
    },

    {
      title: 'Hoạt động',
      dataIndex: '',
      key: '',
      align: 'center',
      render: (record: any) => {
        return (
          <>
            <Row>
              <Col span={12}>
                <Button type='text' onClick={() => handleReadCurriculum(record?._id)}>
                  Sửa
                </Button>
              </Col>
              <Col span={12}>
                <Button type='text' danger onClick={() => hanldeDelete(record?._id)}>
                  Xóa
                </Button>
              </Col>
            </Row>
          </>
        );
      },
    },
  ];
  const handleDelete = () => {
    // TODO
  };
  const togglePopup = () => {
    setPopup(!popup);
  };
  const togglePopupCurriculum = () => {
    if (isUpdate) setIsUpdate(false);
    setPopupCurriculum(!popupCurriculum);
  };
  useEffect(() => {
    dispatch(coursesActions.read({params: id}));
    dispatch(curriculumActions.fetch({params: id}));
  }, [dispatch, id]);

  return (
    <S.Wrapper>
      <HeaderPage
        title={`Khóa học: ${course?.courseName}`}
        breadcrumb={[{text: 'Khóa học', link: '/courses'}, {text: 'Chi tiết khóa học'}]}
      />
      <S.WrapperInfo>
        <S.InfoTitle>
          Thông tin cơ bản <AiOutlineEdit size={25} onClick={togglePopup} />
        </S.InfoTitle>
        <S.InfoItem>
          Tên khóa học: <strong>{course?.courseName}</strong>
        </S.InfoItem>
        <S.InfoItem>
          Tổng số bài học: <strong>{course?.total_lesson}</strong>
        </S.InfoItem>
        <S.InfoItem>
          Chi phí: <strong>{course?.fee} VND</strong>
        </S.InfoItem>
      </S.WrapperInfo>
      <Table
        loading={lists.loading}
        dataSource={dataSource}
        columns={columns}
        permisstion={curriclumPermisstion}
        action={{
          left: [
            {
              type: 'create',
              icon: 'add',
              primary: true,
              label: 'Tạo chương trình giảng dạy',
              handler: togglePopupCurriculum,
            },
            {
              type: 'delete',
              primary: true,
              danger: true,
              label: 'Xóa',
              index: 1,
              icon: 'delete',
              handler: handleDelete,
            },
          ],
        }}
      />
      <S.StyledDrawer
        footer={null}
        closable={false}
        open={popup}
        title={'Update course'}
        onClose={togglePopup}
      >
        <Update handler={afterUpdate} course={course} models='course' />
      </S.StyledDrawer>
      <S.StyledDrawerCurr
        footer={null}
        closable={false}
        open={popupCurriculum}
        title={'Create curriculum'}
        onClose={togglePopupCurriculum}
        size='large'
      >
        {isUpdate ? (
          <EditCurriculum
            curriculum={lists?.listone}
            handler={afterHandlerCurr}
            models='curriculum'
          />
        ) : (
          <CurriculumAdd handler={afterHandlerCurr} models='curriculum' />
        )}
      </S.StyledDrawerCurr>
    </S.Wrapper>
  );
};

export default DetailCourse;
