import {View, StyleSheet} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

const Heart = ({color, ...props}) => (
	<View {...props} style={[styles.heart, props.style]}>
		<View
			style={[styles.heartShape, styles.leftHeart, {backgroundColor: color}]}
		/>
		<View
			style={[styles.heartShape, styles.rightHeart, {backgroundColor: color}]}
		/>
	</View>
);

Heart.defaultProps = {
	color: "red"
};

export default onlyUpdateForKeys(["color"])(Heart);

const styles = StyleSheet.create({
	heart: {
		width: 50,
		height: 35
	},
	heartShape: {
		width: 20,
		height: 35,
		position: "absolute",
		top: 0,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15
	},
	leftHeart: {
		transform: [{rotate: "-45deg"}],
		left: 9,
		borderBottomLeftRadius: 2
	},
	rightHeart: {
		transform: [{rotate: "45deg"}],
		borderBottomRightRadius: 2,
		right: 9
	}
});
