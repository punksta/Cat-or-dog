// @flow

import {
	onlyUpdateForKeys,
	compose,
	withProps,
	mapProps,
	withState
} from "recompose";

const initialValue = {width: undefined, height: undefined};

const hoc = (
	layoutPropsName: string = "layout",
	setLayoutPropName: string = "updateLayoutValue",
	initialLayoutValue: {} = initialValue
) => {
	return compose(
		withState(layoutPropsName, setLayoutPropName, initialLayoutValue),
		mapProps(({[setLayoutPropName]: func, ...rest}) => ({
			...rest,
			onLayout: ({nativeEvent: {layout}}) => func(layout)
		}))
	);
};

export default hoc;
