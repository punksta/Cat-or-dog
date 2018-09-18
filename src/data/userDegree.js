// @flow

export type UserDegree = {
	name: string,
	passingScore: number,
	iconResource: number
};

const userDegrees: Array<UserDegree> = [
	{
		name: "Oscar, Fat cat",
		passingScore: 0,
		iconResource: require("../img/fat_cat_1.jpg")
	},
	{
		name: "Poppy, Fat cat",
		passingScore: 10,
		iconResource: require("../img/fat_cat_2.jpg")
	},
	{
		name: "Attila, Thin dog",
		passingScore: 25,
		iconResource: require("../img/amazed_dog_2.jpg")
	},
	{
		name: "Butterball, Angry dog",
		passingScore: 40,
		iconResource: require("../img/sad_dog_1.jpg")
	},
	{
		name: "Poseidon, Swim dog",
		passingScore: 60,
		iconResource: require("../img/playing_dog_4.jpg")
	},
	{
		name: "Boris, Communist cat",
		passingScore: 80,
		iconResource: require("../img/dressed_cat_1.jpg")
	},
	{
		name: "Englarion, Elf cat",
		passingScore: 110,
		iconResource: require("../img/angry_cat_2.jpg")
	},
	{
		name: "Sir Waggington, fast jaws dog",
		passingScore: 150,
		iconResource: require("../img/playing_dog_2.jpg")
	},
	{
		name: "Shadow, Cypherpunk cat",
		passingScore: 200,
		iconResource: require("../img/dressed_cat_3.jpg")
	}
];

export default userDegrees;

export const getDegreeIndexByPassingScore = (
	userDegrees: Array<UserDegree>,
	userScore: number
): number => {
	return userDegrees.reduce(
		(levelIndex, userLevel, index) =>
			userLevel.passingScore < userScore ? index : levelIndex,
		0
	);
};
