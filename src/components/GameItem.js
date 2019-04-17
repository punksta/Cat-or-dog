// @flow

import {Image, View} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

const GameItem = ({item, getItemSize}) => {
	const {width, height} = getItemSize(item);

	return (
		<Image
			resizeMode={"contain"}
			source={item.resource}
			style={{
				borderRadius: height / 2,
				width,
				height
			}}
		/>
	);
};

module.exports = onlyUpdateForKeys(["item"])(GameItem);
