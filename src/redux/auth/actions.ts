import {TUserResponse} from '~/models/Auth.model';
import {createAsyncThunk} from '@reduxjs/toolkit';
import getEnvVars from '~/helpers/environment';
import axios from 'axios';

const CONFIGS = getEnvVars();

export const getUserLogin = createAsyncThunk<TUserResponse, void, {rejectValue: string}>(
  'auth/getUserLogin',
  async (_, {rejectWithValue}) => {
    try {
      const accessToken = localStorage.getItem('OWS');
      return (await axios.post(CONFIGS.API_URL + '/v1/auth/get-user-info', {accessToken})).data;
    } catch (error) {
      rejectWithValue('Lấy thông tin không thành công');
    }
  }
);
