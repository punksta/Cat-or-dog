// @flow

import {navigation} from "./navigation";
import {combineEpics} from "redux-observable";

export default combineEpics(navigation);
