import * as React from "react";
import {Animated, PanResponder, Dimensions} from "react-native";
import AnimatedValueXY from "react-native/Libraries/Animated/src/nodes/AnimatedValueXY";

import {onlyUpdateForKeys} from "recompose";
import type {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";

import {consoleTime, consoleTimeEnd} from "../utils/debugUtils";

class DraggingFalling extends React.Component {
	fallingAnimatedValue: AnimatedValueXY;
	fallingAnimation: ?CompositeAnimation;
	panResponder: PanResponder;

	dragging = false;

	constructor(props) {
		super(props);

		this.fallingAnimatedValue = new Animated.ValueXY({
			x: 0,
			y: 0
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

		this.fallingAnimatedValue.setOffset(offset);

		this.fallingAnimatedValue.setValue({x: 0, y: 0});
	};

	onDragEnd = (event, gesture) => {
		this.fallingAnimatedValue.flattenOffset();

		this.fallingAnimatedValue.setValue({x: 0, y: 0});
	};

	render() {
		const {style, children, ...rest} = this.props;

		const panStyle = {
			transform: [...this.fallingAnimatedValue.getTranslateTransform()]
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
	}
}

export default onlyUpdateForKeys([])(DraggingFalling);
