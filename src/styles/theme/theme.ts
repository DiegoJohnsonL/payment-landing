import {
  IconButton,
  Select,
  StyleFunctionProps,
  Table,
  extendTheme,
  type ThemeConfig,
} from "@chakra-ui/react";
import { colors } from "./colors";
import { buttonTheme } from "./components/button";
import { headingTheme } from "./components/heading";
import { inputTheme } from "./components/input";
import { selectTheme } from "./components/select";
import { tableTheme } from "./components/table";

export const theme = extendTheme({
  initialColorMode: "light",
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
    Heading: headingTheme,
    Input: inputTheme,
    Select: selectTheme,
    Table: tableTheme,
  },
});
