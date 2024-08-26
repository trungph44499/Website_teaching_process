import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import api from '~/api';
import {ICoursesModel} from '~/type/courses';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'courses/fetch',
  createAsyncAction<void, ICoursesModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/courses`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const update = createAsyncThunk(
  'courses/update',
  createAsyncAction<ICoursesModel>(async (action) => {
    const API_URL = `${CONFIGS.API_URL}/v1/courses/${action.params?._id}`;
    const {data} = await api.caller.put(API_URL, action.params);
    notification.success({
      message: 'Update success',
    });
    return data;
  })
);

export const read = createAsyncThunk(
  'courses/read',
  createAsyncAction<string, ICoursesModel>(async (action) => {
    const API_URL = `${CONFIGS.API_URL}/v1/courses/${action.params}`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const create = createAsyncThunk(
  'courses/create',
  createAsyncAction<ICoursesModel>(async (action) => {
    const API_URL = `${CONFIGS.API_URL}/v1/courses`;
    const {data} = await api.caller.post(API_URL, action.params);
    notification.success({
      message: 'Create success',
    });
    return data;
  })
);

export const remove = createAsyncThunk(
  'courses/remove',
  createAsyncAction(async (payload: ActionParams<any, any>, thunkAPI: any) => {
    const API_URL = `${CONFIGS.API_URL}/v1/courses/${payload}`;
    const {data} = await api.caller.delete(API_URL);
    thunkAPI.dispatch(fetch({}));
    notification.success({
      message: 'Delete success',
    });
    return data;
  })
);
