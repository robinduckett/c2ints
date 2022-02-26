import '@fontsource/roboto/300.css';

import ReactDOM from 'react-dom';
import SmallFurryCreatures from './components/SmallFurryCreatures';

import { creatureDeserializer } from './lib/Creature/Creature';

ReactDOM.render(
  <SmallFurryCreatures />,
  document.querySelector("#pixi-container")
);

var c = creatureDeserializer({
  "biochemistry": {
    "atp_requirement": 255,
    "owner": 0,
    "chemicals": [{
      "id": 4,
      "name": "COLDNESS",
      "concentration": 255,
      "halflife": {
        "value": 64
      },
    }],
    "organs": [],
    "heart_organs": [],
    "heart_rate": 25
  },
  "biotick": 0,
  "dead": false,
  "dreaming": false,
  "unconscious": false
});

console.log(c);
