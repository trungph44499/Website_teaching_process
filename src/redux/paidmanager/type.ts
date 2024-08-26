import {Pagination, PaidManagerType, StateTransaction, Transaction} from '~/type';

export type State = {
  list: StateTransaction<Pagination<PaidManagerType>>;
  get: Transaction;
  create: Transaction;
  update: Transaction;
  delete: Transaction;
  deleteMultiple: Transaction;
  history: Transaction;
};
