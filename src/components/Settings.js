// @flow
import React from "react";
import {View, Linking, Alert, Text} from "react-native";
import SettingSwitch from "./SettingSwitch";

type Props = {
	isMusicEnabled: boolean,
	isCrashReportsEnabled: boolean,
	isEventsEnabled: boolean,
	setMusicEnabled: (boolean) => void,
	setEventsEnabled: (boolean) => void,
	setCrashEnabled: (boolean) => void
};

const showPrivacyNote = (text, message, link) => {
	Alert.alert(text, message, [
		{
			text: "detailed privacy policy",
			onPress: () => Linking.openURL(link)
		},
		{
			text: "ok"
		}
	]);
};

const SettingsButtons = (props: Props) => {
	return (
		<View
			style={{
				padding: 16
			}}
		>
			<Text
				style={{
					fontSize: 25
				}}
			>
				Cat or Dog?
			</Text>

			<Text
				style={{
					fontSize: 12
				}}
			>
				version: 1.0.3
			</Text>

			<Text
				style={{
					fontSize: 20
				}}
			>
				Settings
			</Text>

			<SettingSwitch
				text={"In app sounds"}
				isEnabled={props.isMusicEnabled}
				onValueChange={props.setMusicEnabled}
			/>
			<SettingSwitch
				text={"Crash reports"}
				isEnabled={props.isCrashReportsEnabled}
				onValueChange={props.setCrashEnabled}
				infoClick={() =>
					showPrivacyNote(
						"Anonymous crash reports",
						"Bugsnag is used for collecting automatic crash reports. You can disable it in any time",
						"https://docs.bugsnag.com/legal/privacy-policy/"
					)
				}
			/>
			<SettingSwitch
				text={"Anonymous events"}
				isEnabled={props.isEventsEnabled}
				onValueChange={props.setEventsEnabled}
				infoClick={() =>
					showPrivacyNote(
						"Anonymous events",
						"Appcenter is used for collecting basic data such as device model and session time. You can disable it in any time",
						"https://privacy.microsoft.com/en-us/privacystatement"
					)
				}
			/>
		</View>
	);
};

export default SettingsButtons;
