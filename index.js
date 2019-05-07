import "react-native-console-time-polyfill";
import "react-native-gesture-handler/";
import {AppRegistry} from "react-native";
import App from "./src/App";
import {isDebug} from "./src/utils/debugUtils";
import React from "react";
import {View, Image} from "react-native";
import DraggingFallinReanimated from "./src/containers/DraggingFallinReanimated";

const component = () => {
	return (
		<View style={{flex: 1, backgroundColor: "white"}}>
			<DraggingFallinReanimated
				style={{
					position: "absolute"
				}}
				onFallDown={() => {}}
			>
				<Image
					style={{width: 200, height: 200}}
					source={require("./src/img/playing_dog_1.jpg")}
				/>
			</DraggingFallinReanimated>
		</View>
	);
};

AppRegistry.registerComponent("sortGame", () => App);

import {setUpEvents, setUpCrashReports} from "./src/utils/integrations";

setUpCrashReports();
setUpEvents();
