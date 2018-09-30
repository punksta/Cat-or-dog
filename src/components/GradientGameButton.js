// @flow

import * as React from "react";
import {View, Text, Animated, Easing} from "react-native";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";
import TouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce.js";
import LinearGradient from "react-native-linear-gradient";

type Props = {
	title: string,
	onPress: () => void
};

const GradientGameButton = ({title, onPress}: Props) => {
	return (
		<TouchableBounce onPress={onPress}>
			<LinearGradient
				// start={{x: 0.0, y:0 }} end={{x: 1, y:0}}
				locations={[0.1, 0.9]}
				colors={["#d66a41", "#f2b448"]}
				style={{
					overflow: "hidden",
					borderRadius: 30,
					// borderColor: 'white',
					width: "100%",
					height: 50,
					borderWidth: 1,
					borderColor: "#0209ac",
					alignItems: "center",
					justifyContent: "center"
				}}
			>
				<Text
					style={{
						fontFamily: "MavenPro-Bold",
						fontSize: 20,
						color: "#fffbfa",
						textAlign: "center"
					}}
				>
					{title.toUpperCase()}
				</Text>
			</LinearGradient>
		</TouchableBounce>
	);
};

class AnimatedButton extends React.Component<Props> {
	spinValue = new Animated.Value(0);
	compositeAnimation: ?CompositeAnimation;

	startAnimation = () => {
		this.compositeAnimation = Animated.loop(
			Animated.sequence([
				Animated.timing(this.spinValue, {
					toValue: 1,
					duration: 100,
					easing: Easing.linear,
					useNativeDriver: true
				}),
				Animated.timing(this.spinValue, {
					toValue: 0,
					duration: 100,
					easing: Easing.linear,
					useNativeDriver: true
				})
			])
		).start();
	};

	componentWillMount() {
		setTimeout(this.startAnimation, Math.random() * 1000);
	}

	componentWillUnmpount() {
		// this.compositeAnimation.stop();
	}

	onPress = () => {
		setTimeout(this.props.onPress, 0);
	};
	render() {
		const spin = this.spinValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: ["-0.5deg", "0deg", "0.5deg"]
		});

		const move = this.spinValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: [-0.1, 0, 0.1]
		});

		return (
			<Animated.View
				style={{
					width: 250,
					transform: [{rotate: spin}, {translateX: move}]
				}}
			>
				<GradientGameButton title={this.props.title} onPress={this.onPress} />
			</Animated.View>
		);
	}
}

export default GradientGameButton;
