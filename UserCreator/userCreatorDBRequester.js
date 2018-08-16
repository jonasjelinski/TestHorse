var UserCreator = UserCreator || {};

UserCreator.DBRequester = function(){
	
	let that = new EventTarget(),
		requester,
		newHorse;

	function init(horseObject) {
		newHorse = horseObject;
		initRequester();
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(newHorse, "setUserIntoDB");
		requester.init();
	}

	function request(){
		requester.request();
	}

	that.init = init;
	that.request = request;
	return that;
};