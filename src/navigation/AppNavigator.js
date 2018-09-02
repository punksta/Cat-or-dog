import React from "react";
import {createStackNavigator, createSwitchNavigator} from "react-navigation";
import MainScreen from "../containers/MainScreen";
import GameScreen from "../containers/GameScreen";
import ResultsScreen from "../containers/ResultsScreen";
import GameConfigurationScreen from "../containers/GameConfigurationScreen";
import {Text} from "react-native";
import LevelsScreen from "../containers/LevelsScreen";

const wrapInStackNavigator = (screen, title) => {
	return createStackNavigator(
		{
			wrapped: {
				screen,
				navigationOptions: ({navigation}) => ({
					title,
					header: null
				})
			}
		},
		{
			cardStyle: {backgroundColor: "transparent"}
		}
	);
};

export default (AppNavigator = createStackNavigator(
	{
		MainScreen: {
			screen: MainScreen,
			navigationOptions: ({navigation}) => ({
				title: "Home",
				header: null
			})
		},
		NewGame: {
			screen: createSwitchNavigator({
				GameScreen: {
					screen: GameScreen
				},
				ConfigureGame: {
					screen: wrapInStackNavigator(GameConfigurationScreen, "")
				},
				LevelsScreen: {
					screen: wrapInStackNavigator(LevelsScreen, "")
				}
			}),
			navigationOptions: ({navigation}) => ({
				header: null
			})
		},
		GameResults: {
			screen: ResultsScreen
		}
	},
	{
		cardStyle: {backgroundColor: "transparent"}
	}
));
