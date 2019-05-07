//@flow

import React from "react";
import {StyleSheet, Text, View, Dimensions} from "react-native";
import {PanGestureHandler, State} from "react-native-gesture-handler";
const {width, height} = Dimensions.get("window");
import Animated, {Easing} from "react-native-reanimated";
const {
	cond,
	eq,
	or,
	abs,
	add,
	spring,
	greaterThan,
	set,
	and,
	not,
	diff,
	neq,
	Value,
	sub,
	multiply,
	event,
	interpolate,
	Extrapolate,
	startClock,
	stopClock,
	clockRunning,
	block,
	timing,
	debug,
	Clock,
	divide,
	concat
} = Animated;

const runRotateTimer = (clock, gestureState, dest = 360) => {
	const state = {
		finished: new Value(0),
		position: new Value(0),
		time: new Value(0),
		frameTime: new Value(0)
	};

	const config = {
		duration: new Value(2000),
		toValue: new Value(-1),
		easing: Easing.linear
	};

	const restartAnimation = (
		toValue = 360,
		duration = 2000,
		resetPosition = true
	) => [
		// we stop
		stopClock(clock),
		set(state.finished, 0),
		resetPosition ? set(state.position, 0) : 1,
		set(state.time, 0),
		set(state.frameTime, 0),
		set(config.toValue, toValue),
		set(config.duration, duration),
		// and we restart
		startClock(clock)
	];

	const isNotDragging = and(
		neq(gestureState, State.ACTIVE),
		neq(gestureState, State.BEGAN)
	);

	const pendingPosition = () => cond(greaterThan(state.position, 180), 360, 0);

	const pendingRotate = () =>
		cond(
			greaterThan(state.position, 180),
			sub(360, state.position),
			state.position
		);

	// 180           - 1.0
	// pendingRotate - x
	const pendingDurationP = () => divide(pendingRotate(), 180);

	const pendingDuration = multiply(pendingDurationP(), 300);

	return block([
		cond(clockRunning(clock), 0, restartAnimation()),
		timing(clock, state, config),
		cond(
			and(eq(gestureState, State.BEGAN), eq(config.duration, 2000)),
			restartAnimation(
				debug("pendingPosition", pendingPosition()),
				debug("pendingDuration", pendingDuration),
				false
			)
		),
		cond(and(eq(state.finished, 1), isNotDragging), restartAnimation()),
		state.position
	]);
};

const runScaleTimer = (clock, gestureState) => {
	const state = {
		finished: new Value(0),
		position: new Value(0),
		time: new Value(0),
		frameTime: new Value(0)
	};

	const config = {
		duration: 300,
		toValue: new Value(-1),
		easing: Easing.inOut(Easing.ease)
	};

	return block([
		cond(and(eq(gestureState, State.BEGAN), neq(config.toValue, 1)), [
			set(state.finished, 0),
			set(state.time, 0),
			set(state.frameTime, 0),
			set(config.toValue, 1),
			startClock(clock)
		]),
		cond(
			and(
				or(eq(gestureState, State.END), eq(gestureState, State.FAILED)),
				neq(config.toValue, 0)
			),
			[
				set(state.finished, 0),
				set(state.time, 0),
				set(state.frameTime, 0),
				set(config.toValue, 0),
				startClock(clock)
			]
		),
		timing(clock, state, config),
		interpolate(state.position, {
			inputRange: [0, 1],
			outputRange: [1, 1.3]
		})
	]);
};
function interaction(gestureTranslation, gestureState) {
	const dragging = new Value(0);
	const start = new Value(0);
	const position = new Value(0);

	return cond(
		eq(gestureState, State.ACTIVE),
		[
			cond(dragging, 0, [set(dragging, 1), set(start, position)]),
			set(position, add(start, gestureTranslation))
		],
		[set(dragging, 0), position]
	);
}

export default class DraggingFallinReanimated extends React.Component {
	constructor(props) {
		super(props);

		const gestureX = new Value(0);
		const gestureY = new Value(0);

		const state = new Value(-1);

		this._onGestureEvent = event([
			{
				nativeEvent: {
					translationX: gestureX,
					translationY: gestureY,
					state: state
				}
			}
		]);

		this._transX = interaction(gestureX, state);
		this._transY = interaction(gestureY, state);

		this.scale = runScaleTimer(new Clock(), state);
		this.rotate = runRotateTimer(new Clock(), state);
	}

	render() {
		return (
			<PanGestureHandler
				maxPointers={1}
				onGestureEvent={this._onGestureEvent}
				onHandlerStateChange={this._onGestureEvent}
			>
				<Animated.View
					style={[
						{
							position: "absolute"
						},
						{
							transform: [
								{
									translateX: this._transX
								},
								{
									translateY: this._transY
								},
								{scaleX: this.scale},
								{scaleY: this.scale},
								{rotate: concat(this.rotate, "deg")}
							]
						}
					]}
				>
					{this.props.children}
				</Animated.View>
			</PanGestureHandler>
		);
	}
}
