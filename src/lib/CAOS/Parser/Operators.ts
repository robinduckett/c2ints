import { alt, seq, seqObj, string } from "parsimmon";

export default (CAOS: any, depth: number = 0) => ({
  DOIF_ENDI: (r: any) => seqObj(
    r.DOIF_STR,
    r._,
    ['lvalue', r.Value.skip(r._)],
    ['op', r.Condition.skip(r._)],
    ['rvalue', r.Value],
    r.Comma,
    ['ifblock', CAOS(depth + 1).Block.skip(r.ENDI)]
  ),

  DOIF_ELSE: (r: any) => seqObj(
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

  SUBR: (r: any) => seq(
    string('subr').skip(r._),
    r.Label
  ),

  GSUB: (r: any) => seq(
    string('gsub').skip(r._),
    r.Label
  ),

  RETN: (r: any) => string('retn'),

  REPS: (r: any) => seqObj(
    r.REPS_STR.skip(r._),
    ['iterationCount', r.Integer],
    r.Comma,
    ['loop', CAOS(depth + 1).Block.skip(r.REPE)]
  ).map((a: any) => ['reps', { depth: depth, ...a}]),
});
