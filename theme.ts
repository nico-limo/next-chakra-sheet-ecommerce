import { extendTheme, theme } from "@chakra-ui/react";

export default extendTheme({
  colors: {
    primary: theme.colors["teal"],
    secondary: theme.colors["red"],
  },
  styles: {
    global: {
      body: {
        backgroundColor: "primary.50",
      },
    },
  },
});
