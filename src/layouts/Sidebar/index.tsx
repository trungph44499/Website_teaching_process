import {Link, useLocation} from 'react-router-dom';
import MainLogo from '~/components/common/Logo/MainLogo';
import SiderAdmin from './SiderAdmin';
import SiderEmployee from './SiderEmployee';
import SiderStudent from './SiderStudent';
import SiderTeacher from './SiderTeacher';
import * as S from './StyledSidebar';

type SidebarProps = {
  use: 'student' | 'teacher' | 'employee' | 'admin';
};

const Sidebar = ({use}: SidebarProps) => {
  const location = useLocation();

  let ContentSider = null;
  if (use === 'employee') ContentSider = <SiderEmployee location={location} />;
  if (use === 'teacher') ContentSider = <SiderTeacher location={location} />;
  if (use === 'student') ContentSider = <SiderStudent location={location} />;
  if (use === 'admin') ContentSider = <SiderAdmin location={location} />;
  return (
    <S.Wrapper>
      <S.LogoSider>
        <Link to='/'>
          <MainLogo width={200} />
        </Link>
      </S.LogoSider>
      <div className='scroll-menu'>{ContentSider}</div>
    </S.Wrapper>
  );
};

export default Sidebar;
