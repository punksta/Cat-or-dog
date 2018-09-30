import * as React from "react";
import Menu, {MenuItem} from "react-native-material-menu";
import {
	StyleSheet,
	Image,
	TouchableNativeFeedback,
	TouchableWithoutFeedback,
	Platform,
	Text,
	View
} from "react-native";

const TouchableComponent = Platform.select({
	android: TouchableNativeFeedback,
	default: TouchableWithoutFeedback
});

class StateFullPicker extends React.Component {
	menuRef = React.createRef();

	showMenu = () => {
		setTimeout(() => this.menuRef.current.show(), 0);
	};

	onSelectItem = (item, index) => {
		this.menuRef.current.hide();
		this.props.onSelectItem(item, index);
	};

	componentWillUnmount() {
		// this.menuRef.current.hide();
	}

	render() {
		const {selectedValue, values, containerStyle, menuStyle} = this.props;

		return (
			<View style={containerStyle}>
				<TouchableComponent onPress={this.showMenu}>
					<View
						style={{
							flex: 1,
							flexDirection: "row",
							justifyContent: "center",
							alignItems: "center"
						}}
					>
						<Text
							style={{
								fontFamily: "MavenPro-Bold",
								fontSize: 19,
								color: "#fffbfa",
								textAlign: "center",
								marginRight: 5
							}}
						>
							{selectedValue.toUpperCase()}
						</Text>
						<Image
							style={{
								marginTop: 2,
								width: 18,
								height: 18
							}}
							tintColor={"white"}
							resizeMode={"contain"}
							resizeMethod={"resize"}
							source={require("../img/dropdown.png")}
						/>
					</View>
				</TouchableComponent>
				<Menu
					style={menuStyle}
					ref={this.menuRef}
					button={<View style={{width: "100%"}} />}
				>
					{values.map((v, index) => {
						return (
							<MenuItem
								textStyle={{
									fontFamily: "MavenPro-Medium",
									fontSize: 16,
									color: "white"
								}}
								key={v}
								onPress={this.onSelectItem.bind(null, v, index)}
							>
								{v}
							</MenuItem>
						);
					})}
				</Menu>
			</View>
		);
	}
}

const styles = StyleSheet.create({
	root: {
		flex: 1
	},
	picker: {
		width: "100%",
		height: 40
	}
});

export default StateFullPicker;
