import {Dropdown} from 'antd';
import {Header} from 'antd/lib/layout/layout';
import styled from '~/helpers/styled-component';

export const Wrapper = styled(Header)`
  display: flex;
  padding: 1rem;
  align-items: center;
  background-color: #ffffff;
  justify-content: space-between;
  position: fixed;
  right: 0;
  left: 260px;
  z-index: 99;

  &.collapsed {
    left: 60px;
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.lg}) {
    left: 0;
    &.collapsed {
      left: 0px;
    }
  }
`;

export const Trigger = styled.div`
  height: 64px;
  display: flex;
  align-items: center;

  & .trigger {
    cursor: pointer;
    visibility: visible;
    font-size: 29px;
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.lg}) {
    & .trigger {
      position: fixed;
      left: 1rem;
    }

    &.collapsed {
      & .trigger {
        left: calc(260px + 1rem);
      }
    }
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}) {
    & .trigger {
      left: 1rem;
    }
  }
`;

export const HeaderUser = styled(Dropdown)`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 40px;
  cursor: pointer;
  user-select: none;

  & .ant-avatar-string {
    line-height: 32px;
  }
`;
