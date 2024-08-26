import {SerializedError} from '@reduxjs/toolkit';

/* eslint-disable */
export type ActionParams<Input = {}, Output = {}> = {
  params?: Input;
  onSuccess?: (param: Output) => void;
  onError?: (param: Output) => void;
  onEnd?: Function;
};

export type Transaction = {
  loading: boolean;
  error?: SerializedError;
};

export type StateTransaction<T = {}> = Transaction & {
  result: T;
};

export type Pagination<T = {}> = {
  items: T[];
  pagination: {
    totalRecords: number;
    totalPages: number;
    currentPage: number;
  };
};

export type QueriesSortType = 'ascending' | 'descending';

export type QueriesSort = {
  sortby?: string;
  sorttype?: QueriesSortType;
};

export type QueriesFilter = {
  filterby?: string;
  filtervalue?: string;
};

export type QueriesPagination = {
  size?: number;
  page?: number;
};

export type Queries<T = {}> = T & QueriesSort & QueriesFilter & QueriesPagination;

export type Response<T = {}> = {
  data: T;
  message: string;
  status_code: number;
  success: boolean;
};

export type OptionData = {
  value: string;
  label: string;
};
/* eslint-enable */
