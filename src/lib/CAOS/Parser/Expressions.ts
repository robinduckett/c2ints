import { alt, optWhitespace, regexp, seq, string, end } from "parsimmon";

export default {
  Value: (r: any) => alt(r.String, r.Number, r.RValue),
  String: () =>
    string('[')
      .then(regexp(/[^\]]+/))
      .skip(string(']'))
  ,
  Label: () => regexp(/[a-z0-9]{4}/),
  Number: () => regexp(/[-\d\.]+/).map(Number),
  Integer: () => regexp(/\d+/).map(Number),
  Condition: () => regexp(/eq|ne|gt|lt|ge|le|bt|bf/),
  Expression: (r: any) => r.Command.trim(r._),
  Block: (r: any) => r.Expression.skip(r.Comma).atLeast(1).trim(r._),
  Script: (r: any) => seq(r.Block, string('endm').trim(r._).or(end)),
  Comma: () => string(','),
  _: () => optWhitespace,
};
