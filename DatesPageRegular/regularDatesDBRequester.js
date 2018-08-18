var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage.DBRequester = function(userID, horseID){
	
	let that = new EventTarget();

	function init() {
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
		event.details.allDates = data;
		that.dispatchEvent(event);
	}

	function requestDatesFromDB(){
		requester.getAllDatesOfHorse(horseID);
	}	

	that.init = init;
	that.requestDatesFromDB = requestDatesFromDB;
	return that;
}