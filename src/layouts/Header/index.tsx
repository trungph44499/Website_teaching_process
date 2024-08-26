import {Avatar, Menu} from 'antd';
import React from 'react';
import {AiOutlineMenu} from 'react-icons/ai';
import {useDispatch, useSelector} from 'react-redux';
import {appAction, appSelector} from '~/redux/app.reducer';
import * as S from './StyledHeader';
import {actions, selector} from '~/redux/auth';
import {useNavigate} from 'react-router-dom';
import {signOut, getAuth} from 'firebase/auth';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const app = useSelector(appSelector);
  const user = useSelector(selector.user);
  const auth = getAuth();

  const handleLogout = () => {
    signOut(auth).then(() => {
      dispatch(actions.logout());
      navigate(`/login`);
    });
  };

  const menuDropdown = (
    <Menu
      items={[
        {
          label: <span>Thông tin cá nhân</span>,
          key: '0',
        },
        {
          label: <span>Đăng xuất</span>,
          key: '1',
          onClick: handleLogout,
        },
      ]}
    />
  );

  return (
    <S.Wrapper className={app.collapsed ? 'collapsed' : ''}>
      <S.Trigger className={app.collapsed ? 'collapsed' : ''}>
        {React.createElement(app.collapsed ? AiOutlineMenu : AiOutlineMenu, {
          className: 'trigger',
          onClick: () => dispatch(appAction.onCollapsed()),
        })}
      </S.Trigger>
      <S.HeaderUser overlay={menuDropdown} trigger={['click']}>
        <div>
          <div style={{marginRight: '10px'}}>{user?.name}</div>
          <Avatar style={{color: '#f56a00', backgroundColor: '#fde3cf'}}>
            <span>{user?.name[0]}</span>
          </Avatar>
        </div>
      </S.HeaderUser>
    </S.Wrapper>
  );
};

export default Header;
