import {Table as AntdTable} from 'antd';
import {Button as AntdButton} from 'antd';
import styled from '~/helpers/styled-component';

export const Wrapper = styled.div``;
export const Table = styled(AntdTable)`
  & th.ant-table-cell {
    font-weight: bold !important;
  }

  & .ant-table-cell {
    font-size: 0.9em;
    padding-top: 0.6em;
    padding-bottom: 0.5em;
    line-height: 1.55;
    &:first-of-type {
      border-left: 1px solid rgba(0, 0, 0, 0.06);
    }

    &:last-of-type {
      border-right: 1px solid rgba(0, 0, 0, 0.06);
    }

    p {
      margin: 0;
    }
  }

  border-top: 1px solid rgba(0, 0, 0, 0.06);

  & .ant-table-tbody > tr.ant-table-row-selected > td {
    background-color: var(--ant-primary-color-deprecated-f-12);
  }

  & .ant-table-selection-column {
    padding-left: 0.5rem;
    padding-right: 0.5rem;
  }
`;
export const ButtonAction = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  margin-bottom: 1rem;
`;
export const ButtonActionGroup = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  gap: 0.8rem;
`;
export const Button = styled(AntdButton)`
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
  & .btn-content {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 40px;
    gap: 4px;
    line-height: 0;

    & .icon {
      font-size: 18px;
      margin-left: -4px;
    }
  }
`;
