import { defineStyleConfig } from "@chakra-ui/react";

export const buttonTheme = defineStyleConfig({
  defaultProps: {
    colorScheme: "primary",
  },
  baseStyle: {
    fontWeight: "500",
  },
});
