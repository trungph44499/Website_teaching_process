import {Drawer} from 'antd';
import styled from '~/helpers/styled-component';

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
export const StyledDrawerCurr = styled(Drawer)``;

export const Wrapper = styled.div`
  padding: 1rem;
  background-color: #fff;
`;

export const WrapperInfo = styled.div`
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 15px;
  background-color: #fafafa;
  padding: 24px;
`;

export const InfoTitle = styled.div`
  font-size: 16px;
  font-weight: bold;
  display: flex;
  gap: 15px;
  align-items: center;
  svg {
    cursor: pointer;
  }
`;
export const InfoItem = styled.div``;

export const SearchWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 15px;
`;
