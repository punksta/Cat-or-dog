// @flow

import {Text, StyleSheet, View} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

type Props = {
	leftProperty: string,
	rightProperty: string,
	leftProprtyColor?: string,
	rightpropertyColor?: string
};

const capitalize = str => str.charAt(0).toUpperCase() + str.slice(1);

const GameBottomBar = (props: Props) => {
	const {
		leftProperty,
		rightProperty,
		leftProprtyColor,
		rightpropertyColor,
		...rest
	} = props;
	return (
		<View {...rest}>
			<View
				style={[
					styles.textWrapper,
					styles.textWrapperStart,
					{backgroundColor: leftProprtyColor}
				]}
			>
				<Text style={styles.text}>{leftProperty.toUpperCase()}</Text>
			</View>

			<View
				style={[
					styles.textWrapper,
					styles.textWrapperEnd,
					{backgroundColor: rightpropertyColor}
				]}
			>
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
	text: {
		textAlign: "center",
		flex: 1,
		fontWeight: "bold",
		color: "#f8f7ff",
		fontSize: 20
	},
	textWrapper: {
		flex: 1,
		padding: 15
	},
	textWrapperStart: {
		// borderTopEndRadius: 20,
		// marginEnd: 8
	},
	textWrapperEnd: {
		// borderTopStartRadius: 20,
		// marginStart: 8
	}
});

export default onlyUpdateForKeys(["rightProperty", "leftProperty"])(
	GameBottomBar
);
