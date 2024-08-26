import {useEffect, useState, useRef} from 'react';
import Table from '~/components/common/Table';
import type {ColumnsType} from 'antd/es/table';
import {Button, Input, InputRef, message, Popconfirm, Space, Tag, Tooltip} from 'antd';
import {Link} from 'react-router-dom';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '~/redux/store';
import {demoClassActions, demoClassSelector} from '~/redux';
import moment from 'moment';
import HeaderPage from '~/components/common/HeaderPage';
import {STATUS_DEMO_CLASS} from '~/constants';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import Highlighter from 'react-highlight-words';
import {SearchOutlined} from '@ant-design/icons';
import type {ColumnType} from 'antd/es/table';
import {get} from 'lodash';

type Props = {
  permisstion: any;
};
type DataIndex = keyof DataType;

interface DataType {
  key: string;
  stt: string;
  teacher: string;
  student: string;
  saleman: string;
  slot: string;
  date: string;
  status: boolean;
}

const DemoClassList = (prop: Props) => {
  const democlass = useSelector(demoClassSelector.selectList);
  const dispatch = useAppDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  const confirm = (id: string) => {
    dispatch(demoClassActions.remove({params: id}));
  };
  const checkStatus = (record: any, _: boolean) => {
    const data = {...record, status: !_};
    dispatch(demoClassActions.update({params: data})).then(() => {
      message.success('Thay đổi trạng thái thành công!');
    });
  };
  const setStatus = (id: number) => {
    if (id == STATUS_DEMO_CLASS.NO_TEACHER) {
      return {color: '#ffc069', label: 'Giáo viên trống'};
    } else if (id == STATUS_DEMO_CLASS.PENDING) {
      return {color: '#0d9e00', label: 'Chờ dạy'};
    } else if (id == STATUS_DEMO_CLASS.CANCEL) {
      return {color: '#f50', label: 'Đã hủy'};
    }
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
      title: 'STT',
      render: (_: unknown, record: unknown, index: number) => {
        return <span>{index + 1}</span>;
      },
    },
    {
      title: 'Học sinh',
      dataIndex: ['student', 'email'],
      width: 40,
      ...getColumnSearchProps('student.email'),
    },
    {
      title: 'Số điện thoại',
      dataIndex: ['student', 'phone'],
      ellipsis: true,
      render: (record: any) => {
        return <p>{record?.student?.phone}</p>;
      },
      ...getColumnSearchProps('student.phone'),
    },
    {
      title: 'Giáo viên',
      align: 'center',
      dataIndex: ['teacher', 'name'],
      render: (record: any) => {
        return <p>{record?.teacher?.name}</p>;
      },
      ...getColumnSearchProps('teacher.name'),
    },
    {
      title: 'Link',
      render: (record: any) => {
        return (
          <Tooltip placement='topLeft' title={record?.link}>
            <a href={record?.link}> Link học</a>
          </Tooltip>
        );
      },
    },
    {
      title: 'Lịch học',
      children: [
        {
          title: 'Ca học',
          align: 'center',
          render: (record: any) => {
            return <p>{record?.schedule[0].slot.text}</p>;
          },
        },
        {
          title: 'Ngày học',
          align: 'center',
          dataIndex: ['schedule', 0, 'date'],
          render: (record: any) => {
            return <p>{moment(record?.schedule?.date).format('DD/MM/YYYY')}</p>;
          },
          defaultSortOrder: 'descend',
          sorter: (a: any, b: any) => {
            return new Date(a.schedule[0].date).getTime() - new Date(b.schedule[0].date).getTime();
          },
        },
      ],
    },
    {
      title: 'Ngày thêm',
      align: 'center',
      render: (record: any) => {
        return <p>{moment(record?.createdAt).format('DD/MM/YYYY')}</p>;
      },
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      },
    },
    {
      title: 'Trạng thái',
      align: 'center',
      dataIndex: 'status',
      filters: [
        {text: 'Chưa có giáo viên', value: 0},
        {text: 'Chờ dạy', value: 1},
        {text: 'Đã hủy', value: 2},
      ],
      onFilter: (value: any, record: any) => record.status.toString().includes(value.toString()),
      render: (record: any) => {
        return <Tag color={setStatus(record)?.color}>{setStatus(record)?.label}</Tag>;
      },
    },
    {
      title: 'Hoạt động',
      align: 'center',
      dataIndex: '_id',
      render: (record: any) => {
        return (
          <Link type='primary' to={`create-demo-class/${record}`}>
            Sửa
          </Link>
        );
      },
    },
    // {
    //   render: (_: any, record: any) => (
    //     <Popconfirm
    //       title='Are you sure to delete this task?'
    //       placement='topRight'
    //       onConfirm={() => confirm(record._id)}
    //       okText='Yes'
    //       cancelText='No'
    //     >
    //       <Link to=''>Delete</Link>
    //     </Popconfirm>
    //   ),
    // },
  ];
  useEffect(() => {
    dispatch(demoClassActions.fetch({}));
  }, [dispatch]);
  return (
    <div>
      <HeaderPage title='Quản lý lớp học thử' breadcrumb={[{text: 'Danh sách lớp học thử'}]} />
      <Table
        loading={democlass.loading}
        dataSource={democlass.result}
        columns={columns}
        permisstion={prop.permisstion}
      />
    </div>
  );
};

export default DemoClassList;
