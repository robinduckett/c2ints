const register: RegisterItem[] = [];
let increment = 0;

interface RegisterItem {
  id: number;
  class_name: string;
  ref: any;
}

export class AddressableObject {
  private _id: number;
  private _class_name: string;

  constructor(class_name: string) {
    this._id = increment++;
    this._class_name = class_name;
    register.push({ id: this._id, ref: this, class_name });
  }

  get id () {
    return this._id;
  }

  set id (val: number) {
    this._id = val;
  }

  get class_name () {
    return this._class_name;
  }

  match (str: string) {
    return this._class_name === str;
  }

  static retrieve(id: number) {
    try {
      const obj = register.find((item) => item.id === id);
      
      if (!obj) {
        throw new Error("lookup");
      }

      return obj.ref;
    } catch (e) {
      console.warn('Unable to lookup id:', id);
      return null;
    }
  }
}
