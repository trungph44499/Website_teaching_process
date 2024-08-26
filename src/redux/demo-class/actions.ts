import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {IDemoClassModel} from './style';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'demoClass/fetch',
  createAsyncAction<void, IDemoClassModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/demoClass`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const update = createAsyncThunk(
  'demoClass/update',
  createAsyncAction<IDemoClassModel>(async (payload) => {
    const API_URL = `${CONFIGS.API_URL}/v1/demoClass/${payload.params?._id}`;
    const {data} = await api.caller.patch(API_URL, payload.params);
    return data;
  })
);

export const read = createAsyncThunk(
  'demoClass/read',
  createAsyncAction<string, IDemoClassModel>(async (payload) => {
    const API_URL = `${CONFIGS.API_URL}/v1/demoClass/${payload.params}`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const create = createAsyncThunk(
  'demoClass/create',
  createAsyncAction<IDemoClassModel, IDemoClassModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/demoClass`;
    const {data} = await api.caller.post(API_URL, payload.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const remove = createAsyncThunk(
  'demoClass/remove',
  createAsyncAction<string, IDemoClassModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/demoClass/${payload.params}`;
    const {data} = await api.caller.delete(API_URL);
    notification.success({message: 'Delete success'});
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);
