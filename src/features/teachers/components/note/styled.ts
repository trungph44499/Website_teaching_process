import {Col, Typography} from 'antd';
import styled from 'styled-components';

const {Title} = Typography;

export const Wraper = styled.div``;

export const Title1 = styled(Title)`
  display: flex;
  justify-content: center;
`;
export const Title2 = styled(Title)``;

export const Note1 = styled(Col)`
  padding: 15px;
  background: #33cc00;
  margin-bottom: 20px;
  color: #fff;
  border-radius: 10px;
`;

export const Note2 = styled(Col)`
  padding: 15px;
  background: #ffe58f;
  margin-bottom: 20px;
  color: #000;
  border-radius: 10px;
`;

export const Note3 = styled(Col)`
  padding: 15px;
  background: #acacac;
  margin-bottom: 20px;
  color: #000;
  border-radius: 10px;
`;

export const NoteImpo = styled(Col)`
  background: #99d6ff;
  padding: 25px;
`;

export const Desc = styled.span`
  font-weight: bold;
  margin-bottom: 15px !important;
`;
