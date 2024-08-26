import {message} from 'antd';
import {Navigate, useNavigate} from 'react-router-dom';
import {AiFillCaretLeft, AiOutlineLoading3Quarters} from 'react-icons/ai';

import MainLogo from '~/components/common/Logo/MainLogo';
import MainWhite from '~/components/common/Logo/MainWhite';

import * as S from './StyledAuth';
import {useAppDispatch} from '~/redux/store';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {actions, selector} from '~/redux/auth';
import getEnvVars from '~/helpers/environment';
import {domain} from '~/helpers/get-app';
import api from '~/api';

function LoginAdmin() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useSelector(selector.auth);
  const env = getEnvVars();

  const onFinish = (payload: any) => {
    message.loading({
      key: 'login',
      content: 'Đang đăng nhập',
    });
    axios.post(env.API_URL + '/v1/auth/super-admin-login', payload).then((res) => {
      if (res.data.status === 200) {
        dispatch(actions.login(res.data.results));
        message.success({
          key: 'login',
          content: 'Đăng nhập thành công',
        });
        navigate('/');
      } else {
        message.error({
          key: 'login',
          content: 'Đăng nhập thất bại',
        });
      }
    });
  };

  if (api.getToken() && auth.isAuthenticated) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <S.Wrapper>
      <S.LoginBox>
        <S.BoxLoginHeader>
          <a href={domain()} className='logo'>
            <MainLogo width='70%' />
          </a>
        </S.BoxLoginHeader>
        <S.FormLogin layout='vertical' onFinish={onFinish}>
          <S.FormLogin.Item label='Tài khoản' name='username'>
            <S.InputLogin />
          </S.FormLogin.Item>
          <S.FormLogin.Item label='Mật khẩu' name='password'>
            <S.InputLoginPassword />
          </S.FormLogin.Item>
          <S.ButtonLogin block htmlType='submit'>
            Đăng nhập
          </S.ButtonLogin>
        </S.FormLogin>
      </S.LoginBox>
      <S.BoxPrimary>
        <MainWhite width='400px' />
        <div className='spiner'>
          <AiOutlineLoading3Quarters />
        </div>
      </S.BoxPrimary>
    </S.Wrapper>
  );
}

export default LoginAdmin;
