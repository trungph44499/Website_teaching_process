import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import api from '~/api';
import {IOrderModel} from '~/type/orders';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'orders/fetch',
  createAsyncAction<void, IOrderModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/orders`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const update = createAsyncThunk(
  'orders/update',
  createAsyncAction<IOrderModel>(async (action, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/orders/${action.params?._id}`;
    const {data} = await api.caller.patch(API_URL, action.params);
    thunkAPI.dispatch(fetch({}));
    notification.success({
      message: 'Update success',
    });
    return data;
  })
);

export const read = createAsyncThunk(
  'orders/read',
  createAsyncAction<string, IOrderModel>(async (action) => {
    const API_URL = `${CONFIGS.API_URL}/v1/orders/${action.params}`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const create = createAsyncThunk(
  'orders/create',
  createAsyncAction<IOrderModel>(async (action) => {
    const API_URL = `${CONFIGS.API_URL}/v1/orders`;
    const {data} = await api.caller.post(API_URL, action.params);
    notification.success({
      message: 'Đăng ký thành công!',
    });
    return data;
  })
);

export const remove = createAsyncThunk(
  'orders/remove',
  createAsyncAction(async (payload: ActionParams<any, any>, thunkAPI: any) => {
    const API_URL = `${CONFIGS.API_URL}/v1/orders/${payload}`;
    const {data} = await api.caller.delete(API_URL);
    thunkAPI.dispatch(fetch({}));
    notification.success({
      message: 'Delete success',
    });
    return data;
  })
);

export const applyOrder = createAsyncThunk(
  'orders/applyOrder',
  createAsyncAction<any>(async (action, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/orders/apply`;
    const {data} = await api.caller.post(API_URL, action.params);
    notification.success({
      message: 'Ứng tuyển thành công !',
    });
    return data;
  })
);

export const cancelApplyOrder = createAsyncThunk(
  'orders/cancelApply',
  createAsyncAction<any>(async (action, thunkAPI) => {
    const API_URL = `${CONFIGS.API_URL}/v1/orders/cancel-apply`;
    const {data} = await api.caller.post(API_URL, action.params);
    notification.success({
      message: 'Hủy ứng tuyển thành công !',
    });
    return data;
  })
);
