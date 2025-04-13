import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    text: string;
    background: {
      regular: string;
      lighter: string;
      darker: string;
    };
    highlight: string;
  }
}
