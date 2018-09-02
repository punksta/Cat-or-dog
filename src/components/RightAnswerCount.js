import React from "react";
import {Text, View, StyleSheet} from "react-native";
import {connect} from "react-redux";
import {onlyUpdateForKeys} from "recompose";

const GameScoreText_ = ({count}) => {
	return <Text style={styles.rightText}>{count}</Text>;
};

const RightAnswerCount = onlyUpdateForKeys(["rightAnswerCount"])(
	GameScoreText_
);

const styles = StyleSheet.create({
	rightText: {
		height: 40,
		width: 40,
		textAlignVertical: "center",
		textAlign: "center",
		borderRadius: 25,
		backgroundColor: "green",
		fontWeight: "bold",
		color: "white",
		fontSize: 21
	}
});

RightAnswerCount.defaultProps = {
	rightAnswerCount: 0
};

export default RightAnswerCount;
