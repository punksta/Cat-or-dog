import React from "react";
import {Text, View, StyleSheet} from "react-native";
import Heart from "./Heart";
import {connect} from "react-redux";
import {onlyUpdateForKeys} from "recompose";

const GameScore = ({rightAnswerCount, lifeCount}) => {
	return (
		<View style={styles.root}>
			<View style={styles.heartWrapper}>
				<Heart />

				<View style={styles.leftTextWrapper}>
					<Text style={styles.leftText}>{lifeCount}</Text>
				</View>
			</View>
			<Text style={styles.rightText}>{rightAnswerCount}</Text>
		</View>
	);
};

const OptimizedGameScore = onlyUpdateForKeys(["rightAnswerCount", "lifeCount"])(
	GameScore
);

const styles = StyleSheet.create({
	rightText: {
		position: "absolute",
		end: 0,
		height: 40,
		width: 40,
		textAlignVertical: "center",
		textAlign: "center",
		borderRadius: 25,
		backgroundColor: "green",
		fontWeight: "bold",
		color: "white",
		fontSize: 21
	},
	leftText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 21
	},
	leftTextWrapper: {
		position: "absolute",
		top: 5,
		width: "100%",
		height: "80%",
		justifyContent: "center",
		alignItems: "center"
	},
	heartWrapper: {
		width: 50
	},
	root: {
		width: "100%",
		height: 50
	}
});

GameScore.defaultProps = {
	rightAnswerCount: 0,
	lifeCount: 0
};

export default OptimizedGameScore;

const hoc = connect(state => {
	return {
		rightAnswerCount: state.singleGame.rightAnswers.length,
		lifeCount:
			state.singleGame.wrongItemLimit - state.singleGame.wrongAnswers.length
	};
});

export const ConnectedGameScore = hoc(OptimizedGameScore);
