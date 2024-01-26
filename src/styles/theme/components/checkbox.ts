import { checkboxAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers, defineStyle } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } =
  createMultiStyleConfigHelpers(checkboxAnatomy.keys)

const sizes = {
  md: definePartsStyle({
    control: defineStyle({
      boxSize: "24px",
      borderRadius: "lg",
    }),
    label: defineStyle({
      fontSize: "14px",
      marginLeft: "8px"
    })
  }),
}

export const checkboxTheme = defineMultiStyleConfig({ sizes, defaultProps: { size: "md" } })