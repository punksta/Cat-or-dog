import {
	createMigrate,
	persistReducer,
	persistCombineReducers,
	persistStore
} from "redux-persist";
import storage from "redux-persist/lib/storage";
import gameHistory from "./reducers/gameHistory";
import levels from "./reducers/levels";

import {applyMiddleware, combineReducers, createStore} from "redux";
import AppNavigator from "./navigation/AppNavigator";
import {createEpicMiddleware} from "redux-observable";
import rootEpic from "./epics";
import {isDebug} from "./utils/debugUtils";

export default navigationService => {
	const persistConfig = {
		key: "rootReducer",
		storage,
		whitelist: ["gameHistory", "levels"],
		version: 1
	};

	const persistedReducer = persistCombineReducers(persistConfig, {
		gameHistory,
		levels
	});

	const dependencies = {
		navigationService
	};

	const epicMiddleware = createEpicMiddleware({dependencies});
	const middlewares = [epicMiddleware];
	if (isDebug()) {
		middlewares.push(require("redux-logger").default);
	}

	const store = createStore(persistedReducer, applyMiddleware(...middlewares));

	epicMiddleware.run(rootEpic);
	const persistor = persistStore(store);

	return {
		store,
		persistor
	};
};
