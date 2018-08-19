var DatesPageAll = DatesPageAll || {};

DatesPageAll.DBRequester = function(userID, horseID){
	
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
		console.log("allDates result", results);
		sendEvent("onResult", results);
	}

	function sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.allDates = data;
		that.dispatchEvent(event);
	}

	function requestDatesFromDB(){
		console.log("requester horseID",horseID);
		requester.getAllDatesOfHorse(38);
	}	

	that.init = init;
	that.requestDatesFromDB = requestDatesFromDB;
	return that;
}