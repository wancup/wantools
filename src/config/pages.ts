interface Pages {
  [page: string]: {
    name: string;
    path: string;
    hideOnSideBar?: true;
  };
}

export const PAGES = {
  "/": {
    name: "Top Page",
    path: "/",
    hideOnSideBar: true,
  },
  "directory-tree": {
    name: "Directory Tree",
    path: "/directory-tree/",
  },
  "transition": {
    name: "Transition",
    path: "/transition/",
  },
  "pointer-event": {
    name: "Pointer Event",
    path: "/pointer-event/",
  },
  "keyboard-event": {
    name: "Keyboard Event",
    path: "/keyboard-event/",
  },
  "uri-encoding": {
    name: "URI Encoding",
    path: "/uri-encoding/",
  },
  "qr-code": {
    name: "QR code",
    path: "/qr-code/",
  },
} as const satisfies Pages;
