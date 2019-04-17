const Sound = require('react-native-sound');

const FailureCat = new Sound('angry_cat.mp3', Sound.MAIN_BUNDLE, (error) => {

});

export const playFailureCat = () => {
	FailureCat.play();
}
