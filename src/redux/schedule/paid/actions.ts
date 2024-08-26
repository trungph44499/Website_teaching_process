import {createAsyncThunk} from '@reduxjs/toolkit';
import {notification} from 'antd';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ISchedulePaid} from '~/type/schedule/paid';

const CONFIGS = getEnvVars();

export const read = createAsyncThunk(
  'paid/read',
  createAsyncAction<string, ISchedulePaid>(async (action) => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers/${action.params}/paidBookedSlots`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);

export const update = createAsyncThunk(
  'paid/update',
  createAsyncAction<ISchedulePaid, any>(async (action) => {
    const API_URL = `${CONFIGS.API_URL}/v1/teachers/${action.params?._id}`;
    const {data} = await api.caller.patch(API_URL, action.params);
    notification.success({
      message: 'Update Success',
    });
    return data;
  })
);
