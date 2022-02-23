import { Archive } from "../Serialisation/Archive";
import { PersistentObject } from "../Serialisation/PersistentObject";

// Data tables used by 'decay' data type
const Multiplier = [	// fraction to multiply values by for each decay rate 0-31
	0,								// instant decay to zero
	12965,							// very rapid
	29149,
	43707,
	53520,
	59224,
	62300,
	63897,							// standard rate (255->0 in approx 10 secs)
	63897,							// half standard rate (standard rate every other tick)
	63897,							// quarter standard rate
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,
	63897,							// very slow (255->0 in 97 days 
	65535							// extremely slow (255->0 in 13 years)
];

const Every = [			// how often to carry out decay for each rate 0-31
	0,								// do every tick
	0,
	0,
	0,
	0,
	0,
	0,
	0,
	(1<<1)-1,						// every 2 ticks
	(1<<2)-1,						// every 4 ticks
	(1<<3)-1,						// every 8 ticks
	(1<<4)-1,
	(1<<5)-1,
	(1<<6)-1,
	(1<<7)-1,
	(1<<8)-1,
	(1<<9)-1,
	(1<<10)-1,
	(1<<11)-1,
	(1<<12)-1,
	(1<<13)-1,
	(1<<14)-1,
	(1<<15)-1,
	(1<<16)-1,
	(1<<17)-1,
	(1<<18)-1,
	(1<<19)-1,
	(1<<20)-1,
	(1<<21)-1,
	(1<<22)-1,
	(1<<23)-1,
	(1<<24)-1						// every 16777215 ticks
];

export interface DecayArchive {
	value: number;
}

export function decayDeserializer (decay: DecayArchive) {
  const d = new Decay(0);
  d.deserialize(decay);
  return d;
}

export class Decay implements PersistentObject {
  public value = 0;

  constructor(val: number) {
    this.value = val;
  }

	serialize(): DecayArchive | Archive {
		return {
			value: this.value,
		};
	}

	deserialize (archive: Archive): void {
		const { value } = archive;
		this.value = value;
	}

  static decay(val: number, r: Decay, tick: number) {
    if (val > 0) return this._decay(val, r, tick);
    return val;
  }
  
  static relax(val: number, r: Decay, rest: number, tick: number) {
    if (val !== rest) return this._relax(val, r, rest, tick);
    return val;
  }

  // Allows a value to be decayed by the given decay rate TO A GIVEN REST STATE
  // This function _Decay() gets called by the inline function Decay(), only if
  // the param is non-zero, thus avoiding a function call in many cases
  private static _relax(val: number, r: Decay, rest: number, tick: number) {
    let every;
    let change;
    let dv;

    dv = r.value >> 3;

    every = Every[dv];
    if ((tick & every) === every) {
      change = (Math.abs(val - rest) * Multiplier[dv]) >> 16;

      if (val > rest) {
        return rest + change;
      } else {
        return rest - change;
      }
    }
    
    return val;
  }

  // Allows a value to be decayed by the given decay rate. 
  // This function _Decay() gets called by the inline function Decay(), only if
  // the param is non-zero, thus avoiding a function call in many cases

  private static _decay(val: number, r: Decay, tick: number) {
    let every;
    let dv;
    let result = val;

    dv = r.value >> 3;

    every = Every[dv];

    if ((tick & every) === every) {
      result = (val * Multiplier[dv]) >> 16
    }

    return result;
  }
}
