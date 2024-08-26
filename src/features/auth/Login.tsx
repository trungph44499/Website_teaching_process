import {message} from 'antd';
import {Navigate, useNavigate} from 'react-router-dom';
import {AiFillCaretLeft, AiOutlineLoading3Quarters} from 'react-icons/ai';
import {getAuth, GoogleAuthProvider, signInWithPopup} from 'firebase/auth';

import GoogleIcon from '~/assets/google.png';
import MainLogo from '~/components/common/Logo/MainLogo';
import MainWhite from '~/components/common/Logo/MainWhite';

import * as S from './StyledAuth';
import {useAppDispatch} from '~/redux/store';
import {useSelector} from 'react-redux';
import axios from 'axios';
import {actions, selector} from '~/redux/auth';
import getEnvVars from '~/helpers/environment';
import {domain} from '~/helpers/get-app';
import {useState} from 'react';
import api from '~/api';

type LoginProps = {
  use: 'teachers' | 'students' | 'users';
};

function Login(props: LoginProps) {
  const authFiba = getAuth();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const auth = useSelector(selector.auth);
  const env = getEnvVars();

  const handleGoogleLogin = () => {
    signInWithPopup(authFiba, new GoogleAuthProvider()).then((response) => {
      message.loading({
        key: 'login',
        content: 'Đang đăng nhập',
      });
      axios
        .post(env.API_URL + '/v1/auth/check-user-login', {
          name: response.user.displayName,
          email: response.user.email,
          type: props.use,
        })
        .then((res) => {
          dispatch(actions.login(res.data));
          message.success({
            key: 'login',
            content: 'Đăng nhập thành công',
          });
          navigate('/');
        })
        .catch(() => {
          message.error({
            key: 'login',
            content: 'Đăng nhập thất bại',
          });
        });
    });
  };

  if (api.getToken() && auth.isAuthenticated) {
    return <Navigate to='/' replace={true} />;
  }

  return (
    <S.Wrapper>
      <S.Back>
        <a href={domain()}>
          <AiFillCaretLeft />
          Trang chủ
        </a>
      </S.Back>
      <S.LoginBox>
        <S.BoxLoginHeader>
          <div className='logo'>
            <MainLogo width='70%' />
          </div>
        </S.BoxLoginHeader>
        <S.ButtonGoogle block onClick={handleGoogleLogin}>
          <img src={GoogleIcon} alt='google' width={20} height={20} />
          <span>Đăng nhập với Google</span>
        </S.ButtonGoogle>
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

export default Login;
