// @flow

import type {Actions} from "../actions";

type State = {
	items: Array<{
		rightAnswers: Array<any>,
		wrongAnswers: Array<any>,
		leftProperty: string,
		rightProperty: string,
		dateOfStart: number
	}>
};

const defaultState = {
	items: []
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
