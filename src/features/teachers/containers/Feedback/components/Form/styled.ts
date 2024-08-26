import styled from 'styled-components';
import {Radio} from 'antd';

export const RadioGroup = styled(Radio.Group)`
  label.ant-radio-button-wrapper.ant-radio-button-wrapper-in-form-item {
    border: 1px solid rgb(237, 240, 242);
    border-radius: 5px;
    height: auto;
    padding: 0 1em;
    border-right-color: initial;
  }
`;
