import { bound } from "../Maths";
import { Archive } from "../Serialisation/Archive";
import { PersistentObject } from "../Serialisation/PersistentObject";
import { Decay, DecayArchive, decayDeserializer } from "./Decay";

export interface ChemicalArchive {
  id: number;
  name: string;
  concentration: number;
  halflife: DecayArchive;
}

export function chemicalDeserializer(chem: ChemicalArchive) {
  const ch = new Chemical();
  ch.deserialize(chem);
  return ch;
}

export class Chemical implements PersistentObject {
  public _concentration: number;
  public halflife: Decay;
  public id: number;
  public name: string;

  constructor() {
    this.id = -1;
    this.name = "";
    this._concentration = 0;
    this.halflife = new Decay(0);
  }

  get concentration() {
    return this._concentration;
  }

  set concentration(bounded_value: number) {
    this._concentration = bound(bounded_value, 0, 255);
  }

  serialize(): Archive | ChemicalArchive {
    return {
      concentration: this._concentration,
      halflife: this.halflife.serialize(),
    }
  }

  deserialize(archive: Archive | ChemicalArchive) {
    const { id, name, concentration, halflife } = archive;

    this.id = id;
    this.name = name;
    this._concentration = concentration;
    this.halflife = decayDeserializer(halflife);
  };
}
