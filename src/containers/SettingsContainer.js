//@flow

import {connect} from "react-redux";
import {
	compose,
	withProps,
	branch,
	renderNothing,
	lifecycle,
	withStateHandlers
} from "recompose";
import Settings from "../components/Settings";
import {
	setCrashEnabled,
	isCrashEnabled,
	isEventsEnabled,
	setEventIsEnabled
} from "../utils/integrations";

const hoc = compose(
	connect(
		state => {
			return {isMusicEnabled: state.settings.isMusicEnabled};
		},
		dispatch => {
			return {
				setMusicEnabled: isEnabled => {
					dispatch({
						type: isEnabled ? "ENABLE_MUSIC" : "DISABLE_MUSIC"
					});
				}
			};
		}
	),
	lifecycle({
		async componentWillMount() {
			try {
				const crashEnabled = await isCrashEnabled();
				const eventsEnabled = await isEventsEnabled();
				this.setState({
					isEventsEnabled: eventsEnabled,
					isCrashReportsEnabled: crashEnabled
				});
			} catch (e) {
				this.setState({
					isEventsEnabled: false,
					isCrashReportsEnabled: false
				});
			}
		}
	}),
	branch(props => typeof props.isEventsEnabled !== "boolean", renderNothing),
	withStateHandlers(
		{},
		{
			setEventsEnabled: () => isEventsEnabled => {
				setEventIsEnabled(isEventsEnabled);
				return {
					isEventsEnabled
				};
			},
			setCrashEnabled: () => isCrashReportsEnabled => {
				setCrashEnabled(isCrashReportsEnabled);
				return {
					isCrashReportsEnabled
				};
			}
		}
	)
);

export default hoc(Settings);
