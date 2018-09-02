// @flow

import {Text, StyleSheet, Animated, View} from "react-native";
import * as React from "react";
import {onlyUpdateForKeys} from "recompose";

type Props = {
	animationDuration?: number,
	translateYStart?: number,
	children?: React.Node
};

export default class AppearOnMount extends React.Component<Props> {
	animatedValue = new Animated.Value(0);

	componentDidMount() {
		Animated.timing(this.animatedValue, {
			toValue: 1,
			duration: this.props.animationDuration,
			useNativeDriver: true
		}).start();
	}

	render() {
		return (
			<Animated.View
				style={{
					opacity: this.animatedValue.interpolate({
						inputRange: [0, 1],
						outputRange: [0, 1]
					}),
					transform: [
						{
							translateY: this.animatedValue.interpolate({
								inputRange: [0, 1],
								outputRange: [this.props.translateYStart, 0]
							})
						}
					]
				}}
			>
				{this.props.children}
			</Animated.View>
		);
	}

	static defaultProps = {
		animationDuration: 300,
		translateYStart: 10
	};
}
