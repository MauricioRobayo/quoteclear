import { CircularLoading } from "respinner";
import usePreferredColorScheme from "../../../hooks/usePreferredColorScheme";
import { theme } from "../../../styles";

export function ButtonLoader() {
  const preferredColorScheme = usePreferredColorScheme();
  const preferredTheme = theme[preferredColorScheme];
  return <CircularLoading stroke={preferredTheme.colors.brand} size="1rem" />;
}
