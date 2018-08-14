var HorseProfileSaver = HorseProfileSaver || {};

HorseProfileSaver.Model = function(){
	let that = {},
		attributes,
		newHorse;

	function init(horseObject) {
		newHorse = horseObject;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(newHorse, "setHorseIntoDB");
		requester.init();
	}

	function saveHorseIntoDB(){
		requester.request();
	}

	that.init = init;
	that.saveHorseIntoDB = saveHorseIntoDB;
	return that;
}