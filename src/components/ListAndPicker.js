//@flow
import React from "react";
import type {ViewLayout} from "ViewPropTypes";
import {Picker, View, FlatList, StyleSheet, Image} from "react-native";
import PreviewItem from "./PreviewItem";
import type {PhotoSource} from "../data";
import StateFullPicker from "./StateFullPicker";

type Props = {
	photos: Array<PhotoSource>,
	availablePropepries: Array<string>,
	selectedProperty: ?string,
	onValueChange: (itemValue: string, itemIndex: number) => void
};

const keyExtractor = item => `${item.resource}`;

const capitalize = (str: string): string =>
	str.length > 0 ? str[0].toUpperCase() + str.substring(1) : str;

const ListAndPicker = ({
	photos,
	availablePropepries,
	selectedProperty,
	onValueChange,
	width,
	onLayout,
	ListFooterComponent,
	pickerBackgroundColor,
	flatListRef
}) => {
	return (
		<View onLayout={onLayout} style={styles.root}>
			<StateFullPicker
				containerStyle={[
					styles.picker,
					{backgroundColor: pickerBackgroundColor}
				]}
				menuStyle={{backgroundColor: pickerBackgroundColor}}
				values={availablePropepries}
				selectedValue={selectedProperty}
				onSelectItem={(item, index) => onValueChange(item)}
			/>
			{width > 0 && (
				<FlatList
					ref={flatListRef}
					style={styles.root}
					data={photos}
					keyExtractor={keyExtractor}
					renderItem={({item}) => (
						<PreviewItem
							item={item}
							style={{
								borderRadius: Math.min(width, width / item.ratio),
								padding: 50,
								marginBottom: 8,
								marginTop: 8,
								width: width,
								height: width / item.ratio
							}}
						/>
					)}
					ListFooterComponent={ListFooterComponent}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	picker: {
		width: "100%",
		height: 50
	}
});

import {mapProps, compose, withProps, withState} from "recompose";
import withLayoutHoc from "./withLayoutHoc";

const hoc = compose(
	withLayoutHoc(),
	mapProps(({layout: {width}, ...rest}) => ({width, ...rest}))
);

export default hoc(ListAndPicker);
