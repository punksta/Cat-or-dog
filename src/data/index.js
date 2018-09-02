// @flow
import {Image} from "react-native";
import type {ResolvedAssetSource} from "AssetSourceResolver";
import resolveAssetSource from "react-native/Libraries/Image/resolveAssetSource";
import {getUniqueFromArrays, getRatioOfImage} from "./utils";

export type PhotoSource = {
	resource: any,
	source: string,
	tags: Array<string>,
	ratio: number
};

export const photoSources: Array<PhotoSource> = [
	{
		resource: require("../img/fat_cat_1.jpg"),
		source: "https://www.flickr.com/photos/yukariryu/122530930",
		tags: ["fat cat", "cat"]
	},
	{
		resource: require("../img/fat_cat_2.jpg"),
		source: "https://www.flickr.com/photos/dq090702/2836742047",
		tags: ["fat cat", "cat"]
	},
	{
		resource: require("../img/fat_cat_3.jpg"),
		source: "https://commons.wikimedia.org/wiki/File:Big_Fat_Red_Cat.jpg",
		tags: ["fat cat", "cat"]
	},

	{
		resource: require("../img/fat_cat_4.jpg"),
		source: "/https://www.flickr.com/photos/elsie/5062307",
		tags: ["fat cat", "cat"]
	},
	{
		resource: require("../img/angry_cat_1.jpg"),
		source: "https://pixabay.com/en/cat-feuler-angry-anger-feline-1865538/",
		tags: ["angry cat", "cat"]
	},
	{
		resource: require("../img/angry_cat_2.jpg"),
		source:
			"https://www.publicdomainpictures.net/en/view-image.php?image=39241&picture=annoyed-tabby-cat",
		tags: ["angry cat", "cat"]
	},
	{
		resource: require("../img/angry_cat_3.jpg"),
		source: "https://www.lifegate.it/app/uploads/gatto-arrabbiato.jpg",
		tags: ["angry cat", "cat"]
	},
	{
		resource: require("../img/sad_dog_1.jpg"),
		source: "https://www.lifegate.it/app/uploads/gatto-arrabbiato.jpg",
		tags: ["sad dog", "dog"]
	},
	{
		resource: require("../img/sad_dog_2.jpg"),
		source: "https://www.pexels.com/photo/dog-in-trouble-sad-296067/",
		tags: ["sad dog", "dog"]
	},
	{
		resource: require("../img/sad_dog_3.jpg"),
		source:
			"https://commons.wikimedia.org/wiki/File:Longhaired_Dachshund_portrait.jpg",
		tags: ["sad dog", "dog"]
	},
	{
		resource: require("../img/sad_dog_4.jpg"),
		source:
			"https://www.pexels.com/photo/cattle-dog-cute-dog-face-funny-632074/",
		tags: ["sad dog", "dog"]
	},
	{
		resource: require("../img/amazed_dog_1.jpg"),
		source: "https://www.flickr.com/photos/liveoncelivewild/32344260650",
		tags: ["amazed dog", "dog"]
	},
	{
		resource: require("../img/amazed_dog_2.jpg"),
		source: "https://www.flickr.com/photos/crazyoctopus/6935431262",
		tags: ["amazed dog", "dog"]
	},
	{
		resource: require("../img/amazed_dog_3.jpg"),
		source: "https://commons.wikimedia.org/wiki/File:Toddy_Dog.jpg",
		tags: ["amazed dog", "dog"]
	},
	{
		resource: require("../img/playing_dog_1.jpg"),
		source:
			"https://www.maxpixel.net/Meadow-Play-Summer-Ball-Fun-Blanca-Dog-1270495",
		tags: ["playing dog", "dog"]
	},
	{
		resource: require("../img/playing_dog_2.jpg"),
		source: "https://pixabay.com/en/dog-hybrid-play-ball-action-863524/",
		tags: ["playing dog", "dog"]
	},
	{
		resource: require("../img/playing_dog_3.jpg"),
		source:
			"https://ru.m.wikipedia.org/wiki/%D0%A4%D0%B0%D0%B9%D0%BB:JRT_with_Ball.jpg",
		tags: ["playing dog", "dog"]
	},
	{
		resource: require("../img/playing_dog_4.jpg"),
		source: "https://pixabay.com/en/dog-swim-play-ball-floating-pet-2612717/",
		tags: ["playing dog", "dog"]
	},
	{
		resource: require("../img/dressed_cat_1.jpg"),
		source:
			"https://www.maxpixel.net/Pet-Mammal-Animal-Cat-Domestic-White-Cat-Feline-3308645",
		tags: ["dressed cat", "cat"]
	},
	{
		resource: require("../img/dressed_cat_2.jpg"),
		source: "https://commons.wikimedia.org/wiki/File:Pap%C3%A1_Noel_gatuno.JPG",
		tags: ["dressed cat", "cat"]
	},
	{
		resource: require("../img/dressed_cat_3.jpg"),
		source: "https://www.flickr.com/photos/94515279@N00/1505091017",
		tags: ["dressed cat", "cat"]
	}
].map(item => ({
	...item,
	ratio: getRatioOfImage(item.resource)
}));

const memoize = require("memoizee");

const getUniqueProperties: () => Array<string> = memoize(
	getUniqueFromArrays.bind(undefined, photoSources.map(({tags}) => tags))
);

const getPhotosOfProperties_ = (
	...propertyArray: Array<string>
): Array<PhotoSource> =>
	photoSources.filter(({tags}) => tags.some(r => propertyArray.includes(r)));

export const getPhotosOfProperties: (
	...propertyArray: Array<string>
) => Array<PhotoSource> = memoize(getPhotosOfProperties_, {
	length: false
});

const getAvailableProperties_ = (property: string): Array<string> => {
	const relatedProperties = getUniqueFromArrays(
		getPhotosOfProperties(property).map(({tags}) => tags)
	);
	return getUniqueProperties().filter(p => !relatedProperties.includes(p));
};

export const getAvailableProperties = memoize(getAvailableProperties_);
