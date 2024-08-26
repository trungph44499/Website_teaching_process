import {Drawer} from 'antd';
import styled from '~/helpers/styled-component';

export const StyledDrawer = styled(Drawer)`
  & .ant-drawer-content-wrapper {
    width: 40% !important;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
      width: 60% !important;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      width: 100% !important;
    }
  }
`;
