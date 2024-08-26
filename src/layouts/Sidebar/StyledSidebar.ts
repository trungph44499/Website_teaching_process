import styled from '~/helpers/styled-component';

export const Wrapper = styled.div`
  overflow: hidden;
`;

export const LogoSider = styled.div`
  width: 100%;
  text-align: center;
  padding: 1rem;
  position: absolute;
  z-index: 102;
  background-color: #fff;
  height: 80px;
  top: 0;

  @media screen and (max-width: ${({theme}) => theme.breakpoint.sm}) {
    text-align: left;
  }
`;

export const MenuSider = styled.div`
  .ant-menu-item-selected a {
    color: #fff;
  }
`;
