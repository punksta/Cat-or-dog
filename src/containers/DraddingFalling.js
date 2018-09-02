import * as React from "react";
import {Animated, PanResponder, Dimensions} from "react-native";
import AnimatedValueXY from "react-native/Libraries/Animated/src/nodes/AnimatedValueXY";

import {onlyUpdateForKeys} from "recompose";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";

import {consoleTime, consoleTimeEnd} from "../utils/debugUtils";

class DraggingFalling extends React.Component {
	fallingAnimatedValue: AnimatedValueXY;
	scaleAnimatedValue = new Animated.Value(1);
	spinAnimatedValue = new Animated.Value(0.9 * Math.random());
	fallingAnimation: ?CompositeAnimation;
	panResponder: PanResponder;

	dragging = false;

	constructor(props) {
		super(props);

		this.fallingAnimatedValue = new Animated.ValueXY({
			x: props.startPosition.left,
			y: props.startPosition.top
		});

		this.panResponder = PanResponder.create({
			onPanResponderTerminationRequest: () => false,
			onStartShouldSetPanResponder: (e, gesture) => true,
			onPanResponderGrant: (e, gesture) => this.onDragStart(e, gesture),
			onPanResponderMove: Animated.event(
				[
					null,
					{dx: this.fallingAnimatedValue.x, dy: this.fallingAnimatedValue.y}
				],
				{
					useNativeDriver: false
				}
			),
			onPanResponderRelease: (e, gesture) => this.onDragEnd(e, gesture),
			onPanResponderTerminate: (evt, gesture) => this.onDragEnd(evt, gesture)
		});
	}

	onDragStart = (event, gesture) => {
		this.dragging = true;

		const offset = this.fallingAnimatedValue.__getValue();

		this.fallingAnimation?.stop();

		this.fallingAnimatedValue.setOffset(offset);

		this.fallingAnimatedValue.setValue({x: 0, y: 0});

		Animated.parallel([
			Animated.spring(this.scaleAnimatedValue, {
				toValue: 1.3,
				duration: 100,
				useNativeDriver: true
			}),
			Animated.spring(this.spinAnimatedValue, {
				toValue: this.spinAnimatedValue.__getValue() > 0.5 ? 1 : 0,
				duration: 100,
				useNativeDriver: true
			})
		]).start();
	};

	onDragEnd = (event, gesture) => {
		this.fallingAnimatedValue.flattenOffset();

		Animated.spring(this.scaleAnimatedValue, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true
		}).start();

		this.spinAnimatedValue.setValue(0);

		setTimeout(() => {
			this.dragging = false;
			this.startFallingAnimation(300);
		}, 300);
	};

	componentWillMount() {
		consoleTime("DraggingFalling:mount");
	}

	componentDidMount() {
		this.fallingAnimatedValue.addListener(this.onFall);
		this.startFallingAnimation();
		consoleTimeEnd("DraggingFalling:mount");
	}

	onFall = lastFallingCoords => {
		if (
			!this.dragging &&
			!this.ended &&
			lastFallingCoords.y > this.props.fallToY
		) {
			this.ended = true;
			this.props?.onFallDown(lastFallingCoords);
		}
	};

	startFallingAnimation = (delaySpin = 0) => {
		const a = Animated.parallel([
			Animated.loop(
				Animated.timing(this.spinAnimatedValue, {
					delay: delaySpin,
					toValue: 1,
					duration: 2500,
					easing: t => t * t,
					useNativeDriver: true
				})
			),
			Animated.timing(this.fallingAnimatedValue, {
				toValue: {
					y: this.props.fallToY,
					x: this.fallingAnimatedValue.x.__getValue()
				},
				listener: this.onFall,
				duration: this.props.fallingDuration,
				easing: t => 2 * (t * t),
				useNativeDriver: true
			})
		]);

		this.fallingAnimation = a;
		a.start();
	};

	render() {
		const {style, children, ...rest} = this.props;

		const spin = this.spinAnimatedValue.interpolate({
			inputRange: [0, 1],
			outputRange: ["0deg", "360deg"]
		});

		const panStyle = {
			transform: [
				...this.fallingAnimatedValue.getTranslateTransform(),
				{scaleX: this.scaleAnimatedValue},
				{scaleY: this.scaleAnimatedValue},
				{rotate: spin}
			]
		};

		return (
			<Animated.View
				{...this.panResponder.panHandlers}
				style={[style, panStyle]}
				{...rest}
			>
				{children}
			</Animated.View>
		);
	}

	componentWillUnmount() {
		this.fallingAnimatedValue.removeAllListeners();
		this.scaleAnimatedValue.removeAllListeners();
		this.spinAnimatedValue.removeAllListeners();
	}
}

DraggingFalling.defauultProps = {
	startPosition: {
		top: 0,
		left: 0
	},
	fallToY: Dimensions.get("window").height
};

export default onlyUpdateForKeys([])(DraggingFalling);
