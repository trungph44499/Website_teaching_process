import {Card} from 'antd';
import styled from '~/helpers/styled-component';

export const Wrapper = styled(Card)`
  .ant-card-body {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    @media only screen and (max-width: 800px) {
      justify-content: center;
    }
  }
`;

export const Item = styled.div`
  width: 15%;
  @media only screen and (max-width: 800px) {
    width: 30%;
    margin: 5px;
  }
  height: 200px;
  box-shadow: 1px 2px 10px 1px #acacac;
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .data {
    font-weight: bold;
    font-size: 2.5rem;
    color: #fff;
  }
  .percent,
  svg {
    color: #fff;
  }
  .sub {
    color: #fff;
    font-size: 12px;
    font-weight: bold;
  }
  :nth-child(4) {
    background-image: linear-gradient(to top, #ff0844 0%, #ffb199 100%) !important;
  }
  :nth-child(3) {
    background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%) !important;
  }
  :nth-child(2) {
    background-image: linear-gradient(-20deg, #2b5876 0%, #4e4376 100%) !important;
  }
  :nth-child(5) {
    background-image: linear-gradient(to top, #eda700 0%, #e9cc3e 100%) !important;
  }
  :nth-child(6) {
    background-image: linear-gradient(to top, #7930ff 0%, #edc1b4 100%) !important;
  }
  :nth-child(1) {
    background-image: radial-gradient(
      circle 248px at center,
      #16d9e3 0%,
      #30c7ec 47%,
      #46aef7 100%
    ) !important;
  }
`;
