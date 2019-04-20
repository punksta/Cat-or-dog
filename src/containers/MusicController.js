import * as React from "react";
import {View, Switch, Text} from "react-native";
import LinearGradient from "react-native-linear-gradient";

const Component = ({isEnabled, onValueChange}) => {
	return (
		<LinearGradient
			// start={{x: 0.0, y:0 }} end={{x: 1, y:0}}
			locations={[0.1, 0.9]}
			colors={["#d66a41", "#f2b448"]}
			style={{
				overflow: "hidden",
				borderWidth: 1,
				borderColor: "#0209ac",
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			<View
				style={{
					flexDirection: "row",
					paddingHorizontal: 8,
					marginVertical: 8,
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Text
					style={{
						fontFamily: "MavenPro",
						fontSize: 15,
						color: "#fffbfa",
						textAlign: "center"
					}}
				>
					Enable sound
				</Text>
				<Switch value={isEnabled} onValueChange={onValueChange} />
			</View>
		</LinearGradient>
	);
};

import {connect} from "react-redux";
import {compose} from "recompose";

export default compose(
	connect(
		state => {
			return {
				isEnabled: state.settings.isMusicEnabled
			};
		},
		dispatch => {
			return {
				onValueChange: isEnabled => {
					dispatch({
						type: isEnabled ? "ENABLE_MUSIC" : "DISABLE_MUSIC"
					});
				}
			};
		}
	)
)(Component);
