// @flow

import GameBoard from "../containers/GameBoard";
import React from "react";
import {
	Image,
	StyleSheet,
	Text,
	View,
	Alert,
	BackHandler,
	Dimensions,
	Vibration
} from "react-native";
import {connect} from "react-redux";
import GameScore from "../components/GameScore";
import {getPhotosOfProperties} from "../data";
import GameBottomBar from "../components/GameBottomBar";
import GameItem from "../components/GameItem";
import type {GameSettings} from "../containers/GameBoard";
import {makePhotoSourceSize} from "../data/utils";
import type {PhotoSource} from "../data/index";

const itemHeight = Dimensions.get("window").width / 2.5;

const getItemSize = makePhotoSourceSize(itemHeight);

import {consoleTime, consoleTimeEnd} from "../utils/debugUtils";
import AppearOnMount from "../components/AppearOnMount";

type State<T> = {
	rightAnswers: Array<T>,
	wrongAnswers: Array<T>,
	wrongAnswersLimit: number,
	isGameEnded: boolean,
	dateOfStart: Date
};

const makeNewGameState = () => ({
	rightAnswers: [],
	wrongAnswers: [],
	wrongAnswersLimit: 5,
	isGameEnded: false,
	dateOfStart: new Date()
});

class GameScreen extends React.Component<$FlowFixMeProps, State<*>> {
	state = makeNewGameState();
	gameSettings: GameSettings<PhotoSource>;

	componentDidUpdate(oldProps, oldState) {
		consoleTimeEnd("GameScreen:update");

		if (this.state.isGameEnded && !oldState.isGameEnded) {
			const {leftProperty, rightProperty} = this.props.gameSettings;

			this.props.onGameEnded(
				rightProperty,
				leftProperty,
				this.state.rightAnswers,
				this.state.wrongAnswers,
				this.state.dateOfStart
			);

			Alert.alert(
				"Game over",
				`score: ${this.state.rightAnswers.length}`,
				[
					{
						text: "play again",
						onPress: this.onPlayAgain
					},
					{
						text: "exit",
						onPress: this.props.exitFromGameClick
					}
				],
				{
					cancelable: false
				}
			);
		}
	}

	onPlayAgain = () => {
		this.props.takeAnotherGame;
		this.setState(makeNewGameState());
	};

	componentWillMount() {
		this.gameSettings = GameScreen.getGameSettings(this.props, this.state);
	}

	componentWillUnmount() {
		this.props.exitedFromGame();
	}

	componentWillUpdate() {
		consoleTime("GameScreen:update");
	}

	vibrateOnWrongAnswer = () => {
		Vibration.vibrate(200);
	};

	onFallDown = (item, index, {x, y}, {width, height}) => {
		const {leftProperty, rightProperty} = this.props.gameSettings;

		const layout = getItemSize(item);
		const isFirstPartArea = x < (width - layout.width) / 2;

		const isRightAnswer = isFirstPartArea === item.tags.includes(leftProperty);
		if (!isRightAnswer) {
			setTimeout(this.vibrateOnWrongAnswer, 0);
		}
		this.setState(({rightAnswers, wrongAnswers, wrongAnswersLimit}) => {
			const isGameEnded =
				wrongAnswers.length + (isRightAnswer ? 0 : 1) >= wrongAnswersLimit;

			return {
				isGameEnded,
				rightAnswers: isRightAnswer ? [...rightAnswers, item] : rightAnswers,
				wrongAnswers: !isRightAnswer ? [...wrongAnswers, item] : wrongAnswers
			};
		});
	};

	static defaultNewItemProvider = x => {
		if (x < 5) {
			return 2000 - (x + 1) * 100;
		} else if (x < 50) {
			if (x % 5 === 0) {
				return Math.max(1800, Math.random() * 3000);
			} else {
				return Math.max(700, Math.random() * 1700 - x * 10);
			}
		} else {
			return Math.max(700, Math.random() * 1300);
		}
	};

	static defaultfallingIntervalProvider = x => {
		if (x < 5) {
			return 2500 + 500 / (x + 1);
		} else {
			return Math.max(1600, Math.random() * 4000 - (x - 10));
		}
	};

	static getGameSettings = (props, state): GameSettings<PhotoSource> => {
		const {
			leftProperty,
			rightProperty,
			newItemProvider,
			fallingIntervalProvider
		} = props.gameSettings;

		return {
			uniqueItems: getPhotosOfProperties(leftProperty, rightProperty),
			spinAnimation: true,
			newItemProvider:
				typeof newItemProvider === "function"
					? newItemProvider
					: GameScreen.defaultNewItemProvider,
			fallingIntervalProvider:
				typeof fallingIntervalProvider === "function"
					? fallingIntervalProvider
					: GameScreen.defaultfallingIntervalProvider
		};
	};

	render() {
		const {leftProperty, rightProperty} = this.props.gameSettings;

		return (
			<View style={styles.container}>
				<View style={styles.scoreWrapper}>
					<AppearOnMount duration={800} translateYStart={-45}>
						<GameScore
							rightAnswerCount={this.state.rightAnswers.length}
							lifeCount={
								this.state.wrongAnswersLimit - this.state.wrongAnswers.length
							}
						/>
					</AppearOnMount>
				</View>
				{!this.state.isGameEnded && (
					<GameBoard
						style={styles.container}
						getItemLayout={getItemSize}
						renderItem={(item, index) => (
							<GameItem item={item} getItemSize={getItemSize} />
						)}
						onFallDown={this.onFallDown}
						gameSettings={this.gameSettings}
					/>
				)}
				{!this.state.isGameEnded && (
					<AppearOnMount duration={700} translateYStart={60}>
						<GameBottomBar
							style={styles.bottomBar}
							leftProperty={leftProperty}
							rightProperty={rightProperty}
						/>
					</AppearOnMount>
				)}
			</View>
		);
	}
}

const styles = StyleSheet.create({
	scoreWrapper: {
		width: "100%",
		position: "absolute",
		left: 0,
		top: 0
	},
	container: {
		flex: 1
	},
	bottomBar: {
		width: "100%",
		flexDirection: "row",
		height: 60
	}
});

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		exitedFromGame: () => dispatch({type: "EXITED_FROM_GAME"}),
		exitFromGameClick: () => dispatch({type: "EXIT_FROM_GAME_CLICK"}),

		onGameEnded: (
			rightProperty,
			leftPropepty,
			rightAnswers,
			wrongAnswers,
			dateOfStart
		) => {
			const {level, levelIndex} = ownProps.navigation?.state?.params || {};

			return dispatch({
				type: "ON_FREE_GAME_END",
				rightProperty,
				leftPropepty,
				rightAnswers,
				wrongAnswers,
				dateOfStart,
				level,
				levelIndex
			});
		}
	};
};

const Connected = connect(
	(state, ownProps) => {
		const {gameSettings, level, levelIndex} =
			ownProps.navigation?.state?.params || {};
		return {
			gameSettings,
			level,
			levelIndex
		};
	},
	mapDispatchToProps
)(GameScreen);

export default Connected;
