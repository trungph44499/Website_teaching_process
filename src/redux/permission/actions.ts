import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {IPermissionModel} from '~/type/permission';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'permisstions/fetch',
  createAsyncAction<void, IPermissionModel[]>(async () => {
    const API_URL = `${CONFIGS.API_URL}/v1/auth/get-list-permisstion`;
    const {data} = await api.caller.get(API_URL);
    return data;
  })
);
