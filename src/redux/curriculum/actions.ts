import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {http} from '~/helpers/httpOption';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'curriculumn/fetch',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const query = payload.params ? `?courses=${payload.params}` : '';
    const endpoint = `${CONFIGS.API_URL}/v1/curriculum${query}`;
    const response = await api.caller.get(endpoint);
    const data = response.data;
    return data;
  })
);
export const create = createAsyncThunk(
  'curriculumn/create',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/curriculum`;
    const response = await api.caller.post(endpoint, payload.params);
    const data = response.data;

    return data;
  })
);
export const readone = createAsyncThunk(
  'curriculumn/readone',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/curriculum/${payload.params.id}`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const update = createAsyncThunk(
  'curriculumn/update',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/curriculum/${payload.params.id}`;
    const response = await api.caller.patch(endpoint, payload?.params?.data);
    const data = response.data;

    return data;
  })
);
// export const getDateStart = createAsyncThunk(
//   'curriculumn/getDateStart',
//   createAsyncAction(async (payload: ActionParams<any, any>) => {
//     console.log('payloadSlots', payload);
//     const endpoint = `${CONFIGS.API_URL}/v1/paidClass/start-date`;
//     const response = await api.caller.post(endpoint, payload.params);
//     const data = response.data;

//     return data;
//   })
// );
export const removeMany = createAsyncThunk(
  'curriculumn/deleteoneandmany',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    console.log('paylod', payload?.params);
    const endpoint = `${CONFIGS.API_URL}/v1/curriculum/${payload.params.id}`;
    const response = await api.caller.delete(endpoint);
    const data = response.data;

    return data;
  })
);
