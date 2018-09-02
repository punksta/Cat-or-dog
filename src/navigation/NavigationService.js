export const createNavigationService = () => {
	let currentState;
	let navigatiorRef;

	const setRootNavigator = navRef => {
		navigatiorRef = navRef;
	};
	const onChangeNavigationState = (oldState, newState) => {};

	const dispatch = action => {
		navigatiorRef?.dispatch(action);
	};

	return {
		setRootNavigator,
		onChangeNavigationState,
		dispatch
	};
};
