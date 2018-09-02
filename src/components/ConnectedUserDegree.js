// @flow

import {
	compose,
	onlyUpdateForKeys,
	renderNothing,
	shouldUpdate,
	mapProps
} from "recompose";
import {withNavigationFocus} from "react-navigation";
import UserDegree from "../components/UserDegree";
import connect from "react-redux/es/connect/connect";
import {getDegreeIndexByPassingScore} from "../data/userDegree";
import userDegrees from "../data/userDegree";
import {findBestGameIndex} from "../reducers/gameHistory";
import {Share} from "react-native";

const shareProfile = (bestScore, currentDegree) => {
	Share.share({
		title: `I am ${currentDegree.name}`,
		message: `I am ${
			currentDegree.name
		} with ${bestScore} score.\nhttps://play.google.com/store/apps/details?id=com.punksta.apps.sortgame`
	});
};

const hoc = compose(
	connect(state => {
		const bestGameIndex = findBestGameIndex(state.gameHistory);
		const bestScore =
			typeof bestGameIndex === "number"
				? state.gameHistory.items[bestGameIndex].rightAnswers.length
				: 0;
		return {
			bestScore
		};
	}),
	onlyUpdateForKeys(["bestScore"]),
	mapProps(props => {
		const degreeIndex = getDegreeIndexByPassingScore(
			userDegrees,
			props.bestScore
		);

		return {
			currentUserDegree: userDegrees[degreeIndex],
			nextUserDegree: userDegrees[1 + degreeIndex],
			onPress: () => {
				setTimeout(
					() => shareProfile(props.bestScore, userDegrees[degreeIndex]),
					200
				);
			},
			...props
		};
	})
);

export default hoc(UserDegree);
