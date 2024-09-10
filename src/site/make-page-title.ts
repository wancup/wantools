import { SITE } from "./config";

export function makePageTitle(pageName: string): string {
  return `${pageName} | ${SITE.name}`;
}
