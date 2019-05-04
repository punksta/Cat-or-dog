import {AsyncStorage} from "react-native";
import {Client, Configuration} from "bugsnag-react-native";
import Analitics from "appcenter-analytics";

export const isEventsEnabled = async () =>
	(await AsyncStorage.getItem("EVENTS")) === "true";

export const setEventIsEnabled = async isEnabled => {
	await AsyncStorage.setItem("EVENTS", isEnabled.toString());
	await setUpEvents(isEnabled);
};

export const isCrashEnabled = async () =>
	(await AsyncStorage.getItem("CRASH_REPORTS")) === "true";

export const setCrashEnabled = async isEnabled => {
	await AsyncStorage.setItem("CRASH_REPORTS", isEnabled.toString());
	await setUpCrashReports();
};

export const setUpEvents = async () => {
	const isEnabled = await isEventsEnabled();
	await Analitics.setEnabled(isEnabled);
};

let bugsnag;

let _isBugsEnabled = false;

const initBagSnag = () => {
	if (!bugsnag) {
		const configuration = new Configuration("5fce34026e5537c6f757fd54b5247a32");
		configuration.registerBeforeSendCallback(() => {
			return _isBugsEnabled;
		});
		bugsnag = new Clinet(configuration);
	}
};

export const setUpCrashReports = async () => {
	_isBugsEnabled = await isCrashEnabled();
	initBagSnag();
};
