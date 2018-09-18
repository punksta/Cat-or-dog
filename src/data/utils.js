// @flow

import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import type {PhotoSource} from "./index";

export const getUniqueFromArrays = <T>(arrays: Array<Array<T>>): Array<T> => [
	...new Set([].concat(...arrays))
];

export const getRatioOfImage = (imageId: number): number => {
	const {width, height} = resolveAssetSource(imageId) || {width: 1, height: 1};
	// $FlowFixMe
	return width / height;
};

export function getRandomIndex(size: number): number {
	return Math.floor(Math.random() * size);
}

export function getRandomElement<T>(array: Array<T>): T {
	return array[getRandomIndex(array.length)];
}

export const makePhotoSourceSize = (itemHeight: number) => (
	item: PhotoSource
) => ({
	width: itemHeight * item.ratio,
	height: itemHeight
});

function shuffle<T>(a: Array<T>): Array<T> {
	for (let i = a.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		const x = a[i];
		a[i] = a[j];
		a[j] = x;
	}
	return a;
}

export const shuffled = <T>(array: Array<T>): Array<T> => shuffle([...array]);
