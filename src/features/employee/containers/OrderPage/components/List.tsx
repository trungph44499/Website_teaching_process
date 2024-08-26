import {Button, Popconfirm, Switch, Input, Space, Tag} from 'antd';
import {useSelector} from 'react-redux';
import {useAppDispatch} from '~/redux/store';
import {useEffect} from 'react';
import {Link} from 'react-router-dom';
import Table from '~/components/common/Table';
import {SearchOutlined} from '@ant-design/icons';
import type {InputRef} from 'antd';
import type {ColumnType} from 'antd/es/table';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import {useRef, useState} from 'react';
import Highlighter from 'react-highlight-words';
import {ordersActions, ordersSelector} from '~/redux';
import withAuth from '~/helpers/withAuth';
import moment from 'moment';
import {Wrapper} from './styled';
import HeaderPage from '~/components/common/HeaderPage';
import {STATUS_ORDER} from '~/constants';

interface DataType {
  key: string;
  studentName: string;
  studentGrade: string;
  phone: string;
  email: string;
}

type DataIndex = keyof DataType;
const OrderList = (prop: any) => {
  const order = useSelector(ordersSelector.selectList);
  const dispatch = useAppDispatch();
  const confirm = (id: any) => {
    dispatch(ordersActions.remove(id));
  };
  const checkStatus = (record: any, _: boolean) => {
    const data = {params: {...record, status: !_}};
    dispatch(ordersActions.update(data));
  };
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

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

  const setStatus = (id: number) => {
    if (id == STATUS_ORDER.WAIT_CONFIRM) {
      return {color: '#ffc069', label: 'Chờ xác nhận'};
    } else if (id == STATUS_ORDER.CONFIRMED) {
      return {color: '#108ee9', label: 'Đã xác nhận'};
    } else if (id == STATUS_ORDER.CANCEL) {
      return {color: '#f50', label: 'Đã hủy'};
    }
  };

  const getColumnSearchProps = (dataIndex: DataIndex): ColumnType<DataType> => ({
    filterDropdown: ({setSelectedKeys, selectedKeys, confirm, clearFilters}) => (
      <div style={{padding: 8}}>
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
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
    onFilter: (value, record) =>
      record[dataIndex]
        .toString()
        .toLowerCase()
        .includes((value as string).toLowerCase()),
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
      title: 'Tên học sinh',
      dataIndex: 'studentName',

      ...getColumnSearchProps('studentName'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },

    {
      title: 'Số điện thoại',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Lớp',
      dataIndex: 'studentGrade',
      filters: [
        {text: 'Lớp 1', value: 'Lớp 1'},
        {text: 'Lớp 2-3', value: 'Lớp 2-3'},
        {text: 'Lớp 4-6', value: 'Lớp 4-6'},
        {text: 'Lớp 7-9', value: 'Lớp 7-9'},
        {text: 'Lớp 10-12', value: 'Lớp 10-12'},
      ],
      // filteredValue: filteredInfo.address || null,
      onFilter: (value: string, record: any) => record.studentGrade.includes(value),

      // ...getColumnSearchProps('studentGrade'),
    },
    {
      title: 'Lịch học',
      children: [
        {
          title: 'Ca học',
          render: (record: any) => {
            return <p>{record?.schedule?.slots?.text}</p>;
          },
          align: 'center',
        },
        {
          title: 'Ngày học',
          align: 'center',
          dataIndex: ['schedule', 'date'],
          render: (record: any) => {
            return <p>{moment(record?.schedule?.date).format('DD/MM/YYYY')}</p>;
          },
          defaultSortOrder: 'descend',
          sorter: (a: any, b: any) => {
            console.log(a, b);

            return new Date(a.schedule.date).getTime() - new Date(b.schedule.date).getTime();
          },
        },
      ],
    },
    {
      title: 'Trạng thái',
      dataIndex: 'status',
      align: 'center',
      filters: [
        {text: 'Chờ xác nhận', value: 0},
        {text: 'Đã xác nhận', value: 1},
        {text: 'Đã hủy', value: 2},
      ],
      onFilter: (value: string, record: any) => record.status.toString().includes(value.toString()),
      render: (_: any, record: any) => (
        <Tag color={setStatus(record.status)?.color}>{setStatus(record.status)?.label}</Tag>
      ),
    },
    {
      title: 'Ngày tạo',
      dataIndex: '',
      render: (record: any) => {
        return <p>{moment(record?.createdAt).format('DD/MM/YYYY')}</p>;
      },
      defaultSortOrder: 'descend',
      sorter: (a: any, b: any) => {
        return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
      },
    },
    {
      title: 'Tạo lớp',
      align: 'center',
      render: (_: any, record: any) => (
        <Button type='text' hidden={record.status}>
          <Link to={`/orders/create-demo-class/${record._id}`}>
            <Tag color='orange'>Tạo lớp</Tag>
          </Link>
        </Button>
      ),
    },
    {
      title: 'Hành động',
      align: 'center',
      key: 'delete',
      render: (_: any, record: any) => (
        <Popconfirm
          title='Bạn có chắc muốn xóa?'
          onConfirm={() => confirm(record._id)}
          okText='Yes'
          cancelText='No'
        >
          <Link to=''>Xóa</Link>
        </Popconfirm>
      ),
    },
  ];
  useEffect(() => {
    dispatch(ordersActions.fetch({}));
  }, [dispatch]);
  return (
    <Wrapper>
      <HeaderPage
        title='Trang quản lí đăng ký lớp học thử'
        breadcrumb={[{text: 'Danh sách đăng ký học thử'}]}
      />
      <Table
        loading={order.loading}
        size='small'
        columns={columns}
        dataSource={order?.result}
        permisstion={prop.permisstion}
        action={{
          left: [
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
    </Wrapper>
  );
};

export default withAuth(OrderList);
