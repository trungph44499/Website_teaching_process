import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {http} from '~/helpers/httpOption';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const fetch = createAsyncThunk(
  'feedbacks/get',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/feedbacks`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const create = createAsyncThunk(
  'feedbacks/create',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const query = `?sessionId=${payload.params.sessionId}`;
    const endpoint = `${CONFIGS.API_URL}/v1/feedbacks${query}`;
    const response = await api.caller.post(endpoint, payload.params);
    const data = response.data;

    return data;
  })
);
export const readone = createAsyncThunk(
  'get/getone',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/feedbacks/${payload.params.id}`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const update = createAsyncThunk(
  'update/updateone',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/feedbacks/${payload.params.id}`;
    const response = await api.caller.patch(endpoint, payload?.params?.data);
    const data = response.data;

    return data;
  })
);

export const removeMany = createAsyncThunk(
  'delete/deleteoneandmany',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    console.log('paylod', payload?.params);
    const endpoint = `${CONFIGS.API_URL}/v1/feedbacks`;
    const response = await api.caller.delete(endpoint, {data: payload.params});
    const data = response.data;

    return data;
  })
);
