import styled from '~/helpers/styled-component';
import {Drawer} from 'antd';

export const Wrapper = styled.div`
  padding: 1rem;
  background-color: #ffff;
`;

export const StyledDrawer = styled(Drawer)`
  & .ant-drawer-content-wrapper {
    width: 30% !important;

    @media screen and (max-width: ${(props) => props.theme.breakpoint.lg}) {
      width: 60% !important;
    }

    @media screen and (max-width: ${(props) => props.theme.breakpoint.md}) {
      width: 100% !important;
    }
  }
`;
