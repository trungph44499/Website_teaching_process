import {createAsyncThunk} from '@reduxjs/toolkit';
import api from '~/api';
import getEnvVars from '~/helpers/environment';
import {http} from '~/helpers/httpOption';
import {createAsyncAction} from '~/helpers/thunkWrapper';
import {buildUrl} from '~/helpers/untils/app';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const getQuizes = createAsyncThunk(
  'FETCH_ALL_QUIZESt',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/quizes`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const getQuiz = createAsyncThunk(
  'FETCH_QUIZ',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    // const endpoint = `${CONFIGS.API_URL}/v1/quizes/${payload.params}`;
    const endpoint = `${CONFIGS.API_URL}/v1/quizes/${payload.params}`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const createQuiz = createAsyncThunk(
  'CREATE_QUIZ',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/quizes`;
    const response = await api.caller.post(endpoint, payload.params);
    const data = response.data;

    return data;
  })
);

export const fetchTeacherQuizes = createAsyncThunk(
  'FETCH_TEACHER_QUIZES',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/quizes/teacher/${payload.params.teacherId}`;
    const response = await api.caller.get(endpoint);
    const data = response.data;

    return data;
  })
);
export const updateQuiz = createAsyncThunk(
  'UPDATE_QUIZ',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    const endpoint = `${CONFIGS.API_URL}/v1/quizes/${payload.params.id}`;
    const response = await api.caller.patch(endpoint, payload?.params?.data);
    const data = response.data;

    return data;
  })
);

export const deleteQuiz = createAsyncThunk(
  'DELETE_QUIZ',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    console.log('paylod', payload?.params);
    const endpoint = `${CONFIGS.API_URL}/v1/quizes/${payload?.params}`;
    const response = await api.caller.delete(endpoint);
    const data = response.data;

    return data;
  })
);
