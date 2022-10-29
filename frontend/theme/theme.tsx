import { extendTheme } from "@chakra-ui/react";
// eslint-disable-next-line import/no-extraneous-dependencies
import { theme as defaultTheme } from "@chakra-ui/theme";

const sizes = {
  sizes: {
    ...defaultTheme.sizes,
    container: {
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px"
    }
  }
};

export const theme = extendTheme({ sizes });
