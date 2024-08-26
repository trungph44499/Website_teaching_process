import {AsyncThunkPayloadCreator} from '@reduxjs/toolkit';
import axios from 'axios';
import {message} from 'antd';
import { ActionParams } from '~/type';



/* eslint-disable */
export const createAsyncAction =
  <Params = undefined, Returned = undefined>(
    handle: AsyncThunkPayloadCreator<Returned, ActionParams<Params, any>, {}>
  ): AsyncThunkPayloadCreator<Returned, ActionParams<Params, any>, {}> =>
  async (params: ActionParams<Params, any> = {}, thunkAPI) => {
    try {
      const value: any = await handle(params, thunkAPI);
      if (value.success === false) throw value;
      if (params.onSuccess) params.onSuccess(value);
      if (params.onEnd) params.onEnd();
      return value;
    } catch (error: any) {
      const response =
        error && axios.isAxiosError(error)
          ? error.response?.data
          : error.success === false && error.message
          ? new Error(error.message)
          : null;
      const status = error.success === false ? error.status_code : error.response.status;

      if (params.onError) params.onError(response);
      else {
        message.error((response as Error).message || 'Unknow error');
      };
      if (params.onEnd) params.onEnd();

      if (status === 401) location.href = '/logout';

      return thunkAPI.rejectWithValue(response);
    }
  };
/* eslint-enable */
