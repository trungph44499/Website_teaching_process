import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';
import {ITeacherModel} from '~/type/teacher';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'teacher/fetch',
  createAsyncAction<void, ITeacherModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const fetchTrash = createAsyncThunk(
  'teacher/fetchTrash',
  createAsyncAction<void, ITeacherModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers?deleted=yes`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const fetchDemoClassAvailable = createAsyncThunk(
  'teacher/fetchDemoClassAvailable',
  createAsyncAction<string>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers/${payload.params}/demo-class`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const update = createAsyncThunk(
  'teacher/update',
  createAsyncAction<ITeacherModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers/${payload.params?._id}`;
    const {data} = await api.caller.put(API_URL, payload.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const read = createAsyncThunk(
  'teacher/read',
  createAsyncAction<string, ITeacherModel>(async (payload) => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers/${payload.params}`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const create = createAsyncThunk(
  'teacher/create',
  createAsyncAction<ITeacherModel, ITeacherModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers`;
    const {data} = await api.caller.post(API_URL, payload.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const remove = createAsyncThunk(
  'teacher/remove',
  createAsyncAction<string, ITeacherModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers/${payload.params}`;
    const {data} = await api.caller.delete(API_URL);
    notification.success({message: 'Delete success'});
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);
export const readSlots = createAsyncThunk(
  'read/readSlots',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/teachers/${payload.params}/paidBookedSlots`;
    const response = await api.caller.get(endpoint);
    const data = response.data;
    return data;
  })
);

export const readSchedule = createAsyncThunk(
  'teacher/readSchedule',
  createAsyncAction<any, any>(async (payload: any) => {
    const {id, date} = payload.params;
    const query: any = date ? `?date=${date}` : '';
    const API_URL = `${CONFIGS.API_URL}/v1/teachers/${id}/schedule${query}`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);
