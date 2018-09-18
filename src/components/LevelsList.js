// @flow

import * as React from "react";
import {
	Image,
	ScrollView,
	Text,
	View,
	TouchableOpacity,
	StyleSheet
} from "react-native";
import levels from "../data/levels";
import type {Level} from "../data/levels";
import {getPhotosOfProperties} from "../data";
import {getRandomElement} from "../data/utils";
import LockedLabel from "./LockedLabel";
import LevelImageCategory from "./LevelImageCategory";

type RenderLevelProps = {
	level: Level,
	isLocked: boolean,
	onLevelClick: (Level, number) => void,
	levelIndex: number
};

const RenderLevel = ({
	level,
	isLocked,
	onLevelClick,
	levelIndex
}: RenderLevelProps) => {
	return (
		<View
			style={{
				marginVertical: 16,
				width: "100%"
			}}
		>
			<TouchableOpacity
				disabled={isLocked}
				onPress={onLevelClick.bind(undefined, level, levelIndex)}
				style={{
					flexDirection: "row",
					backgroundColor: isLocked ? "#a1acd1" : "#9dd18d",
					padding: 8
				}}
			>
				<View
					style={{
						flex: 1,
						alignItems: "flex-start"
					}}
				>
					<LevelImageCategory
						source={
							getRandomElement(getPhotosOfProperties(level.leftCategory))
								.resource
						}
						propertyName={level.leftCategory}
					/>
				</View>

				<View
					style={{
						alignItems: "center",
						marginTop: 30
						// justifyContent: "center"
					}}
				>
					<Text
						style={{
							fontFamily: "MavenPro-Medium",
							fontSize: 15
						}}
					>
						Level {level.name}
					</Text>

					<Text
						style={{
							fontFamily: "MavenPro-Medium",
							marginTop: 15
						}}
					>
						Passing score {level.passingScore}
					</Text>
				</View>

				<View
					style={{
						flex: 1,
						alignItems: "flex-end"
					}}
				>
					<LevelImageCategory
						style={{
							flex: 1
						}}
						source={
							getRandomElement(getPhotosOfProperties(level.rightCategory))
								.resource
						}
						propertyName={level.rightCategory}
					/>
				</View>
			</TouchableOpacity>
			{isLocked && (
				<LockedLabel
					style={{
						position: "absolute",
						width: "100%",
						height: "100%",
						backgroundColor: "rgba(255, 255, 255, 0.5)"
					}}
				/>
			)}
		</View>
	);
};

type Props = {
	onLevelClick: Level => void,
	levels: Array<Level>,
	passedLevelsId: Array<number>
};

const Levels = ({onLevelClick, levels, passedLevelsId}: Props) => {
	return (
		<ScrollView
			style={{
				flex: 1
			}}
		>
			{levels.map((l, index) => {
				return (
					<RenderLevel
						key={l.name}
						level={l}
						levelIndex={index}
						isLocked={
							!(
								index == 0 ||
								passedLevelsId.includes((levels[index - 1] || {}).name)
							)
						}
						onLevelClick={onLevelClick}
					/>
				);
			})}
		</ScrollView>
	);
};

Levels.defaultProps = {
	onLevelClick: function() {},
	levels: levels,
	isLocked: () => false
};

export default Levels;
