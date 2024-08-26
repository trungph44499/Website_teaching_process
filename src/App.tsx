import { useAppDispatch} from './redux';
import {actions as AuthActions} from '~/redux/auth';
import {useEffect} from 'react';
import {initializeApp} from './helpers/get-app';


const App = () => {
  const AppContainer = initializeApp();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(AuthActions.getUserLocal());
    dispatch(AuthActions.setAuthenticated());
  }, [dispatch]);

  return <AppContainer />;
};

export default App;
