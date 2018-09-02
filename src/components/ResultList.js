import {FlatList, Text, StyleSheet, View} from "react-native";
import React from "react";
import {pure} from "recompose";

const findMaxIndexBy = (compare = (a, b) => a > b) => array =>
	array.reduce(
		(acc, cur, index, array) =>
			acc !== undefined && compare(array[acc], cur) ? acc : index,
		undefined
	);

const findMaxIndexByGameScore = findMaxIndexBy(
	(game1, game2) => game1.rightAnswers.length > game2.rightAnswers.length
);

const renderItem = ({item, index, isBest}) => (
	<View
		style={{
			borderBottomWidth: StyleSheet.hairlineWidth,
			backgroundColor: isBest || index % 2 === 0 ? "#fff" : "#f0f0f0",
			borderBottomColor: "#2b0020",
			padding: 16
		}}
		key={item.dateOfStart}
	>
		<Text
			style={{
				marginBottom: 16
			}}
		>
			{new Date(item.dateOfStart).toLocaleString()}
		</Text>

		<Text>score: {item.rightAnswers.length}</Text>
	</View>
);

const RenderItemPure = pure(renderItem);

const RenderBestItem = ({item, index}) => {
	return (
		<View>
			<Text
				style={{
					margin: 16,
					marginBottom: 8,
					fontSize: 17
				}}
			>
				best game
			</Text>
			<RenderItemPure item={item} index={index} isBest={true} />
		</View>
	);
};

const noGame = () => {
	return (
		<View
			style={{
				flex: 1,
				justifyContent: "center",
				alignItems: "center"
			}}
		>
			<Text
				size={{
					fontSize: 17
				}}
			>
				no games
			</Text>
		</View>
	);
};

const keyExtractor = ({dateOfStart}) => dateOfStart.toString();

const ResultList = ({results}) => {
	if (results.length === 0) {
		return noGame();
	} else {
		const bestIndex = findMaxIndexByGameScore(results);

		return (
			<View
				style={{
					backgroundColor: "#f0f0f0",
					flex: 1
				}}
			>
				{<RenderBestItem item={results[bestIndex]} index={bestIndex} />}

				<Text
					style={{
						fontSize: 17,
						margin: 16,
						marginBottom: 8
					}}
				>
					game history
				</Text>

				<FlatList
					keyExtractor={keyExtractor}
					style={{
						flex: 1
					}}
					data={results}
					renderItem={props => <RenderItemPure {...props} />}
				/>
			</View>
		);
	}
};

export default ResultList;
