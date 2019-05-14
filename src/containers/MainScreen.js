import React from "react";
import {Button, View} from "react-native";
import {connect} from "react-redux";
import MainScreenButtons from "../components/MainScreenButtons";
import HomeScreenBackground from "../components/HomeScreenBackground";
import Info from "../components/Info";
import AppearOnMount from "../components/AppearOnMount";
import ConnectedUserDegree from "../components/ConnectedUserDegree";
import SettingsContainer from "./SettingsContainer";

import PopupDialog, {SlideAnimation} from "react-native-popup-dialog";

const slideAnimation = new SlideAnimation({
	slideFrom: "bottom"
});

const MainScreen = ({
	newGameClick,
	ratingsClick,
	onCofigureGameClick,
	isCustomGameVisible
}) => {
	return (
		<View
			style={{
				flexDirection: "column",
				justifyContent: "center",
				flex: 1
			}}
		>
			<View
				style={{
					position: "absolute",
					width: "100%",
					height: "100%"
				}}
			>
				<HomeScreenBackground />
			</View>

			<AppearOnMount>
				<View
					style={{
						alignItems: "center",
						marginBottom: "10%"
					}}
				>
					<ConnectedUserDegree
						style={{
							marginBottom: 16
						}}
					/>

					<MainScreenButtons
						isCustomGameVisible
						isLevelsVisible={true}
						onCofigureGameClick={onCofigureGameClick}
						onRatingClick={ratingsClick}
						onInfoClick={() => {
							this.scrollView.scrollTo({y: 0, animated: false});
							this.popupDialog.show();
						}}
						onSettingsClick={() => {
							this.popupDialog2.show();
						}}
						newGameClick={newGameClick}
					/>
				</View>
			</AppearOnMount>

			<PopupDialog
				width={0.9}
				height={0.7}
				dialogAnimation={slideAnimation}
				ref={popupDialog => {
					this.popupDialog = popupDialog;
				}}
			>
				<Info
					scrollViewRef={comp => {
						this.scrollView = comp;
					}}
				/>
			</PopupDialog>

			<PopupDialog
				width={0.9}
				height={0.7}
				dialogAnimation={slideAnimation}
				ref={popupDialog => {
					this.popupDialog2 = popupDialog;
				}}
			>
				<SettingsContainer />
			</PopupDialog>
		</View>
	);
};

const mapDispatchToProps = dispatch => {
	return {
		newGameClick: () =>
			dispatch({
				type: "PLAY_GAME_CLICK"
			}),
		ratingsClick: () =>
			dispatch({
				type: "RATINGS_BUTTON_CLICK"
			}),
		onCofigureGameClick: () =>
			dispatch({
				type: "CONFIGURE_GAME_BUTTON_CLICK"
			})
	};
};

import {
	compose,
	branch,
	onlyUpdateForKeys,
	renderNothing,
	lifecycle
} from "recompose";
import {withNavigationFocus} from "react-navigation";
import {setMainMenuMusicPlaying} from "../utils/music";

const Connected = compose(
	connect(
		state => {
			return {
				isMusicEnabled: state.settings.isMusicEnabled,
				isCustomGameVisible: state.levels.passedLevelsId.length > 4
			};
		},
		mapDispatchToProps
	),
	withNavigationFocus,
	lifecycle({
		componentDidMount() {
			setMainMenuMusicPlaying(
				this.props.isFocused && this.props.isMusicEnabled
			);
		},
		componentDidUpdate() {
			setMainMenuMusicPlaying(
				this.props.isFocused && this.props.isMusicEnabled
			);
		}
	}),
	onlyUpdateForKeys(["isFocused", "isCustomGameVisible"]),
	branch(props => !props.isFocused, renderNothing)
)(MainScreen);

export default Connected;
