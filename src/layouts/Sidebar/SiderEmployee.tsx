import {Menu} from 'antd';
import {Link} from 'react-router-dom';
import appmenu from '~/helpers/configs/appmenu';
import * as S from './StyledSidebar';
import type {Location} from '@remix-run/router';
import {useSelector} from 'react-redux';
import {selector} from '~/redux/auth';

type Props = {
  location: Location;
};

const SiderEmployee = (props: Props) => {
  const user = useSelector(selector.user);

  const menus = appmenu.employee.filter((item) => {
    return (
      !item.role ||
      (user && user.super_admin ) ||
      (user &&
        item.role &&
        user.permisstion &&
        user.permisstion[item.role] &&
        user.permisstion[item.role].use)
    );
  });

  return (
    <S.MenuSider
      as={Menu}
      mode='inline'
      defaultSelectedKeys={[props.location.pathname.replace('/', '')]}
    >
      {menus.map((item) => (
        <Menu.Item key={item.key} icon={item.icon}>
          <Link to={item.src!}>{item.label}</Link>
        </Menu.Item>
      ))}
    </S.MenuSider>
  );
};

export default SiderEmployee;
