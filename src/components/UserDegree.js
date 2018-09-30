// @flow

import * as React from "react";
import {StyleSheet, Image, Text, View} from "react-native";
import TouchableBounce from "react-native/Libraries/Components/Touchable/TouchableBounce.js";

import type {UserDegree as UserDegreeType} from "../data/userDegree";
import LinearGradient from "react-native-linear-gradient";

import type {ViewStyleProp} from "react-native/Libraries/StyleSheet/StyleSheet";

type Props = {
	bestScore: number,
	currentUserDegree: UserDegreeType,
	nextUserDegree?: UserDegreeType,
	onPress: () => void,
	style?: ViewStyleProp
};

const UserDegree = ({
	bestScore,
	currentUserDegree,
	nextUserDegree,
	style,
	onPress
}: Props) => {
	return (
		<TouchableBounce onPress={onPress}>
			<LinearGradient
				start={{x: 0.0, y: 0}}
				end={{x: 1, y: 0}}
				locations={[0.0, 1]}
				colors={["#d66a41", "#f2b448"]}
				style={[
					{
						overflow: "hidden",
						backgroundColor: "white",
						borderRadius: 50,
						paddingHorizontal: 25,
						paddingTop: 8,
						paddingBottom: 16,
						alignItems: "center",
						justifyContent: "center",
						borderWidth: 1,
						borderColor: "#0209ac"
					},
					style
				]}
			>
				<Text
					style={{
						fontFamily: "MavenPro-Regular"
					}}
				>
					best score:{" "}
					<Text
						style={{
							fontFamily: "MavenPro-Bold",
							color: "white",
							fontSize: 16
						}}
					>
						{bestScore}
					</Text>
				</Text>
				<Text
					style={{
						marginBottom: 4,
						fontFamily: "MavenPro-Regular"
					}}
				>
					you are{" "}
					<Text
						style={{
							fontSize: 16,
							fontFamily: "MavenPro-Bold",
							color: "white",
							borderStyle: "dashed"
						}}
					>
						{currentUserDegree.name}
					</Text>
				</Text>

				<Image
					style={{
						width: 100,
						height: 100,
						borderRadius: 50
					}}
					resizeMode={"contain"}
					source={currentUserDegree.iconResource}
				/>

				{nextUserDegree && (
					<View
						style={{
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Text
							style={{
								fontFamily: "MavenPro-Regular",
								marginBottom: 4
							}}
						>
							get a score of {nextUserDegree.passingScore} to become
						</Text>
						<Text
							style={{
								fontSize: 16,
								fontFamily: "MavenPro-Bold",
								color: "white"
							}}
						>
							{nextUserDegree.name}
						</Text>
					</View>
				)}
			</LinearGradient>
		</TouchableBounce>
	);
};

export default UserDegree;
