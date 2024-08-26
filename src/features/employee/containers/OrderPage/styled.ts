import {Button, DatePicker, Form, Input, Select, Typography} from 'antd';
import styled from '~/helpers/styled-component';

const {Title} = Typography;

export const Wraper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  overflow-y: scroll;
  min-height: 100vh;
`;

export const TitleReg = styled(Title)`
  text-align: left;
  font-weight: 25px;
  margin-bottom: 1em !important;
  margin-top: 1em !important;
`;

export const FormCustom = styled(Form.Item)``;

export const LabelCustom = styled.label`
  font-size: 14px;
  line-height: 18px;
  color: #717171;
  font-weight: 700;
`;

export const SelectCustom = styled(Select)`
  .ant-select-selector {
    height: 40px !important;
    padding: 3px 11px !important;
    border-radius: 5px !important;
  }
`;

export const DatePickerCustom = styled(DatePicker)`
  height: 40px !important;
  border-radius: 5px !important;
`;

export const InputCustom = styled(Input)`
  height: 40px;
  border-radius: 5px;
`;
export const ButtonCustom = styled(Button)`
  font-size: 19px;
  height: 54px;
  width: 100%;
  background: ${({theme}) => theme.color.primary};
  font-weight: 600;
  color: #fff;
  border-radius: 12px;
  :focus {
    background: ${({theme}) => theme.color.primary};
    color: #fff;
  }
  :hover {
    background: ${({theme}) => theme.color.primary};
    color: #fff;
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
  left: 50%;
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

export const RegisterBox = styled.div`
  width: 50%;
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
  top: 1rem;
  left: 0.5rem;

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
