import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {http} from '~/helpers/httpOption';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

// export const fetch = createAsyncThunk(
//   'paidmanager/get',
//   createAsyncAction(async (payload: ActionParams<any, any>) => {
//     const endpoint = `${CONFIGS.API_URL}/v1/paidClass`;
//     const response = await api.caller.get(endpoint);
//     const data = response.data;

//     return data;
//   })
// );
export const createGame = createAsyncThunk(
  'CREATE_GAME',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/games`;
    const response = await api.caller.post(endpoint, payload.params);
    const data = response.data;

    return data;
  })
);
export const getGame = createAsyncThunk(
  'FETCH_GAME',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/games/${payload.params}`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const addPlayer = createAsyncThunk(
  'ADD_PLAYER',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/games/${payload.params.gameId}/players`;
    const response = await api.caller.patch(endpoint, payload.params.playerId);
    const data = response.data;

    return data;
  })
);
// export const updateQuestionLeaderboard = createAsyncThunk(
//   'update/loaderboard',
//   createAsyncAction(async (payload: ActionParams<any, any>) => {
//     const endpoint = `${CONFIGS.API_URL}/v1/leaderboard/${payload.params.id}/questionleaderboard`;
//     const response = await api.caller.patch(endpoint, payload?.params?.data);
//     const data = response.data;

//     return data;
//   })
// );

// export const getDateStart = createAsyncThunk(
//   'get/getDateStart',
//   createAsyncAction(async (payload: ActionParams<any, any>) => {
//     const endpoint = `${CONFIGS.API_URL}/v1/paidClass/start-date`;
//     const response = await api.caller.post(endpoint, payload.params);
//     const data = response.data;

//     return data;
//   })
// );
// export const removeMany = createAsyncThunk(
//   'delete/deleteoneandmany',
//   createAsyncAction(async (payload: ActionParams<any, any>) => {
//     console.log('paylod', payload?.params);
//     const endpoint = `${CONFIGS.API_URL}/v1/paidClass`;
//     const response = await api.caller.delete(endpoint, {data: payload.params});
//     const data = response.data;

//     return data;
//   })
// );
