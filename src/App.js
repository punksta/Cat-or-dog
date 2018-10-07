import React from "react";

import {ImageBackground} from "react-native";

import {createNavigationService} from "./navigation/NavigationService";

const navigationService = createNavigationService();

let store;
let persistor;
let Navigator;
let PersistGate;
let Provider;

class NavigatorHolder extends React.Component {
	// componentDidMount() {
	// 	BackHandler.addEventListener("hardwareBackPress", this.onBackPress);
	// }
	//
	// componentWillUnmount() {
	// 	BackHandler.removeEventListener("hardwareBackPress", this.onBackPress);
	// }
	//
	// onBackPress = () => {
	// 	const {dispatch, state} = this.props;
	//
	// 	if (state.index === 0) {
	// 		return false;
	// 	} else {
	// 		dispatch(NavigationActions.back());
	// 		return true;
	// 	}
	// };

	setNavigator = navRef => {
		navigationService.setRootNavigator(navRef);
	};

	render() {
		return (
			<Navigator
				onNavigationStateChange={(...args) =>
					navigationService.onChangeNavigationState(...args)
				}
				ref={this.setNavigator}
				{...this.props}
			/>
		);
	}
}

const initStore = () => {
	const configureStore = require("./configureStore").default;
	const r = configureStore(navigationService);
	persistor = r.persistor;
	store = r.store;
};

const initNavigator = () => {
	Navigator = require("./navigation/AppNavigator").default;
	PersistGate = require("redux-persist/integration/react").PersistGate;
	Provider = require("react-redux").Provider;
};

export default class Root extends React.Component {
	state = {
		loaded: false
	};

	componentDidMount() {
        initStore();
        initNavigator();
        this.setState({
            loaded: true
        });
	}
	render() {
		return (
			<ImageBackground
				style={{
					flex: 1
				}}
				source={require("./img/background.png")}
			>
				{this.state.loaded && (
					<Provider store={store}>
						<PersistGate persistor={persistor}>
							<NavigatorHolder />
						</PersistGate>
					</Provider>
				)}
			</ImageBackground>
		);
	}
}
