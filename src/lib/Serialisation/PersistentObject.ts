import { Archive } from "./Archive";

export interface PersistentObject {
  serialize: () => Archive;
  deserialize: (val: Archive) => void;
}
