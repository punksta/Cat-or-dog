# Cat or Dog?
Mobile game where you need swipe photos of animals to match categories. I've made it just for fun and as some `Animated` api epxercise. 

<iframe width="253" height="400" src="https://www.youtube.com/embed/Gt7zs4TfBrc" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>

### build with
react-native, redux, [react-native-gesture-handler](https://github.com/kmagiera/react-native-gesture-handler).

No ads, gsm, trackers, crashreports, etc..

## To do
- test app on ios
- add levels(in progress)
- refactor drag-n-drop animations with [react-native-reanimated](https://github.com/kmagiera/react-native-reanimated)
- add action game objects: extra live, speed slower, etc...

## Contribution
Use prettier and flow npm scripts before pl.

#### adding\changing photos
1) add photo file to `src/img`
2) add new item to `src/data/index.js`
```javascript
const photoExample = {
       resource: require("../img/fat_cat_1.jpg"),
       source: "url to photo source, if required",
       tags: ["cat", "fat cat"]
    }
```
    
#### adding\changing levels. 
you change levels here `src/data/levels.js`
```javascript
const levelExample = {
        name: "name of level",
		passingScore: 50, // score to pass level
		leftCategory: "sad dog", 
		rightCategory: "dressed cat",
		newItemProvider: x => 5000 - x * 10, // time of item number x producing
		fallingIntervalProvider: x => 4000 - x * 5 // duration of item number x falling down
}
```
   
### License
- source code: MIT
- assets: Creative Commons

