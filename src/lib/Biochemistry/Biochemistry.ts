import { Creature } from "../Creature/Creature";
import { AddressableObject } from "../Serialisation/AddressableObject";
import { Archive } from "../Serialisation/Archive";
import { PersistentObject } from "../Serialisation/PersistentObject";
import { Chemical, ChemicalArchive, chemicalDeserializer } from "./Chemical";
import { Decay } from "./Decay";
import { Organ, OrganArchive, organDeserializer } from "./Organ";
import { DEFAULT_HEART_RATE } from "./typedefs";

interface BiochemistryArchive extends Archive {
  atp_requirement: number;
  owner: number | null;
  chemicals: (ChemicalArchive | Archive)[];
  organs: (OrganArchive | Archive)[];
  heart_organs: number[];
  heart_rate: number;
}

export function biochemistryDeserializer (bio: BiochemistryArchive) {
  const b = new Biochemistry();
  b.deserialize(bio);
  return b;
}

export class Biochemistry implements PersistentObject {
  public atp_requirement: number;

  private owner: Creature | null;
  private chemicals: Chemical[];
  private organs: Organ[];
  private heart_organs: number[];
  private heart_rate: number;

  constructor() {
    this.atp_requirement = 0.0;
    this.owner = null;
    this.chemicals = [];
    this.organs = [];

    this.heart_organs = [];
    this.heart_rate = DEFAULT_HEART_RATE;
  }

  update(biotick: number) {
    // Update all organs

    for (const organ of this.organs) {
      organ.update();
    }

    // Reduce chemical concentrations according to half-lives

    for (const chemical of this.chemicals) {
      chemical.concentration = Decay.decay(chemical.concentration, chemical.halflife, biotick);
    }

    // Calculate heart rate

    const count = this.heart_organs.length;
    let rate = 0;

    for (let i = 0; i < count; i++) {
      const organ = this.organs[this.heart_organs[i]];
      if (organ) {
        rate += organ.clock_rate;
      }
    }

    if (count > 0) {
      this.heart_rate = rate / count;
    }
  }

  get_chemical(chemical: number): number {
    return this.chemicals.find((c) => c.id === chemical)?.concentration ?? 0;
  }

  set_chemical(chemical: number, amount: number) {
    const chem = this.chemicals.find((c) => c.id === chemical);

    if (chem) {
      chem.concentration = amount;
    }
  }

  add_chemical(chemical: number, amount: number) {
    const chemdef = window.chemicals.list.find((c) => c.index === chemical);
    const chem = this.chemicals.find((c) => c.id === chemdef?.index);

    if (!chem && chemdef) {
      var chemToAdd = new Chemical();
      chemToAdd.concentration = amount;
      chemToAdd.halflife = new Decay(0);
      chemToAdd.id = chemdef.index;
      chemToAdd.name = chemdef.name;

      this.chemicals.push(chemToAdd);
    }

    if (chem) {
      chem.concentration += amount;
    }
  }

  sub_chemical(chemical: number, amount: number) {
    const chem = this.chemicals.find((c) => c.id === chemical);

    if (chem) {
      chem.concentration -= amount;
    }
  }

  serialize(): BiochemistryArchive {
    return {
      atp_requirement: this.atp_requirement,
      owner: this.owner?.id ?? null,
      chemicals: this.chemicals.map((c) => c.serialize()),
      organs: this.organs.map((o) => o.serialize()),
      heart_organs: this.heart_organs,
      heart_rate: this.heart_rate,
    };
  }

  deserialize(archive: BiochemistryArchive | Archive) {
    const {
      atp_requirement,
      owner,
      chemicals,
      organs,
      heart_organs,
      heart_rate
    } = archive;

    this.atp_requirement = atp_requirement;
    this.owner = AddressableObject.retrieve(owner);

    this.chemicals = chemicals.map(chemicalDeserializer);
    this.organs = organs.map(organDeserializer);

    this.heart_organs = heart_organs;
    this.heart_rate = heart_rate;
  }
}
