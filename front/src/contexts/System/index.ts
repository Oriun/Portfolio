import Source from "./source";
import * as Actions from "./actions";
import useSystem from './hook';

const System = { Source, ...Actions, useSystem };

export default System;
