import * as React from "react";
import {Animated, Dimensions} from "react-native";
import AnimatedValueXY from "react-native/Libraries/Animated/src/nodes/AnimatedValueXY";

import {onlyUpdateForKeys} from "recompose";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";

import {consoleTime, consoleTimeEnd} from "../utils/debugUtils";
import {PanGestureHandler, State} from "react-native-gesture-handler";

class DraggingFalling extends React.Component {
	scaleAnimatedValue = new Animated.Value(1);
	spinAnimatedValue = new Animated.Value(0);
	fallingAnimation: ?CompositeAnimation;

	fallingDownValue: Animated.Value = new Animated.Value(0);

	_translateX: Animated.Value;
	_translatey: Animated.Value;

	lastOffset = {
		x: this.props.startPosition.top,
		y: this.props.startPosition.left
	};

	dragging = false;

	constructor(props) {
		super(props);

		this.spinAnimatedValue.addListener(({value}) => {
			this.spinValue = value;
		});

		this.lastOffset = {
			y: this.props.startPosition.top,
			x: this.props.startPosition.left
		};
		this._translateX = new Animated.Value(0);
		this._translateY = new Animated.Value(0);

		this._translateX.setOffset(props.startPosition.left);
		this._translateY.setOffset(props.startPosition.top);
		this.onGestureEvent = Animated.event(
			[
				{
					nativeEvent: {
						translationX: this._translateX,
						translationY: this._translateY
					}
				}
			],
			{useNativeDriver: true}
		);
	}

	onHandlerStateChange = event => {
		if (event.nativeEvent.oldState === State.ACTIVE) {
			this.lastOffset.x += event.nativeEvent.translationX;
			this.lastOffset.y += event.nativeEvent.translationY;
			this._translateX.setOffset(this.lastOffset.x);
			this._translateX.setValue(0);
			this._translateY.setOffset(this.lastOffset.y);
			this._translateY.setValue(0);
		}

		if (event.nativeEvent.state === State.BEGAN) {
			this.onDragStart();
		} else if (
			event.nativeEvent.state === State.END ||
			event.nativeEvent.state === State.FAILED
		) {
			this.onDragEnd();
		}
	};

	calculateNearNormalSpinValue = x => {
		return x <= 0.5 ? (x < 0.25 ? 0 : 0.5) : x < 0.75 ? 0.5 : 1;
	};

	onDragStart = (event, gesture) => {
		this.dragging = true;
		this.fallingAnimation?.stop();

		const spinToValue = this.calculateNearNormalSpinValue(this.spinValue);

		Animated.parallel([
			Animated.spring(this.scaleAnimatedValue, {
				toValue: 1.3,
				duration: 100,
				useNativeDriver: true
			}),
			Animated.spring(this.spinAnimatedValue, {
				toValue: spinToValue,

				duration: 100,
				useNativeDriver: true
			})
		]).start();
	};

	onDragEnd = (event, gesture) => {
		Animated.spring(this.scaleAnimatedValue, {
			toValue: 1,
			duration: 200,
			useNativeDriver: true
		}).start();

		this.spinAnimatedValue.setValue(0);

		setTimeout(() => {
			this.dragging = false;
			this.startFallingAnimation(100);
		}, 100);
	};

	componentWillMount() {
		consoleTime("DraggingFalling:mount");
	}

	componentDidMount() {
		this.startFallingAnimation();
		consoleTimeEnd("DraggingFalling:mount");
	}

	onFall = lastFallingCoords => {
		if (!this.dragging && !this.ended) {
			this.ended = true;
			this.props?.onFallDown(lastFallingCoords);
		}
	};

	startFallingAnimation = (delaySpin = 0) => {
		const currentY = Math.abs(
			this.fallingDownValue.__getValue() -
				this.lastOffset.y +
				this.props.startPosition.top
		);
		const maxY = Math.abs(this.props.fallToY + this.props.startPosition.top);

		const dif = 1 - currentY / maxY;
		const durration = dif * this.props.fallingDuration;

		const a = Animated.parallel([
			Animated.loop(
				Animated.timing(this.spinAnimatedValue, {
					delay: delaySpin,
					toValue: 1,
					duration: 5000,
					easing: t => t,
					useNativeDriver: true
				})
			),
			Animated.timing(this.fallingDownValue, {
				toValue: this.props.fallToY - this.lastOffset.y,
				duration: durration,
				easing: t => t / 2 + Math.pow(t, 1.5),
				useNativeDriver: true,
				onComplete: ({finished}) => finished && this.onFall(this.lastOffset)
			})
		]);

		this.fallingAnimation = a;
		a.start();
	};

	render() {
		const {style, children, ...rest} = this.props;

		const spin = this.spinAnimatedValue.interpolate({
			inputRange: [0, 0.5, 1],
			outputRange: ["0deg", "360deg", "720deg"]
		});

		const panStyle = {
			transform: [
				{translateX: this._translateX},
				{translateY: this._translateY},
				{translateY: this.fallingDownValue},
				{scaleY: this.scaleAnimatedValue},
				{scaleX: this.scaleAnimatedValue},
				{rotate: spin}
			]
		};

		return (
			<PanGestureHandler
				onGestureEvent={this.onGestureEvent}
				onHandlerStateChange={this.onHandlerStateChange}
			>
				<Animated.View style={[style, panStyle]} {...rest}>
					{children}
				</Animated.View>
			</PanGestureHandler>
		);
	}

	componentWillUnmount() {
		this.fallingAnimation?.stop();
		this.scaleAnimatedValue.removeAllListeners();
		this.spinAnimatedValue.removeAllListeners();
		this._translateX.removeAllListeners();
		this._translateY.removeAllListeners();
		this.fallingDownValue.removeAllListeners();
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
