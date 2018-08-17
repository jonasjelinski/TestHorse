var HorseProfileSaver = HorseProfileSaver || {};

HorseProfileSaver.DBRequester = function(userID){
	let that = {},
		newHorse;

	function init(horse) {
		newHorse = horse;
		addUserId();
		initRequester();
	}

	function addUserId(){
		newHorse.userID = userID;
	}

	function initRequester() {
		requester = new DatabaseClientInterface.SimpleRequester(newHorse, "setHorseIntoDB");
		requester.init();
	}

	function saveHorseIntoDB(){
		console.log("saveHorseIntoDB", newHorse);
		//requester.request();
	}

	function setNewHorse(){
		requester = new DatabaseClientInterface.SimpleRequester(newHorse, "updateHorse");
		requester.init();
	}

	that.init = init;
	that.saveHorseIntoDB = saveHorseIntoDB;
	that.setUpdateHorse = setUpdateHorse;
	that.setNewHorse = setNewHorse;
	return that;
}