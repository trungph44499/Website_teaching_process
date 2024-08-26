import {useEffect, useState, useRef} from 'react';
import * as S from './styled';
import {Button, Input, InputRef, message, Space} from 'antd';
import './index.css';
import Table from '~/components/common/Table';
import type {ColumnsType} from 'antd/es/table';
import {useDispatch, useSelector} from 'react-redux';
import {paidmanagerActions, paidmanagerSelector} from '~/redux';
import {Link} from 'react-router-dom';
import HeaderPage from '~/components/common/HeaderPage';
import {formatTime} from '~/helpers';
import type {ColumnType} from 'antd/es/table';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {get} from 'lodash';

const ListPaidManager = (props: any) => {
  const {Search} = Input;
  const dispatch = useDispatch<any>();
  const listPaidManager = useSelector(paidmanagerSelector.selectList);
  const newData = listPaidManager?.result;
  const [dataList, setDatatList] = useState();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const onSearch = () => {
    //TODO
  };
  interface DataType {
    key: string;
  }
  type DataIndex = keyof DataType;

  const handleDelete = async (inputDelete: any) => {
    const listDel = inputDelete.map((o: any) => o._id);

    await new Promise((res: any) => {
      dispatch(
        paidmanagerActions.removeMany({
          params: {paidClass: listDel},
          onSuccess: (res: any) => {
            message.success('Xóa thành công');
            getData();
          },
          onError: (Error: any) => {
            message.error('Xóa thất bại');
          },
        } as any)
      );
    });
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
      title: 'Tên lớp học',
      dataIndex: 'code',
      ...getColumnSearchProps('code'),
    },

    {
      title: 'Giáo viên',
      dataIndex: ['teacher', 'name'],
      ...getColumnSearchProps('teacher.name'),
    },

    {
      title: 'Học sinh',
      dataIndex: ['student', 0, 'name'],
      ...getColumnSearchProps('student[0].name'),
    },

    {
      title: 'Khóa học',
      dataIndex: ['course', 'courseName'],
      ...getColumnSearchProps('course.courseName'),
    },

    {
      title: 'Ngày tạo',
      dataIndex: 'createdAt',
      key: '',
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

      render: (record: any) => {
        return (
          <>
            {' '}
            <Link to={`/paid-class/edit/${record?._id}`}>Sửa</Link>
          </>
        );
      },
    },
  ];
  const getData = () => {
    dispatch(paidmanagerActions.fetch({}));
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    newData ? setDatatList(newData) : setDatatList([] as any);
  }, [listPaidManager]);

  return (
    <S.Wrapper>
      <HeaderPage
        title='Lớp học chính thức'
        breadcrumb={[{text: 'Danh sách lớp học chính thức'}]}
      />
      <Table
        loading={listPaidManager.loading}
        dataSource={dataList}
        columns={columns}
        permisstion={props.permisstion}
        action={{
          left: [
            {
              type: 'create',
              icon: 'add',
              primary: true,
              src: '/paid-class/add',
              label: 'Tạo lớp',
            },
            {
              type: 'delete',
              primary: true,
              danger: true,
              // src: string;
              label: 'Xóa',
              index: 1,
              icon: 'delete',
              handler: handleDelete,
            },
          ],
          // right: [
          //   {
          //     type:  'delete',
          //     primary: true,
          //     danger: true,
          //     // src: string;
          //     label: "Delete",
          //     index : 1,
          //     icon :  'delete',
          //     handler: handleDelete
          //   },
          // ],
        }}
      />
    </S.Wrapper>
  );
};

export default ListPaidManager;
