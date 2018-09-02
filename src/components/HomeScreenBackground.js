// $flow

import * as React from "react";
import {View, Animated} from "react-native";
import type {PhotoSource} from "../data";
import PreviewItem from "./PreviewItem";

const positions = {
	0: "top",
	1: "start",
	2: "end",
	3: "bottom"
};

type RenderingItem = {
	item: PhotoSource,
	position: $Values<typeof positions>
};

type AnimatedPhotoProps = {
	item: RenderingItem,
	width: number,
	height: number,
	flyDurration: 0
};

import {getRandomIndex} from "../data/utils";
import {makePhotoSourceSize} from "../data/utils";

const getItemSize = makePhotoSourceSize(90);

class AnimatedPhotoPreview extends React.Component<AnimatedPhotoProps> {
	valueXY: Animated.ValueXY;
	animation: CompositeAnimation;

	constructor(props: AnimatedPhotoProps) {
		super(props);
		this.valueXY = new Animated.ValueXY({
			x: 0,
			y: 0
		});
	}

	componentWillMount() {
		const {x, y} = this.valueXY.__getValue();

		this.animation = Animated.timing(this.valueXY, {
			toValue: {
				x: 1,
				y: 1
			},
			duration: this.props.flyDurration,
			easing: t => t,
			useNativeDriver: true
		});

		this.animation.start(({finished}) => {
			this.props.onAnimationEnd(finished);
		});
	}

	componentWillUnmount() {
		this.animation.stop();
	}

	render() {
		const xInputRange = [0, 1];
		const yInputRange = [0, 1];

		let xOutputRange = [0, 0];
		let yOutputRange = [0, 0];

		const {width, height} = this.props.rootLayout;
		const itemSize = getItemSize(this.props.item.item);

		const widthOfView = itemSize.width;
		const heighOfView = itemSize.height;

		if (width && height) {
			switch (this.props.item.position) {
				case "top":
					xOutputRange = [-widthOfView, width];
					yOutputRange = [-heighOfView, heighOfView];
					break;

				case "start":
					xOutputRange = [-0.5 * heighOfView, 0.5 * heighOfView];
					yOutputRange = [height, -heighOfView];
					break;

				case "end":
					xOutputRange = [width - widthOfView * 0.5, width - 1.5 * widthOfView];
					yOutputRange = [-heighOfView, height];
					break;

				case "bottom":
					xOutputRange = [width, -widthOfView];
					yOutputRange = [height, height - 1.5 * heighOfView];
			}
		}

		const translateX = this.valueXY.x.interpolate({
			inputRange: xInputRange,
			outputRange: xOutputRange
		});

		const translateY = this.valueXY.y.interpolate({
			inputRange: yInputRange,
			outputRange: yOutputRange
		});

		return (
			<Animated.View
				style={{
					position: "absolute",
					transform: [
						{
							translateX
						},
						{
							translateY
						}
					]
				}}
			>
				<PreviewItem
					style={{
						width: widthOfView,
						height: heighOfView,
						borderRadius: 20,
						borderWidth: 1
					}}
					item={this.props.item.item}
				/>
			</Animated.View>
		);
	}
}

import {
	mapProps,
	compose,
	onlyUpdateForKeys,
	withProps,
	withState
} from "recompose";
import withLayoutHoc from "./withLayoutHoc";

const hoc = compose(onlyUpdateForKeys(["item"]));

const AnimatedPhotoPreviewWithLayout = AnimatedPhotoPreview;

type Props = {};
type State = {
	renderingItems: Array<RenderingItem>
};
import {photoSources} from "../data/index";
import {CompositeAnimation} from "react-native/Libraries/Animated/src/AnimatedImplementation";

class HomeScreenBackground extends React.Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			renderingItems: []
		};
	}

	addItem = () => {
		if (this.mounted) {
			this.setState(state => {
				return {
					renderingItems: [...state.renderingItems, this.makeItem(state)]
				};
			});
		}
	};

	makeItem = state => {
		let freeSources = photoSources.filter(
			photo =>
				state.renderingItems.findIndex(item => item.item === photo) === -1
		);

		if (freeSources.length === 0) {
			freeSources = state.renderingItems[0].item;
		}

		let freePositions = Object.values(positions).filter(
			pos =>
				state.renderingItems.findIndex(item => item.position === pos) === -1
		);

		if (freePositions.length === 0) {
			freePositions = state.renderingItems[0].position;
		}

		return {
			item: freeSources[getRandomIndex(freeSources.length)],
			position: freePositions[getRandomIndex(freePositions.length)],
			flyDuration: 1000 + Math.random() * 2000
		};
	};

	componentDidMount() {
		this.mounted = true;
		setTimeout(this.addItem, 1000);
		setTimeout(this.addItem, 1500);
		setTimeout(this.addItem, 2000);
	}

	onAnimationEnd = (item, finished) => {
		if (this.mounted && finished) {
			this.setState(state => {
				return {
					renderingItems: [
						...state.renderingItems.filter(r => r !== item),
						this.makeItem(state)
					]
				};
			});
		}
	};

	componentWillUnmount() {
		this.mounted = false;
	}

	render() {
		return (
			<View
				style={{
					flex: 1,
					position: "absolute",
					width: "100%",
					height: "100%"
				}}
				onLayout={this.props.onLayout}
			>
				{this.state.renderingItems.map(item => {
					return (
						<AnimatedPhotoPreviewWithLayout
							key={JSON.stringify(item)}
							rootLayout={this.props.layout}
							item={item}
							flyDurration={item.flyDuration}
							onAnimationEnd={finished => this.onAnimationEnd(item, finished)}
						/>
					);
				})}
			</View>
		);
	}
}

const hocHomeScreenBackground = compose(withLayoutHoc());

export default hocHomeScreenBackground(HomeScreenBackground);
