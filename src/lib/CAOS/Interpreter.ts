import { parseExpression, Parser } from "./Parser";

interface ParseError extends Error {
  result: any;
}

// export class Script {
//   private command: string;
//   private classifier: string;
//   private enabled: boolean;

//   Script() {

//   }
// }

export const evalulateScript = (script: string) => {
  try {
    const [ast] = Parser.tryParse(script);


    for (const expression of ast) {
      console.log(expression);

    }
  } catch (e) {
    const { message, result, stack } = e as ParseError;

    if (result) {
      console.error(`\x1b[31m${message}\x1b[0m`);
      // console.error(result);
    } else {
      console.error(message);
      console.error(stack);
    }
  }
};

export const evaluateExpression = (script: string) => {
  const ast = parseExpression(script);

  console.log(ast);
};

evalulateScript('scrp 0 4 4 4, dbgm [Hello World],endm')

false;
