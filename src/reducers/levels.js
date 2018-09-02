// @flow
import type {Actions} from "../actions";
import {getUniqueFromArrays} from "../data/utils";

type State = {
	passedLevelsId: Array<number>,
	unlockedCategoies: Array<string>
};

const defaultState: State = {
	passedLevelsId: [],
	unlockedCategoies: []
};

export default (state: State = defaultState, action: Actions): State => {
	switch (action.type) {
		default:
			return state;

		case "ON_FREE_GAME_END":
			if (
				action.level &&
				action.level.passingScore < action.rightAnswers.length
			) {
				return {
					...state,
					passedLevelsId: getUniqueFromArrays([
						state.passedLevelsId,
						[action.level.name]
					]),
					unlockedCategoies: getUniqueFromArrays([
						state.unlockedCategoies,
						action.level.unlockCategories
					])
				};
			} else {
				return state;
			}
	}
};
