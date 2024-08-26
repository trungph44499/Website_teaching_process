import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {IStudentModel} from '~/type/student';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'student/fetch',
  createAsyncAction(async () => {
    const endpoint = `${CONFIGS.API_URL}/v1/students`;
    const response = await api.caller.get(endpoint);
    const data = response.data;
    return data;
  })
);

export const readSchedule = createAsyncThunk(
  'student/readSchedule',
  createAsyncAction<any, any>(async (payload: any) => {
    const {id, date} = payload.params;
    const query: any = date ? `?date=${date}` : '';
    const API_URL = `${CONFIGS.API_URL}/v1/students/${id}/schedule${query}`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const update = createAsyncThunk(
  'student/update',
  createAsyncAction<IStudentModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/students/${payload.params?._id}`;
    const {data} = await api.caller.put(API_URL, payload.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const create = createAsyncThunk(
  'student/create',
  createAsyncAction<IStudentModel, IStudentModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/students`;
    const {data} = await api.caller.post(API_URL, payload.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const remove = createAsyncThunk(
  'student/remove',
  createAsyncAction<string, IStudentModel>(async (payload, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/students/${payload.params}`;
    const {data} = await api.caller.delete(API_URL);
    notification.success({message: 'Delete success'});
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);
