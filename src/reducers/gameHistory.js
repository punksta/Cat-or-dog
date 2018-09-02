// @flow

import type {Actions} from "../actions";

type GameHistoryItem = {
	rightAnswers: Array<any>,
	wrongAnswers: Array<any>,
	leftProperty: string,
	rightProperty: string,
	dateOfStart: number
};

type State = {
	items: Array<GameHistoryItem>,
	bestScore: number
};

const defaultState = {
	items: [],
	bestScore: 0
};

export default (state: State = defaultState, action: Actions) => {
	switch (action.type) {
		case "ON_FREE_GAME_END":
			const {
				rightAnswers,
				wrongAnswers,
				dateOfStart,
				leftProperty,
				rightCategory
			} = action;

			return {
				items: [
					{
						rightAnswers,
						wrongAnswers,
						leftProperty,
						rightCategory,
						dateOfStart: dateOfStart.getTime()
					},
					...state.items
				]
			};

		default:
			return state;
	}
};

const findMaxIndexBy = compare => array =>
	array.reduce(
		(acc: ?number, cur, index, array) =>
			typeof acc === "number" && compare(array[acc], cur) ? acc : index,
		undefined
	);

const findMaxIndexByGameScore = findMaxIndexBy(
	(game1, game2) => game1.rightAnswers.length > game2.rightAnswers.length
);

export const findBestGameIndex = (state: State): ?number => {
	return findMaxIndexByGameScore(state.items);
};
