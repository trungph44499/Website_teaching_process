import React from 'react';
import withAuth from '~/helpers/withAuth';
import ListPaidManager from './components/List';

const PaidManager = (props: any) => {
  return (
    <>
      <ListPaidManager permisstion={props.permisstion} />
    </>
  );
};

export default withAuth(PaidManager);
