import React from "react";
import GameConfiguration from "../containers/GameConfiguration";

const GameConfigurationScreen = ({onStartButtonClick}) => {
	return <GameConfiguration onStartButtonClick={onStartButtonClick} />;
};

const mapDispatchToProps = dispatch => {
	return {
		onStartButtonClick: (leftProperty, rightProperty) =>
			dispatch({
				type: "NEW_GAME_BUTTON_CLICK",
				gameSettings: {
					leftProperty,
					rightProperty
				}
			})
	};
};
import {connect} from "react-redux";
import {compose, onlyUpdateForKeys} from "recompose";

const hoc = compose(
	connect(
		undefined,
		mapDispatchToProps
	),
	onlyUpdateForKeys([])
);
const comp = hoc(GameConfigurationScreen);

export default comp;
