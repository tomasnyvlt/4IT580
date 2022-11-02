import { extendTheme } from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { theme as defaultTheme } from "@chakra-ui/theme";

const customTheme = {
  sizes: {
    ...defaultTheme.sizes,
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    }
  },
  shadows: {
    ...defaultTheme.shadows,
    basic: "0 0.25rem 0.75rem 0 rgba(0, 0, 0, 0.05)"
  }
};

export const theme = extendTheme(customTheme);
