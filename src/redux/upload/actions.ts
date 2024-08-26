import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';

import {createAsyncAction} from '~/helpers/thunkWrapper';
import {buildUrl} from '~/helpers/untils/app';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const uploadFile = createAsyncThunk(
  'upload',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/upload`;
    const response = await api.caller.post(endpoint, payload.params);
    const data = response.data;

    return data;
  })
);
export const deleteFile = createAsyncThunk(
  'upload/delete',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/upload/${payload.params}`;
    const response = await api.caller.delete(endpoint);
    const data = response.data;

    return data;
  })
);


