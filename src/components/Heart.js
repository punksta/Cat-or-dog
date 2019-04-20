import {View, Image, StyleSheet} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

const Heart = ({color, cornerColor, ...props}) => (
	<View {...props} style={styles.wrapper}>
		<Image
			resizeMode={"contain"}
			style={[styles.heart, {tintColor: cornerColor}]}
			source={require("../img/heart.png")}
		/>
		<Image
			resizeMode={"contain"}
			style={[styles.innerHeart, {tintColor: color}]}
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
		width: 50,
		height: 50,
		justifyContent: "center",
		alignItems: "center"
	},
	heart: {
		position: "absolute",
		width: 50,
		height: 50
	},
	innerHeart: {
		position: "absolute",
		width: 50,
		height: 50,
		transform: [
			{
				scaleX: 0.8
			},
			{
				scaleY: 0.8
			}
		]
	}
});
