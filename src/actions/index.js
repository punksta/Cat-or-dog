export type Actions =
	| {
			type: "NEW_GAME_BUTTON_CLICK",
			gameSettings: ?{
				leftProperty?: string,
				rightProperty?: string
			}
	  }
	| {
			type: "ON_FALL_DOWN",
			item: any,
			isRightChoice: boolean,
			isWrongLimitOvercome: boolean
	  }
	| {
			type: "EXIT_FROM_GAME"
	  }
	| {
			type: "ON_FREE_GAME_END",
			wrongItems: Array<any>,
			rightItems: Array<any>,
			leftCategory: string,
			rightCategory: string
	  }
	| {
			type: "ON_LEVEL_GAME_END",
			wrongItems: Array<any>,
			rightItems: Array<any>,
			levelNumber: number
	  };
