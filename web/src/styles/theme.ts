import { MantineTheme, MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  globalStyles: (theme: MantineTheme) => ({
    body: {
      overflowY: "scroll",

      maxWidth: theme.breakpoints.sm,
      margin: "0 auto",
    },
  }),

  colorScheme: "dark",
  primaryColor: "green",

  defaultRadius: "md",
  cursorType: "pointer",
  focusRing: "auto",
  loader: "dots",
}