import { Transform } from 'jscodeshift';

const transform: Transform = (file, api, options) => {
  const j = api.jscodeshift;
  const { path: filePath, source } = file;
  const root = j(source);

  // TODO

  return root.toSource();
}

export default transform;
