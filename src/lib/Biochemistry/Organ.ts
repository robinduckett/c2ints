import { Archive } from "../Serialisation/Archive";
import { PersistentObject } from "../Serialisation/PersistentObject";

export interface OrganArchive {
  clock_rate: number;
}

export function organDeserializer (organ: OrganArchive) {
  const or = new Organ();
  or.deserialize(organ);
  return or;
}

export class Organ implements PersistentObject {
  public clock_rate: number;
  
  constructor() {
    this.clock_rate = 128;
  }

  update() {
    console.log('This would be where organs update... if we had any');
  }

  serialize (): Archive | OrganArchive {
    return {
      clock_rate: this.clock_rate
    }
  }

  deserialize(archive: Archive): void {
    const {
      clock_rate
    } = archive;

    this.clock_rate = clock_rate;
  }
}
