import { DefaultTheme } from "styled-components";
import Color from "color";

const brandColor = Color({
  h: 43,
  s: 95,
  l: 77,
});

export const theme: { light: DefaultTheme; dark: DefaultTheme } = {
  light: {
    borderRadius: "5px",
    colors: {
      brand: brandColor.hex(),
      text1: brandColor.lightness(10).hex(),
      text2: brandColor.saturationl(30).lightness(30).hex(),
      surface1: brandColor.saturationl(20).lightness(85).hex(),
      surface2: brandColor.saturationl(25).lightness(90).hex(),
      surface3: brandColor.saturationl(20).lightness(92).hex(),
      surface4: brandColor.saturationl(20).lightness(99).hex(),
      surfaceShadow: brandColor.saturationl(10).lightness(40).alpha(0.2).hex(),
    },
  },
  dark: {
    borderRadius: "5px",
    colors: {
      brand: brandColor.saturationl(82).lightness(70).hex(),
      text1: brandColor.saturationl(15).lightness(75).hex(),
      text2: brandColor.saturationl(10).lightness(61).hex(),
      surface1: brandColor.saturationl(10).lightness(20).hex(),
      surface2: brandColor.saturationl(10).lightness(25).hex(),
      surface3: brandColor.saturationl(5).lightness(30).hex(),
      surface4: brandColor.saturationl(5).lightness(35).hex(),
      surfaceShadow: brandColor.saturationl(30).lightness(3).alpha(0.8).hex(),
    },
  },
};
