import React from "react";
import {Text, View, StyleSheet, SafeAreaView} from "react-native";
import Heart from "./Heart";
import {connect} from "react-redux";
import {onlyUpdateForKeys} from "recompose";

const GameScore = ({rightAnswerCount, lifeCount}) => {
	return (
		<SafeAreaView style={styles.root}>
			<View style={styles.heartWrapper}>
				{Array.from(Array(lifeCount)).map((_, i) => {
					return (
						<Heart key={i.toString()} color={"red"} cornerColor={"black"} />
					);
				})}
			</View>
			<View style={styles.rightTextWrapper}>
				<Text style={styles.rightText}>{rightAnswerCount}</Text>
			</View>
		</SafeAreaView>
	);
};

const OptimizedGameScore = onlyUpdateForKeys(["rightAnswerCount", "lifeCount"])(
	GameScore
);

const styles = StyleSheet.create({
	rightText: {
		textAlignVertical: "center",
		fontWeight: "bold",
		color: "white",
		fontSize: 21
	},
	rightTextWrapper: {
		height: 40,
		width: 40,
		textAlign: "center",
		alignItems: "center",
		justifyContent: "center",
		borderRadius: 20,
		backgroundColor: "green"
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
		margin: 8,
		width: 50
	},
	root: {
		width: "100%",
		height: 50,
		justifyContent: "space-between",
		flexDirection: "row"
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
