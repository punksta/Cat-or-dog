import * as React from "react";
import LevelsList from "../components/LevelsList";
import {compose, onlyUpdateForKeys} from "recompose";
import {connect} from "react-redux";
import levels from "../data/levels";

const LevelsScreen = ({onLevelClick, passedLevelsId}) => {
	return (
		<LevelsList
			onLevelClick={onLevelClick}
			levels={levels}
			passedLevelsId={passedLevelsId}
		/>
	);
};

const hoc = compose(
	connect(
		state => {
			return {
				passedLevelsId: state.levels.passedLevelsId
			};
		},
		dispatch => {
			return {
				onLevelClick: (level, levelIndex) =>
					dispatch({type: "LEVEL_PRESSED", level, levelIndex})
			};
		}
	),
	onlyUpdateForKeys(["passedLevelsId"])
);

export default hoc(LevelsScreen);
