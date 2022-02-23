import { Biochemistry, BiochemistryArchive, biochemistryDeserializer } from "../Biochemistry/Biochemistry";
import { AddressableObject } from "../Serialisation/AddressableObject";
import { Archive } from "../Serialisation/Archive";
import { PersistentObject } from "../Serialisation/PersistentObject";

export interface CreatureArchive extends Archive {
  biochemistry: BiochemistryArchive | Archive;
  dreaming: boolean;
  dead: boolean;
  unconscious: boolean;
  biotick: number;
}

export function creatureDeserializer(c: CreatureArchive) {
  const crea = new Creature();
  crea.deserialize(c);
  return crea;
}

export class Creature extends AddressableObject implements PersistentObject {
  private dreaming: boolean;
  private dead: boolean;
  private unconscious: boolean;
  private biotick: number;

  public biochemistry: Biochemistry;

  constructor() {
    super("Creature");

    this.dreaming = false;
    this.dead = false;
    this.unconscious = false;
    this.biotick = 0;
    this.biochemistry = new Biochemistry(this);
  }

  update_biology() {

    // don't do this if processing instincts
    if (!this.dreaming && !this.dead) {

      // every second tick
      if (this.biotick % 2) {
        // update brain
        // nudge current action according to it's importance
        // brain raise_signal_input ( action_lobe, current_action, current_importance * 2 )

        // const unconscious = brain.update();
        const unconscious = false;

        if (!this.dead) {
          // update brain clock
          // brain.inc_brain_tick();
        }

        if (unconscious != this.unconscious) {
          // this.fall_unconscious();
        }

        if (!unconscious) {
          // choose any newly recommended action
          // this.consider_action();
        }
      }

      this.biochemistry.update(this.biotick);
    }

    if (!this.dead) {
      this.biotick += 1;
    }
  }

  serialize(): CreatureArchive {
    return {
      dreaming: this.dreaming,
      dead: this.dead,
      biochemistry: this.biochemistry.serialize(),
      biotick: this.biotick,
      unconscious: this.unconscious
    }
  }

  deserialize(archive: CreatureArchive | Archive) {
    const {
      dreaming,
      dead,
      biochemistry,
      biotick,
      unconscious
    } = archive;

    this.dreaming = dreaming;
    this.dead = dead;
    this.biochemistry = biochemistryDeserializer(biochemistry);
    this.biotick = biotick;
    this.unconscious = unconscious;
  }
}
