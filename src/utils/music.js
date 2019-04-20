const Sound = require("react-native-sound");

const FailureCat = new Sound("angry_cat.mp3", Sound.MAIN_BUNDLE, error => {});

const FailureDog = new Sound("angry_dog.was", Sound.MAIN_BUNDLE, error => {});

export const playFailureCat = () => {
	if (FailureCat.isPlaying) {
		FailureCat.stop(() => FailureCat.play());
	} else {
		FailureCat.play();
	}
};

export const playFailureDog = () => {
	if (FailureDog.isPlaying) {
		FailureDog.stop(() => FailureDog.play());
	} else {
		FailureDog.play();
	}
};
