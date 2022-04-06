// <reference path="./Parsimmon.d.ts" />
import util from 'util';

import { readFile } from "fs/promises";

import {
  alt, seq, seqObj, eof,
  createLanguage,
  default as P,
} from "parsimmon";

const {
  Binary,
} = P;

const { byte, int32LE, uint32LE, uint16LE, encodedString } = Binary;

async function deserialize(sfc: string) {
  const file: Buffer = await readFile(sfc);
  console.log(file.slice(0, 59));
  const parsed = SFC.Archive.tryParse(file.slice(0, 59));
  console.log(util.inspect(parsed, false, null, true));
  return parsed;
}

async function load(worldsfc: string): Promise<void> {
  return await deserialize(worldsfc);
}

function ObjectHeader(p: any, str: string) {
  return function () {
    return P.seqObj(
      [
        'objectTag',
        p.ObjectClassHeader.map(
          (tag: number[]) =>
            tag.reduce((p: string, c: number) => `${p}${c.toString(16)}`, '0x')
        )
      ],
      ['schemaId', p.ObjectSchemaVersion],
      ['className', p.ObjectClassName.assert((name: string) => name === str)],
    );
  };
}

const SFC = createLanguage({
  LONG: () => int32LE,
  WORD: () => uint16LE,
  DWORD: () => uint32LE,
  FSP: (p: any) => encodedString('ascii', 4),
  ObjectTag: (p: any) => p.DWORD,
  ObjectClassHeader: () => seq(byte(0xff), byte(0xff)),
  ObjectSchemaVersion: (p: any) => p.WORD,
  ObjectClassName: (p: any) => p.WORD.chain((n: number) => encodedString('utf8', n)),
  ObjectClass: (p: any) => seqObj(
    ['objectTag', p.ObjectClassHeader],
    ['schemaId', p.ObjectSchemaVersion],
    ['className', p.ObjectClassName],
  ),
  MapData: (p: any) => seqObj(
    ['Class', P.any.thru(ObjectHeader(p, 'MapData'))],
    ['MapIsWrappable', p.LONG],
    ['Timestamp', p.DWORD],
    ['TileGalleryPointer', p.ObjectTag],
    ['NumberOfRooms', p.LONG]
  ),
  CGallery: (p: any) => seqObj(
    ['Class', P.any.thru(ObjectHeader(p, 'CGallery'))],
    ['NumImages', p.LONG],
    ['Fsp', p.FSP],
    ['FilePos', p.LONG],
    ['Users', p.LONG]
  ),
  Archive: (p: any) => seq(
    alt(
      p.MapData,
      p.CGallery,
    ).atLeast(1),
  ).skip(eof)
});

load(process.argv[2]);
