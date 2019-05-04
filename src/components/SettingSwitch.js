import LinearGradient from "react-native-linear-gradient";
import {Switch, Text, View, TouchableOpacity} from "react-native";
import React from "react";

const Component = ({isEnabled, text, onValueChange, infoClick}) => {
	return (
		<LinearGradient
			locations={
				[0.1, 0.9] // start={{x: 0.0, y:0 }} end={{x: 1, y:0}}
			}
			colors={["#d66a41", "#f2b448"]}
			style={{
				overflow: "hidden",
				borderWidth: 1,
				borderColor: "#0209ac",
				alignItems: "center",
				justifyContent: "center",
				marginVertical: 16
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
						fontFamily: "MavenPro-Medium",
						fontSize: 15,
						color: "#fffbfa",
						textAlign: "center"
					}}
				>
					{text}
				</Text>
				<Switch value={isEnabled} onValueChange={onValueChange} />
			</View>
			{infoClick !== undefined && (
				<View style={{end: 0, position: "absolute"}}>
					<TouchableOpacity style={{paddingHorizontal: 16}} onPress={infoClick}>
						<Text style={{color: "white", fontSize: 15}}>?</Text>
					</TouchableOpacity>
				</View>
			)}
		</LinearGradient>
	);
};

export default Component;
