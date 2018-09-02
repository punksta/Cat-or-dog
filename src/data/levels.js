// @flow

export type Level = {
	name: string | number,
	passingScore: number,
	unlockCategories?: Array<string>,
	leftCategory: string,
	rightCategory: string,
	fallingIntervalProvider: (x: number) => number,
	newItemProvider: (x: number) => number
};

const levels: Array<Level> = [
	{
		name: 1,
		passingScore: 10,
		leftCategory: "fat cat",
		rightCategory: "sad dog",
		unlockCategories: [],
		newItemProvider: x => Math.max(1200, Math.random() * 4500 - 50 * x),
		fallingIntervalProvider: x => Math.max(3500, 5000 - Math.random() * 1500)
	},
	{
		name: 2,
		passingScore: 10,
		leftCategory: "fat cat",
		rightCategory: "sad dog",
		unlockCategories: ["fat cat", "sad dog"],
		newItemProvider: x => Math.max(1000, 1500 - 25 * x),
		fallingIntervalProvider: x => Math.max(5500, 6000 - 35 * x)
	},
	{
		name: 3,
		passingScore: 20,
		leftCategory: "amazed dog",
		rightCategory: "fat cat",
		unlockCategories: [],
		newItemProvider: x => Math.max(1200, Math.random() * 3000 - 50 * x),
		fallingIntervalProvider: x => Math.max(3500, 4500 - Math.random() * 1500)
	},
	{
		name: 4,
		passingScore: 20,
		leftCategory: "amazed dog",
		rightCategory: "fat cat",
		unlockCategories: ["fat cat", "amazed dog"],
		newItemProvider: x => Math.max(1000, 1400 - 25 * x),
		fallingIntervalProvider: x => Math.max(4000, 5000 - 35 * x)
	},
	{
		name: 5,
		passingScore: 30,
		leftCategory: "angry cat",
		rightCategory: "sad dog",
		unlockCategories: [],
		newItemProvider: x => Math.max(1100, Math.random() * 2500 - 50 * x),
		fallingIntervalProvider: x => Math.max(3300, 4000 - Math.random() * 1500)
	},
	{
		name: 6,
		passingScore: 30,
		leftCategory: "angry cat",
		rightCategory: "sad dog",
		unlockCategories: ["angry cat", "sad dog"],
		newItemProvider: x => Math.max(1000, 1200 - 25 * x),
		fallingIntervalProvider: x => Math.max(3000, 4500 - 35 * x)
	},
	{
		name: 7,
		passingScore: 40,
		leftCategory: "playing dog",
		rightCategory: "fat cat",
		unlockCategories: [],
		newItemProvider: x => Math.max(1000, Math.random() * 2200 - 50 * x),
		fallingIntervalProvider: x => Math.max(2700, 3500 - Math.random() * 1500)
	},
	{
		name: 8,
		passingScore: 40,
		leftCategory: "playing dog",
		rightCategory: "fat cat",
		unlockCategories: ["playing dog", "fat cat"],
		newItemProvider: x => Math.max(800, 1200 - 40 * x),
		fallingIntervalProvider: x => Math.max(2500, 4000 - 80 * x)
	},
	{
		name: 9,
		passingScore: 50,
		leftCategory: "sad dog",
		rightCategory: "dressed cat",
		unlockCategories: [],
		newItemProvider: x => Math.max(600, Math.random() * 1500 - 50 * x),
		fallingIntervalProvider: x => Math.max(2300, 2800 - Math.random() * 2000)
	},
	{
		name: 10,
		passingScore: 60,
		leftCategory: "sad dog",
		rightCategory: "dressed cat",
		unlockCategories: ["angry cat", "dressed cat"],
		newItemProvider: x => Math.max(750, 1100 - 25 * x),
		fallingIntervalProvider: x => Math.max(2400, 2800 - 45 * x)
	}
];

export default levels;
