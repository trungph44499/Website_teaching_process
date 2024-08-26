import {createAsyncThunk} from '@reduxjs/toolkit';
import {useDispatch} from 'react-redux';
import {io} from 'socket.io-client';
import api from '~/api';
import getEnvVars from '~/helpers/environment';

import {createAsyncAction} from '~/helpers/thunkWrapper';
import {ActionParams} from '~/type';

const CONFIGS = getEnvVars();

export const createSocket = createAsyncThunk(
  'CREATE_SOCKET',
  createAsyncAction(async (payload: ActionParams<any, any>) => {
    console.log("payloads", payload)
    const data = payload.params;
    console.log('sdata', data);
    return data;
  })
);
