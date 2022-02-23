export const DEFAULT_HEART_RATE = 25;

export interface ChemicalDef {
  index: number;
  name: string;
}

export interface Chemicals {
  list: ChemicalDef[];
};

window.chemicals = {
  list: [
    {
      index: 0,
      name: 'NONE'
    },
    {
      index: 4,
      name: 'COLDNESS'
    },
    {
      index: 52,
      name: 'REWARD'
    },
    {
      index: 53,
      name: 'PUNISHMENT'
    },
    {
      index: 55,
      name: 'CONASH'
    },
    {
      index: 56,
      name: 'DECASH1'
    },
    {
      index: 59,
      name: 'DECASH2'
    },
    {
      index: 70,
      name: 'GLUCOSE'
    },
    {
      index: 72,
      name: 'GLYCOGEN'
    },
    {
      index: 73,
      name: 'STARCH'
    },
    {
      index: 75,
      name: 'ADIPOSETISSUE'
    },
    {
      index: 76,
      name: 'AGING'
    },
    {
      index: 78,
      name: 'TRIGLYCERIDE'
    },
    {
      index: 90,
      name: 'WASTEWATER'
    },
    {
      index: 92,
      name: 'UREA'
    },
    {
      index: 95,
      name: 'OXYGEN'
    },
    {
      index: 96,
      name: 'AIR'
    },
    {
      index: 99,
      name: 'ATP'
    },
    {
      index: 100,
      name: 'ADP'
    },
    {
      index: 107,
      name: 'GONADOTROPHIN'
    },
    {
      index: 108,
      name: 'PROGESTERONE'
    },
    {
      index: 113,
      name: 'CHOLESTEROL'
    },
    {
      index: 117,
      name: 'PARENTPHERAMONE'
    },
    {
      index: 152,
      name: 'BILEACID'
    },
    {
      index: 156,
      name: 'PROSTAGLANDIN'
    },
    {
      index: 172,
      name: 'ADRENALINE'
    },
    {
      index: 234,
      name: 'TOXINS'
    },
    // toxins that can be produced by bacteria (or herbs)
    // (genetics should use these as causes of symptoms & damage
    {
      index: 240,
      name: 'ANTIBODIES'
    },
    // antibodies for fighting bacteria

    {
      index: 240,
      name: 'ANTIBODY0'
    },
    {
      index: 241,
      name: 'ANTIBODY1'
    },
    {
      index: 242,
      name: 'ANTIBODY2'
    },
    {
      index: 243,
      name: 'ANTIBODY3'
    },
    {
      index: 244,
      name: 'ANTIBODY4'
    },
    {
      index: 245,
      name: 'ANTIBODY5'
    },
    {
      index: 246,
      name: 'ANTIBODY6'
    },
    {
      index: 247,
      name: 'ANTIBODY7'
    },
    {
      index: 248,
      name: 'ANTIGENS'
    },
    // antigens found on surface of bacteria
    // (cause production of equivalent antibody)
    {
      index: 248,
      name: 'ANTIGEN0'
    },
    {
      index: 249,
      name: 'ANTIGEN1'
    },
    {
      index: 250,
      name: 'ANTIGEN2'
    },
    {
      index: 251,
      name: 'ANTIGEN3'
    },
    {
      index: 252,
      name: 'ANTIGEN4'
    },
    {
      index: 253,
      name: 'ANTIGEN5'
    },
    {
      index: 254,
      name: 'ANTIGEN6'
    },
    {
      index: 255,
      name: 'ANTIGEN7'
    },
    {
      index: 104,
      name: 'BILIN'
    },
    {
      index: 112,
      name: 'STEROIDONE'
    }
  ]
}
