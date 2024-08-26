import styled from '~/helpers/styled-component';
import {Button as AntButton, Card} from 'antd';
export const WrapperEdit = styled.div`
  padding: 1rem;
  background-color: #fff;
`;
export const WrapperActions = styled.div`
  text-align: end;
`;
export const PostionBtn = styled.div`
  position: relative;
  /* margin: 20px 0px; */
  .ps-wrap {
    display: flex;
    justify-content: flex-end;
  }
`;
export const ButtonSubmit = styled(AntButton)`
  padding: 5px 15px 5px 15px;
  min-width: 140px;
  height: 36px;
  background: #2a5681;
  border-radius: 4px;
  align-items: center;
  letter-spacing: 1.25px;
  font-style: normal;
  font-weight: 510;
  font-size: 14px;
  line-height: 16px;
  color: #ffffff;
  margin: 10px;
  border: 1px solid #2a5681;
  &:hover {
    color: #fff;
    border-color: #2a5681;
    background: #2a5681;
    opactity: 0.8;
  }
  &:focus {
    color: #fff;
    border-color: #2a5681;
    background: #2a5681;
    opactity: 0.8;
  }
`;

export const ButtonCancel = styled(AntButton)`
  padding: 5px 15px 5px 15px;
  min-width: 140px;
  height: 36px;
  background: #fff;
  color: #2a5681;
  border-radius: 4px;
  align-items: center;
  letter-spacing: 1.25px;
  font-style: normal;
  font-weight: 510;
  font-size: 14px;
  line-height: 16px;
  margin: 10px;
  border: 1px solid #f1f1f1;
  &:hover {
    color: #2a5681;
    border-color: #2a5681;
  }
  &:focus {
    color: #2a5681;
    border-color: #2a5681;
  }
`;
