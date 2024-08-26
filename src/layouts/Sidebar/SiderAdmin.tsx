import {Menu} from 'antd';
import appmenu from '~/helpers/configs/appmenu';
import * as S from './StyledSidebar';
import type {Location} from '@remix-run/router';
import {Link} from 'react-router-dom';

type Props = {
  location: Location;
};

const SiderAdmin = (props: Props) => {
  return (
    <S.MenuSider
      as={Menu}
      mode='inline'
      defaultSelectedKeys={[props.location.pathname.replace('/', '')]}
    >
      {appmenu.admin.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.src!}>{item.label}</Link>
        </Menu.Item>
      ))}
    </S.MenuSider>
  );
};

export default SiderAdmin;
