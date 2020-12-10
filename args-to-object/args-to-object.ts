import { Transform } from 'jscodeshift';
import j from 'jscodeshift/src/core';

const transform: Transform = (file, api, options) => {
  const funcArgs = options.args.split(',');
  const { path: filePath, source } = file;
  const root = j(source);
  let functionName;

  root.find(j.ImportDeclaration)
    .filter((path) => {
      const source = path.value.source.value;
      return typeof source === 'string' && source.endsWith('/lib/format');
    })
    .forEach((path) => {
      functionName = path.value.specifiers[0]?.local.name;
    })

  if (!functionName) {
    return root.toSource();
  }

  root.find(j.CallExpression, { callee: { name: functionName } })
    .forEach((path) => {
      const { arguments: callArgs } = path.value;
      callArgs.forEach((arg) => {
        if (j.SpreadElement.check(arg)) {
          throw Error('spread not supporting');
        }
      });
      const objectParamNode = j.objectExpression(
        // @ts-ignore
        callArgs.map((arg, i) => j.objectProperty(j.identifier(funcArgs[i]), arg)),
      )
      j(path).replaceWith(j.callExpression(path.value.callee, [objectParamNode]));
    })

  return root.toSource();
}

export default transform;
