import { extendTheme, type ThemeConfig } from '@chakra-ui/react'


export const theme = extendTheme({
  initialColorMode: "dark",
  useSystemColorMode: false,
  fonts: {
    heading: "var(--font-geomanist), serif",
    body: "var(--font-geomanist), sans-serif",
    mono: "Menlo, monospace",
  },
});