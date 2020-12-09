import { API, FileInfo } from 'jscodeshift/src/core';

export const parser = 'ts';

export default function transformer(file: FileInfo, api: API): string | null {
  const j = api.jscodeshift;
  const root = j(file.source);

  // TODO

  return root.toSource();
}
