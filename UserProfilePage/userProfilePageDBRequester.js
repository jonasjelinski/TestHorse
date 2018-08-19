var UserProfilPage = UserProfilPage || {};

UserProfilPage.DBRequester = function(userID){
	let that = new EventTarget(),
		isNewHorse,
		newHorse;

	function init(horse) {
		newHorse = horse;
		initRequester();
		addEventListeners();
	}
	
	function initRequester() {
		requester = new DatabaseClientInterface();
		requester.init();
	}

	function addEventListeners(){
		requester.addEventListener("onResult", handleResult);
	}

	function handleResult(event){		
		let results = event.details.result;
		sendEvent("onResult", results);
	}

	function sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.userData = data;
		that.dispatchEvent(event);
	}

	function requestDatesFromDB(){
		requester.getUserData(userID);
	}	

	that.init = init;
	that.requestDatesFromDB = requestDatesFromDB;
	return that;
}
