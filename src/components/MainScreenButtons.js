import React from "react";
import {Button, View} from "react-native";
import {onlyUpdateForKeys} from "recompose";
import MainMenuButton from "./GradientGameButton";

const MainScreenButtons = ({
	newGameClick,
	onCofigureGameClick,
	onRatingClick,
	onInfoClick,
	isCustomGameVisible,
	isLevelsVisible
}) => {
	return (
		<View
			style={{
				alignItems: "center",
				justifyContent: "center"
			}}
		>
			{isLevelsVisible && (
				<View
					style={{
						width: 250,
						marginVertical: 8
					}}
				>
					<MainMenuButton onPress={newGameClick} title={"levels"} />
				</View>
			)}

			{isCustomGameVisible && (
				<View
					style={{
						width: 250,
						marginVertical: 8
					}}
				>
					<MainMenuButton onPress={onCofigureGameClick} title={"play"} />
				</View>
			)}

			<View
				style={{
					width: 250,
					marginVertical: 8
				}}
			>
				<MainMenuButton onPress={onRatingClick} title={"history"} />
			</View>
			<View
				style={{
					width: 250,
					marginVertical: 8
				}}
			>
				<MainMenuButton onPress={onInfoClick} title={"info"} />
			</View>
		</View>
	);
};

export default onlyUpdateForKeys(["isCustomGameVisible"])(MainScreenButtons);
