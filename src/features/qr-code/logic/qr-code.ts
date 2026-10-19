import { renderSVG } from "uqr";

interface QrCodeImage {
  src: string | undefined;
  error: string | undefined;
}

export function generateQrCodeImage(text: string): QrCodeImage {
  if (text === "") {
    return { src: undefined, error: undefined };
  }

  try {
    const svg = renderSVG(text, { border: 4 });
    return {
      src: `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`,
      error: undefined,
    };
  } catch {
    return {
      src: undefined,
      error: "Unable to generate a QR code. Try shorter text.",
    };
  }
}
