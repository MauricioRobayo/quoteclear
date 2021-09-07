import React from "react";
import PropagateLoader from "react-spinners/PropagateLoader";
import usePreferredColorScheme from "../../../hooks/usePreferredColorScheme";
import { theme } from "../../../styles";

export const QuoteLoader = () => {
  const preferredColorScheme = usePreferredColorScheme();
  return (
    <PropagateLoader
      color={theme[preferredColorScheme].colors.surface4}
      size={15}
    />
  );
};
