import { DefaultTheme } from "styled-components";
import Color from "color";

const brandColor = Color({
  h: 43,
  s: 95,
  l: 77,
});

const sharedStyles = {
  fontFamily: {
    text1: "'Crimson Pro', serif",
    text2: "'Nunito Sans', sans-serif",
  },
  maxWidth: "425px",
  borderRadius: "0.5rem",
};

export const theme: { light: DefaultTheme; dark: DefaultTheme } = {
  light: {
    ...sharedStyles,
    colors: {
      brand: brandColor.lightness(30).string(),
      text1: brandColor.lightness(10).string(),
      text2: brandColor.saturationl(30).lightness(30).string(),
      surface1: brandColor.saturationl(20).lightness(99).string(),
      surface2: brandColor.saturationl(20).lightness(92).string(),
      surface3: brandColor.saturationl(25).lightness(90).string(),
      surface4: brandColor.saturationl(20).lightness(85).string(),
      surfaceShadow: brandColor
        .saturationl(10)
        .lightness(40)
        .alpha(0.3)
        .string(),
    },
  },
  dark: {
    ...sharedStyles,
    colors: {
      brand: brandColor.saturationl(82).lightness(70).string(),
      text1: brandColor.saturationl(15).lightness(75).string(),
      text2: brandColor.saturationl(10).lightness(61).string(),
      surface1: brandColor.saturationl(10).lightness(20).string(),
      surface2: brandColor.saturationl(10).lightness(25).string(),
      surface3: brandColor.saturationl(5).lightness(30).string(),
      surface4: brandColor.saturationl(5).lightness(35).string(),
      surfaceShadow: brandColor
        .saturationl(30)
        .lightness(3)
        .alpha(0.6)
        .string(),
    },
  },
};
