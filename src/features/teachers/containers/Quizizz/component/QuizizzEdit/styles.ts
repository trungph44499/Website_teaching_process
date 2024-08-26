import {Button, Input} from 'antd';
import styled from '~/helpers/styled-component';

export const WrapperCheck = styled.div`
  width: 50px;
  height: 50px;
  border: 4px solid white;
  border-radius: 50%;
  background-color: inherit;
`;

export const WrapperInput1 = styled(Input)`
  padding: 25px 0px;
  background-color: #e53935;
  color: white;
  border: 1px solid #e53935;
  border-radius: 4px;
`;
export const WrapperInput2 = styled(Input)`
  padding: 25px 0px;
  background-color: #1c87e5;
  color: white;
  border: 1px solid #1c87e5;
  border-radius: 4px;
`;
export const WrapperInput3 = styled(Input)`
  padding: 25px 0px;
  background-color: #43a047;
  color: white;
  border: 1px solid #43a047;
  border-radius: 4px;
`;
export const WrapperInput4 = styled(Input)`
  padding: 25px 0px;
  background-color: #fbc02d;
  color: white;
  border: 1px solid #fbc02d;
  border-radius: 4px;
`;
export const InputQuestion = styled(Input)`
  border: 1px solid gray;

  text-align: center;
  border-radius: 4px;
`;

export const UploadDiv = styled.div`
  text-align: center;
  padding: 25px;
  border: 1px solid white;
  border-radius: 4px;
  background-color: white;
`;

// export const BtnSubmit =
export const Buttons = styled(Button)`
  background-color: rgb(70 23 143);
  color: white;
`;
export const QuestionPOtions = styled.div`
  padding: 5px;
  display: flex;
  color: rgb(110, 110, 110);
  font-size: 1.1rem;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;
`;
