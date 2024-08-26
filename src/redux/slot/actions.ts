import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ISlotModel} from '~/type/slot';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'slot/fetch',
  createAsyncAction<void, ISlotModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/slots`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const update = createAsyncThunk(
  'slot/update',
  createAsyncAction<ISlotModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/slots/${payload.params?._id}`;
    const {data} = await api.caller.put(API_URL, payload.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const read = createAsyncThunk(
  'slot/read',
  createAsyncAction<string, ISlotModel>(async (payload) => {
    const API_URL = `${CONFIGS.API_URL}/v1/slots/${payload.params}`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const create = createAsyncThunk(
  'slot/create',
  createAsyncAction<ISlotModel, ISlotModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/slots`;
    const {data} = await api.caller.post(API_URL, payload.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const remove = createAsyncThunk(
  'slot/remove',
  createAsyncAction<string, ISlotModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/slots/${payload.params}`;
    const {data} = await api.caller.delete(API_URL);
    notification.success({message: 'Delete success'});
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);
