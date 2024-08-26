import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {IUserModel} from '~/type/users';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'users/fetch',
  createAsyncAction<void, IUserModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/users/all`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const create = createAsyncThunk(
  'users/create',
  createAsyncAction<IUserModel>(async (action, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/users`;
    const {data} = await api.caller.post(API_URL, action.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const update = createAsyncThunk(
  'users/update',
  createAsyncAction<IUserModel>(async (action, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/users/${action.params?._id}`;
    const {data} = await api.caller.put(API_URL, action.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const updatePassword = createAsyncThunk(
  'users/updatePassword',
  createAsyncAction<IUserModel>(async (action, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/users/password/${action.params?._id}`;
    const {data} = await api.caller.put(API_URL, action.params);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);

export const permanentlyDelete = createAsyncThunk(
  'users/permanentlyDelete',
  createAsyncAction<string>(async (action, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/users/${action.params}`;
    const {data} = await api.caller.delete(API_URL);
    thunkAPI.dispatch(fetch({}));
    return data;
  })
);
