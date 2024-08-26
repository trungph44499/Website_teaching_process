import {Card} from 'antd';
import styled from '~/helpers/styled-component';

interface CardCustomProps {
  applied?: number;
  allow?: number;
}

export const Wrapper = styled(Card)`
  min-height: 75vh;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 5%;
  padding-bottom: 40px;
  border-bottom: 2px solid #acacac;
  .item {
    width: 30%;
    text-align: center;
    position: relative;
    ::before {
      position: absolute;
      content: '';
      width: 80%;
      height: 2px;
      background: #000;
      top: 50%;
      left: 10%;
    }
    .text {
      font-weight: bold;
      font-size: 20px;
      padding: 10px;
    }
  }
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 5%;
  width: 100%;
  padding: 40px 0;
  margin-bottom: 120px;
`;
export const ContentItem = styled.div`
  width: 30%;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const CardCustom = styled(Card)<CardCustomProps>`
  cursor: pointer;
  border-radius: 10px;

  background-color: ${(props: any) => (props.applied ? '#33cc00' : '#ffe58f')};
  background-color: ${(props: any) => !props.allow && '#acacac'};
  cursor: ${(props: any) => !props.allow && 'not-allowed'};
  color: ${(props: any) => props.applied && '#fff'};
  .ant-card-head-title {
    font-weight: bold;
    color: ${(props: any) => props.applied && '#fff'};
  }
`;
