const Sound = require("react-native-sound");

class MusicWrapper {
	lastCommand = "";
	isEnabled = true;

	constructor(musicFile, onLoad, onError) {
		this.sound = new Sound(musicFile, Sound.MAIN_BUNDLE, error => {
			if (!error) {
				onLoad && onLoad(this.sound);
				this._onLoaded();
			} else {
				onError && onError(error);
			}
		});
	}

	intervalId = null;

	shouldStopGradually = () => {
		let volume = 1;

		const delta = 0.05;
		const duration = 2000;

		this.intervalId = setInterval(() => {
			volume = volume - delta;
			console.log(volume);
			this.sound.setVolume(volume);
			if (volume <= 0) {
				this.shouldStop(false);
				clearInterval(this.intervalId);
			}
		}, duration * delta);
	};

	_sendStateToSound = () => {
		if (!this.isEnabled) {
			return this.sound.stop();
		}
		switch (this.lastCommand) {
			case "shouldPlay": {
				return this.sound.play();
			}
			case "shouldPause": {
				return this.sound.pause();
			}
			case "shouldStop": {
				return this.sound.stop();
			}
		}
	};

	_onLoaded = () => {
		this._sendStateToSound();
	};

	shouldPlay = () => {
		clearInterval(this.intervalId);
		this.sound.setVolume(1);
		this.lastCommand = "shouldPlay";
		this._sendStateToSound();
	};

	shouldPause = () => {
		this.lastCommand = "shouldPause";
		this._sendStateToSound();
	};

	shouldStop = (gradually = true) => {
		if (gradually) {
			return this.shouldStopGradually();
		}
		this.lastCommand = "shouldStop";
		this._sendStateToSound();
	};

	enable = () => {
		this.isEnabled = true;
	};

	disable = () => {
		this.isEnabled = false;
		this._sendStateToSound();
	};
}

const FailureCat = new Sound("angry_cat.mp3", Sound.MAIN_BUNDLE, error => {});

const FailureDog = new Sound("angry_dog.was", Sound.MAIN_BUNDLE, error => {});

const MainMenuMusic = new MusicWrapper("main_theme.mp3", sound =>
	sound.setNumberOfLoops(-1)
);

export const playFailureCat = () => {
	if (FailureCat.isPlaying()) {
		FailureCat.stop(() => FailureCat.play());
	} else {
		FailureCat.play();
	}
};

export const playFailureDog = () => {
	if (FailureDog.isPlaying()) {
		FailureDog.stop(() => FailureDog.play());
	} else {
		FailureDog.play();
	}
};

export const setMainMenuMusicPlaying = shouldPlay => {
	if (shouldPlay) {
		MainMenuMusic.shouldPlay();
	} else {
		MainMenuMusic.shouldStop();
	}
};
