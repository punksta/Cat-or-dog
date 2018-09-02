const noop = () => {};

const _isDebug = __DEV__;

export const callIfDebug = fn => _isDebug && fn();
export const callInDebugHof = fn => (_isDebug ? fn : noop);
export const isDebug = () => _isDebug;

export const consoleTime = callInDebugHof(console.time);
export const consoleTimeEnd = callInDebugHof(console.timeEnd);
