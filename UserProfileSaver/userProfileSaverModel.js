var UserProfileSaver = UserProfileSaver || {};

UserProfileSaver.Model = function(){
	let that = {},
		attributes,
		newHorse;

	function init(horseObject) {
		newHorse = horseObject;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(newHorse, "setUserIntoDB");
		requester.init();
	}

	function saveHorseIntoDB(){
		requester.request();
	}

	that.init = init;
	that.saveHorseIntoDB = saveHorseIntoDB;
	return that;
}