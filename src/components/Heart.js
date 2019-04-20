import {View, Image, StyleSheet} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

const Heart = ({color, cornerColor, ...props}) => (
	<View {...props} style={styles.wrapper}>
		<Image
			resizeMode={"contain"}
			style={[styles.heart, {tintColor: color}]}
			source={require("../img/heart.png")}
		/>
	</View>
);

Heart.defaultProps = {
	color: "red"
};

export default onlyUpdateForKeys(["color"])(Heart);

const styles = StyleSheet.create({
	wrapper: {
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center"
	},
	heart: {
		position: "absolute",
		width: 30,
		height: 30
	},
	innerHeart: {
		position: "absolute",
		width: 30,
		height: 30,
		transform: [
			{
				scaleX: 0.9
			},
			{
				scaleY: 0.9
			}
		]
	}
});
