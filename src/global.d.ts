import { Chemicals } from "./lib/Biochemistry/typedefs";

declare global {
  interface Window {
    chemicals: Chemicals;
  }
}
