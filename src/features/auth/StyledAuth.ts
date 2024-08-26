import {Button, Form, Input} from 'antd';
import styled from '~/helpers/styled-component';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100vh;
  position: relative;
  overflow: hidden;
  background-color: #fff;
`;

export const BoxLoginHeader = styled.div`
  margin-bottom: 2rem;
  & a {
    display: block;
  }
  & .logo {
    margin-bottom: 2rem;
    text-align: center;
  }
`;

export const LoginBox = styled.div`
  width: 30%;
  padding: 0 3rem;

  @media screen and (max-width: 480px) {
    padding: 0 1rem;
  }

  overflow-x: hidden;
  transition: width 0.4s ease-in-out;
  @media screen and (max-width: ${({theme}) => theme.breakpoint.xxl}) {
    width: 50%;
  }
  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}) {
    width: 100%;
  }
`;

export const Back = styled.div`
  position: absolute;
  top: 3rem;
  left: 3rem;

  @media screen and (max-width: 480px) {
    top: 1rem;
    left: 1rem;
  }

  & a {
    display: flex;
    align-items: center;
    gap: 0.2rem;
    font-weight: 600;
    color: #000000;
  }
`;

export const OrLoginLabel = styled.div`
  margin: 1rem 0;
  position: relative;
  display: flex;
  height: 20px;
  justify-content: center;
  align-items: center;
  pointer-events: none;
  user-select: none;
  & span {
    background-color: #ffffff;
    display: block;
    z-index: 2;
    padding: 0 0.4rem;
  }
  &::after {
    content: '';
    height: 1px;
    width: 100%;
    background-color: #bdbdbd;
    position: absolute;
    left: 0;
    top: 10px;
    z-index: 1;
  }
`;

export const BoxPrimary = styled.div`
  user-select: none;
  pointer-events: none;
  background: linear-gradient(
    180deg,
    ${({theme}) => theme.color.blue},
    ${({theme}) => theme.color.primary}
  );
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 1rem;
  transition: left 0.4s ease-in-out;
  position: absolute;
  left: 30%;
  z-index: 3;
  @media screen and (max-width: ${({theme}) => theme.breakpoint.xxl}) {
    left: 50%;

    & svg {
      width: 70% !important;
    }
  }
  @media screen and (max-width: ${({theme}) => theme.breakpoint.md}) {
    left: 100%;
  }
  right: 0;
  top: 0;
  & .spiner {
    opacity: 0;
    display: flex;
    font-size: 18px;
    background-color: #fff;
    height: 36px;
    margin-bottom: -36px;
    padding: 0 1rem;
    align-items: center;
    justify-content: center;
    gap: 0.4rem;
    border-radius: 6px;
    transition: opacity 0.4s ease-in-out;
    & svg {
      animation: spiner 1s linear infinite;
    }

    @keyframes spiner {
      to {
        transform: rotate(0);
      }
      from {
        transform: rotate(360deg);
      }
    }
  }
  &.loading {
    left: 0;
    & .spiner {
      opacity: 1;
    }
  }
`;

export const FormLogin = styled(Form)`
  & .ant-form-item-label {
    font-size: inherit;
    & .ant-form-item-required:not(.ant-form-item-required-mark-optional) {
      &:before {
        order: 1;
        margin-right: 0;
        margin-left: 0.4rem;
        font-weight: 600;
      }
    }
  }
`;

export const InputLogin = styled(Input)`
  height: 46px;
`;

export const InputLoginPassword = styled(Input.Password)`
  height: 46px;
  font-size: inherit;
`;

export const ButtonLogin = styled(Button)`
  background: linear-gradient(
    180deg,
    ${({theme}) => theme.color.blue},
    ${({theme}) => theme.color.primary}
  );
  border: 0;
  outline: 0;
  color: #ffffff;
  height: 46px;
  font-weight: 600;
  margin-top: 1rem;
  &:hover,
  &:active,
  &:focus {
    color: #ffffff;
    background: linear-gradient(
      180deg,
      ${({theme}) => theme.color.blue},
      ${({theme}) => theme.color.primary}
    );
  }
`;

export const ButtonGoogle = styled(Button)`
  height: 46px;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
`;
