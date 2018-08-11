var HorseCreator = HorseCreator || {};

HorseCreator.HorseCreatorDBRequester = function(){
	
	let that = new EventTarget(),
		requester,
		newHorse;

	function init(horseObject) {
		newHorse = horseObject;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(newHorse, "setHorseIntoDB");
		requester.init();
	}

	function request(){
		requester.request();
	}

	that.init = init;
	that.request = request;
	return that;
};