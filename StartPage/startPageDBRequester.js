var StartPage = StartPage || {};

StartPage.DBRequester = function(userID){
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
		console.log("handleResult", results);		
		sendEvent("onResult", results);
	}

	function sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.allHorses = data;
		that.dispatchEvent(event);
	}

	function requestDatesFromDB(){
		requester.getAllHorsesOfUser(userID);
	}	

	that.init = init;
	that.requestDatesFromDB = requestDatesFromDB;
	return that;
}