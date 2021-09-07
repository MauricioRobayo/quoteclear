import * as React from "react";
import ContentLoader, { IContentLoaderProps } from "react-content-loader";
import usePreferredColorScheme from "../../../hooks/usePreferredColorScheme";
import { theme } from "../../../styles";

export const QuoteLoader: React.FC<IContentLoaderProps> = (props) => {
  const preferredColorScheme = usePreferredColorScheme();
  return (
    <ContentLoader
      backgroundColor={theme[preferredColorScheme].colors.surface2}
      foregroundColor={theme[preferredColorScheme].colors.surface4}
      viewBox="0 0 400 10"
      speed={4}
      {...props}
    >
      <rect x="0" y="0" rx="3" ry="3" width="400" height="10" />
    </ContentLoader>
  );
};
