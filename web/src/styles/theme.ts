import { MantineTheme, MantineThemeOverride } from "@mantine/core";

export const theme: MantineThemeOverride = {
  globalStyles: (theme: MantineTheme) => ({
    body: {
      overflowY: "scroll",
      overscrollBehavior: "contain",

      maxWidth: theme.breakpoints.lg,
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