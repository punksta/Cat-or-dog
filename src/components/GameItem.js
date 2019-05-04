// @flow

import {Image, View} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

const GameItem = ({item, getItemSize, style}) => {
	const {width, height} = getItemSize(item);

	return (
		<Image
			resizeMode={"contain"}
			source={item.resource}
			style={[
				{
					borderRadius: height / 2,
					width,
					height
				},
				style
			]}
		/>
	);
};

module.exports = onlyUpdateForKeys<*>(["item"])(GameItem);
