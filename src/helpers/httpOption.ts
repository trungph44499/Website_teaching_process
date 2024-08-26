import axios from 'axios';
import {API_DEV_URL, API_PROD_URL} from '~/helpers/constants';

export const http = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? API_PROD_URL : API_DEV_URL,
  timeout: 30000,
});
