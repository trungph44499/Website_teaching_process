import {Typography, Table as AntdTable} from 'antd';
import styled from 'styled-components';
const {Title} = Typography;

export const TitleCustom = styled(Title)``;
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
