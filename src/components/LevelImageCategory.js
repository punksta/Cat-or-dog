// @flow
import * as React from "react";
import {View, Image, Text} from "react-native";

type Props = {
	propertyName: string,
	source: any,
	style?: any
};

const LevelCategory = ({propertyName, source, style}: Props) => {
	return (
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
					width: 120,
					height: 120,
					borderRadius: 20,
					borderWidth: 2,
					marginBottom: 8,
					borderColor: "white"
				}}
				source={source}
			/>
			<Text
				style={{
					color: "#fbff00",
					fontSize: 18,
					fontFamily: "MavenPro-Bold"
				}}
			>
				{propertyName.toUpperCase()}
			</Text>
		</View>
	);
};
import {onlyUpdateForKeys} from "recompose";

// export default onlyUpdateForKeys(["propertyName", "source"])(LevelCategory);
export default LevelCategory;
