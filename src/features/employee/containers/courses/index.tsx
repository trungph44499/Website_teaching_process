import {useEffect, useRef, useState} from 'react';
import {Button, Input, InputRef, Popconfirm, Space} from 'antd';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import Table from '~/components/common/Table';
import {coursesActions, coursesSelector, useAppDispatch} from '~/redux';
import {AiFillDelete, AiFillEdit, AiOutlineFolderOpen} from 'react-icons/ai';
import './index.css';
import withAuth from '~/helpers/withAuth';
import {StyledDrawer, Wrapper} from './style';
import Create from './component/Create';
import HeaderPage from '~/components/common/HeaderPage';
import type {ColumnType} from 'antd/es/table';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {get} from 'lodash';

interface DataType {
  key: string;
}
type DataIndex = keyof DataType;

const Courses = (props: any) => {
  const courses = useSelector(coursesSelector.selectList);
  const [popup, setPopup] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const dispatch = useAppDispatch();
  const confirm = (id: any) => {
    dispatch(coursesActions.remove(id));
  };
  const togglePopup = () => {
    setPopup(!popup);
  };
  const afterCreate = () => {
    togglePopup();
    dispatch(coursesActions.fetch({}));
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
  const columns: any = [
    {
      title: 'STT',
      render: (_: unknown, record: unknown, index: number) => {
        return <span>{index + 1}</span>;
      },
      align: 'center',
    },
    {
      title: 'Tên khóa học',
      dataIndex: 'courseName',
      align: 'center',
      ...getColumnSearchProps('courseName'),
    },
    {
      title: 'Học Phí',
      dataIndex: 'fee',
      align: 'center',
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => a.fee - b.fee,
    },
    {
      title: 'Tổng số bài học',
      dataIndex: 'total_lesson',
      align: 'center',
      sorter: (a: any, b: any) => a.total_lesson - b.total_lesson,
    },
    {
      title: 'Chương trình giảng dạy',
      align: 'center',
      dataIndex: '_id',
      render: (id: any) => (
        <Link to={`/courses/${id}`}>
          <AiOutlineFolderOpen size={30} />
        </Link>
      ),
    },
    {
      title: 'Hành động',
      key: 'delete',
      render: (_: any, record: any) => (
        <>
          <Popconfirm
            title='Bạn có chắc muốn xóa?'
            onConfirm={() => confirm(record._id)}
            okText='Yes'
            cancelText='No'
          >
            <Link to={``} className='delete'>
              <AiFillDelete />
            </Link>
          </Popconfirm>{' '}
          <Link to={`/courses/${record._id}`} className='edit'>
            <AiFillEdit />
          </Link>
        </>
      ),
      align: 'center',
    },
  ];
  useEffect(() => {
    dispatch(coursesActions.fetch({}));
  }, [dispatch]);
  return (
    <Wrapper>
      <HeaderPage title='Trang quản lý khóa học' breadcrumb={[{text: 'Danh sách khóa học'}]} />
      <Table
        loading={courses.loading}
        size='small'
        columns={columns}
        dataSource={courses?.result}
        permisstion={props.permisstion}
        action={{
          left: [
            {
              label: 'Thêm mới',
              type: 'create',
              icon: 'add',
              primary: true,
              handler: togglePopup,
            },
            {
              label: 'Xóa {n} đã chọn',
              type: 'delete',
              icon: 'delete',
              primary: true,
              danger: true,
              handler: console.log,
            },
          ],
        }}
        scroll={{x: 400}}
      />
      <StyledDrawer
        footer={null}
        closable={false}
        open={popup}
        title={'Tạo khóa học'}
        onClose={togglePopup}
      >
        <Create handler={afterCreate} />
      </StyledDrawer>
    </Wrapper>
  );
};

export default withAuth(Courses);
