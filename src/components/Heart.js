import {View, Image, StyleSheet} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

const Heart = ({color, ...props}) => (
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
		width: 50,
		height: 35,
		justifyContent: "center",
		alignItems: "center"
	},
	heart: {
		flex:1
	},
	innerHeart: {
		position: 'absolute',
		width: 50,
		height: 35
	}
});
