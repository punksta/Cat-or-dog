import "react-native-console-time-polyfill";

import {AppRegistry} from "react-native";
import App from "./src/App";
import {isDebug} from "./src/utils/debugUtils";

AppRegistry.registerComponent("sortGame", () => App);

if (isDebug()) {
	const modules = require.getModules();
	const moduleIds = Object.keys(modules);
	const loadedModuleNames = moduleIds
		.filter(moduleId => modules[moduleId].isInitialized)
		.map(moduleId => modules[moduleId].verboseName);
	const waitingModuleNames = moduleIds
		.filter(moduleId => !modules[moduleId].isInitialized)
		.map(moduleId => modules[moduleId].verboseName);

	console.log(
		"loaded:" +
			loadedModuleNames.length +
			"waiting:" +
			waitingModuleNames.length
	);
	console.log("modules: ", loadedModuleNames.sort());
}
