interface Pages {
  [page: string]: {
    name: string;
    path: string;
  };
}

export const PAGES = {
  "directory-tree": {
    name: "Directory Tree",
    path: "/directory-tree",
  },
  "transition": {
    name: "Transition",
    path: "/transition",
  },
  "pointer-event": {
    name: "Pointer Event",
    path: "/pointer-event",
  },
  "keyboard-event": {
    name: "Keyboard Event",
    path: "/keyboard-event",
  },
  "qr-code": {
    name: "QR code",
    path: "/qr-code",
  },
} as const satisfies Pages;
