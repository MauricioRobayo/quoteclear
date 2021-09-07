import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    borderRadius: string;
    fontFamily: {
      text1: string;
      text2: string;
    };
    colors: {
      brand: string;
      text1: string;
      text2: string;
      surface1: string;
      surface2: string;
      surface3: string;
      surface4: string;
      surfaceShadow: string;
    };
  }
}
