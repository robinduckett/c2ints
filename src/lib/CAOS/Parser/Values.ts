import { alt, regexp, seq, string } from "parsimmon";

export default {
  RValueGeneral: () => alt(
    regexp(/var[0-9]/),
    regexp(/obv[0-2]/),
  ),
  RValuePointer: () => alt(
    string('targ'),
    string('ownr'),
    string('from'),
    string('norn'),
    string('pntr'),
    string('attn'),
    string('carr'),
    string('exec'),
    string('edit'),
    string('_it_')
  ),
  RValueToken: () => string('tokn'),
  RValueSystem: () => alt(
    string('winw'),
    string('winh'),
    regexp(/pos[lrtb]/),
    string('wdth'),
    string('hght'),
    regexp(/lim[lrtb]/),
    string('clas'),
    string('fmly'),
    string('gnus'),
    string('spcs'),
    string('movs'),
    string('actv'),
    string('neid'),
    string('attr'),
  ),
  RValueTargCompound: () => alt(
    string('xvec'),
    string('yvec'),
    string('bump'),
  ),
  RValueTargCreature: (r: any) => alt(
    string('driv'),
    string('drv!'),
    string('cage'),
    seq(string('chem').skip(r._), r.Number),
    string('baby'),
    string('dead'),
    string('aslp'),
  ),
  RValueEnvironment: (r: any) => alt(
    string('wind'),
    string('temp'),
    string('room'),
    string('rms#'),
    string('gnd#'),
    string('grnd'),
    seq(string('totl').skip(r._), r.Number.skip(r._).times(3))
  ),

  RValueTruth: () => string('touc'),

  RValue: (r: any) => alt(
    r.RValueEnvironment,
    r.RValueGeneral,
    r.RValuePointer,
    r.RValueSystem,
    r.RValueTargCompound,
    r.RValueTargCreature,
    r.RValueToken,
    r.RValueTruth
  ),

  LValue: () => alt(
    regexp(/var[0-9]/),
    regexp(/obv[0-2]/),
  ),

  MessageTarget: () => regexp(/shou|sign|tact|writ/),
};
