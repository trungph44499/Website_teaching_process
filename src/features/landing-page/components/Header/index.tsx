import {useEffect, createRef, useState, RefObject} from 'react';
import {Link} from 'react-router-dom';
import MainLogo from '~/components/common/Logo/MainLogo';
import {domain} from '~/helpers/get-app';
import * as S from './styled';

const useOnClickOutside = (ref: RefObject<HTMLElement>, handler: () => void) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (!(ref.current && ref.current.contains(event.target))) {
        handler();
      }
    };
    document.addEventListener('mousedown', listener);
    document.addEventListener('touchstart', listener);
    return () => {
      document.removeEventListener('mousedown', listener);
      document.removeEventListener('touchstart', listener);
    };
  }, [ref, handler]);
};

const Header = () => {
  const ref = createRef<HTMLDivElement>();
  const [navActive, setNavActive] = useState<number>(0);
  useOnClickOutside(ref, () => setNavActive(0));

  const handleNavActive = (active: number) => {
    setNavActive(navActive == active ? 0 : active);
  };

  return (
    <S.Wrapper>
      <MainLogo width={180} />
      <S.Nav>
        <S.NavItem ref={ref}>
          <strong className='h-title' onClick={() => handleNavActive(1)}>
            Chương trình <i className='caret'></i>
          </strong>
          {navActive == 1 && (
            <S.NavDropdown>
              <Link to='/' className='item'>
                C#
              </Link>
              <Link to='/' className='item'>
                Java
              </Link>
              <Link to='/' className='item'>
                Python
              </Link>
            </S.NavDropdown>
          )}
        </S.NavItem>
        <S.NavItem ref={ref}>
          <strong className='h-title' onClick={() => handleNavActive(2)}>
            Lớp học <i className='caret'></i>
          </strong>
          {navActive == 2 && (
            <S.NavDropdown ref={ref}>
              <Link to='/' className='item'>
                Blog
              </Link>
              <Link to='/' className='item'>
                Giới thiệu
              </Link>
            </S.NavDropdown>
          )}
        </S.NavItem>
        <S.NavItem>
          <Link to='/'>
            <strong className='h-title'>Hỏi đáp</strong>
          </Link>
        </S.NavItem>
        <S.NavItem>
          <Link to='/'>
            <strong className='h-title'>Tìm hiểu thêm</strong>
          </Link>
        </S.NavItem>
      </S.Nav>
      <S.Action>
        <S.ActionButton href={domain('student')}>Đăng nhập</S.ActionButton>
        <S.ActionButton as={Link} to='/demo-register' border='true'>
          Tham gia học thử
        </S.ActionButton>
        <S.ActionButton as={Link} to='/demo-register' primary='true'>
          Đăng ký học thử miễn phí ngay hôm nay
        </S.ActionButton>
      </S.Action>
    </S.Wrapper>
  );
};

export default Header;
