export const SITE = {
  name: "wanTooLs",
  description: "Utility tools for web application developers!",
  toPageTitle: (title: string) => `${title} | ${SITE.name}`,
} as const;

export const COLOR_THEME_OPTION = {
  dark: "dark",
  light: "light",
  system: "system",
} as const;
