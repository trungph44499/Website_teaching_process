import styled from '~/helpers/styled-component';

export const Wrapper = styled.div`
  height: 90px;
  padding: 0 2rem;
  display: flex;
  align-items: center;
  width: 100%;
  min-width: 1300px;
  z-index: 2;
  position: absolute;
`;

export const Nav = styled.div`
  margin-left: 4rem;
  display: flex;
  align-items: center;
  gap: 1.2rem;
`;

export const NavItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;

  & .h-title {
    display: flex;
    align-items: center;
    gap: 0.4rem;
    cursor: pointer;
    color: #000;
    user-select: none;
  }

  & .caret {
    border-left: 5px solid transparent;
    border-right: 5px solid transparent;
    border-top: 5px solid #000;
    margin-top: 2px;
  }
`;

export const NavDropdown = styled.div`
  position: absolute;
  top: calc(100% + 0.6rem);
  background-color: #ffffff;
  box-shadow: rgb(0 0 0 / 12%) 0px 2px 16px;
  min-width: 110px;
  width: max-content;
  border-radius: 0.4rem;
  left: 0;
  display: flex;
  flex-direction: column;
  padding: 0.6rem 0;
  gap: 0.6rem;

  & .item {
    padding: 0 1rem;
    color: #000;
  }
`;

export const Action = styled.div`
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

export const ActionButton = styled.a<{border?: boolean | string; primary?: boolean | string}>`
  border: ${({border}) => (border ? '1px solid #ddd' : '')};
  background-color: ${({primary}) => (primary ? 'rgb(67, 96, 253)' : '')};
  color: ${({primary}) => (primary ? '#fff' : '#000')};
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding-left: 1rem;
  padding-right: 1rem;
  border-radius: 0.4rem;

  &:hover {
    color: ${({primary}) => (primary ? '#fff' : '#000')};
    margin-top: -2px;
  }
`;
