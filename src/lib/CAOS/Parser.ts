import {
  createLanguage,
  Language,
} from 'parsimmon';

import Commands from './Parser/Commands';
import Expressions from './Parser/Expressions';
import Operators from './Parser/Operators';
import Values from './Parser/Values';

type DepthTrackedLanguage = (depth?: number) => Language;

const CAOS: DepthTrackedLanguage = (depth: number = 0) => createLanguage({
  ...Commands,
  ...Expressions,
  ...Values,
  ...Operators(CAOS, depth)
});

export const tryParse = (script: string) => {
  return CAOS().Expression.tryParse(script);
};

// const result = tryParse`
// targ _it_,

// doif dead ne 0,
//   stop,
// endi,

// targ ownr,
// doif gnus eq 2,
//   impt 6,
//   appr,
//   touc,
//   anim [33343334],
//   snde punc,
//   mesg writ _it_ 2,
//   stim writ targ 0 0 0 0 36 55 45 30 23 30 0 0,
//   stim writ _it_ 0 0 0 0 19 30 27 30 172 20 0 0,
//   stop,
// else,
//   targ _it_,
//   doif gnus eq 2,
//     setv var0 1,
//   else,
//     setv var0 0,
//   endi,

//   targ ownr,
//   doif var0 eq 1,
//     impt 3,
//     appr,
//     anim [33343334],
//     snde spnk,
//     mesg writ _it_ 0,
//     stop,
//   endi,
// endi,

// setv var0 0,
// doif spcs eq 1,
// addv var0 1,
// endi,
// doif chem 13 gt 128,
// addv var0 1,
// endi,
// setv var2 spcs,
// targ _it_,
// doif spcs ne var2,
// addv var0 1,
// setv var1 1,
// endi,
// doif cage ge 2,
// addv var0 1,
// endi,
// targ ownr,
// doif var0 eq 4,
// impt 3,
// aim: 0,
// appr,
// pose 37,
// wait 5,
// snde kis2,
// mesg writ _it_ 0,
// doif totl 4 1 0 lt 12,
// mate,
// endi,
// stim writ targ 0 0 0 0 47 255 36 100 23 40 24 60,
// stim writ _it_ 32 0 0 0 47 255 36 100 23 40 24 60,
// wait 15,
// pose 12,
// wait 20,
// done,
// else,
// impt 3,
// aim: 0,
// appr,
// doif var1 eq 1,
// pose 37,
// wait 5,
// snde kis1,
// endi,
// mesg writ _it_ 0,
// stm# writ targ 13,
// wait 15,
// pose 12,
// wait 20,
// done,
// endi,
// endm,
// `;

// const result = tryParse`,
//   targ ownr,,
//   doif gnus eq 2,,
//     impt 6,,
//     appr,,
//     touc,,
//     anim [33343334],,
//     snde punc,,
//     mesg writ _it_ 2,,
//     stim writ targ 0 0 0 0 36 55 45 30 23 30 0 0,,
//     stim writ _it_ 0 0 0 0 19 30 27 30 172 20 0 0,,
//     stop,,
//   else,,
//     targ _it_,,
//     doif gnus eq 2,,
//       setv var0 1,,
//     else,,
//       setv var0 0,,
//     endi,,

//     targ ownr,
//     doif var0 eq 1,
//       impt 3,
//       appr,
//       anim [33343334],
//       snde spnk,
//       mesg writ _it_ 0,
//       stop,
//     endi,
//   endi,
//   endm
// `;

// Print out the AST!
// console.log(JSON.stringify(result, null, 2));
