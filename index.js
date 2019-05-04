import "react-native-console-time-polyfill";
import "react-native-gesture-handler/";
import {AppRegistry} from "react-native";
import App from "./src/App";
import {isDebug} from "./src/utils/debugUtils";

AppRegistry.registerComponent("sortGame", () => App);

import {setUpEvents, setUpCrashReports} from "./src/utils/integrations";

setUpCrashReports();
setUpEvents();
