import {Observable} from "rxjs";
import {asyncScheduler} from "rxjs";
import {
	map,
	filter,
	tap,
	throttleTime,
	mergeMap,
	observeOn
} from "rxjs/operators";
import {EMPTY} from "rxjs";

import {NavigationActions} from "react-navigation";

export const navigation = (action$, state$, {navigationService}) => {
	return action$.pipe(
		filter(a =>
			[
				"CONFIGURE_GAME_BUTTON_CLICK",
				"NEW_GAME_BUTTON_CLICK",
				"EXIT_FROM_GAME_CLICK",
				"RATINGS_BUTTON_CLICK",
				"PLAY_GAME_CLICK",
				"LEVEL_PRESSED"
			].includes(a.type)
		),
		observeOn(asyncScheduler),
		throttleTime(500),
		map(a => {
			switch (a.type) {
				case "PLAY_GAME_CLICK":
					return NavigationActions.navigate({
						routeName: "LevelsScreen"
					});

				case "CONFIGURE_GAME_BUTTON_CLICK":
					return NavigationActions.navigate({
						routeName: "ConfigureGame"
					});

				case "NEW_GAME_BUTTON_CLICK":
					return NavigationActions.navigate({
						routeName: "GameScreen",
						params: {
							gameSettings: a.gameSettings
						}
					});

				case "LEVEL_PRESSED":
					const gameSettings = {
						leftProperty: a.level.leftCategory,
						rightProperty: a.level.rightCategory,
						newItemProvider: a.level.newItemProvider,
						fallingIntervalProvider: a.level.fallingIntervalProvider
					};

					return NavigationActions.navigate({
						routeName: "GameScreen",
						params: {
							gameSettings,
							level: a.level,
							levelIndex: a.levelIndex
						}
					});

				case "RATINGS_BUTTON_CLICK":
					return NavigationActions.navigate({
						routeName: "GameResults"
					});

				case "EXIT_FROM_GAME_CLICK":
					return NavigationActions.back();

				default:
					return undefined;
			}
		}),
		filter(a => a !== undefined),
		tap(a => navigationService.dispatch(a)),
		mergeMap(_ => EMPTY)
	);
};
