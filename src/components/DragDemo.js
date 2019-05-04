import * as React from "react";
import {Animated, Dimensions} from "react-native";
import AnimatedValueXY from "react-native/Libraries/Animated/src/nodes/AnimatedValueXY";

import {onlyUpdateForKeys} from "recompose";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";

import {consoleTime, consoleTimeEnd} from "../utils/debugUtils";
import {PanGestureHandler, State} from "react-native-gesture-handler";
import AppearOnMount from "./AppearOnMount";

class DragDemo extends React.Component {
	demoAnimation: Animated.Value = new Animated.Value(0);

	onEndAnimation = () => {
		this.timeout = setTimeout(() => {
			this.demoAnimation.setValue(0);
			this.startAnimation();
		}, 1500);
	};

	startAnimation = () => {
		Animated.timing(this.demoAnimation, {
			toValue: 1,
			duration: 1000,
			useNativeDriver: true
		}).start(this.onEndAnimation);
	};
	componentDidMount() {
		this.startAnimation();
	}

	render() {
		const {style, children, ...rest} = this.props;

		const _translateX = this.demoAnimation.interpolate({
			inputRange: [0, 1],
			outputRange: [0, 50]
		});

		const panStyle = {
			transform: [{translateX: _translateX}]
		};

		return (
			<Animated.View style={[style, panStyle]} {...rest}>
				<AppearOnMount>{children}</AppearOnMount>
			</Animated.View>
		);
	}

	componentWillUnmount() {
		clearTimeout(this.timeout);
	}
}

export default onlyUpdateForKeys([])(DragDemo);
