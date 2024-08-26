// import {configureStore} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
// import reducers from './reducers';

// export const store = configureStore({
//   reducer: reducers,
//   middleware: (getDefaultMiddleware) =>
//     getDefaultMiddleware({
//       serializableCheck: false,
//     }),
//   devTools: process.env.NODE_ENV === 'development',
// });

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// export const useAppDispatch = () => useDispatch<AppDispatch>();
// export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

import {configureStore} from '@reduxjs/toolkit';

import {reducer} from './reducers';

// > Config
export const store = configureStore({
  reducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      immutableCheck: false,
      serializableCheck: false,
    }),
});

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
// > Logger
// eslint-disable-next-line
store.subscribe(() => {
  if (process.env.NODE_ENV === 'development') {
    // console.log(store.getState());
  }
});

type StoreState = ReturnType<typeof store.getState>;
type StoreDispatch = typeof store.dispatch;

declare global {
  type RootState = StoreState;
  type AppDispatch = StoreDispatch;
}
