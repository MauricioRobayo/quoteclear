import { useEffect, useState } from "react";

const darkModeQuery = window.matchMedia("(prefers-color-scheme: dark)");

const usePreferredColorScheme = () => {
  const [colorScheme, setColorScheme] = useState<"dark" | "light">(
    darkModeQuery.matches ? "dark" : "light"
  );
  useEffect(() => {
    const updateColorScheme = (event: MediaQueryListEvent) => {
      setColorScheme(event.matches ? "dark" : "light");
    };
    darkModeQuery.addEventListener("change", updateColorScheme);

    return () => {
      darkModeQuery.removeEventListener("change", updateColorScheme);
    };
  }, []);

  return colorScheme;
};

export default usePreferredColorScheme;
