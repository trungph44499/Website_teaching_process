import {Button, Card, Input, InputRef, Popconfirm, Space, Tabs} from 'antd';
import {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import Table from '~/components/common/Table';
import {useAppDispatch} from '~/redux';
import {actions, selector} from '~/redux/teacher';
import {ITeacherModel} from '~/type/teacher';
import Create from './components/Create';
import Update from './components/Update';
import {StyledDrawer} from './styled';

import type {ColumnType} from 'antd/es/table';
import type {FilterConfirmProps} from 'antd/es/table/interface';
import {SearchOutlined} from '@ant-design/icons';
import Highlighter from 'react-highlight-words';
import {get} from 'lodash';

interface DataType {
  key: string;
}
type DataIndex = keyof DataType;

const TeacherPage = () => {
  const dispatch = useAppDispatch();
  const teachers = useSelector(selector.selectList);
  const teachersTrash = useSelector(selector.selectListTrash);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const [tabActive, setTabActive] = useState<string>('list');
  const [teacherEdit, setTeacherEdit] = useState<ITeacherModel | null>(null);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(actions.fetch({}));
    dispatch(actions.fetchTrash({}));
  }, [dispatch]);

  const handleDelete = (_id: string) => {
    dispatch(actions.remove({params: _id}))
      .unwrap()
      .then(() => dispatch(actions.fetchTrash({})));
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
      width: '70px',
      align: 'center',
      render(_: any, __: any, index: number) {
        return index + 1;
      },
    },
    {
      title: 'Họ tên',
      dataIndex: 'name',
      ...getColumnSearchProps('name'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Quốc gia',
      dataIndex: 'country',
      ...getColumnSearchProps('country'),
    },
    {
      title: 'Điện thoại',
      dataIndex: 'phone',
      ...getColumnSearchProps('phone'),
    },
    {
      title: 'Số ca đăng ký',
      align: 'center',
      dataIndex: 'paidBookedSlots',
      render(value: []) {
        return value.length + ' slot';
      },
    },
    {
      title: 'Số lớp dạy thử',
      dataIndex: 'demoBookedSlots',
      align: 'center',
      render(value: []) {
        return value.length + ' slot';
      },
    },
    {
      title: 'Hành động',
      dataIndex: '_id',
      align: 'center',
      width: '10%',
      render(_id: string, record: ITeacherModel) {
        return (
          <Button.Group style={{justifyContent: 'right', width: '100%'}}>
            {tabActive === 'list' ? (
              <>
                <Button onClick={() => setTeacherEdit(record)}>Update</Button>
                <Popconfirm
                  title='Bạn có chắc muốn xóa?'
                  onConfirm={() => handleDelete(_id)}
                  okText='Yes'
                  cancelText='No'
                  placement='leftTop'
                  style={{flex: 1}}
                >
                  <Button>Delete</Button>
                </Popconfirm>
              </>
            ) : null}
          </Button.Group>
        );
      },
    },
  ];

  const tableTeachers = (
    <Table
      loading={teachers.loading}
      columns={columns}
      dataSource={Array.isArray(teachers.result) ? teachers.result : []}
      multipleDelete={false}
      action={{
        left: [
          {
            type: 'create',
            label: 'Thêm giáo viên',
            icon: 'add',
            primary: true,
            handler: () => setOpenModalCreate(true),
          },
          {
            type: 'delete',
            label: 'Xóa {n} giáo viên',
            icon: 'delete',
            primary: true,
            danger: true,
          },
        ],
      }}
    />
  );

  const tableTeachersTrash = (
    <Table
      loading={teachers.loading}
      columns={columns}
      dataSource={teachersTrash.result}
      multipleDelete={false}
    />
  );

  const tabItems = [
    {label: 'Danh sách giáo viên', key: 'list', children: tableTeachers},
    {label: 'Thùng rác', key: 'trash', children: tableTeachersTrash},
  ];

  return (
    <Card>
      <Tabs onChange={setTabActive} items={tabItems} />;
      <StyledDrawer
        footer={null}
        closable={false}
        maskClosable={false}
        open={!!teacherEdit || openModalCreate}
        title={teacherEdit ? `Update ${teacherEdit.name}` : 'New Teacher'}
      >
        {teacherEdit ? (
          <Update onClose={() => setTeacherEdit(null)} teacherEdit={teacherEdit} />
        ) : null}
        {openModalCreate ? <Create onClose={setOpenModalCreate} /> : null}
      </StyledDrawer>
    </Card>
  );
};

export default TeacherPage;
