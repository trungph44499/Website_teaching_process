import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export interface CountryType {
  label: string;
  value: string;
}

const getAllCountry = createAsyncThunk<CountryType[]>('app/get-country', async () => {
  const {data} = await axios.get('https://restcountries.com/v3.1/all');
  const results = data.map((item: any) => ({
    label: item.name.common,
    value: item.name.common,
  }));
  return results;
});

type AppState = {
  collapsed: boolean;
  countries: CountryType[];
};

const initialState: AppState = {
  collapsed: false,
  countries: [],
};

const appReducer = createSlice({
  name: 'app',
  initialState,
  reducers: {
    onCollapsed: (state) => {
      state.collapsed = !state.collapsed;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getAllCountry.fulfilled, (state, action) => {
      state.countries = action.payload;
    });
  },
});

export const appSelector = (state: RootState) => state.app;
export const appAction = {...appReducer.actions, getAllCountry};
export default appReducer.reducer;
