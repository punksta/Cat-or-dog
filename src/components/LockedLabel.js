import * as React from "react";
import {View, Image} from "react-native";

const Locked = ({style}) => (
	<View
		style={[
			style,
			{
				alignItems: "center",
				justifyContent: "center"
			}
		]}
	>
		<Image
			style={{
				tintColor: "gray",
				width: 100,
				height: 100
			}}
			source={require("../img/lock.png")}
		/>
	</View>
);

export default Locked;
