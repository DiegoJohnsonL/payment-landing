import { StyleFunctionProps, extendTheme, type ThemeConfig } from '@chakra-ui/react'
import { colors } from './colors';
import { buttonTheme } from './button';
import { headingTheme } from './heading';


export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "var(--font-geomanist), serif",
    body: "var(--font-geomanist), sans-serif",
    mono: "Menlo, monospace",
  },
  styles: {
    global: () => ({
      body: {
        color: "primary.900",
      },
    }),
  },
  colors: colors,
  components: {
    Button: buttonTheme,
    Heading: headingTheme
  },
});