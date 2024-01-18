import { ReactElement } from "react";

export function __(key: string): string | ReactElement {
  if (key === undefined) {
    return key;
  }
  return key;
}
