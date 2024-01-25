import { createMultiStyleConfigHelpers, defineStyle } from "@chakra-ui/react";
import { inputAnatomy } from "@chakra-ui/anatomy";

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(inputAnatomy.keys);

// default base style from the Input theme
const baseStyle = definePartsStyle({
  field: {
    borderRadius: "4px",
  },
});

const size = {
  lg: defineStyle({
    fontSize: "14px",
  }),
};

const sizes = {
  lg: definePartsStyle({
    field: size.lg,
    addon: size.lg,
  }),
};

export const inputTheme = defineMultiStyleConfig({
  sizes,
  defaultProps: {
    size: "lg",
  },
  baseStyle,
});
