import * as styledComponents from 'styled-components';

export interface IThemeInterface {
  color: {
    blue: string;
    primary: string;
    danger: string;
    warning: string;
    success: string;
    light: string;
  };
  breakpoint: {
    sm: string;
    md: string;
    lg: string;
    xl: string;
    xxl: string;
  };
}

export const theme: IThemeInterface = {
  color: {
    blue: '#1CA1E6',
    primary: '#2A5681',
    danger: '#E32300',
    warning: '#faad14',
    success: '#52c41a',
    light: '#d4d9e1',
  },
  breakpoint: {
    sm: '576px',
    md: '768px',
    lg: '992px',
    xl: '1200px',
    xxl: '1400px',
  },
};

const {
  default: styled,
  css,
  createGlobalStyle,
  keyframes,
  ThemeProvider,
} = styledComponents as styledComponents.ThemedStyledComponentsModule<IThemeInterface>;

export {css, createGlobalStyle, keyframes, ThemeProvider};
export default styled;
