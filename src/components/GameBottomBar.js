// @flow

import {Text, StyleSheet, View} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

type Props = {
	leftProperty: string,
	rightProperty: string,
	leftProprtyColor?: string,
	rightpropertyColor?: string,
	style?: any
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const GameBottomBar = (props: Props) => {
	const {
		leftProperty,
		rightProperty,
		leftProprtyColor,
		rightpropertyColor,
		style,
		...rest
	} = props;
	return (
		<View style={[styles.root, style]} {...rest}>
			<View style={[styles.textWrapper, {backgroundColor: leftProprtyColor}]}>
				<Text style={styles.text}>{leftProperty.toUpperCase()}</Text>
			</View>

			<View style={[styles.textWrapper, {backgroundColor: rightpropertyColor}]}>
				<Text style={styles.text}>{rightProperty.toUpperCase()}</Text>
			</View>
		</View>
	);
};

GameBottomBar.defaultProps = {
	leftProprtyColor: "#11a7b0",
	rightpropertyColor: "#2bcf52"
};

const styles = StyleSheet.create({
	root: {
		width: "100%",
		flexDirection: "row",
		height: 60
	},
	text: {
		alignSelf: "center",
		textAlign: "center",
		fontWeight: "bold",
		color: "#f8f7ff",
		fontSize: 20
	},
	textWrapper: {
		flex: 1,
		paddingHorizontal: 15,
		justifyContent: "center",
		alignItems: "center"
	}
});

export default onlyUpdateForKeys<Props>(["rightProperty", "leftProperty"])(
	GameBottomBar
);
