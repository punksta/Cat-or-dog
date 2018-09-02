// @flow

import {Image, View} from "react-native";
import React from "react";
import {onlyUpdateForKeys} from "recompose";

const GameItem = ({item, style}) => {
	return <Image resizeMode={"contain"} source={item.resource} style={style} />;
};

module.exports = onlyUpdateForKeys(["item"])(GameItem);
