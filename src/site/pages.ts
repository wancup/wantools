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
} as const satisfies Pages;
