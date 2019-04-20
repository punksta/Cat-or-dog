// @flow

import type {Actions} from "../actions";

type State = {
	isMusicEnabled: boolean
};

export default (state: ?State = {}, action: Actions) => {
	switch (action.type) {
		case "ENABLE_MUSIC": {
			return {
				...state,
				isMusicEnabled: true
			};
		}
		case "DISABLE_MUSIC": {
			return {
				...state,
				isMusicEnabled: false
			};
		}
		default: {
			return state;
		}
	}
};
