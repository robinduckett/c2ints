import { alt, regexp, seq, string } from "parsimmon";

export default {
  Command: (r: any) => alt(
    r.SCRP,
    r.DBGM,
    r.TARG,
    r.DOIF,
    r.IMPT,
    r.APPR,
    r.TOUC,
    r.ANIM,
    r.SNDE,
    r.MESG,
    r.STIM,
    r['STM#'],
    r.SETV,
    r.ADDV,
    r['AIM:'],
    r.POSE,
    r.WAIT,
    r.MATE,
    r.DONE,
    r.SUBR,
    r.GSUB,
    r.RETN,
    r.REPS,
    r.STOP
  ),

  SCRP: (r: any) => seq(
    string('scrp').skip(r._),
    r.Number.trim(r._).times(4)
  ),

  DBGM: (r: any) => seq(
    string('dbgm').skip(r._),
    r.String,
  ),

  TARG: (r: any) => seq(
    string('targ').skip(r._),
    r.RValuePointer,
  ),

  IMPT: (r: any) => seq(string('impt').skip(r._), r.Number),

  APPR: () => string('appr'),

  TOUC: () => string('touc'),

  ANIM: (r: any) => seq(string('anim').skip(r._), r.String).map((a: any) => ["anim", a[1].match(/.{1,2}/g)]),

  SNDE: (r: any) => seq(string('snde').skip(r._), regexp(/[a-z0-9]{4}/)),

  MESG: (r: any) => seq(
    string('mesg').skip(r._),
    r.MessageTarget.skip(r._),
    r.RValuePointer.skip(r._),
    r.Number
  ),

  'STM#': (r: any) => seq(
    string('stm#').skip(r._),
    r.MessageTarget.skip(r._),
    r.RValuePointer.skip(r._),
    r.Number
  ),

  STIM: (r: any) => seq(
    string('stim').skip(r._),
    r.MessageTarget.skip(r._),
    r.RValuePointer.skip(r._),
    r.Number.skip(r._).times(12)
  ),

  STOP: () => string('stop'),

  SETV: (r: any) => seq(
    string('setv').skip(r._),
    r.LValue.skip(r._),
    r.Value
  ),

  ADDV: (r: any) => seq(
    string('addv').skip(r._),
    r.LValue.skip(r._),
    r.Value
  ),

  'AIM:': (r: any) => seq(string('aim:').skip(r._), r.Number),
  POSE: (r: any) => seq(string('pose').skip(r._), r.Number),
  WAIT: (r: any) => seq(string('wait').skip(r._), r.Number),

  MATE: () => string('mate'),
  DONE: () => string('done'),
  
  DOIF_STR: () => string('doif'),
  ELSE: () => string('else'),
  ENDI: () => string('endi'),

  REPS_STR: () => string('reps'),
  REPE: () => string('repe'),
};
