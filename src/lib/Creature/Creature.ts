import { AddressableObject } from "../Serialisation/AddressableObject";

export class Creature extends AddressableObject {
  constructor() {
    super("Creature");
    console.log(this.id, 'CREATURE: ', 'Stub class not initialised');
  }
}
