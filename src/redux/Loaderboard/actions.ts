import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';

import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();


export const createLeaderboard = createAsyncThunk(
  'CREATE_LEADERBOARDe',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    console.log("datapay", payload.params)
    const endpoint = `${CONFIGS.API_URL}/v1/leaderboard`;
    const response = await api.caller.post(endpoint, payload.params);
    const data = response.data;

    return data;
  })
);

export const updateQuestionLeaderboard = createAsyncThunk(
  'update/loaderboard',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/leaderboard/${payload.params.id}/questionleaderboard`;
    const response = await api.caller.patch(endpoint, payload?.params?.data);
    const data = response.data;

    return data;
  })
);
export const updateCurrentLeaderboard = createAsyncThunk(
  'update/crrent',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/leaderboard/${payload.params.id}/currentleaderboard`;
    const response = await api.caller.patch(endpoint, payload?.params?.data);
    const data = response.data;

    return data;
  })
);
