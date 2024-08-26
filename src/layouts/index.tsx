import {Navigate, Outlet} from 'react-router-dom';
import * as S from './StyledLayout';
import Sidebar from './Sidebar';
import Header from './Header';
import {useDispatch, useSelector} from 'react-redux';
import {appAction, appSelector} from '~/redux/app.reducer';
import React from 'react';
import {AiOutlineClose} from 'react-icons/ai';
import {selector} from '~/redux/auth';
import api from '~/api';

type LayoutProps = {
  use: 'student' | 'teacher' | 'employee' | 'admin';
};

const Layouts = (props: LayoutProps) => {
  const dispatch = useDispatch();
  const app = useSelector(appSelector);
  const auth = useSelector(selector.auth);

  if (!api.getToken() && !auth.isAuthenticated) {
    return <Navigate to={`/login`} replace />;
  }

  return (
    <S.WrapLayout>
      <S.WrapSider width={260} trigger={null} collapsible collapsed={app.collapsed}>
        {React.createElement(AiOutlineClose, {
          className: 'trigger',
          onClick: () => dispatch(appAction.onCollapsed()),
        })}
        <Sidebar use={props.use} />
      </S.WrapSider>
      <div className={app.collapsed ? 'layout-content collapsed' : 'layout-content'}>
        <Header />
        <S.WrapContent>
          <Outlet />
        </S.WrapContent>
      </div>
    </S.WrapLayout>
  );
};

export default Layouts;
