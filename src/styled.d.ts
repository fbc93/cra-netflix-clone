declare module "styled-components";

export interface DefaultTheme {
  red: string;
  black: {
    veryDark: string,
    darker: string
  };
  white: {
    darker: string;
    lighter: string
  }
}