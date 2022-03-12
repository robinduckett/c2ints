import { alt, seqObj } from "parsimmon";

export default (CAOS: any, depth: number = 0) => ({
  DOIF_ENDI: (r: any) => seqObj<any>(
    r.DOIF_STR,
    r._,
    ['lvalue', r.Value.skip(r._)],
    ['op', r.Condition.skip(r._)],
    ['rvalue', r.Value],
    r.Comma,
    ['ifblock', CAOS(depth + 1).Block.skip(r.ENDI)]
  ),

  DOIF_ELSE: (r: any) => seqObj<any>(
    r.DOIF_STR,
    r._,
    ['lvalue', r.Value.skip(r._)],
    ['op', r.Condition.skip(r._)],
    ['rvalue', r.Value],
    r.Comma,
    ['if', CAOS(depth + 1).Block.skip(r.ELSE)],
    r.Comma,
    ['else', CAOS(depth + 1).Block.skip(r.ENDI)],
  ),
  
  DOIF: (r: any) => alt(
    r.DOIF_ELSE,
    r.DOIF_ENDI
  ).map((a: any) => ['doif', { depth: depth, ...a}]),
});
