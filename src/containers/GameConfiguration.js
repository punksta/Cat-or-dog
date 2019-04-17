// @flow

import * as React from "react";
import {
	Image,
	Picker,
	Text,
	View,
	Alert,
	Dimensions,
	StyleSheet,
	Button
} from "react-native";
import {connect} from "react-redux";
import {ConnectedGameScore} from "../components/GameScore";
import {
	photoSources,
	getAvailableProperties,
	getPhotosOfProperties
} from "../data";
import ListAndPicker from "../components/ListAndPicker";
import {shuffled} from "../data/utils";
import type {PhotoSource} from "../data";
import GradientGameButton from "../components/GradientGameButton";
import LinearGradient from "react-native-linear-gradient";

type State = {
	selectedLeft: string,
	selectedRight: string,
	leftPhotos: Array<PhotoSource>,
	rigthPhotos: Array<PhotoSource>
};

type Props = {
	selectedLeft: string,
	selectedRight: string,
	onStartButtonClick: (selectedLeft: string, selectedRight: string) => void
};
import {FlatList} from "react-native";

class GameConfiguration extends React.PureComponent<Props, State> {
	leftList: {current: FlatList<any> | null} = React.createRef();
	rightList: {current: FlatList<any> | null} = React.createRef();

	constructor(props: Props) {
		super(props);
		const {selectedRight, selectedLeft} = props;

		this.state = {
			selectedLeft,
			selectedRight,
			leftPhotos: shuffled(getPhotosOfProperties(selectedLeft)),
			rigthPhotos: shuffled(getPhotosOfProperties(selectedRight))
		};
	}

	onSelectedChanged = (isLeft: boolean) => (item: string) => {
		this.setState({
			[isLeft ? "selectedLeft" : "selectedRight"]: item,
			[isLeft ? "leftPhotos" : "rigthPhotos"]: shuffled(
				getPhotosOfProperties(item)
			)
		});
	};

	onStartButtonClick = () => {
		const {selectedLeft, selectedRight} = this.state;
		this.props.onStartButtonClick(selectedLeft, selectedRight);
	};

	componentDidUpdate(oldProps: Props, oldState: State) {
		const {selectedLeft, selectedRight} = this.state;
		let list: ?{current: FlatList<any> | null};
		if (selectedLeft !== oldState.selectedLeft) {
			list = this.leftList;
		} else if (selectedRight !== oldState.selectedRight) {
			list = this.rightList;
		}
		if (list && list.current !== null) {
			list.current.scrollToOffset({offset: 0, animated: false});
		}
	}

	render() {
		return (
			<View style={styles.root}>
				<View style={styles.row}>
					<ListAndPicker
						flatListRef={this.leftList}
						pickerBackgroundColor={"#11a7b0"}
						photos={this.state.leftPhotos}
						availablePropepries={getAvailableProperties(
							this.state.selectedRight
						)}
						selectedProperty={this.state.selectedLeft}
						onValueChange={this.onSelectedChanged(true)}
						ListFooterComponent={<View style={{height: 80}} />}
					/>

					<ListAndPicker
						flatListRef={this.rightList}
						pickerBackgroundColor={"#2bcf52"}
						photos={this.state.rigthPhotos}
						availablePropepries={getAvailableProperties(
							this.state.selectedLeft
						)}
						selectedProperty={this.state.selectedRight}
						onValueChange={this.onSelectedChanged(false)}
						ListFooterComponent={<View style={{height: 80}} />}
					/>
				</View>

				<LinearGradient // start={{x: 0.0, y:0 }} end={{x: 1, y:0}}
					locations={[0.0, 1]}
					colors={["transparent", "rgba(0, 0, 0, 0.5)"]}
					style={styles.gradient}
				>
					<GradientGameButton
						title={"Start game"}
						onPress={this.onStartButtonClick}
					/>
				</LinearGradient>

				<View
					style={{
						width: "100%",
						margin: "auto",
						bottom: 2,
						position: "absolute",
						justifyContent: "center",
						alignItems: "center"
					}}
				>
					<Text
						style={{
							color: "white",
							fontFamily: "MavenPro-Regular",
							fontSize: 11
						}}
					>
						remember photos of the selected categories
					</Text>
				</View>
			</View>
		);
	}

	static defaultProps = {
		selectedLeft: "cat",
		selectedRight: "dog"
	};
}

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	row: {
		flex: 1,
		flexDirection: "row"
	},
	gradient: {
		paddingTop: 30,
		padding: 20,
		width: "100%",
		position: "absolute",
		bottom: 0
	}
});

module.exports = GameConfiguration;
