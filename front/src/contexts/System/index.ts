import Source from "./source";
import * as Actions from "./actions";
import useSystem, * as hooks from './hook';

const System = { Source, ...Actions, useSystem, ...hooks };

export default System;
