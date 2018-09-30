import React from "react";
import {Button, View} from "react-native";
import {connect} from "react-redux";
import MainScreenButtons from "../components/MainScreenButtons";
import HomeScreenBackground from "../components/HomeScreenBackground";
import Info from "../components/Info";
import AppearOnMount from "../components/AppearOnMount";
import ConnectedUserDegree from "../components/ConnectedUserDegree";

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
						isLevelsVisible={false}
						onCofigureGameClick={onCofigureGameClick}
						onRatingClick={ratingsClick}
						onInfoClick={() => {
							this.scrollView.scrollTo({y: 0, animated: false});
							this.popupDialog.show();
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
	shouldUpdate
} from "recompose";
import {withNavigationFocus} from "react-navigation";

const Connected = compose(
	connect(
		state => {
			return {
				isCustomGameVisible: state.levels.passedLevelsId.length > 4
			};
		},
		mapDispatchToProps
	),
	withNavigationFocus,
	onlyUpdateForKeys(["isFocused", "isCustomGameVisible"]),
	branch(props => !props.isFocused, renderNothing)
)(MainScreen);

export default Connected;
