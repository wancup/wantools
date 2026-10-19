import { describe, expect, it } from "vitest";
import { parseThemeOption, resolveThemeColor } from "./color-theme";

describe("color theme", () => {
  it.each(
    [
      { stored: "light", expected: "light" },
      { stored: "dark", expected: "dark" },
      { stored: "system", expected: "system" },
      { stored: "invalid", expected: "system" },
      { stored: null, expected: "system" },
    ] as const,
  )("parses the stored preference: $stored", ({ stored, expected }) => {
    expect(parseThemeOption(stored)).toBe(expected);
  });

  it.each(
    [
      { option: "light", prefersDark: false, expected: "light" },
      { option: "light", prefersDark: true, expected: "light" },
      { option: "dark", prefersDark: false, expected: "dark" },
      { option: "dark", prefersDark: true, expected: "dark" },
      { option: "system", prefersDark: false, expected: "light" },
      { option: "system", prefersDark: true, expected: "dark" },
    ] as const,
  )("resolves $option with prefersDark=$prefersDark", ({ option, prefersDark, expected }) => {
    expect(resolveThemeColor(option, prefersDark)).toBe(expected);
  });
});
