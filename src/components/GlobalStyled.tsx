import React from 'react';
import {createGlobalStyle} from '~/helpers/styled-component';

const CssBaseLine = createGlobalStyle`
    html,
    body {
        height: 100%;
        width: 100%;
        line-height: 1.35;
    }
    body {
        font-family: Arial, Helvetica, sans-serif;
    }
    #root {
        background-color: #f0f2f5;
        min-height: 100vh;
        min-width: 100%;
    }
    p,
    label {
        font-family: inherit;
        line-height: 1.35em;
    }
    input, select, textarea {
        font-family: inherit;
        font-size: inherit;
    }
    img {
      border-style: none;
      vertical-align: middle;
    }
    .table-confirm {
      & .ant-modal-confirm-body {
        display: flex;
        align-items: center;
        justify-content: flex-start;
        gap: 0.6rem;

        & svg {
          fill: var(--ant-error-color)
        }
      }
    }
`;

type Props = {
  children: React.ReactNode;
};

const GlobalStyled = (props: Props) => {
  return (
    <>
      {props.children}
      <CssBaseLine />
    </>
  );
};

export default GlobalStyled;
