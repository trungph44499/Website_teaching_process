import React from 'react';
import withAuth from '~/helpers/withAuth';
import DemoClassList from './component/List';
import {Wrapper} from './style';

interface Props {
  demo: string;
}

const DemoClassPage = (prop: any) => {
  return (
    <Wrapper>
      <DemoClassList permisstion={prop.permisstion} />
    </Wrapper>
  );
};

export default withAuth(DemoClassPage);
