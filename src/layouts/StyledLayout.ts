import styled from '~/helpers/styled-component';
import Sider from 'antd/lib/layout/Sider';
import {Content} from 'antd/lib/layout/layout';
import {Layout} from 'antd';

export const WrapSider = styled(Sider)`
  background-color: #ffffff;
  box-shadow: rgba(0, 0, 0, 0.06) 1.95px 1.95px 2.6px;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  z-index: 999;
  overflow: hidden;
  user-select: none;

  .ant-layout-sider-children {
    height: 100%;
    padding-top: 80px;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 2px;
    }
    &::-webkit-scrollbar-track {
      background: transparent;
    }
    &::-webkit-scrollbar-thumb {
      background: #888;
    }
  }

  & .trigger {
    display: none;
    position: absolute;
    right: 1rem;
    top: 1.4rem;
    font-size: 29px;
    z-index: 103;
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}) {
    width: 0 !important;
    max-width: 0 !important;
    min-width: 0 !important;

    & .ant-menu {
      padding-left: 0 !important;
      &-item {
        border-top-left-radius: 0 !important;
        border-bottom-left-radius: 0 !important;
      }
    }

    &.ant-layout-sider-collapsed .trigger {
      display: block;
    }

    &-title-content {
      transition: none;
    }
  }

  @media screen and (max-width: ${({theme}) => theme.breakpoint.lg}) {
    width: 0 !important;
    max-width: 0 !important;
    min-width: 0 !important;
  }

  & .ant-menu {
    padding-left: 1rem;
    transition: none !important;
    z-index: 100;
    margin-bottom: 1rem;

    &-item {
      height: 48px;
      border-top-left-radius: 1rem;
      border-bottom-left-radius: 1rem;
      padding-left: 1.4rem !important;
      transition: none !important;

      &::after,
      &:active,
      * {
        transition: none !important;
      }

      &-icon {
        font-size: 26px;
      }

      &.ant-menu-item-selected {
        background-color: ${({theme}) => theme.color.primary};
        color: #ffffff;
      }
    }
    &-title-content {
      transition: none !important;
    }
  }

  &.ant-layout-sider-collapsed {
    width: 60px !important;
    max-width: 60px !important;
    min-width: 60px !important;
    flex: 1 0 60px !important;

    @media screen and (max-width: ${({theme}) => theme.breakpoint.lg}) {
      width: 260px !important;
      max-width: 260px !important;
      min-width: 260px !important;
      flex: 1 0 260px !important;
    }

    @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}) {
      width: 100% !important;
      max-width: 100% !important;
      min-width: 100% !important;
    }

    & .ant-menu {
      &-item {
        width: 100% !important;
        line-height: 64px !important;
        padding-left: 1rem !important;

        &-icon {
          font-size: 26px !important;
        }
      }

      @media screen and (min-width: ${({theme}) => theme.breakpoint.lg}) {
        padding-left: 0;
        &-item {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }

      @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}) {
        padding-left: 0;
        &-item {
          border-top-left-radius: 0;
          border-bottom-left-radius: 0;
        }
      }
    }
  }
`;

export const WrapLayout = styled(Layout)`
  .layout-content {
    @media screen and (min-width: ${({theme}) => theme.breakpoint.lg}) {
      &.collapsed {
        padding-left: 60px;
      }
      padding-left: 260px;
    }
  }
`;

export const WrapContent = styled(Content)`
  padding: calc(64px + 1rem) 1rem 1rem !important;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}) {
    padding: 64px 0 0 !important;
  }
`;
