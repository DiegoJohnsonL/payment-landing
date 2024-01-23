import { selectAnatomy } from "@chakra-ui/anatomy";
import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(selectAnatomy.keys);

const lg = defineStyle({
  fontSize: "14px",
});

const sizes = {
  lg: definePartsStyle({ field: lg }),
};

export const selectTheme = defineMultiStyleConfig({
  sizes,
  defaultProps: {
    size: "lg",
  },
});
