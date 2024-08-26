import styled from '~/helpers/styled-component';

export const Wrapper = styled.div`
  min-height: 70vh;
`;

export const Header = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
export const HeaderItem = styled.div`
  width: 12%;
  font-weight: 500;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  :nth-child(1) {
    width: 16%;
    justify-content: start;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Main = styled.div``;

export const MainItem = styled.div`
  width: 12%;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  :nth-child(1) {
    width: 16%;
    justify-content: start;
  }
`;

export const Footer = styled.div`
  display: flex;
  justify-content: end;
  margin-top: 20px;
`;
