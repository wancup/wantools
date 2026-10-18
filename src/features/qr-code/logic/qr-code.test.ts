import { describe, expect, it } from "vitest";
import { generateQrCodeImage } from "./qr-code";

describe("QR code image", () => {
  it("does not generate an image for empty text", () => {
    expect(generateQrCodeImage("")).toEqual({ src: undefined, error: undefined });
  });

  it.each(["https://example.com/", "桜🌸", "<script>alert(\"test\")</script>#&%"])(
    "generates an SVG data URL for %s",
    (text) => {
      const result = generateQrCodeImage(text);
      expect(result.error).toBeUndefined();
      expect(result.src).toMatch(/^data:image\/svg\+xml;charset=utf-8,%3Csvg/);
      const svg = decodeURIComponent(result.src?.split(",")[1] ?? "");
      expect(svg).toContain("</svg>");
      expect(svg).not.toContain(text);
    },
  );

  it("returns an error for oversized text and allows subsequent valid input", () => {
    const result = generateQrCodeImage("a".repeat(4000));
    expect(result.src).toBeUndefined();
    expect(result.error).toBeTruthy();
    expect(generateQrCodeImage("shorter text").src).toBeDefined();
  });
});
