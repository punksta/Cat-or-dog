// @flow

import * as React from "react";
import {View, StyleSheet} from "react-native";
import type {ViewProps} from "react-native/Libraries/Components/View/ViewPropTypes";
import DraddingFalling from "./DraddingFallingV2";
import TouchableFalling from "./TouchableFalling";
import type {
	LayoutEvent,
	Layout
} from "react-native/Libraries/Types/CoreEventTypes";
import {onlyUpdateForKeys} from "recompose";

type GameItem<T> = {
	item: T,
	key: string,
	index: number,
	startPosition: {
		left: number,
		top: number
	},
	fallToY: number
};

type State<ItemT> = {
	renderingItems: Array<GameItem<ItemT>>,
	started: boolean,
	layout: Layout,
	totalItemsInGame: number
};

export type GameSettings<T> = {
	uniqueItems: Array<T>,
	fallingIntervalProvider: (totalItemsInGame: number) => number,
	newItemProvider: (totalItemsInGame: number) => number,
	spinAnimation: boolean
};

import {consoleTime, consoleTimeEnd} from "../utils/debugUtils";

type Props<ItemT> = $ReadOnly<{|
	renderItem: (ItemT, number) => React.Element<*>,

	getItemLayout: (ItemT, number) => {width: number, height: number},

	onActionPerfromed: ItemT => void,

	onFallDown: (
		item: ItemT,
		index: number,
		{x: number, y: number},
		layout: Layout
	) => void,

	gameSettings: GameSettings<ItemT>,

	...ViewProps // root view props
|}>;

import {getRandomIndex} from "../data/utils";

class GameBoard<ItemT> extends React.Component<Props<ItemT>, State<ItemT>> {
	timeOutId: any;

	constructor(props: Props<ItemT>) {
		super(props);

		this.state = {
			totalItemsInGame: 0,
			renderingItems: [],
			started: false,
			layout: {width: 0, height: 0, x: 0, y: 0}
		};
	}

	componentWillUpdate() {
		consoleTime("GameBoard:update");
	}

	componentDidUpdate() {
		consoleTimeEnd("GameBoard:update");
	}

	onLayout = (event: LayoutEvent) => {
		this.props.onLayout && this.props.onLayout(event);
		const isStarted = this.state.started;
		const layout = event.nativeEvent.layout;

		this.setState(
			state => {
				return {
					layout,
					started: true
				};
			},
			() => {
				!isStarted && this.startAddingItems();
			}
		);
	};

	startAddingItems = () => {
		const addNewInterval = this.props.gameSettings.newItemProvider(
			this.state.totalItemsInGame
		);

		this.timeOutId = setTimeout(() => {
			this.setState(({renderingItems, totalItemsInGame, layout}) => ({
				renderingItems: [
					...renderingItems,
					GameBoard.makeNewGameItem(layout, this.props)
				],
				totalItemsInGame: totalItemsInGame + 1
			}));
			this.startAddingItems();
		}, addNewInterval);
	};

	static calculateRandomPostion = <ItemT>(
		layout: Layout,
		props: Props<ItemT>,
		itemIndex: number
	) => {
		const item = props.gameSettings.uniqueItems[itemIndex];

		const {width, height} = props.getItemLayout(item, itemIndex);

		return {
			left: Math.random() * (layout.width - width),
			top: -1 * height - 30
		};
	};

	static shouldUseActionType = () => {
		return getRandomIndex(10) == 0;
	};

	static makeNewGameItem = <ItemT>(
		layout: Layout,
		props: Props<ItemT>,
		caclulatePostion = GameBoard.calculateRandomPostion
	): GameItem<ItemT> => {
		let index;
		let item;

		if (GameBoard.shouldUseActionType()) {
			const actionItems = props.gameSettings.uniqueItems
				.map((item, index) => [item, index])
				.filter(([item]) => item.action);

			[item, index] = actionItems[getRandomIndex(actionItems.length)];
		} else {
			index = getRandomIndex(props.gameSettings.uniqueItems.length);

			item = props.gameSettings.uniqueItems[index];
		}

		const {height} = props.getItemLayout(item, index);

		const startPosition = caclulatePostion(layout, props, index);

		return {
			startPosition,
			index,
			item,
			key: (
				1000000 * startPosition.left +
				1000 * Math.abs(startPosition.top) +
				index
			).toString(),
			fallToY: layout.height + 50
		};
	};

	onFallDown = (item: GameItem<ItemT>) => {
		return (coords: {x: number, y: number}) => {
			this.props.onFallDown &&
				this.props.onFallDown(item.item, item.index, coords, this.state.layout);

			//$FlowFixMe
			this.removeItemsFromList(item);
		};
	};

	removeItemsFromList = (item: GameItem<ItemT>) => {
		this.setState(state => {
			return {
				renderingItems: state.renderingItems.filter(r => r !== item)
			};
		});
	};

	onActionPerfromed = (item: GameItem<ItemT>) => {
		return (coords: {x: number, y: number}) => {
			this.props.onActionPerfromed(item.item);
		};
	};

	renderGameItem = (item: GameItem<ItemT>) => {
		//$FlowFixMe
		const onFallDown = this.onFallDown(item);

		//$FlowFixMe
		switch (item.item.action) {
			case "death_on_touch": {
				return (
					<TouchableFalling
						fallToY={item.fallToY}
						fallingDuration={this.props.gameSettings.fallingIntervalProvider(
							this.state.totalItemsInGame
						)}
						//$FlowFixMe
						onActionPerformed={this.onActionPerfromed(item)}
						key={item.key}
						startPosition={item.startPosition}
						style={styles.item}
						onFallDown={onFallDown}
						//$FlowFixMe
						onAnimdationEnded={this.removeItemsFromList.bind(null, item)}
					>
						{this.props.renderItem(item.item, item.index)}
					</TouchableFalling>
				);
			}
			default: {
				return (
					<DraddingFalling
						fallToY={item.fallToY}
						fallingDuration={this.props.gameSettings.fallingIntervalProvider(
							this.state.totalItemsInGame
						)}
						key={item.key}
						startPosition={item.startPosition}
						style={styles.item}
						onFallDown={onFallDown}
					>
						{this.props.renderItem(item.item, item.index)}
					</DraddingFalling>
				);
			}
		}
	};

	render() {
		const {
			getItemLayout,
			onFallDown,
			renderItem,
			gameSettings,
			onActionPerfromed,
			...rest
		} = this.props;

		return (
			<View {...rest} onLayout={this.onLayout}>
				{this.state.renderingItems.map((item: GameItem<ItemT>) => {
					//$FlowFixMe
					return this.renderGameItem(item);
				})}
			</View>
		);
	}

	componentWillUnmount() {
		clearTimeout(this.timeOutId);
	}
}

const styles = StyleSheet.create({
	item: {
		position: "absolute"
	}
});

export default onlyUpdateForKeys<Props<any>>([])(GameBoard);
