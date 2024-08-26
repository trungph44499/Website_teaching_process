import {Button, Card, Input, InputRef, message, Popconfirm, Space, Tag} from 'antd';
import {useEffect, useState, useRef} from 'react';
import {useSelector} from 'react-redux';
import Table from '~/components/common/Table';
import {permissionActions, useAppDispatch, userActions, userSelector} from '~/redux';
import {appAction} from '~/redux/app.reducer';
import {IUserModel} from '~/type/users';
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

const UserPage = () => {
  const dispatch = useAppDispatch();
  const [userEdit, setUserEdit] = useState<IUserModel | null>(null);
  const [openModalCreate, setOpenModalCreate] = useState<boolean>(false);
  const {users, delete: deleteSelector} = useSelector(userSelector.selectData);
  const [searchText, setSearchText] = useState('');
  const [searchedColumn, setSearchedColumn] = useState('');
  const searchInput = useRef<InputRef>(null);

  useEffect(() => {
    dispatch(userActions.fetch({}));
    dispatch(permissionActions.fetch({}));
    dispatch(appAction.getAllCountry());
  }, [dispatch]);

  useEffect(() => {
    if (deleteSelector.success) {
      message.success('Xoá thành công');
    }
  }, [deleteSelector]);

  const permanentlyDelete = (_id?: string) => {
    dispatch(userActions.permanentlyDelete({params: _id}));
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
      title: 'Tên tài khoản',
      dataIndex: 'username',
      render(value: string) {
        return value && !value.includes('@') ? value : null;
      },
      ...getColumnSearchProps('username'),
    },
    {
      title: 'Email',
      dataIndex: 'email',
      render(value: string) {
        return value && value.includes('@') ? value : null;
      },
      ...getColumnSearchProps('email'),
    },
    {
      title: 'Tài khoản quản trị',
      width: '10%',
      align: 'center',
      dataIndex: 'super_admin',
      style: {padding: '10px'},
      render(value: boolean) {
        return (
          <Tag style={{width: '100%'}} color={value ? 'blue' : 'default'}>
            {value ? 'Yes' : 'No'}
          </Tag>
        );
      },
    },
    {
      title: 'Hành động',
      width: '10%',
      render(_: any, record: IUserModel) {
        return (
          <Button.Group style={{justifyContent: 'right', width: '100%'}}>
            <Button onClick={() => setUserEdit(record)}>Cập nhật</Button>
            <Popconfirm
              title='Bạn có chắc muốn xóa?'
              onConfirm={() => permanentlyDelete(record._id)}
              okText='Yes'
              cancelText='No'
              placement='leftTop'
              style={{flex: 1}}
            >
              <Button>Xóa</Button>
            </Popconfirm>
          </Button.Group>
        );
      },
    },
  ];

  return (
    <Card>
      <Table
        loading={users.loading}
        columns={columns}
        dataSource={users.result}
        multipleDelete={false}
        action={{
          left: [
            {
              type: 'create',
              label: 'Tạo tài khoản',
              icon: 'add',
              primary: true,
              handler: () => setOpenModalCreate(true),
            },
            {
              type: 'delete',
              label: 'Xóa {n} tài khoản',
              icon: 'delete',
              primary: true,
              danger: true,
            },
          ],
        }}
      />
      <StyledDrawer
        footer={null}
        closable={false}
        maskClosable
        open={!!userEdit || openModalCreate}
        title={userEdit ? `Cập nhật ${userEdit.name}` : 'Tạo tài khoản'}
        onClose={() => (userEdit ? setUserEdit(null) : setOpenModalCreate(false))}
      >
        {userEdit ? (
          <Update
            onClose={() => {
              setUserEdit(null);
            }}
            userEdit={userEdit}
          />
        ) : null}
        {openModalCreate ? <Create onClose={setOpenModalCreate} /> : null}
      </StyledDrawer>
    </Card>
  );
};

export default UserPage;
