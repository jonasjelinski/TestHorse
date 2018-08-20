var RegularDatesPage = RegularDatesPage || {};

RegularDatesPage.DBRequester = function(userID, horseID){
	
	let that = new EventTarget(),
	isDeletingDate;

	function init() {
		isDeletingDate = false;
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
		if(!isDeletingDate){
			let results = event.details.result;
			sendEvent("onResult", results);		
		}
	}

	function sendEvent(type, data){
		let event = new Event(type);
		event.details = {};
		event.details.allDates = data;
		that.dispatchEvent(event);
	}

	function requestDatesFromDB(){
		isDeletingDate = false;
		requester.getAllDatesOfHorse(horseID);
	}

	function deleteDate(id) {
		isDeletingDate = true;
       requester.deleteDateFromDB(id);
    }	

	that.init = init;
	that.requestDatesFromDB = requestDatesFromDB;
	that.deleteDate = deleteDate;
	return that;
}