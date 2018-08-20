var HorseProfileSaver = HorseProfileSaver || {};

HorseProfileSaver.DBRequester = function(userID){
	let that = {},
		isNewHorse,
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
		requester = new DatabaseClientInterface();
		requester.addEventListener("onResult", handleResult);
		requester.init();
	}

	function handleResult(event){
		let result = event.details.result;
		console.log("horse saver result", result);
	}

	function saveHorseIntoDB(){
		let hadCorrectParameter = {};
		if(isNewHorse){
			hadCorrectParameter = requester.setHorseIntoDB(newHorse);
		}
		else{
			newHorse.horseID = newHorse.id;
			newHorse.userID = newHorse.user_id;			
			hadCorrectParameter = requester.updateHorse(newHorse);
		}
		handleParameterFeedBack(hadCorrectParameter);
	}

	function handleParameterFeedBack(hadCorrectParameter){
		if(hadCorrectParameter){
			console.log("hadCorrectParameter")
		}
		else{
			console.log("not Enough attributes", newHorse);
		}
	}

	function setUpdateHorse(){
		isNewHorse = false;
	}

	function setNewHorse(){
		isNewHorse = true;
	}

	that.init = init;
	that.saveHorseIntoDB = saveHorseIntoDB;
	that.setUpdateHorse = setUpdateHorse;
	that.setNewHorse = setNewHorse;
	return that;
}