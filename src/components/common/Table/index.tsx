import {message} from 'antd';
import confirm from 'antd/lib/modal/confirm';
import {TableProps as AntdTableProps} from 'antd/lib/table';
import {useState} from 'react';
import {AiOutlineExclamationCircle} from 'react-icons/ai';
import {useSelector} from 'react-redux';
import {Link} from 'react-router-dom';
import {TPermisstion} from '~/models/Auth.model';
import {actions, selector} from '~/redux/auth';
import * as S from './StyledTable';

type ActionProps = {
  type: 'create' | 'delete' | 'export' | 'import' | null;
  primary?: boolean;
  danger?: boolean;
  src?: string;
  label: string;
  index?: number;
  icon?: 'add' | 'delete' | 'file_upload' | 'download';
  handler?: (value?: any) => void;
};

type TableProps<T = any> = {
  action?: {
    left?: ActionProps[];
    right?: ActionProps[];
  };
  permisstion?: TPermisstion;
  loading?: boolean;
  multipleDelete?: boolean;
} & AntdTableProps<T>;

type RecordType = {[x: string]: any};

const ButtonAction = (props: {item: ActionProps; checkboxList: RecordType[]}) => {
  const onHandler = (item: ActionProps) => {
    if (item.type === 'delete') {
      if (props.checkboxList.length === 0) {
        return message.error('Phải có ít nhất một lựa chọn');
      }
      confirm({
        className: 'table-confirm',
        title: 'Bạn vẫn muốn thực thiện thao tác này?',
        icon: <AiOutlineExclamationCircle size={30} style={{color: 'var(--ant-error-color)'}} />,
        okType: 'danger',
        onOk() {
          item.handler && item.handler(props.checkboxList);
        },
        centered: true,
        okText: 'Đồng ý',
        cancelText: 'Hủy',
      });
    } else {
      item.handler && item.handler();
    }
  };

  return (
    <S.Button
      type={props.item.primary ? 'primary' : 'default'}
      danger={props.item.danger}
      onClick={() => onHandler(props.item)}
      disabled={props.item.type === 'delete' && props.checkboxList.length === 0}
    >
      {props.item.src ? (
        <Link to={props.item.src} className='btn-content'>
          {props.item.icon && (
            <span className='icon material-icons-outlined'>{props.item.icon}</span>
          )}
          {props.item.type === 'delete'
            ? props.item.label.replace('{n}', props.checkboxList.length.toString())
            : props.item.label}
        </Link>
      ) : (
        <div className='btn-content'>
          {props.item.icon && (
            <span className='icon material-icons-outlined'>{props.item.icon}</span>
          )}
          {props.item.type === 'delete'
            ? props.item.label.replace('{n}', props.checkboxList.length.toString())
            : props.item.label}
        </div>
      )}
    </S.Button>
  );
};

const Table = ({
  dataSource,
  action = {},
  loading = false,
  permisstion,
  columns = [],
  multipleDelete = true,
  ...props
}: TableProps) => {
  const isSuperAdmin = useSelector(selector.user)?.super_admin;
  const [checkboxList, setCheckboxList] = useState<RecordType[]>([]);

  const newDataSource = dataSource?.map((data, key) => {
    if (data.key) {
      return data;
    }
    // eslint-disable-next-line prettier/prettier
    return {...data, key};
  });

  const newColumns: any[] = [];
  columns.forEach((column) => {
    if (column.title?.toString().toLocaleLowerCase() === 'stt') {
      column.align = 'center';
    }
    const columnKeyExist =
      column.key && permisstion && permisstion.use && permisstion.field[column.key];

    if (isSuperAdmin || !column.key) {
      newColumns.push(column);
    } else if (!isSuperAdmin && columnKeyExist) {
      newColumns.push(column);
    }
  });

  const canReadData = permisstion && permisstion.use && permisstion.field.readonly;
  const dataSourceBeforeChecked =
    !permisstion || isSuperAdmin ? newDataSource : canReadData ? newDataSource : [];
  const canDeleteData =
    !permisstion || isSuperAdmin || (permisstion && permisstion.use && permisstion.field.delete);

  const ButtonActionElement = (key: 'left' | 'right') => {
    return action[key]
      ?.sort((a, b) => a.index! - b.index!)
      .map((item, index) => {
        const permissionUsing = item.type && permisstion?.use && permisstion?.field[item.type];
        const isActive = !permisstion || isSuperAdmin || permissionUsing;
        if (!multipleDelete && item.type === 'delete') {
          return null;
        }
        return isActive ? (
          <ButtonAction key={index} item={item} checkboxList={checkboxList} />
        ) : null;
      });
  };

  return (
    <S.Wrapper>
      {action && (
        <S.ButtonAction>
          <S.ButtonActionGroup>
            {ButtonActionElement('left')}
            {ButtonActionElement('right')}
          </S.ButtonActionGroup>
        </S.ButtonAction>
      )}
      <S.Table
        {...props}
        rowSelection={
          canDeleteData && multipleDelete
            ? {
                type: 'checkbox',
                onChange: (_: any, selectedRows: RecordType[]) => {
                  setCheckboxList(selectedRows);
                },
              }
            : undefined
        }
        dataSource={dataSourceBeforeChecked}
        columns={newColumns}
        loading={loading}
        sortDirections={['descend', 'ascend', 'descend']}
        scroll={{x: true}}
      />
    </S.Wrapper>
  );
};

export default Table;
