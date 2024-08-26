import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';

import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const createPlayerResult = createAsyncThunk(
  'CREATE_PLAYER_RESULT',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/playerResults`;
    const response = await api.caller.post(endpoint, payload.params);
    const data = response.data;

    return data;
  })
);


export const getPlayerResult = createAsyncThunk(
  'FETCH_PLAYER_RESULT',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/playerResults/${payload.params}`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const addAnswer = createAsyncThunk(
  'ADD_ANSWER',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/playerResults/${payload.params.id}/answers`;
    const response = await api.caller.patch(endpoint, payload.params.data);
    const data = response.data;

    return data;
  })
);