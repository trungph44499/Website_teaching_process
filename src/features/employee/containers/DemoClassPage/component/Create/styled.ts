import {Button, Card, DatePicker, Form, Input, Select, Typography} from 'antd';
import styled from 'styled-components';

const {Title} = Typography;

export const Wrapper = styled(Card)`
  margin: auto;
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
    padding: 4px 11px !important;
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
