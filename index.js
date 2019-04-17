import "react-native-console-time-polyfill";

import {AppRegistry, Alert} from "react-native";
import App from "./src/App";

AppRegistry.registerComponent("sortGame", () => App);

const modules = require.getModules();
const moduleIds = Object.keys(modules);
const loadedModuleNames = moduleIds
	.filter(moduleId => modules[moduleId].isInitialized)
	.map(moduleId => modules[moduleId].verboseName);
const waitingModuleNames = moduleIds
	.filter(moduleId => !modules[moduleId].isInitialized)
	.map(moduleId => modules[moduleId].verboseName);

// make sure that the modules you expect to be waiting are actually waiting

// grab this text blob, and put it in a file named packager/modulePaths.js
// Alert.alert(
// 	"loaded:" + loadedModuleNames.length + "waiting:" + waitingModuleNames.length,
// 	`module.exports = ${JSON.stringify(loadedModuleNames.sort())};`
// );
