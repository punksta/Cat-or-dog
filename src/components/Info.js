import * as React from "react";
import {
	ScrollView,
	Linking,
	TouchableOpacity,
	View,
	Text,
	Image
} from "react-native";

import {photoSources} from "../data/index";
import Heart from "./Heart";
import RightAnswerCount from "./RightAnswerCount";
import GameBottomBar from "./GameBottomBar";
import TouchableItem from "react-navigation/src/views/TouchableItem";
import GameItem from "./GameItem";
import {getPhotosOfProperties} from "../data/index";
import {makePhotoSourceSize} from "../data/utils";
import DragDemo from "./DragDemo";

const getItemSize = makePhotoSourceSize(90);

const Info = ({scrollViewRef}) => {
	return (
		<ScrollView
			ref={scrollViewRef}
			style={{
				flex: 1
			}}
		>
			<View
				style={{
					width: "100%",
					padding: 16
				}}
			>
				<View style={{}}>
					<Text
						style={{
							marginTop: 5,
							fontSize: 20,
							color: "black"
						}}
					>
						How To play
					</Text>
					<Text style={{fontSize: 15, color: "black"}}>
						1) Swipe photos according the categories
					</Text>

					<View style={{backgroundColor: "gray", flex: 1}}>
						<DragDemo>
							<GameItem
								style={{
									marginTop: 4,
									alignSelf: "center"
								}}
								item={getPhotosOfProperties("dog")[1]}
								getItemSize={getItemSize}
							/>
						</DragDemo>
						<View
							style={{
								flexDirection: "row",
								flex: 1,
								paddingVertical: 16,
								justifyContent: "space-evenly"
							}}
						>
							<GameItem
								style={{
									marginBottom: 15
								}}
								item={getPhotosOfProperties("cat")[0]}
								getItemSize={getItemSize}
							/>
							<GameItem
								style={{
									marginTop: 15
								}}
								item={getPhotosOfProperties("dog")[0]}
								getItemSize={getItemSize}
							/>
						</View>
						<GameBottomBar
							style={{height: 40}}
							leftProperty={"cat"}
							rightProperty={"dog"}
						/>
					</View>
					<Text style={{fontSize: 15, color: "black"}}>
						2) DON'T touch the danger dog photo
					</Text>
					<Image
						style={{width: 100, height: 100}}
						source={require("../img/dog_toilet.png")}
					/>
					<Text
						style={{
							marginTop: 16,
							fontSize: 20
						}}
					>
						Ui elements
					</Text>

					<View
						style={{
							alignItems: "center",
							flexDirection: "row"
						}}
					>
						<Heart color={"red"} cornerColor={"#faff00"} />
						<Text
							style={{
								marginStart: 5
							}}
						>
							- life count
						</Text>
					</View>

					<View
						style={{
							marginTop: 8,
							alignItems: "center",
							flexDirection: "row"
						}}
					>
						<RightAnswerCount count={10} />
						<Text
							style={{
								marginStart: 10
							}}
						>
							- game score
						</Text>
					</View>
				</View>

				<Text
					style={{
						fontSize: 20,
						marginTop: 16,
						marginBottom: 8
					}}
				>
					Assets sources
				</Text>
				{photoSources.map(image => {
					return (
						<View key={image.resource}>
							<Image
								style={{
									height: 150,
									aspectRatio: 1
								}}
								source={image.resource}
							/>

							<TouchableOpacity onPress={() => Linking.openURL(image.source)}>
								<Text
									style={{
										marginBottom: 15,
										color: "blue",
										fontSize: 14
									}}
									key={image.source}
								>
									{image.source}
								</Text>
							</TouchableOpacity>
						</View>
					);
				})}
				<Text
					style={{
						fontSize: 20,
						marginTop: 16,
						marginBottom: 8
					}}
				>
					audio sources
				</Text>
				<Text
					style={{
						marginTop: 16,
						marginBottom: 8
					}}
				>
					"Cat, Screaming, A.wav" by InspectorJ (www.jshaw.co.uk) of
					Freesound.org
				</Text>
			</View>
		</ScrollView>
	);
};

export default Info;
