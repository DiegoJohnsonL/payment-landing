import { ReactElement } from "react";

export function useTranslate() {
  const __ = (key: string): string | ReactElement => {
    return key;
  };

  return { __ };
}
